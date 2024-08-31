import { UTXO_ID_LEN } from '@fuel-ts/abi-coder';
import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { AbstractAccount } from '@fuel-ts/interfaces';
import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import { InputType } from '@fuel-ts/transactions';
import { arrayify, hexlify, isDefined } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { FuelConnector } from './connectors';
import type {
  TransactionRequest,
  CoinQuantityLike,
  CoinQuantity,
  Resource,
  ExcludeResourcesOption,
  Provider,
  ScriptTransactionRequestLike,
  TransactionCost,
  EstimateTransactionParams,
  CursorPaginationArgs,
  TransactionRequestLike,
  ProviderSendTxParams,
  CallResult,
  GetCoinsResponse,
  GetMessagesResponse,
  GetBalancesResponse,
  Coin,
  TransactionCostParams,
  TransactionResponse,
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
import { mergeQuantities } from './providers/utils/merge-quantities';
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
  'estimatedPredicates' | 'addedSignatures' | 'requiredQuantities' | 'updateMaxFee' | 'gasPrice'
>;
const MAX_FUNDING_ATTEMPTS = 5;

export type FakeResources = Partial<Coin> & Required<Pick<Coin, 'amount' | 'assetId'>>;

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

  /**
   * The connector for use with external wallets
   */
  protected _connector?: FuelConnector;

  /**
   * Creates a new Account instance.
   *
   * @param address - The address of the account.
   * @param provider - A Provider instance  (optional).
   * @param connector - A FuelConnector instance (optional).
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
   * @param quantities - Quantities of resources to be obtained.
   * @param excludedIds - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[],
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    return this.provider.getResourcesToSpend(this.address, quantities, excludedIds);
  }

  /**
   * Retrieves coins owned by the account.
   *
   * @param assetId - The asset ID of the coins to retrieve (optional).
   * @returns A promise that resolves to an array of Coins.
   */
  async getCoins(
    assetId?: BytesLike,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetCoinsResponse> {
    return this.provider.getCoins(this.address, assetId, paginationArgs);
  }

  /**
   * Retrieves messages owned by the account.
   *
   * @returns A promise that resolves to an array of Messages.
   */
  async getMessages(paginationArgs?: CursorPaginationArgs): Promise<GetMessagesResponse> {
    return this.provider.getMessages(this.address, paginationArgs);
  }

  /**
   * Retrieves the balance of the account for the given asset.
   *
   * @param assetId - The asset ID to check the balance for (optional).
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
  async getBalances(): Promise<GetBalancesResponse> {
    return this.provider.getBalances(this.address);
  }

  /**
   * Funds a transaction request by adding the necessary resources.
   *
   * @typeParam T - The type of the TransactionRequest.
   * @param request - The transaction request to fund.
   * @param params - The estimated transaction parameters.
   * @returns A promise that resolves to the funded transaction request.
   */
  async fund<T extends TransactionRequest>(request: T, params: EstimatedTxParams): Promise<T> {
    const { addedSignatures, estimatedPredicates, requiredQuantities, updateMaxFee, gasPrice } =
      params;

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
        needsToBeFunded = false;
        break;
      }

      // Recalculate the fee after adding the resources
      const { maxFee: newFee } = await this.provider.estimateTxGasAndFee({
        transactionRequest: requestToReestimate,
        gasPrice,
      });

      const totalBaseAssetOnInputs = getAssetAmountInRequestInputs(
        request.inputs,
        baseAssetId,
        baseAssetId
      );

      // Update the new total as the fee will change after adding new resources
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

    // If the transaction still needs to be funded after the maximum number of attempts
    if (needsToBeFunded) {
      throw new FuelError(
        ErrorCode.NOT_ENOUGH_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
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
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the prepared transaction request.
   */
  async createTransfer(
    destination: string | AbstractAddress,
    amount: BigNumberish,
    assetId?: BytesLike,
    txParams: TxParamsType = {}
  ): Promise<ScriptTransactionRequest> {
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
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transfer(
    destination: string | AbstractAddress,
    amount: BigNumberish,
    assetId?: BytesLike,
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
   * @param assetId - The asset ID of the coins to transfer (optional).
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async transferToContract(
    contractId: string | AbstractAddress,
    amount: BigNumberish,
    assetId?: BytesLike,
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

    const txCost = await this.getTransactionCost(request, {
      quantities: [{ amount: bn(amount), assetId: String(assetIdToTransfer) }],
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
   * @param txParams - The transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async withdrawToBaseLayer(
    recipient: string | AbstractAddress,
    amount: BigNumberish,
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
    const quantities = [{ amount: bn(amount), assetId: baseAssetId }];

    const txCost = await this.getTransactionCost(request, { quantities });

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
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(
    transactionRequestLike: TransactionRequestLike,
    { signatureCallback, quantities = [] }: TransactionCostParams = {}
  ): Promise<TransactionCost> {
    const txRequestClone = clone(transactionRequestify(transactionRequestLike));
    const baseAssetId = this.provider.getBaseAssetId();

    // Fund with fake UTXOs to avoid not enough funds error
    // Getting coin quantities from amounts being transferred
    const coinOutputsQuantities = txRequestClone.getCoinOutputsQuantities();
    // Combining coin quantities from amounts being transferred and forwarding to contracts
    const requiredQuantities = mergeQuantities(coinOutputsQuantities, quantities);
    // An arbitrary amount of the base asset is added to cover the transaction fee during dry runs
    const transactionFeeForDryRun = [{ assetId: baseAssetId, amount: bn('100000000000000000') }];

    const findAssetInput = (assetId: string) =>
      txRequestClone.inputs.find((input) => {
        if (input.type === InputType.Coin) {
          return input.assetId === assetId;
        }
        // we only consider the message input if it has no data. messages with `data` cannot fund the gas of transaction
        if (input.type === InputType.Message && bn(input.data).isZero()) {
          return baseAssetId === assetId;
        }

        return false;
      });

    const updateAssetInput = (assetId: string, quantity: BN) => {
      const assetInput = findAssetInput(assetId);

      if (assetInput && 'amount' in assetInput) {
        assetInput.amount = quantity;
      } else {
        txRequestClone.addResources(
          this.generateFakeResources([
            {
              amount: quantity,
              assetId,
            },
          ])
        );
      }
    };

    const merged = mergeQuantities(requiredQuantities, transactionFeeForDryRun);

    merged.forEach(({ amount, assetId }) => updateAssetInput(assetId, amount));

    const txCost = await this.provider.getTransactionCost(txRequestClone, {
      signatureCallback,
    });

    return {
      ...txCost,
      requiredQuantities,
    };
  }

  /**
   * Sign a message from the account via the connector.
   *
   * @param message - the message to sign.
   * @returns a promise that resolves to the signature.
   *
   * @hidden
   */
  async signMessage(message: string): Promise<string> {
    if (!this._connector) {
      throw new FuelError(ErrorCode.MISSING_CONNECTOR, 'A connector is required to sign messages.');
    }
    return this._connector.signMessage(this.address.toString(), message);
  }

  /**
   * Signs a transaction from the account via the connector..
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
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: ProviderSendTxParams = {}
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
      estimateTxDependencies: false,
    });
  }

  /**
   * Simulates a transaction.
   *
   * @param transactionRequestLike - The transaction request to be simulated.
   * @param estimateTxParams - The estimate transaction params (optional).
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

  /**
   * Generates an array of fake resources based on the provided coins.
   *
   * @param coins - An array of `FakeResources` objects representing the coins.
   * @returns An array of `Resource` objects with generated properties.
   */
  generateFakeResources(coins: FakeResources[]): Array<Resource> {
    return coins.map((coin) => ({
      id: hexlify(randomBytes(UTXO_ID_LEN)),
      owner: this.address,
      blockCreated: bn(1),
      txCreatedIdx: bn(1),
      ...coin,
    }));
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
    const txCost = await this.getTransactionCost(request);
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
