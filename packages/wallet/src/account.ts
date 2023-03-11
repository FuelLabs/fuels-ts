import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { NativeAssetId, getEnv as getGlobalEnv } from '@fuel-ts/constants';
import { AbstractAccount } from '@fuel-ts/interfaces';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type {
  TransactionRequestLike,
  CallResult,
  TransactionRequest,
  Coin,
  CoinQuantityLike,
  CoinQuantity,
  Message,
  Resource,
  ExcludeResourcesOption,
  TransactionResponse,
} from '@fuel-ts/providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  Provider,
  transactionRequestify,
} from '@fuel-ts/providers';

import { getEnv } from './env';

const { FUEL_NETWORK_URL } = getEnv({ source: process.env });

/**
 * Account
 */
export class Account extends AbstractAccount {
  readonly address: AbstractAddress;

  provider: Provider;

  constructor(address: string | AbstractAddress, provider: string | Provider = FUEL_NETWORK_URL) {
    super();
    this.provider = this.connect(provider);
    this.address = Address.fromDynamicInput(address);
  }

  /**
   * Change provider connection
   */
  connect(provider: string | Provider) {
    if (typeof provider === 'string') {
      if (this.provider) {
        this.provider.connect(provider);
      } else {
        this.provider = new Provider(provider);
      }
    } else {
      this.provider = provider;
    }
    return this.provider;
  }

  /**
   * Returns resources satisfying the spend query.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[] /** IDs of coins to exclude */,
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    return this.provider.getResourcesToSpend(this.address, quantities, excludedIds);
  }

  /**
   * Gets coins owned by the wallet address.
   */
  async getCoins(assetId?: BytesLike): Promise<Coin[]> {
    const coins = [];

    const pageSize = 9999;
    let cursor;
    // eslint-disable-next-line no-unreachable-loop
    for (;;) {
      const pageCoins = await this.provider.getCoins(this.address, assetId, {
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
   * Adds resources to the transaction enough to fund it.
   */
  async fund<T extends TransactionRequest>(request: T): Promise<void> {
    const fee = request.calculateFee();
    const resources = await this.getResourcesToSpend([fee]);

    request.addResources(resources);
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
    const params = { gasLimit: getGlobalEnv().MAX_GAS_PER_TX, ...txParams };

    const request = new ScriptTransactionRequest(params);
    request.addCoinOutput(destination, amount, assetId);
    const fee = request.calculateFee();
    let quantities: CoinQuantityLike[] = [];

    if (fee.assetId === hexlify(assetId)) {
      fee.amount = fee.amount.add(amount);
      quantities = [fee];
    } else {
      quantities = [[amount, assetId], fee];
    }

    const resources = await this.getResourcesToSpend(quantities);
    request.addResources(resources);

    return this.sendTransaction(request);
  }

  /**
   * Withdraws an amount of the base asset to the base chain.
   */
  async withdrawToBaseLayer(
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
    const params = { script, gasLimit: getGlobalEnv().MAX_GAS_PER_TX, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addMessageOutputs();
    const fee = request.calculateFee();
    let quantities: CoinQuantityLike[] = [];
    fee.amount = fee.amount.add(amount);
    quantities = [fee];
    const resources = await this.getResourcesToSpend(quantities);
    request.addResources(resources);

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
    await this.provider.addMissingVariables(transactionRequest);
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
    await this.provider.addMissingVariables(transactionRequest);
    return this.provider.simulate(transactionRequest);
  }
}
