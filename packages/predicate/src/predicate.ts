import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';
import type { JsonAbiFragmentType, InputValue } from '@fuel-ts/abi-coder';
import { AbiCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId } from '@fuel-ts/constants';
import { ContractUtils } from '@fuel-ts/contract';
import type { BigNumberish } from '@fuel-ts/math';
import type { CoinQuantityLike, TransactionResult, Coin } from '@fuel-ts/providers';
import { ScriptTransactionRequest } from '@fuel-ts/providers';
import type { Wallet } from '@fuel-ts/wallet';

export class Predicate {
  bytes: Uint8Array;
  address: BytesLike;
  types?: ReadonlyArray<JsonAbiFragmentType>;

  constructor(bytes: BytesLike, types?: ReadonlyArray<JsonAbiFragmentType>) {
    this.bytes = arrayify(bytes);
    this.address = ContractUtils.getContractRoot(this.bytes);
    this.types = types;
  }

  async getPredicateBalance(wallet: Wallet, assetId: BytesLike = NativeAssetId): Promise<bigint> {
    return wallet.provider.getBalance(this.address, assetId);
  }

  async buildPredicateTransaction(
    wallet: Wallet,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    options: {
      fundTransaction?: boolean;
    } = { fundTransaction: true }
  ): Promise<ScriptTransactionRequest> {
    const request = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });

    // output is locked behind predicate
    request.addCoinOutput(this.address, amountToPredicate, assetId);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      const amount = request.calculateFee();
      requiredCoinQuantities.push([amount]);
    }

    if (requiredCoinQuantities.length) {
      const coins = await wallet.getCoinsToSpend(requiredCoinQuantities);
      request.addCoins(coins);
    }

    return request;
  }

  async submitPredicate(
    wallet: Wallet,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    options: {
      fundTransaction?: boolean;
    } = { fundTransaction: true }
  ): Promise<TransactionResult<'success'>> {
    const request = await this.buildPredicateTransaction(
      wallet,
      amountToPredicate,
      assetId,
      options
    );

    const response = await wallet.sendTransaction(request);
    return response.waitForResult();
  }

  async buildSpendPredicate(
    wallet: Wallet,
    amountToSpend: BigNumberish,
    receiverAddress: BytesLike,
    predicateData?: InputValue,
    assetId: BytesLike = NativeAssetId,
    options: {
      fundTransaction?: boolean;
    } = { fundTransaction: true }
  ): Promise<ScriptTransactionRequest> {
    const predicateCoins: Coin[] = await wallet.provider.getCoinsToSpend(this.address, [
      [amountToSpend, assetId],
    ]);
    const request = new ScriptTransactionRequest({
      gasLimit: 1000000,
    });

    let encoded = predicateData;
    if (predicateData && this.types) {
      const abiCoder = new AbiCoder();
      encoded = abiCoder.encode(this.types, [predicateData]);
    }

    let totalInPredicate = 0n;
    predicateCoins.forEach((coin: Coin) => {
      totalInPredicate += coin.amount;
      request.addCoin({
        ...coin,
        predicate: this.bytes,
        predicateData: encoded,
      } as Coin);
      request.outputs = [];
    });

    // output sent to receiver
    request.addCoinOutput(receiverAddress, totalInPredicate, assetId);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      const amount = request.calculateFee();
      requiredCoinQuantities.push([amount]);
    }

    if (requiredCoinQuantities.length) {
      const coins = await wallet.getCoinsToSpend(requiredCoinQuantities);
      request.addCoins(coins);
    }

    return request;
  }

  async submitSpendPredicate(
    wallet: Wallet,
    amountToSpend: BigNumberish,
    receiverAddress: BytesLike,
    predicateData?: InputValue,
    assetId: BytesLike = NativeAssetId,
    options: {
      fundTransaction?: boolean;
    } = { fundTransaction: true }
  ): Promise<TransactionResult<'success'>> {
    const request = await this.buildSpendPredicate(
      wallet,
      amountToSpend,
      receiverAddress,
      predicateData,
      assetId,
      options
    );

    try {
      const response = await wallet.sendTransaction(request);
      return await response.waitForResult();
    } catch (error: any) {
      const errors: { message: string }[] = error?.response?.errors || [];
      if (
        errors.some(({ message }) =>
          message.includes('unexpected block execution error TransactionValidity(InvalidPredicate')
        )
      ) {
        throw new Error('Invalid Predicate');
      }

      throw error;
    }
  }
}
