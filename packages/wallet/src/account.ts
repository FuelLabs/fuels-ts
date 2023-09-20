import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
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
  Provider,
} from '@fuel-ts/providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  transactionRequestify,
} from '@fuel-ts/providers';

import {
  composeScriptForTransferringToContract,
  formatScriptDataForTransferringToContract,
} from './utils';

type TxParamsType = Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'>;

/**
 * `Account` provides an abstraction for interacting with accounts or wallets on the network.
 */
export class Account extends AbstractAccount {
  /**
   * The address associated with the account.
   */
  readonly address: AbstractAddress;

  /**
   * The provider used to interact with the network.
   */
  provider: Provider;

  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance.
   */
  constructor(address: string | AbstractAddress, provider: Provider) {
    super();
    this.provider = provider;
    this.address = Address.fromDynamicInput(address);
  }

  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(provider: Provider): Provider {
    this.provider = provider;
    return this.provider;
  }

  /**
   * Retrieves resources satisfying the spend query for the account.
   *
   * @param quantities - IDs of coins to exclude.
   * @param excludedIds - IDs of resources to be excluded from the query.
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[] /** IDs of coins to exclude */,
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    return this.provider.getResourcesToSpend(this.address, quantities, excludedIds);
  }

  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve.
   * @returns A promise that resolves to an array of Coins.
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
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} coins exceed the current supported limit.`
      );
    }

    return coins;
  }

  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
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
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} messages exceed the current supported limit.`
      );
    }

    return messages;
  }

  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for.
   * @returns A promise that resolves to the balance amount.
   */
  async getBalance(assetId: BytesLike = BaseAssetId): Promise<BN> {
    const amount = await this.provider.getBalance(this.address, assetId);
    return amount;
  }

  /**
   * Retrieves all the balances for the account.
   *
   * @returns A promise that resolves to an array of Coins and their quantities.
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
      throw new FuelError(
        ErrorCode.NOT_SUPPORTED,
        `Wallets containing more than ${pageSize} balances exceed the current supported limit.`
      );
    }

    return balances;
  }

  /**
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund<T extends TransactionRequest>(request: T): Promise<void> {
    const { gasPriceFactor } = this.provider.getGasConfig();
    const fee = request.calculateFee(gasPriceFactor);
    const resources = await this.getResourcesToSpend([fee]);

    request.addResources(resources);
  }

  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, gasPrice, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(
    /** Address of the destination */
    destination: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const { maxGasPerTx } = this.provider.getGasConfig();
    const params: TxParamsType = { gasLimit: maxGasPerTx, ...txParams };
    const request = new ScriptTransactionRequest(params);
    request.addCoinOutput(destination, amount, assetId);

    const { gasPriceFactor } = this.provider.getGasConfig();

    const fee = request.calculateFee(gasPriceFactor);
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
   * Transfers coins to a contract address.
   *
   * @param contractId - The address of the contract.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(
    /** Contract address */
    contractId: AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId: BytesLike = BaseAssetId,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const script = await composeScriptForTransferringToContract();

    const scriptData = formatScriptDataForTransferringToContract(
      contractId.toB256(),
      amount,
      assetId
    );

    const { maxGasPerTx } = this.provider.getGasConfig();
    const request = new ScriptTransactionRequest({
      gasLimit: maxGasPerTx,
      ...txParams,
      script,
      scriptData,
    });

    request.addContractInputAndOutput(contractId);

    const { gasPriceFactor } = this.provider.getGasConfig();

    const fee = request.calculateFee(gasPriceFactor);

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
   *
   * @param recipient - Address of the recipient on the base chain.
   * @param amount - Amount of base asset.
   * @param txParams - The optional transaction parameters.
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(
    /** Address of the recipient on the base chain */
    recipient: AbstractAddress,
    /** Amount of base asset */
    amount: BigNumberish,
    /** Tx Params */
    txParams: TxParamsType = {}
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
    const { maxGasPerTx } = this.provider.getGasConfig();
    const params = { script, gasLimit: maxGasPerTx, ...txParams };
    const request = new ScriptTransactionRequest(params);

    const { gasPriceFactor } = this.provider.getGasConfig();

    const fee = request.calculateFee(gasPriceFactor);
    let quantities: CoinQuantityLike[] = [];
    fee.amount = fee.amount.add(amount);
    quantities = [fee];
    const resources = await this.getResourcesToSpend(quantities);
    request.addResources(resources);

    return this.sendTransaction(request);
  }

  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.sendTransaction(transactionRequest);
  }

  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.provider.estimateTxDependencies(transactionRequest);
    return this.provider.simulate(transactionRequest);
  }
}
