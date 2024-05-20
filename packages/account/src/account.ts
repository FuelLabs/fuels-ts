import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { AbstractAccount } from '@fuel-ts/interfaces';
import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { arrayify, isDefined } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { FuelConnector } from './connectors';
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
  Provider,
  ScriptTransactionRequestLike,
  ProviderSendTxParams,
  TransactionResponse,
  EstimateTransactionParams,
  TransactionCost,
} from './providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  transactionRequestify,
  addAmountToCoinQuantities,
} from './providers';
import {
  cacheRequestInputsResourcesFromOwner,
  getAssetAmountInRequestInputs,
  isRequestInputCoin,
  isRequestInputResource,
} from './providers/transaction-request/helpers';
import { assembleTransferToContractScript } from './utils/formatTransferToContractScriptData';

export type TxParamsType = Pick<
  ScriptTransactionRequestLike,
  'gasLimit' | 'tip' | 'maturity' | 'maxFee' | 'witnessLimit'
>;

export type TransferParams = {
  destination: string | AbstractAddress;
  amount: BigNumberish;
  assetId?: BytesLike;
};

export type EstimatedTxParams = Pick<
  TransactionCost,
  'estimatedPredicates' | 'addedSignatures' | 'requiredQuantities' | 'updateMaxFee'
>;
const MAX_FUNDING_ATTEMPTS = 2;

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
  protected _provider?: Provider;

  protected _connector?: FuelConnector;

  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   */
  constructor(address: string | AbstractAddress, provider?: Provider, connector?: FuelConnector) {
    super();
    this._provider = provider;
    this._connector = connector;
    this.address = Address.fromDynamicInput(address);
  }

  /**
   * The provider used to interact with the network.
   *
   * @returns A Provider instance.
   *
   * @throws `FuelError` if the provider is not set.
   */
  get provider(): Provider {
    if (!this._provider) {
      throw new FuelError(ErrorCode.MISSING_PROVIDER, 'Provider not set');
    }

    return this._provider;
  }

  /**
   * Sets the provider for the account.
   *
   * @param provider - A Provider instance.
   */
  set provider(provider: Provider) {
    this._provider = provider;
  }

  /**
   * Changes the provider connection for the account.
   *
   * @param provider - A Provider instance.
   * @returns The updated Provider instance.
   */
  connect(provider: Provider): Provider {
    this._provider = provider;
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
  async getBalance(assetId?: BytesLike): Promise<BN> {
    const assetIdToFetch = assetId ?? this.provider.getBaseAssetId();
    const amount = await this.provider.getBalance(this.address, assetIdToFetch);
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
   * Funds a transaction request by adding the necessary resources.
   *
   * @typeParam T - The type of the TransactionRequest.
   * @param request - The transaction request to fund.
   * @param params - The estimated transaction parameters.
   * @returns The funded transaction request.
   */
  async fund<T extends TransactionRequest>(request: T, params: EstimatedTxParams): Promise<T> {
    const { addedSignatures, estimatedPredicates, requiredQuantities, updateMaxFee } = params;

    const fee = request.maxFee;
    const baseAssetId = this.provider.getBaseAssetId();
    const requiredInBaseAsset =
      requiredQuantities.find((quantity) => quantity.assetId === baseAssetId)?.amount || bn(0);

    const requiredQuantitiesWithFee = addAmountToCoinQuantities({
      amount: bn(fee),
      assetId: baseAssetId,
      coinQuantities: requiredQuantities,
    });

    const quantitiesDict: Record<string, { required: BN; owned: BN }> = {};

    requiredQuantitiesWithFee.forEach(({ amount, assetId }) => {
      quantitiesDict[assetId] = {
        required: amount,
        owned: bn(0),
      };
    });

    request.inputs.filter(isRequestInputResource).forEach((input) => {
      const isCoin = isRequestInputCoin(input);
      const assetId = isCoin ? String(input.assetId) : baseAssetId;
      if (quantitiesDict[assetId]) {
        quantitiesDict[assetId].owned = quantitiesDict[assetId].owned.add(input.amount);
      }
    });

    let missingQuantities: CoinQuantity[] = [];
    Object.entries(quantitiesDict).forEach(([assetId, { owned, required }]) => {
      if (owned.lt(required)) {
        missingQuantities.push({
          assetId,
          amount: required.sub(owned),
        });
      }
    });

    let needsToBeFunded = missingQuantities.length > 0;
    let fundingAttempts = 0;
    while (needsToBeFunded && fundingAttempts < MAX_FUNDING_ATTEMPTS) {
      const resources = await this.getResourcesToSpend(
        missingQuantities,
        cacheRequestInputsResourcesFromOwner(request.inputs, this.address)
      );

      request.addResources(resources);
      request.updatePredicateGasUsed(estimatedPredicates);

      const requestToReestimate = clone(request);
      if (addedSignatures) {
        Array.from({ length: addedSignatures }).forEach(() =>
          requestToReestimate.addEmptyWitness()
        );
      }

      if (!updateMaxFee) {
        break;
      }
      const { maxFee: newFee } = await this.provider.estimateTxGasAndFee({
        transactionRequest: requestToReestimate,
      });

      const totalBaseAssetOnInputs = getAssetAmountInRequestInputs(
        request.inputs,
        baseAssetId,
        baseAssetId
      );

      const totalBaseAssetRequiredWithFee = requiredInBaseAsset.add(newFee);

      if (totalBaseAssetOnInputs.gt(totalBaseAssetRequiredWithFee)) {
        needsToBeFunded = false;
      } else {
        missingQuantities = [
          {
            amount: totalBaseAssetRequiredWithFee.sub(totalBaseAssetOnInputs),
            assetId: baseAssetId,
          },
        ];
      }

      fundingAttempts += 1;
    }

    request.updatePredicateGasUsed(estimatedPredicates);

    const requestToReestimate = clone(request);
    if (addedSignatures) {
      Array.from({ length: addedSignatures }).forEach(() => requestToReestimate.addEmptyWitness());
    }

    if (!updateMaxFee) {
      return request;
    }

    const { maxFee } = await this.provider.estimateTxGasAndFee({
      transactionRequest: requestToReestimate,
    });

    request.maxFee = maxFee;

    return request;
  }

  /**
   * A helper that creates a transfer transaction request and returns it.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, tip, maturity, maxFee, witnessLimit).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(
    /** Address of the destination */
    destination: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId?: BytesLike,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionRequest> {
    let request = new ScriptTransactionRequest(txParams);
    request = this.addTransfer(request, { destination, amount, assetId });
    request = await this.estimateAndFundTransaction(request, txParams);
    return request;
  }

  /**
   * Transfers coins to a destination address.
   *
   * @param destination - The address of the destination.
   * @param amount - The amount of coins to transfer.
   * @param assetId - The asset ID of the coins to transfer.
   * @param txParams - The transaction parameters (gasLimit, maturity).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(
    /** Address of the destination */
    destination: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId?: BytesLike,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const request = await this.createTransfer(destination, amount, assetId, txParams);
    return this.sendTransaction(request, { estimateTxDependencies: false });
  }

  /**
   * Transfers multiple amounts of a token to multiple recipients.
   *
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @param txParams - Optional transaction parameters.
   * @returns A promise that resolves to a `TransactionResponse` object representing the transaction result.
   */
  async batchTransfer(
    transferParams: TransferParams[],
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    let request = new ScriptTransactionRequest(txParams);
    request = this.addBatchTransfer(request, transferParams);
    request = await this.estimateAndFundTransaction(request, txParams);
    return this.sendTransaction(request, { estimateTxDependencies: false });
  }

  /**
   * Adds a transfer to the given transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - The object representing the transfer to be made.
   * @returns The updated transaction request with the added transfer.
   */
  addTransfer(request: ScriptTransactionRequest, transferParams: TransferParams) {
    const { destination, amount, assetId } = transferParams;
    this.validateTransferAmount(amount);
    request.addCoinOutput(
      Address.fromAddressOrString(destination),
      amount,
      assetId ?? this.provider.getBaseAssetId()
    );
    return request;
  }

  /**
   * Adds multiple transfers to a script transaction request.
   *
   * @param request - The script transaction request to add transfers to.
   * @param transferParams - An array of `TransferParams` objects representing the transfers to be made.
   * @returns The updated script transaction request.
   */
  addBatchTransfer(request: ScriptTransactionRequest, transferParams: TransferParams[]) {
    const baseAssetId = this.provider.getBaseAssetId();
    transferParams.forEach(({ destination, amount, assetId }) => {
      this.addTransfer(request, {
        destination,
        amount,
        assetId: assetId ?? baseAssetId,
      });
    });
    return request;
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
    contractId: string | AbstractAddress,
    /** Amount of coins */
    amount: BigNumberish,
    /** Asset ID of coins */
    assetId?: BytesLike,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    if (bn(amount).lte(0)) {
      throw new FuelError(
        ErrorCode.INVALID_TRANSFER_AMOUNT,
        'Transfer amount must be a positive number.'
      );
    }

    const contractAddress = Address.fromAddressOrString(contractId);
    const assetIdToTransfer = assetId ?? this.provider.getBaseAssetId();
    const { script, scriptData } = await assembleTransferToContractScript({
      hexlifiedContractId: contractAddress.toB256(),
      amountToTransfer: bn(amount),
      assetId: assetIdToTransfer,
    });

    let request = new ScriptTransactionRequest({
      ...txParams,
      script,
      scriptData,
    });

    request.addContractInputAndOutput(contractAddress);

    const txCost = await this.provider.getTransactionCost(request, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: bn(amount), assetId: String(assetIdToTransfer) }],
    });

    request = this.validateGasLimitAndMaxFee({
      transactionRequest: request,
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });

    await this.fund(request, txCost);

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
    recipient: string | AbstractAddress,
    /** Amount of base asset */
    amount: BigNumberish,
    /** Tx Params */
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const recipientAddress = Address.fromAddressOrString(recipient);
    // add recipient and amount to the transaction script code
    const recipientDataArray = arrayify(
      '0x'.concat(recipientAddress.toHexString().substring(2).padStart(64, '0'))
    );
    const amountDataArray = arrayify(
      '0x'.concat(bn(amount).toHex().substring(2).padStart(16, '0'))
    );
    const script = new Uint8Array([
      ...arrayify(withdrawScript.bytes),
      ...recipientDataArray,
      ...amountDataArray,
    ]);

    const params: ScriptTransactionRequestLike = { script, ...txParams };

    const baseAssetId = this.provider.getBaseAssetId();
    let request = new ScriptTransactionRequest(params);
    const quantitiesToContract = [{ amount: bn(amount), assetId: baseAssetId }];

    const txCost = await this.provider.getTransactionCost(request, { quantitiesToContract });

    request = this.validateGasLimitAndMaxFee({
      transactionRequest: request,
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });

    await this.fund(request, txCost);

    return this.sendTransaction(request);
  }

  /** @hidden * */
  async signMessage(message: string): Promise<string> {
    if (!this._connector) {
      throw new FuelError(ErrorCode.MISSING_CONNECTOR, 'A connector is required to sign messages.');
    }
    return this._connector.signMessage(this.address.toString(), message);
  }

  /**
   * Signs a transaction with the wallet's private key.
   *
   * @param transactionRequestLike - The transaction request to sign.
   * @returns A promise that resolves to the signature of the transaction.
   */
  async signTransaction(transactionRequestLike: TransactionRequestLike): Promise<string> {
    if (!this._connector) {
      throw new FuelError(
        ErrorCode.MISSING_CONNECTOR,
        'A connector is required to sign transactions.'
      );
    }
    return this._connector.signTransaction(this.address.toString(), transactionRequestLike);
  }

  /**
   * Sends a transaction to the network.
   *
   * @param transactionRequestLike - The transaction request to be sent.
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true, awaitExecution }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    if (this._connector) {
      return this.provider.getTransactionResponse(
        await this._connector.sendTransaction(this.address.toString(), transactionRequestLike)
      );
    }
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.sendTransaction(transactionRequest, {
      awaitExecution,
      estimateTxDependencies: false,
    });
  }

  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @returns A promise that resolves to the call result.
   */
  async simulateTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: EstimateTransactionParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.provider.estimateTxDependencies(transactionRequest);
    }
    return this.provider.simulate(transactionRequest, { estimateTxDependencies: false });
  }

  /** @hidden * */
  private validateTransferAmount(amount: BigNumberish) {
    if (bn(amount).lte(0)) {
      throw new FuelError(
        ErrorCode.INVALID_TRANSFER_AMOUNT,
        'Transfer amount must be a positive number.'
      );
    }
  }

  /** @hidden * */
  private async estimateAndFundTransaction(
    transactionRequest: ScriptTransactionRequest,
    txParams: TxParamsType
  ) {
    let request = transactionRequest;
    const txCost = await this.provider.getTransactionCost(request, {
      resourcesOwner: this,
    });
    request = this.validateGasLimitAndMaxFee({
      transactionRequest: request,
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });
    request = await this.fund(request, txCost);
    return request;
  }

  /** @hidden * */
  private validateGasLimitAndMaxFee({
    gasUsed,
    maxFee,
    transactionRequest,
    txParams: { gasLimit: setGasLimit, maxFee: setMaxFee },
  }: {
    gasUsed: BN;
    maxFee: BN;
    transactionRequest: ScriptTransactionRequest;
    txParams: Pick<TxParamsType, 'gasLimit' | 'maxFee'>;
  }) {
    const request = transactionRequestify(transactionRequest) as ScriptTransactionRequest;

    if (!isDefined(setGasLimit)) {
      request.gasLimit = gasUsed;
    } else if (gasUsed.gt(setGasLimit)) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${setGasLimit}' is lower than the required: '${gasUsed}'.`
      );
    }

    if (!isDefined(setMaxFee)) {
      request.maxFee = maxFee;
    } else if (maxFee.gt(setMaxFee)) {
      throw new FuelError(
        ErrorCode.MAX_FEE_TOO_LOW,
        `Max fee '${setMaxFee}' is lower than the required: '${maxFee}'.`
      );
    }

    return request;
  }
}
