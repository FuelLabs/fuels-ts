/* eslint-disable no-param-reassign */
import { UTXO_ID_LEN } from '@fuel-ts/abi-coder';
import type { AddressInput, WithAddress } from '@fuel-ts/address';
import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { HashableMessage } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { InputType, OutputType } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify, isDefined } from '@fuel-ts/utils';
import { clone } from 'ramda';

import type { FuelConnector, FuelConnectorSendTxParams } from './connectors';
import type {
  TransactionRequest,
  CoinQuantityLike,
  CoinQuantity,
  Resource,
  ResourcesIdsToIgnore,
  Provider,
  ScriptTransactionRequestLike,
  TransactionCost,
  EstimateTransactionParams,
  CursorPaginationArgs,
  TransactionRequestLike,
  CallResult,
  GetCoinsResponse,
  GetMessagesResponse,
  GetBalancesResponse,
  Coin,
  TransactionCostParams,
  ProviderSendTxParams,
  TransactionSummaryJson,
  TransactionResult,
  TransactionType,
  TransactionResponse,
} from './providers';
import {
  withdrawScript,
  ScriptTransactionRequest,
  transactionRequestify,
  addAmountToCoinQuantities,
  calculateGasFee,
  setAndValidateGasAndFeeForAssembledTx,
} from './providers';
import {
  cacheRequestInputsResourcesFromOwner,
  getAssetAmountInRequestInputs,
  isRequestInputCoin,
  isRequestInputMessageWithoutData,
  isRequestInputResource,
} from './providers/transaction-request/helpers';
import { mergeQuantities } from './providers/utils/merge-quantities';
import { serializeProviderCache } from './providers/utils/serialization';
import { AbstractAccount } from './types';
import { assembleTransferToContractScript } from './utils/formatTransferToContractScriptData';
import { splitCoinsIntoBatches } from './utils/split-coins-into-batches';

export type TxParamsType = Pick<
  ScriptTransactionRequestLike,
  'gasLimit' | 'tip' | 'maturity' | 'maxFee' | 'witnessLimit' | 'expiration'
>;

export type TransferParams = {
  destination: string | Address;
  amount: BigNumberish;
  assetId: BytesLike;
};

export type ContractTransferParams = {
  contractId: string | Address;
  amount: BigNumberish;
  assetId: BytesLike;
};

export type AccountSendTxParams = ProviderSendTxParams & FuelConnectorSendTxParams;

export type EstimatedTxParams = Pick<
  TransactionCost,
  | 'estimatedPredicates'
  | 'addedSignatures'
  | 'requiredQuantities'
  | 'updateMaxFee'
  | 'gasPrice'
  | 'transactionSummary'
>;

export type SubmitAllMode = 'sequential' | 'parallel';

export type PrepareSubmitAllParams = {
  txs: ScriptTransactionRequest[];
  mode?: SubmitAllMode;
};

export type SubmitAllCallbackResponse = {
  txResponses: TransactionResult<TransactionType.Script>[];
  errors: FuelError[];
};

export type SubmitAllCallback = () => Promise<SubmitAllCallbackResponse>;

export type AssembleConsolidationTxsParams = {
  assetId: string;
  coins: Coin[];
  mode?: SubmitAllMode;
  outputNum?: number;
};

export type ConsolidateCoins = {
  assetId: string;
  mode?: SubmitAllMode;
  outputNum?: number;
};

export type StartConsolidateCoins = {
  owner: string;
  assetId: string;
};

const MAX_FUNDING_ATTEMPTS = 5;

export type FakeResources = Partial<Coin> & Required<Pick<Coin, 'amount' | 'assetId'>>;

/**
 * `Account` provides an abstraction for interacting with accounts or wallets on the network.
 */
export class Account extends AbstractAccount implements WithAddress {
  /**
   * The address associated with the account.
   */
  readonly address: Address;

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
  constructor(address: AddressInput, provider?: Provider, connector?: FuelConnector) {
    super();
    this._provider = provider;
    this._connector = connector;
    this.address = new Address(address);
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
   * @param resourcesIdsToIgnore - IDs of resources to be excluded from the query (optional).
   * @returns A promise that resolves to an array of Resources.
   */
  async getResourcesToSpend(
    quantities: CoinQuantityLike[],
    resourcesIdsToIgnore?: ResourcesIdsToIgnore
  ): Promise<Resource[]> {
    return this.provider.getResourcesToSpend(this.address, quantities, resourcesIdsToIgnore);
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
    const assetIdToFetch = assetId ?? (await this.provider.getBaseAssetId());
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
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async fund<T extends TransactionRequest>(request: T, params: EstimatedTxParams): Promise<T> {
    const {
      addedSignatures,
      estimatedPredicates,
      requiredQuantities,
      updateMaxFee,
      gasPrice,
      transactionSummary,
    } = params;

    const chainId = await this.provider.getChainId();

    const fee = request.maxFee;
    const baseAssetId = await this.provider.getBaseAssetId();
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
        request.inputs.filter(isRequestInputResource),
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
        ErrorCode.INSUFFICIENT_FUNDS,
        `The account ${this.address} does not have enough base asset funds to cover the transaction execution.`
      );
    }

    request.updateState(chainId, 'funded', transactionSummary);

    await this.provider.validateTransaction(request);

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
      gasPrice,
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
    destination: string | Address,
    amount: BigNumberish,
    assetId?: BytesLike,
    txParams: TxParamsType = {}
  ): Promise<ScriptTransactionRequest> {
    let request = new ScriptTransactionRequest(txParams);

    request = this.addTransfer(request, {
      destination,
      amount,
      assetId: assetId || (await this.provider.getBaseAssetId()),
    });

    const { gasPrice, transactionRequest } = await this.assembleTx(request);

    request = await setAndValidateGasAndFeeForAssembledTx({
      gasPrice,
      provider: this.provider,
      transactionRequest,
      setGasLimit: txParams?.gasLimit,
      setMaxFee: txParams?.maxFee,
    });

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
    destination: string | Address,
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

    const { gasPrice, transactionRequest } = await this.assembleTx(request);

    request = await setAndValidateGasAndFeeForAssembledTx({
      gasPrice,
      provider: this.provider,
      transactionRequest,
      setGasLimit: txParams?.gasLimit,
      setMaxFee: txParams?.maxFee,
    });
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
    request.addCoinOutput(new Address(destination), amount, assetId);
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
    transferParams.forEach(({ destination, amount, assetId }) => {
      this.addTransfer(request, {
        destination,
        amount,
        assetId,
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
    contractId: string | Address,
    amount: BigNumberish,
    assetId: BytesLike,
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    return this.batchTransferToContracts([{ amount, assetId, contractId }], txParams);
  }

  async batchTransferToContracts(
    contractTransferParams: ContractTransferParams[],
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    let request = new ScriptTransactionRequest({
      ...txParams,
    });

    const quantities: CoinQuantity[] = [];

    const defaultAssetId = await this.provider.getBaseAssetId();

    const transferParams = contractTransferParams.map((transferParam) => {
      const amount = bn(transferParam.amount);
      const contractAddress = new Address(transferParam.contractId);

      const assetId = transferParam.assetId ? hexlify(transferParam.assetId) : defaultAssetId;

      if (amount.lte(0)) {
        throw new FuelError(
          ErrorCode.INVALID_TRANSFER_AMOUNT,
          'Transfer amount must be a positive number.'
        );
      }

      request.addContractInputAndOutput(contractAddress);
      quantities.push({ amount, assetId });

      return {
        amount,
        contractId: contractAddress.toB256(),
        assetId,
      };
    });

    const { script, scriptData } = await assembleTransferToContractScript(transferParams);

    request.script = script;
    request.scriptData = scriptData;

    const { gasPrice, transactionRequest } = await this.assembleTx(request, quantities);

    request = await setAndValidateGasAndFeeForAssembledTx({
      gasPrice,
      provider: this.provider,
      transactionRequest,
      setGasLimit: txParams?.gasLimit,
      setMaxFee: txParams?.maxFee,
    });

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
    recipient: AddressInput,
    amount: BigNumberish,
    txParams: TxParamsType = {}
  ): Promise<TransactionResponse> {
    const recipientAddress = new Address(recipient);
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

    const baseAssetId = await this.provider.getBaseAssetId();
    let request = new ScriptTransactionRequest(params);
    const quantities = [{ amount: bn(amount), assetId: baseAssetId }];

    const { gasPrice, transactionRequest } = await this.assembleTx(request, quantities);

    request = await setAndValidateGasAndFeeForAssembledTx({
      gasPrice,
      provider: this.provider,
      transactionRequest,
      setGasLimit: txParams?.gasLimit,
      setMaxFee: txParams?.maxFee,
    });

    return this.sendTransaction(request);
  }

  /**
   * Start the consolidation process
   *
   * @param owner - The B256 address of the owner.
   * @param assetId - The asset ID that requires consolidation.
   */
  async startConsolidation(opts: StartConsolidateCoins): Promise<boolean> {
    if (this._connector) {
      await this._connector.startConsolidation(opts);
      return false;
    }

    const { owner, assetId } = opts;
    if (owner !== this.address.toB256()) {
      throw new FuelError(
        ErrorCode.UNABLE_TO_CONSOLIDATE_COINS,
        `Unable to consolidate coins. You're attempting to consolidate assets that don't belong to this account.\n\tOwner: '${owner}'\n\tCurrent: '${this.address.toB256()}'`
      );
    }

    const { errors } = await this.consolidateCoins({ assetId });
    if (errors.length > 0) {
      throw new FuelError(
        ErrorCode.UNABLE_TO_CONSOLIDATE_COINS,
        `There were error/s while attempting to consolidate the coins.\n\tAsset: '${assetId}'.`,
        { errors }
      );
    }
    return true;
  }

  /**
   * Consolidates base asset UTXOs into fewer, larger ones.
   *
   * Retrieves a limited number of base asset coins (as defined by `Provider.RESOURCES_PAGE_SIZE_LIMIT`),
   * assembles consolidation transactions, and submits them to the network.
   *
   * Note: This method currently supports only the base asset.
   *
   * @param params - The parameters for coin consolidation, including the asset ID, mode, and output number.
   * @returns A promise that resolves to the response of the submitted transactions.
   * @throws Will throw an error if the asset is not a base asset as non-base asset consolidation is not implemented.
   */
  async consolidateCoins(params: ConsolidateCoins): Promise<SubmitAllCallbackResponse> {
    const { assetId } = params;

    const { coins } = await this.getCoins(assetId);

    const baseAssetId = await this.provider.getBaseAssetId();
    const isBaseAsset = baseAssetId === assetId;

    let submitAll: SubmitAllCallback;
    const consolidationParams: AssembleConsolidationTxsParams = {
      assetId,
      coins,
      mode: params.mode,
      outputNum: params.outputNum,
    };

    if (isBaseAsset) {
      ({ submitAll } = await this.assembleBaseAssetConsolidationTxs(consolidationParams));
    } else {
      ({ submitAll } = await this.assembleNonBaseAssetConsolidationTxs(consolidationParams));
    }

    return submitAll();
  }

  /**
   * Assembles transactions for consolidating base asset coins into fewer UTXOs.
   *
   * This method splits the provided coins into batches and creates transaction requests
   * to consolidate them. It calculates the necessary fee and sets up the transactions
   * to be submitted either in parallel (default) or sequentially.
   *
   * @param params - The parameters for assembling base asset consolidation transactions.
   *
   * @returns An object containing the assembled transactions, the total fee cost, and a callback to submit all transactions.
   */
  async assembleBaseAssetConsolidationTxs(params: Omit<AssembleConsolidationTxsParams, 'assetId'>) {
    const { coins, mode = 'parallel', outputNum = 1 } = params;

    const baseAssetId = await this.provider.getBaseAssetId();
    this.validateConsolidationTxsCoins(coins, baseAssetId);

    const chainInfo = await this.provider.getChain();
    const maxInputsNumber = chainInfo.consensusParameters.txParameters.maxInputs.toNumber();

    let totalFeeCost = bn(0);
    const txs: ScriptTransactionRequest[] = [];
    const coinsBatches = splitCoinsIntoBatches(coins, maxInputsNumber);
    const gasPrice = await this.provider.estimateGasPrice(10);
    const consolidateMoreThanOneCoin = outputNum > 1;

    coinsBatches
      // Skip batches with just one Coin to avoid consolidate just one coin
      .filter((batch) => batch.length > 1)
      .forEach((coinBatch) => {
        const request = new ScriptTransactionRequest({
          script: '0x',
        });

        request.addResources(coinBatch);

        if (consolidateMoreThanOneCoin) {
          // We decrease one because the change output will also create one UTXO
          Array.from({ length: outputNum - 1 }).forEach(() => {
            // Real value will be added later after having fee calculated
            request.addCoinOutput(this.address, 0, baseAssetId);
          });
        }

        const minGas = request.calculateMinGas(chainInfo);

        const fee = calculateGasFee({
          gasPrice,
          gas: minGas,
          priceFactor: chainInfo.consensusParameters.feeParameters.gasPriceFactor,
          tip: request.tip,
        });

        request.maxFee = fee;

        if (consolidateMoreThanOneCoin) {
          const total = request.inputs
            .filter(isRequestInputCoin)
            .reduce((acc, input) => acc.add(input.amount), bn(0));

          // We add a +1 as the change output will also include one part of the total amount
          const amountPerNewUtxo = total.div(outputNum + 1);

          request.outputs.forEach((output) => {
            if (output.type === OutputType.Coin) {
              output.amount = amountPerNewUtxo;
            }
          });
        }

        totalFeeCost = totalFeeCost.add(fee);

        txs.push(request);
      });

    const submitAll = this.prepareSubmitAll({ txs, mode });

    return { txs, totalFeeCost, submitAll };
  }

  async assembleNonBaseAssetConsolidationTxs(
    params: AssembleConsolidationTxsParams & { assetId: string }
  ) {
    const { assetId, coins, mode = 'parallel', outputNum = 1 } = params;

    this.validateConsolidationTxsCoins(coins, assetId);

    const chainInfo = await this.provider.getChain();
    const maxInputsNumber = chainInfo.consensusParameters.txParameters.maxInputs.toNumber();

    // Collate the base asset for funding purposes
    const baseAssetId = chainInfo.consensusParameters.baseAssetId;
    const { coins: baseAssetCoins } = await this.provider.getCoins(this.address, baseAssetId);

    let totalFeeCost = bn(0);
    const txs: ScriptTransactionRequest[] = [];
    const gasPrice = await this.provider.estimateGasPrice(10);
    const consolidateMoreThanOneCoin = outputNum > 1;
    const assetCoinBatches = splitCoinsIntoBatches(coins, maxInputsNumber);

    assetCoinBatches
      // Skip batches with just one Coin to avoid consolidate just one coin
      .filter((batch) => batch.length > 1)
      .forEach((coinBatch) => {
        const request = new ScriptTransactionRequest({
          script: '0x',
        });

        request.addResources(coinBatch);

        if (consolidateMoreThanOneCoin) {
          // We decrease one because the change output will also create one UTXO
          Array.from({ length: outputNum - 1 }).forEach(() => {
            // Real value will be added later after having fee calculated
            request.addCoinOutput(this.address, 0, assetId);
          });
        }

        const minGas = request.calculateMinGas(chainInfo);

        const fee = calculateGasFee({
          gasPrice,
          gas: minGas,
          priceFactor: chainInfo.consensusParameters.feeParameters.gasPriceFactor,
          tip: request.tip,
        });

        request.maxFee = fee;

        if (consolidateMoreThanOneCoin) {
          const total = request.inputs
            .filter(isRequestInputCoin)
            .reduce((acc, input) => acc.add(input.amount), bn(0));

          // We add a +1 as the change output will also include one part of the total amount
          const amountPerNewUtxo = total.div(outputNum + 1);

          request.outputs.forEach((output) => {
            if (output.type === OutputType.Coin) {
              output.amount = amountPerNewUtxo;
            }
          });
        }

        totalFeeCost = totalFeeCost.add(fee);

        const baseAssetResources: Coin[] = [];
        let fundingFeeTotal: BN = bn(0);

        while (fundingFeeTotal.lt(fee)) {
          const baseAssetCoin = baseAssetCoins.pop();
          if (!baseAssetCoin) {
            break;
          }

          baseAssetResources.push(baseAssetCoin);
          fundingFeeTotal = fundingFeeTotal.add(baseAssetCoin.amount);
        }

        // Need to remove the extra assets from the request input
        const { inputs } = request;
        request.inputs = inputs.slice(0, maxInputsNumber - baseAssetResources.length);
        const removedCoins = coinBatch.slice(maxInputsNumber - baseAssetResources.length);

        // Add our base assets
        request.addResources(baseAssetResources);

        const lastCoinBatch = assetCoinBatches[assetCoinBatches.length - 1];
        lastCoinBatch.push(...removedCoins);
        if (lastCoinBatch.length > maxInputsNumber) {
          assetCoinBatches.push(lastCoinBatch.slice(maxInputsNumber));
        }

        txs.push(request);
      });

    const submitAll = this.prepareSubmitAll({ txs, mode });

    return { txs, totalFeeCost, submitAll };
  }

  /**
   * Prepares a function to submit all transactions either sequentially or in parallel.
   *
   * @param params - The parameters for preparing the submitAll callback.
   *
   * @returns A callback that, when called, submits all transactions and returns their results and any errors encountered.
   */
  prepareSubmitAll = (params: PrepareSubmitAllParams): SubmitAllCallback => {
    // Default to 'sequential' if mode is not provided
    const { txs, mode = 'sequential' } = params;

    return async () => {
      const txResponses: TransactionResult<TransactionType.Script>[] = [];
      const errors: FuelError[] = [];

      if (mode === 'sequential') {
        // Sequential execution
        for (const tx of txs) {
          try {
            const submit = await this.sendTransaction(tx);
            const response = await submit.waitForResult<TransactionType.Script>();
            txResponses.push(response);
          } catch (error) {
            errors.push(error as FuelError);
          }
        }
      } else {
        // Parallel execution
        const results = await Promise.allSettled(
          txs.map(async (tx) => {
            // Chain the transaction sending and result waiting
            const submit = await this.sendTransaction(tx);
            return submit.waitForResult<TransactionType.Script>();
          })
        );

        // Process results from Promise.allSettled
        results.forEach((result) => {
          if (result.status === 'fulfilled') {
            txResponses.push(result.value);
          } else {
            // Ensure the rejected reason is treated as FuelError
            errors.push(result.reason as FuelError);
          }
        });
      }

      return { txResponses, errors };
    };
  };

  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the transaction.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param transactionCostParams - The transaction cost parameters (optional).
   *
   * @returns A promise that resolves to the transaction cost object.
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
   */
  async getTransactionCost(
    transactionRequestLike: TransactionRequestLike,
    { signatureCallback, quantities = [], gasPrice }: TransactionCostParams = {}
  ): Promise<TransactionCost> {
    const txRequestClone = clone(transactionRequestify(transactionRequestLike));
    const baseAssetId = await this.provider.getBaseAssetId();

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

        // We only consider the message input if it has no data.
        // Messages with `data` cannot fund the gas of a transaction.
        if (isRequestInputMessageWithoutData(input)) {
          return baseAssetId === assetId;
        }
        return false;
      });

    const updateAssetInput = (assetId: string, quantity: BN) => {
      const assetInput = findAssetInput(assetId);
      const usedQuantity = quantity;

      if (assetInput && 'amount' in assetInput) {
        assetInput.amount = usedQuantity;
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

    mergeQuantities(requiredQuantities, transactionFeeForDryRun).forEach(({ amount, assetId }) =>
      updateAssetInput(assetId, amount)
    );

    const txCost = await this.provider.getTransactionCost(txRequestClone, {
      signatureCallback,
      gasPrice,
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
  async signMessage(message: HashableMessage): Promise<string> {
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
  async signTransaction(
    transactionRequestLike: TransactionRequestLike,
    connectorOptions: AccountSendTxParams = {}
  ): Promise<string | TransactionRequest> {
    if (!this._connector) {
      throw new FuelError(
        ErrorCode.MISSING_CONNECTOR,
        'A connector is required to sign transactions.'
      );
    }

    const transactionRequest = transactionRequestify(transactionRequestLike);

    const { transactionRequest: requestToSign, connectorsSendTxParams } =
      await this.setTransactionStateForConnectors({
        transactionRequest,
        connectorOptions,
      });

    return this._connector.signTransaction(
      this.address.toString(),
      requestToSign,
      connectorsSendTxParams
    );
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
    { estimateTxDependencies = true, ...connectorOptions }: AccountSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);

    // Check if the account is using a connector, and therefore we do not have direct access to the
    // private key.
    if (this._connector) {
      const response = await this.setTransactionStateForConnectors({
        transactionRequest,
        connectorOptions,
      });

      const transaction: string | TransactionResponse = await this._connector.sendTransaction(
        this.address.toString(),
        response.transactionRequest,
        response.connectorsSendTxParams
      );

      return typeof transaction === 'string'
        ? this.provider.getTransactionResponse(transaction)
        : transaction;
    }

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

  /** @hidden */
  private async autoConsolidateCoin<TResponse>(params: {
    callback: () => Promise<TResponse>;
  }): Promise<TResponse> {
    const { callback } = params;

    try {
      return await callback();
    } catch (e: unknown) {
      const error = FuelError.parse(e);

      const CONSOLIDATION_CODES = [
        ErrorCode.MAX_COINS_REACHED,
        // TODO: plumb in for MAX_INPUTS_EXCEEDED
        // ErrorCode.MAX_INPUTS_EXCEEDED
      ];

      if (CONSOLIDATION_CODES.includes(error.code)) {
        const { assetId, owner } = error.metadata as {
          assetId: string;
          owner: string;
        };
        const shouldRetryOperation = await this.startConsolidation({
          owner,
          assetId,
        });
        if (shouldRetryOperation) {
          return await callback()
        }
      }
      throw e;
    }
  }

  /** @hidden */
  private async prepareTransactionForSend(
    request: TransactionRequest
  ): Promise<TransactionRequest> {
    const { transactionId } = request.flag;

    // If there is no transaction id, then no status is set.
    if (!isDefined(transactionId)) {
      return request;
    }

    const chainId = await this.provider.getChainId();
    const currentTransactionId = request.getTransactionId(chainId);

    // If the transaction id does not match the transaction id on the request.
    // Then we need to invalidate the transaction status
    if (transactionId !== currentTransactionId) {
      request.updateState(chainId);
    }
    return request;
  }

  /** @hidden */
  private async prepareTransactionSummary(
    request: TransactionRequest
  ): Promise<TransactionSummaryJson | undefined> {
    const chainId = await this.provider.getChainId();

    return isDefined(request.flag.summary)
      ? {
          ...request.flag.summary,
          id: request.getTransactionId(chainId),
          transactionBytes: hexlify(request.toTransactionBytes()),
        }
      : undefined;
  }

  /** @hidden * */
  private async assembleTx(
    transactionRequest: ScriptTransactionRequest,
    quantities: CoinQuantity[] = []
  ): Promise<{ transactionRequest: ScriptTransactionRequest; gasPrice: BN }> {
    const outputQuantities = transactionRequest.outputs
      .filter((o) => o.type === OutputType.Coin)
      .map(({ amount, assetId }) => ({ assetId: String(assetId), amount: bn(amount) }));

    transactionRequest.gasLimit = bn(0);
    transactionRequest.maxFee = bn(0);

    const { assembledRequest, gasPrice } = await this.autoConsolidateCoin({
      callback: () =>
        this.provider.assembleTx({
          request: transactionRequest,
          accountCoinQuantities: mergeQuantities(outputQuantities, quantities),
          feePayerAccount: this,
        }),
    });

    return { transactionRequest: assembledRequest as ScriptTransactionRequest, gasPrice };
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
  private validateConsolidationTxsCoins(coins: Coin[], assetId: string) {
    if (coins.length <= 1) {
      throw new FuelError(ErrorCode.NO_COINS_TO_CONSOLIDATE, 'No coins to consolidate.');
    }

    if (!coins.every((c) => c.assetId === assetId)) {
      throw new FuelError(
        ErrorCode.COINS_ASSET_ID_MISMATCH,
        'All coins to consolidate must be from the same asset id.'
      );
    }
  }

  /** @hidden * */
  private async setTransactionStateForConnectors(params: {
    transactionRequest: TransactionRequest;
    connectorOptions: AccountSendTxParams;
  }): Promise<{
    transactionRequest: TransactionRequest;
    connectorsSendTxParams: FuelConnectorSendTxParams;
  }> {
    const { transactionRequest: requestToPrepare, connectorOptions } = params;

    const { onBeforeSend, skipCustomFee = false } = connectorOptions;

    const transactionRequest = await this.prepareTransactionForSend(requestToPrepare);

    const connectorsSendTxParams: FuelConnectorSendTxParams = {
      onBeforeSend,
      skipCustomFee,
      provider: {
        url: this.provider.url,
        cache: await serializeProviderCache(this.provider),
      },
      transactionState: requestToPrepare.flag.state,
      transactionSummary: await this.prepareTransactionSummary(requestToPrepare),
    };

    return { transactionRequest, connectorsSendTxParams };
  }
}
