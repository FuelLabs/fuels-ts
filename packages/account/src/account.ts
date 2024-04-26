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
  cacheTxInputsFromOwner,
} from './providers';
import { assembleTransferToContractScript } from './utils/formatTransferToContractScriptData';

export type TxParamsType = Pick<
  ScriptTransactionRequestLike,
  'gasLimit' | 'tip' | 'maturity' | 'maxFee' | 'witnessLimit'
>;

export type EstimatedTxParams = Pick<
  TransactionCost,
  'maxFee' | 'estimatedPredicates' | 'addedSignatures' | 'requiredQuantities'
>;

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
   * Adds resources to the transaction enough to fund it.
   *
   * @param request - The transaction request.
   * @param coinQuantities - The coin quantities required to execute the transaction.
   * @param fee - The estimated transaction fee.
   * @returns A promise that resolves when the resources are added to the transaction.
   */
  async fund<T extends TransactionRequest>(request: T, params: EstimatedTxParams): Promise<T> {
    const { addedSignatures, estimatedPredicates, maxFee: fee, requiredQuantities } = params;
    const baseAssetId = this.provider.getBaseAssetId();

    const txRequest = request as T;
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

    txRequest.inputs.forEach((input) => {
      const isResource = 'amount' in input;
      if (!isResource) {
        return;
      }
      const isCoin = 'owner' in input;
      const assetId = isCoin ? String(input.assetId) : baseAssetId;
      if (quantitiesDict[assetId]) {
        quantitiesDict[assetId].owned = quantitiesDict[assetId].owned.add(input.amount);
      }
    });

    const missingQuantities: CoinQuantity[] = [];
    Object.entries(quantitiesDict).forEach(([assetId, { owned, required }]) => {
      if (owned.lt(required)) {
        missingQuantities.push({
          assetId,
          amount: required.sub(owned),
        });
      }
    });

    const needsToBeFunded = missingQuantities.length;

    if (needsToBeFunded) {
      const excludedIds = cacheTxInputsFromOwner(txRequest.inputs, this.address.toB256());

      const resources = await this.getResourcesToSpend(missingQuantities, excludedIds);

      txRequest.addResources(resources);
    }

    txRequest.shiftPredicateData();
    txRequest.updatePredicateGasUsed(estimatedPredicates);

    const requestToReestimate = clone(txRequest);
    if (addedSignatures) {
      Array.from({ length: addedSignatures }).forEach(() => requestToReestimate.addEmptyWitness());
    }
    const { maxFee } = await this.provider.estimateTxGasAndFee({
      transactionRequest: requestToReestimate,
    });

    txRequest.maxFee = maxFee;

    return txRequest;
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
    const request = new ScriptTransactionRequest(txParams);
    const assetIdToTransfer = assetId ?? this.provider.getBaseAssetId();
    request.addCoinOutput(Address.fromAddressOrString(destination), amount, assetIdToTransfer);
    const txCost = await this.provider.getTransactionCost(request, {
      estimateTxDependencies: true,
      resourcesOwner: this,
    });

    this.validateGasLimitAndMaxFee({
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

    await this.fund(request, txCost);

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
    if (bn(amount).lte(0)) {
      throw new FuelError(
        ErrorCode.INVALID_TRANSFER_AMOUNT,
        'Transfer amount must be a positive number.'
      );
    }
    const assetIdToTransfer = assetId ?? this.provider.getBaseAssetId();
    const request = await this.createTransfer(destination, amount, assetIdToTransfer, txParams);
    return this.sendTransaction(request, { estimateTxDependencies: false });
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

    const request = new ScriptTransactionRequest({
      ...txParams,
      script,
      scriptData,
    });

    request.addContractInputAndOutput(contractAddress);

    const txCost = await this.provider.getTransactionCost(request, {
      resourcesOwner: this,
      quantitiesToContract: [{ amount: bn(amount), assetId: String(assetIdToTransfer) }],
    });

    this.validateGasLimitAndMaxFee({
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });

    request.gasLimit = txCost.gasUsed;
    request.maxFee = txCost.maxFee;

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
    const request = new ScriptTransactionRequest(params);
    const quantitiesToContract = [{ amount: bn(amount), assetId: baseAssetId }];

    const txCost = await this.provider.getTransactionCost(request, { quantitiesToContract });

    this.validateGasLimitAndMaxFee({
      gasUsed: txCost.gasUsed,
      maxFee: txCost.maxFee,
      txParams,
    });

    request.maxFee = txCost.maxFee;
    request.gasLimit = txCost.gasUsed;

    await this.fund(request, txCost);

    return this.sendTransaction(request);
  }

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

  private validateGasLimitAndMaxFee({
    txParams: { gasLimit: setGasLimit, maxFee: setMaxFee },
    gasUsed,
    maxFee,
  }: {
    gasUsed: BN;
    maxFee: BN;
    txParams: Pick<TxParamsType, 'gasLimit' | 'maxFee'>;
  }) {
    if (isDefined(setGasLimit) && gasUsed.gt(setGasLimit)) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${setGasLimit}' is lower than the required: '${gasUsed}'.`
      );
    }

    if (isDefined(setMaxFee) && maxFee.gt(setMaxFee)) {
      throw new FuelError(
        ErrorCode.MAX_FEE_TOO_LOW,
        `Max fee '${setMaxFee}' is lower than the required: '${maxFee}'.`
      );
    }
  }
}
