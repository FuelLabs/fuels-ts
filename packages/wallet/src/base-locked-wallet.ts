import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { InputValue } from '@fuel-ts/abi-coder';
import { Address, addressify } from '@fuel-ts/address';
import { NativeAssetId } from '@fuel-ts/constants';
import { AbstractWallet } from '@fuel-ts/interfaces';
import type { AbstractAddress, AbstractPredicate } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionResponse,
  TransactionRequestLike,
  CallResult,
  TransactionRequest,
  Coin,
  CoinQuantityLike,
  CoinQuantity,
  BuildPredicateOptions,
  TransactionResult,
  Message,
} from '@fuel-ts/providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  Provider,
  transactionRequestify,
} from '@fuel-ts/providers';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions';

import { FUEL_NETWORK_URL } from './constants';

/**
 * BaseWallet
 */
export class BaseWalletLocked extends AbstractWallet {
  private readonly _address: AbstractAddress;

  provider: Provider;

  constructor(publicKey: string | AbstractAddress, provider: string | Provider = FUEL_NETWORK_URL) {
    super();
    this.provider = this.connect(provider);
    if (typeof publicKey === 'string') {
      this._address = Address.fromString(publicKey);
    } else {
      this._address = addressify(publicKey);
    }
  }

  get address(): AbstractAddress {
    return this._address;
  }

  /**
   * Change provider connection
   */
  connect(provider: string | Provider) {
    if (!provider) {
      throw new Error('Provider is required');
    } else if (typeof provider === 'string') {
      this.provider = new Provider(provider);
    } else {
      this.provider = provider;
    }
    return this.provider;
  }

  /**
   * Returns coins satisfying the spend query.
   */
  async getCoinsToSpend(
    quantities: CoinQuantityLike[],
    /** IDs of coins to exclude */
    excludedIds?: BytesLike[]
  ): Promise<Coin[]> {
    return this.provider.getCoinsToSpend(this.address, quantities, excludedIds);
  }

  /**
   * Gets coins owned by the wallet address.
   */
  async getCoins(): Promise<Coin[]> {
    const coins = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageCoins = await this.provider.getCoins(this.address, undefined, {
        first: pageSize,
        after: cursor,
      });

      coins.push(...pageCoins);

      const hasNextPage = pageCoins.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} coins are not yet supported`);
    }

    return coins;
  }

  /**
   * Gets messages owned by the wallet address.
   */
  async getMessages(): Promise<Message[]> {
    const messages = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageMessages = await this.provider.getMessages(this.address, {
        first: pageSize,
        after: cursor,
      });

      messages.push(...pageMessages);

      const hasNextPage = pageMessages.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} messages are not yet supported`);
    }

    return messages;
  }

  /**
   * Gets balance for the given asset.
   */
  async getBalance(assetId: BytesLike = NativeAssetId): Promise<BN> {
    const amount = await this.provider.getBalance(this.address, assetId);
    return amount;
  }

  /**
   * Gets balances.
   */
  async getBalances(): Promise<CoinQuantity[]> {
    const balances = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageBalances = await this.provider.getBalances(this.address, {
        first: pageSize,
        after: cursor,
      });

      balances.push(...pageBalances);

      const hasNextPage = pageBalances.length >= pageSize;
      if (!hasNextPage) {
        break;
      }

      // TODO: implement pagination
      throw new Error(`Wallets with more than ${pageSize} balances are not yet supported`);
    }

    return balances;
  }

  /**
   * Adds coins to the transaction enough to fund it.
   */
  async fund<T extends TransactionRequest>(request: T): Promise<void> {
    const fee = request.calculateFee();
    const coins = await this.getCoinsToSpend([fee]);

    request.addCoins(coins);
  }

  /**
   * Returns coins satisfying the spend query.
   */
  async transfer(
    /** Address of the destination */
    destination: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = NativeAssetId,
    /** Tx Params */
    txParams: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'> = {}
  ): Promise<TransactionResponse> {
    const params = { gasLimit: MAX_GAS_PER_TX, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addCoinOutput(destination, amount, assetId);
    const fee = request.calculateFee();
    let quantities: CoinQuantityLike[] = [];
    if (fee.assetId === hexlify(assetId)) {
      fee.amount.add(amount);
      quantities = [fee];
    } else {
      quantities = [[amount, assetId], fee];
    }
    const coins = await this.getCoinsToSpend(quantities);
    request.addCoins(coins);

    return this.sendTransaction(request);
  }

  /**
   * Withdraws an amount of the base asset to the base chain.
   */
  async withdraw(
    /** Address of the recipient on the base chain */
    recipient: AbstractAddress,
    /** Amount of base asset */
    amount: BigNumberish,
    /** Tx Params */
    txParams: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'> = {}
  ): Promise<TransactionResponse> {
    // add recipient and amount to the transaction script code
    const recipientDataArray = arrayify(
      '0x'.concat(recipient.toHexString().substring(2).padStart(64, '0'))
    );
    const amountDataArray = arrayify(
      '0x'.concat(bn(amount).toHex().substring(2).padStart(16, '0'))
    );
    const script = new Uint8Array([
      ...arrayify(withdrawScript.bytes),
      ...recipientDataArray,
      ...amountDataArray,
    ]);

    // build the transaction
    const params = { script, gasLimit: MAX_GAS_PER_TX, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addMessageOutputs();
    const fee = request.calculateFee();
    let quantities: CoinQuantityLike[] = [];
    fee.amount.add(amount);
    quantities = [fee];
    const coins = await this.getCoinsToSpend(quantities);
    request.addCoins(coins);

    return this.sendTransaction(request);
  }

  /**
   * Populates witnesses signature and send it to the network using `provider.sendTransaction`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns TransactionResponse
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    return this.provider.sendTransaction(transactionRequest);
  }

  /**
   * Populates witnesses signature and send a call it to the network using `provider.call`.
   *
   * @param transactionRequest - TransactionRequest
   * @returns CallResult
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    return this.provider.simulate(transactionRequest);
  }

  async buildPredicateTransaction(
    predicateAddress: AbstractAddress,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    predicateOptions?: BuildPredicateOptions
  ): Promise<ScriptTransactionRequest> {
    const options = {
      fundTransaction: true,
      ...predicateOptions,
    };
    const request = new ScriptTransactionRequest({
      gasLimit: MAX_GAS_PER_TX,
      ...options,
    });

    // output is locked behind predicate
    request.addCoinOutput(predicateAddress, amountToPredicate, assetId);

    const requiredCoinQuantities: CoinQuantityLike[] = [];
    if (options.fundTransaction) {
      requiredCoinQuantities.push(request.calculateFee());
    }

    if (requiredCoinQuantities.length) {
      const coins = await this.getCoinsToSpend(requiredCoinQuantities);
      request.addCoins(coins);
    }

    return request;
  }

  async submitPredicate(
    predicateAddress: AbstractAddress,
    amountToPredicate: BigNumberish,
    assetId: BytesLike = NativeAssetId,
    options?: BuildPredicateOptions
  ): Promise<TransactionResult<'success'>> {
    const request = await this.buildPredicateTransaction(
      predicateAddress,
      amountToPredicate,
      assetId,
      options
    );
    const response = await this.sendTransaction(request);
    return response.waitForResult();
  }

  async submitSpendPredicate(
    predicate: AbstractPredicate,
    amountToSpend: BigNumberish,
    predicateData?: InputValue[],
    assetId: BytesLike = NativeAssetId,
    options?: BuildPredicateOptions
  ): Promise<TransactionResult<'success'>> {
    return this.provider.submitSpendPredicate(
      predicate,
      amountToSpend,
      this.address,
      predicateData,
      assetId,
      options
    );
  }
}
