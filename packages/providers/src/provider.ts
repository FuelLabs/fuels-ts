import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn, max } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import {
  InputType,
  TransactionType,
  InputMessageCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { checkFuelCoreVersionCompatibility } from '@fuel-ts/versions';
import type { BytesLike } from 'ethers';
import { getBytesCopy, hexlify, Network } from 'ethers';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { clone } from 'ramda';

import { getSdk as getOperationsSdk } from './__generated__/operations';
import type {
  GqlChainInfoFragmentFragment,
  GqlGasCosts,
  GqlGetBlocksQueryVariables,
  GqlPeerInfo,
} from './__generated__/operations';
import type { RetryOptions } from './call-retrier';
import { retrier } from './call-retrier';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { fuelGraphQLSubscriber } from './fuel-graphql-subscriber';
import { MemoryCache } from './memory-cache';
import type { Message, MessageCoin, MessageProof, MessageStatus } from './message';
import type { ExcludeResourcesOption, Resource } from './resource';
import type {
  TransactionRequestLike,
  TransactionRequest,
  TransactionRequestInput,
  CoinTransactionRequestInput,
} from './transaction-request';
import { transactionRequestify, ScriptTransactionRequest } from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response';
import { TransactionResponse } from './transaction-response';
import { processGqlReceipt } from './transaction-summary/receipt';
import {
  calculatePriceWithFactor,
  fromUnixToTai64,
  getGasUsedFromReceipts,
  getReceiptsWithMissingData,
} from './utils';
import { mergeQuantities } from './utils/merge-quantities';

const MAX_RETRIES = 10;

export type CallResult = {
  receipts: TransactionResultReceipt[];
};

/**
 * A Fuel block
 */
export type Block = {
  id: string;
  height: BN;
  time: string;
  transactionIds: string[];
};

/**
 * Deployed Contract bytecode and contract id
 */
export type ContractResult = {
  id: string;
  bytecode: string;
};

type ConsensusParameters = {
  contractMaxSize: BN;
  maxInputs: BN;
  maxOutputs: BN;
  maxWitnesses: BN;
  maxGasPerTx: BN;
  maxScriptLength: BN;
  maxScriptDataLength: BN;
  maxStorageSlots: BN;
  maxPredicateLength: BN;
  maxPredicateDataLength: BN;
  maxGasPerPredicate: BN;
  gasPriceFactor: BN;
  gasPerByte: BN;
  maxMessageDataLength: BN;
  chainId: BN;
  gasCosts: GqlGasCosts;
};

/**
 * Chain information
 */
export type ChainInfo = {
  name: string;
  baseChainHeight: BN;
  consensusParameters: ConsensusParameters;
  gasCosts: GqlGasCosts;
  latestBlock: {
    id: string;
    height: BN;
    time: string;
    transactions: Array<{ id: string }>;
  };
};

/**
 * Node information
 */
export type NodeInfo = {
  utxoValidation: boolean;
  vmBacktrace: boolean;
  minGasPrice: BN;
  maxTx: BN;
  maxDepth: BN;
  nodeVersion: string;
  peers: GqlPeerInfo[];
};

export type NodeInfoAndConsensusParameters = {
  minGasPrice: BN;
  nodeVersion: string;
  gasPerByte: BN;
  gasPriceFactor: BN;
  maxGasPerTx: BN;
};

// #region cost-estimation-1
export type TransactionCost = {
  requiredQuantities: CoinQuantity[];
  receipts: TransactionResultReceipt[];
  minGasPrice: BN;
  gasPrice: BN;
  minGas: BN;
  maxGas: BN;
  gasUsed: BN;
  minFee: BN;
  maxFee: BN;
  usedFee: BN;
};
// #endregion cost-estimation-1

const processGqlChain = (chain: GqlChainInfoFragmentFragment): ChainInfo => {
  const { name, daHeight, consensusParameters, latestBlock } = chain;

  const { contractParams, feeParams, predicateParams, scriptParams, txParams, gasCosts } =
    consensusParameters;

  return {
    name,
    baseChainHeight: bn(daHeight),
    consensusParameters: {
      contractMaxSize: bn(contractParams.contractMaxSize),
      maxInputs: bn(txParams.maxInputs),
      maxOutputs: bn(txParams.maxOutputs),
      maxWitnesses: bn(txParams.maxWitnesses),
      maxGasPerTx: bn(txParams.maxGasPerTx),
      maxScriptLength: bn(scriptParams.maxScriptLength),
      maxScriptDataLength: bn(scriptParams.maxScriptDataLength),
      maxStorageSlots: bn(contractParams.maxStorageSlots),
      maxPredicateLength: bn(predicateParams.maxPredicateLength),
      maxPredicateDataLength: bn(predicateParams.maxPredicateDataLength),
      maxGasPerPredicate: bn(predicateParams.maxGasPerPredicate),
      gasPriceFactor: bn(feeParams.gasPriceFactor),
      gasPerByte: bn(feeParams.gasPerByte),
      maxMessageDataLength: bn(predicateParams.maxMessageDataLength),
      chainId: bn(consensusParameters.chainId),
      gasCosts,
    },
    gasCosts,
    latestBlock: {
      id: latestBlock.id,
      height: bn(latestBlock.header.height),
      time: latestBlock.header.time,
      transactions: latestBlock.transactions.map((i) => ({
        id: i.id,
      })),
    },
  };
};

/**
 * @hidden
 *
 * Cursor pagination arguments
 *
 * https://relay.dev/graphql/connections.htm#sec-Arguments
 */
export type CursorPaginationArgs = {
  /** Forward pagination limit */
  first?: number | null;
  /** Forward pagination cursor */
  after?: string | null;
  /** Backward pagination limit  */
  last?: number | null;
  /** Backward pagination cursor */
  before?: string | null;
};

export type FetchRequestOptions = {
  method: 'POST';
  headers: { [key: string]: string };
  body: string;
};

/*
 * Provider initialization options
 */
export type ProviderOptions = {
  fetch?: (
    url: string,
    options: FetchRequestOptions,
    providerOptions: Omit<ProviderOptions, 'fetch'>
  ) => Promise<Response>;
  timeout?: number;
  cacheUtxo?: number;
  retryOptions?: RetryOptions;
};

/**
 * UTXO Validation Param
 */
export type UTXOValidationParams = {
  utxoValidation?: boolean;
};

/**
 * Transaction estimation Param
 */
export type EstimateTransactionParams = {
  estimateTxDependencies?: boolean;
};

export type EstimatePredicateParams = {
  estimatePredicates?: boolean;
};

export type TransactionCostParams = EstimateTransactionParams & EstimatePredicateParams;

/**
 * Provider Call transaction params
 */
export type ProviderCallParams = UTXOValidationParams & EstimateTransactionParams;

/**
 * Provider Send transaction params
 */
export type ProviderSendTxParams = EstimateTransactionParams;

/**
 * URL - Consensus Params mapping.
 */
type ChainInfoCache = Record<string, ChainInfo>;

/**
 * URL - Node Info mapping.
 */
type NodeInfoCache = Record<string, NodeInfo>;

/**
 * A provider for connecting to a node
 */
export default class Provider {
  operations: ReturnType<typeof getOperationsSdk>;
  cache?: MemoryCache;

  static clearChainAndNodeCaches() {
    Provider.nodeInfoCache = {};
    Provider.chainInfoCache = {};
  }

  private static chainInfoCache: ChainInfoCache = {};
  private static nodeInfoCache: NodeInfoCache = {};

  options: ProviderOptions = {
    timeout: undefined,
    cacheUtxo: undefined,
    fetch: undefined,
    retryOptions: undefined,
  };

  private static getFetchFn(options: ProviderOptions) {
    const fetchFn =
      options.fetch !== undefined
        ? options.fetch
        : (url: string, request: FetchRequestOptions) =>
            fetch(url, {
              ...request,
              signal:
                options.timeout !== undefined ? AbortSignal.timeout(options.timeout) : undefined,
            });

    type FetchParams = Parameters<NonNullable<ProviderOptions['fetch']>>;

    return (...args: FetchParams) => retrier(() => fetchFn(...args), options.retryOptions);
  }

  /**
   * Constructor to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param chainInfo - Chain info of the Fuel node
   * @param options - Additional options for the provider
   * @hidden
   */
  protected constructor(
    /** GraphQL endpoint of the Fuel node */
    public url: string,
    options: ProviderOptions = {}
  ) {
    this.options = { ...this.options, ...options };
    this.url = url;

    this.operations = this.createOperations();
    this.cache = options.cacheUtxo ? new MemoryCache(options.cacheUtxo) : undefined;
  }

  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(url: string, options: ProviderOptions = {}) {
    const provider = new Provider(url, options);
    await provider.fetchChainAndNodeInfo();
    return provider;
  }

  /**
   * Returns the cached chainInfo for the current URL.
   */
  getChain() {
    const chain = Provider.chainInfoCache[this.url];
    if (!chain) {
      throw new FuelError(
        ErrorCode.CHAIN_INFO_CACHE_EMPTY,
        'Chain info cache is empty. Make sure you have called `Provider.create` to initialize the provider.'
      );
    }
    return chain;
  }

  /**
   * Returns the cached nodeInfo for the current URL.
   */
  getNode() {
    const node = Provider.nodeInfoCache[this.url];
    if (!node) {
      throw new FuelError(
        ErrorCode.NODE_INFO_CACHE_EMPTY,
        'Node info cache is empty. Make sure you have called `Provider.create` to initialize the provider.'
      );
    }
    return node;
  }

  /**
   * Returns some helpful parameters related to gas fees.
   */
  getGasConfig() {
    const { minGasPrice } = this.getNode();
    const { maxGasPerTx, maxGasPerPredicate, gasPriceFactor, gasPerByte, gasCosts } =
      this.getChain().consensusParameters;
    return {
      minGasPrice,
      maxGasPerTx,
      maxGasPerPredicate,
      gasPriceFactor,
      gasPerByte,
      gasCosts,
    };
  }

  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   */
  async connect(url: string, options?: ProviderOptions) {
    this.url = url;
    this.options = options ?? this.options;
    this.operations = this.createOperations();
    await this.fetchChainAndNodeInfo();
  }

  /**
   * Fetches both the chain and node information, saves it to the cache, and return it.
   *
   * @returns NodeInfo and Chain
   */
  async fetchChainAndNodeInfo() {
    const chain = await this.fetchChain();
    const nodeInfo = await this.fetchNode();

    Provider.ensureClientVersionIsSupported(nodeInfo);

    return {
      chain,
      nodeInfo,
    };
  }

  private static ensureClientVersionIsSupported(nodeInfo: NodeInfo) {
    const { isMajorSupported, isMinorSupported, supportedVersion } =
      checkFuelCoreVersionCompatibility(nodeInfo.nodeVersion);

    if (!isMajorSupported || !isMinorSupported) {
      throw new FuelError(
        FuelError.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${nodeInfo.nodeVersion}, Supported version: ${supportedVersion}`
      );
    }
  }

  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   */
  private createOperations() {
    const fetchFn = Provider.getFetchFn(this.options);
    const gqlClient = new GraphQLClient(this.url, {
      fetch: (url: string, requestInit: FetchRequestOptions) =>
        fetchFn(url, requestInit, this.options),
    });

    const executeQuery = (query: DocumentNode, vars: Record<string, unknown>) => {
      const opDefinition = query.definitions.find((x) => x.kind === 'OperationDefinition') as {
        operation: string;
      };
      const isSubscription = opDefinition?.operation === 'subscription';

      if (isSubscription) {
        return fuelGraphQLSubscriber({
          url: this.url,
          query,
          fetchFn: (url, requestInit) =>
            fetchFn(url as string, requestInit as FetchRequestOptions, this.options),
          variables: vars,
        });
      }
      return gqlClient.request(query, vars);
    };

    // @ts-expect-error This is due to this function being generic. Its type is specified when calling a specific operation via provider.operations.xyz.
    return getOperationsSdk(executeQuery);
  }

  /**
   * Returns the version of the connected node.
   *
   * @returns A promise that resolves to the version string.
   */
  async getVersion(): Promise<string> {
    const {
      nodeInfo: { nodeVersion },
    } = await this.operations.getVersion();
    return nodeVersion;
  }

  /**
   * @hidden
   *
   * Returns the network configuration of the connected Fuel node.
   *
   * @returns A promise that resolves to the network configuration object
   */
  async getNetwork(): Promise<Network> {
    const {
      name,
      consensusParameters: { chainId },
    } = await this.getChain();
    const network = new Network(name, chainId.toNumber());
    return Promise.resolve(network);
  }

  /**
   * Returns the block number.
   *
   * @returns A promise that resolves to the block number
   */
  async getBlockNumber(): Promise<BN> {
    const { chain } = await this.operations.getChain();
    return bn(chain.latestBlock.header.height, 10);
  }

  /**
   * Returns the chain information.
   * @param url - The URL of the Fuel node
   * @returns NodeInfo object
   */
  async fetchNode(): Promise<NodeInfo> {
    const { nodeInfo } = await this.operations.getNodeInfo();

    const processedNodeInfo: NodeInfo = {
      maxDepth: bn(nodeInfo.maxDepth),
      maxTx: bn(nodeInfo.maxTx),
      minGasPrice: bn(nodeInfo.minGasPrice),
      nodeVersion: nodeInfo.nodeVersion,
      utxoValidation: nodeInfo.utxoValidation,
      vmBacktrace: nodeInfo.vmBacktrace,
      peers: nodeInfo.peers,
    };

    Provider.nodeInfoCache[this.url] = processedNodeInfo;

    return processedNodeInfo;
  }

  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain(): Promise<ChainInfo> {
    const { chain } = await this.operations.getChain();

    const processedChain = processGqlChain(chain);

    Provider.chainInfoCache[this.url] = processedChain;

    return processedChain;
  }

  /**
   * Returns the chain ID
   * @returns A promise that resolves to the chain ID number
   */
  getChainId() {
    const {
      consensusParameters: { chainId },
    } = this.getChain();
    return chainId.toNumber();
  }

  /**
   * @hidden
   */
  #cacheInputs(inputs: TransactionRequestInput[]): void {
    if (!this.cache) {
      return;
    }

    inputs.forEach((input) => {
      if (input.type === InputType.Coin) {
        this.cache?.set(input.id);
      }
    });
  }

  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @returns A promise that resolves to the transaction response object.
   */
  // #region Provider-sendTransaction
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    this.#cacheInputs(transactionRequest.inputs);
    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }
    // #endregion Provider-sendTransaction

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { gasUsed, minGasPrice } = await this.getTransactionCost(transactionRequest, [], {
      estimateTxDependencies: false,
      estimatePredicates: false,
    });

    if (bn(minGasPrice).gt(bn(transactionRequest.gasPrice))) {
      throw new FuelError(
        ErrorCode.GAS_PRICE_TOO_LOW,
        `Gas price '${transactionRequest.gasPrice}' is lower than the required: '${minGasPrice}'.`
      );
    }

    const isScriptTransaction = transactionRequest.type === TransactionType.Script;

    if (isScriptTransaction && bn(gasUsed).gt(bn(transactionRequest.gasLimit))) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas limit '${transactionRequest.gasLimit}' is lower than the required: '${gasUsed}'.`
      );
    }

    const {
      submit: { id: transactionId },
    } = await this.operations.submit({ encodedTransaction });

    const response = new TransactionResponse(transactionId, this);
    return response;
  }

  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param utxoValidation - Additional provider call parameters.
   * @returns A promise that resolves to the call result object.
   */
  async call(
    transactionRequestLike: TransactionRequestLike,
    { utxoValidation, estimateTxDependencies = true }: ProviderCallParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { dryRun: gqlReceipts } = await this.operations.dryRun({
      encodedTransaction,
      utxoValidation: utxoValidation || false,
    });
    const receipts = gqlReceipts.map(processGqlReceipt);
    return {
      receipts,
    };
  }

  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(transactionRequest: TransactionRequest): Promise<TransactionRequest> {
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const response = await this.operations.estimatePredicates({
      encodedTransaction,
    });

    const estimatedTransaction = transactionRequest;
    const [decodedTransaction] = new TransactionCoder().decode(
      getBytesCopy(response.estimatePredicates.rawPayload),
      0
    );

    if (decodedTransaction.inputs) {
      decodedTransaction.inputs.forEach((input, index) => {
        if ('predicate' in input && input.predicateGasUsed.gt(0)) {
          (<CoinTransactionRequestInput>estimatedTransaction.inputs[index]).predicateGasUsed =
            input.predicateGasUsed;
        }
      });
    }

    return estimatedTransaction;
  }

  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @privateRemarks
   * TODO: Investigate support for missing contract IDs
   * TODO: Add support for missing output messages
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise.
   */
  async estimateTxDependencies(transactionRequest: TransactionRequest): Promise<void> {
    let missingOutputVariableCount = 0;
    let missingOutputContractIdsCount = 0;
    let tries = 0;

    if (transactionRequest.type === TransactionType.Create) {
      return;
    }

    let txRequest = transactionRequest;

    if (txRequest.hasPredicateInput()) {
      txRequest = (await this.estimatePredicates(txRequest)) as ScriptTransactionRequest;
    }

    do {
      const { dryRun: gqlReceipts } = await this.operations.dryRun({
        encodedTransaction: hexlify(txRequest.toTransactionBytes()),
        utxoValidation: false,
      });
      const receipts = gqlReceipts.map(processGqlReceipt);
      const { missingOutputVariables, missingOutputContractIds } =
        getReceiptsWithMissingData(receipts);

      missingOutputVariableCount = missingOutputVariables.length;
      missingOutputContractIdsCount = missingOutputContractIds.length;

      if (missingOutputVariableCount === 0 && missingOutputContractIdsCount === 0) {
        return;
      }

      if (txRequest instanceof ScriptTransactionRequest) {
        txRequest.addVariableOutputs(missingOutputVariableCount);

        missingOutputContractIds.forEach(({ contractId }) =>
          txRequest.addContractInputAndOutput(Address.fromString(contractId))
        );
      }

      tries += 1;
    } while (tries < MAX_RETRIES);
  }

  /**
   * Executes a signed transaction without applying the states changes
   * on the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
   *
   * @param transactionRequestLike - The transaction request object.
   * @returns A promise that resolves to the call result object.
   */
  async simulate(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: EstimateTransactionParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { dryRun: gqlReceipts } = await this.operations.dryRun({
      encodedTransaction,
      utxoValidation: true,
    });
    const receipts = gqlReceipts.map(processGqlReceipt);
    return {
      receipts,
    };
  }

  /**
   * Returns a transaction cost to enable user
   * to set gasLimit and also reserve balance amounts
   * on the the transaction.
   *
   * @privateRemarks
   * The tolerance is add on top of the gasUsed calculated
   * from the node, this create a safe margin costs like
   * change states on transfer that don't occur on the dryRun
   * transaction. The default value is 0.2 or 20%
   *
   * @param transactionRequestLike - The transaction request object.
   * @param tolerance - The tolerance to add on top of the gasUsed.
   * @returns A promise that resolves to the transaction cost object.
   */
  async getTransactionCost(
    transactionRequestLike: TransactionRequestLike,
    forwardingQuantities: CoinQuantity[] = [],
    { estimateTxDependencies = true, estimatePredicates = true }: TransactionCostParams = {}
  ): Promise<TransactionCost> {
    const transactionRequest = transactionRequestify(clone(transactionRequestLike));
    const chainInfo = this.getChain();
    const { gasPriceFactor, minGasPrice, maxGasPerTx } = this.getGasConfig();
    const gasPrice = max(transactionRequest.gasPrice, minGasPrice);
    const isScriptTransaction = transactionRequest.type === TransactionType.Script;

    /**
     * Estimate predicates gasUsed
     */
    if (transactionRequest.hasPredicateInput() && estimatePredicates) {
      // Remove gasLimit to avoid gasLimit when estimating predicates
      if (isScriptTransaction) {
        transactionRequest.gasLimit = bn(0);
      }
      await this.estimatePredicates(transactionRequest);
    }

    /**
     * Calculate minGas and maxGas based on the real transaction
     */
    const minGas = transactionRequest.calculateMinGas(chainInfo);
    const maxGas = transactionRequest.calculateMaxGas(chainInfo, minGas);

    /**
     * Fund with fake UTXOs to avoid not enough funds error
     */
    // Getting coin quantities from amounts being transferred
    const coinOutputsQuantities = transactionRequest.getCoinOutputsQuantities();
    // Combining coin quantities from amounts being transferred and forwarding to contracts
    const allQuantities = mergeQuantities(coinOutputsQuantities, forwardingQuantities);
    // Funding transaction with fake utxos
    transactionRequest.fundWithFakeUtxos(allQuantities);

    /**
     * Estimate gasUsed for script transactions
     */

    let gasUsed = minGas;
    let receipts: TransactionResultReceipt[] = [];
    // Transactions of type Create does not consume any gas so we can the dryRun
    if (isScriptTransaction) {
      /**
       * Setting the gasPrice to 0 on a dryRun will result in no fees being charged.
       * This simplifies the funding with fake utxos, since the coin quantities required
       * will only be amounts being transferred (coin outputs) and amounts being forwarded
       * to contract calls.
       */
      // Calculate the gasLimit again as we insert a fake UTXO and signer

      transactionRequest.gasPrice = bn(0);
      transactionRequest.gasLimit = bn(maxGasPerTx.sub(maxGas).toNumber() * 0.9);
      // Executing dryRun with fake utxos to get gasUsed
      const result = await this.call(transactionRequest, {
        estimateTxDependencies,
      });
      receipts = result.receipts;
      gasUsed = getGasUsedFromReceipts(receipts);
    } else {
      // For CreateTransaction the gasUsed is going to be the minGas
      gasUsed = minGas;
    }

    const usedFee = calculatePriceWithFactor(
      gasUsed,
      gasPrice,
      gasPriceFactor
    ).normalizeZeroToOne();
    const minFee = calculatePriceWithFactor(minGas, gasPrice, gasPriceFactor).normalizeZeroToOne();
    const maxFee = calculatePriceWithFactor(maxGas, gasPrice, gasPriceFactor).normalizeZeroToOne();

    return {
      requiredQuantities: allQuantities,
      receipts,
      gasUsed,
      minGasPrice,
      gasPrice,
      minGas,
      maxGas,
      usedFee,
      minFee,
      maxFee,
    };
  }

  async getResourcesForTransaction(
    owner: AbstractAddress,
    transactionRequestLike: TransactionRequestLike,
    forwardingQuantities: CoinQuantity[] = []
  ) {
    const transactionRequest = transactionRequestify(clone(transactionRequestLike));
    const transactionCost = await this.getTransactionCost(transactionRequest, forwardingQuantities);

    // Add the required resources to the transaction from the owner
    transactionRequest.addResources(
      await this.getResourcesToSpend(owner, transactionCost.requiredQuantities)
    );
    // Refetch transaction costs with the new resources
    // TODO: we could find a way to avoid fetch estimatePredicates again, by returning the transaction or
    // returning a specific gasUsed by the predicate.
    // Also for the dryRun we could have the same issue as we are going to run twice the dryRun and the
    // estimateTxDependencies as we don't have access to the transaction, maybe returning the transaction would
    // be better.
    const { requiredQuantities, ...txCost } = await this.getTransactionCost(
      transactionRequest,
      forwardingQuantities
    );
    const resources = await this.getResourcesToSpend(owner, requiredQuantities);

    return {
      resources,
      requiredQuantities,
      ...txCost,
    };
  }

  /**
   * Returns coins for the given owner.
   */
  async getCoins(
    /** The address to get coins for */
    owner: AbstractAddress,
    /** The asset ID of coins to get */
    assetId?: BytesLike,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<Coin[]> {
    const result = await this.operations.getCoins({
      first: 10,
      ...paginationArgs,
      filter: { owner: owner.toB256(), assetId: assetId && hexlify(assetId) },
    });

    const coins = result.coins.edges.map((edge) => edge.node);

    return coins.map((coin) => ({
      id: coin.utxoId,
      assetId: coin.assetId,
      amount: bn(coin.amount),
      owner: Address.fromAddressOrString(coin.owner),
      maturity: bn(coin.maturity).toNumber(),
      blockCreated: bn(coin.blockCreated),
      txCreatedIdx: bn(coin.txCreatedIdx),
    }));
  }

  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The quantities to get.
   * @param excludedIds - IDs of excluded resources from the selection.
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(
    /** The address to get coins for */
    owner: AbstractAddress,
    /** The quantities to get */
    quantities: CoinQuantityLike[],
    /** IDs of excluded resources from the selection. */
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const excludeInput = {
      messages: excludedIds?.messages?.map((id) => hexlify(id)) || [],
      utxos: excludedIds?.utxos?.map((id) => hexlify(id)) || [],
    };

    if (this.cache) {
      const uniqueUtxos = new Set(
        excludeInput.utxos.concat(this.cache?.getActiveData().map((id) => hexlify(id)))
      );
      excludeInput.utxos = Array.from(uniqueUtxos);
    }
    const coinsQuery = {
      owner: owner.toB256(),
      queryPerAsset: quantities
        .map(coinQuantityfy)
        .map(({ assetId, amount, max: maxPerAsset }) => ({
          assetId: hexlify(assetId),
          amount: amount.toString(10),
          max: maxPerAsset ? maxPerAsset.toString(10) : undefined,
        })),
      excludedIds: excludeInput,
    };

    const result = await this.operations.getCoinsToSpend(coinsQuery);

    const coins = result.coinsToSpend
      .flat()
      .map((coin) => {
        switch (coin.__typename) {
          case 'MessageCoin':
            return {
              amount: bn(coin.amount),
              assetId: coin.assetId,
              daHeight: bn(coin.daHeight),
              sender: Address.fromAddressOrString(coin.sender),
              recipient: Address.fromAddressOrString(coin.recipient),
              nonce: coin.nonce,
            } as MessageCoin;
          case 'Coin':
            return {
              id: coin.utxoId,
              amount: bn(coin.amount),
              assetId: coin.assetId,
              owner: Address.fromAddressOrString(coin.owner),
              maturity: bn(coin.maturity).toNumber(),
              blockCreated: bn(coin.blockCreated),
              txCreatedIdx: bn(coin.txCreatedIdx),
            } as Coin;
          default:
            return null;
        }
      })
      .filter((v) => !!v) as Array<Resource>;

    return coins;
  }

  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlock(
    /** ID or height of the block */
    idOrHeight: string | number | 'latest'
  ): Promise<Block | null> {
    let variables;
    if (typeof idOrHeight === 'number') {
      variables = { height: bn(idOrHeight).toString(10) };
    } else if (idOrHeight === 'latest') {
      variables = { height: (await this.getBlockNumber()).toString(10) };
    } else if (idOrHeight.length === 66) {
      variables = { blockId: idOrHeight };
    } else {
      variables = { blockId: bn(idOrHeight).toString(10) };
    }

    const { block } = await this.operations.getBlock(variables);

    if (!block) {
      return null;
    }

    return {
      id: block.id,
      height: bn(block.header.height),
      time: block.header.time,
      transactionIds: block.transactions.map((tx) => tx.id),
    };
  }

  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(params: GqlGetBlocksQueryVariables): Promise<Block[]> {
    const { blocks: fetchedData } = await this.operations.getBlocks(params);

    const blocks: Block[] = fetchedData.edges.map(({ node: block }) => ({
      id: block.id,
      height: bn(block.header.height),
      time: block.header.time,
      transactionIds: block.transactions.map((tx) => tx.id),
    }));

    return blocks;
  }

  /**
   * Returns block matching the given ID or type, including transaction data.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block.
   */
  async getBlockWithTransactions(
    /** ID or height of the block */
    idOrHeight: string | number | 'latest'
  ): Promise<(Block & { transactions: Transaction[] }) | null> {
    let variables;
    if (typeof idOrHeight === 'number') {
      variables = { blockHeight: bn(idOrHeight).toString(10) };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: (await this.getBlockNumber()).toString() };
    } else {
      variables = { blockId: idOrHeight };
    }

    const { block } = await this.operations.getBlockWithTransactions(variables);

    if (!block) {
      return null;
    }

    return {
      id: block.id,
      height: bn(block.header.height, 10),
      time: block.header.time,
      transactionIds: block.transactions.map((tx) => tx.id),
      transactions: block.transactions.map(
        (tx) => new TransactionCoder().decode(getBytesCopy(tx.rawPayload), 0)?.[0]
      ),
    };
  }

  /**
   * Get transaction with the given ID.
   *
   * @param transactionId - ID of the transaction.
   * @returns A promise that resolves to the transaction.
   */
  async getTransaction<TTransactionType = void>(
    transactionId: string
  ): Promise<Transaction<TTransactionType> | null> {
    const { transaction } = await this.operations.getTransaction({ transactionId });
    if (!transaction) {
      return null;
    }
    return new TransactionCoder().decode(
      getBytesCopy(transaction.rawPayload),
      0
    )?.[0] as Transaction<TTransactionType>;
  }

  /**
   * Get deployed contract with the given ID.
   *
   * @param contractId - ID of the contract.
   * @returns A promise that resolves to the contract.
   */
  async getContract(contractId: string): Promise<ContractResult | null> {
    const { contract } = await this.operations.getContract({ contractId });
    if (!contract) {
      return null;
    }
    return contract;
  }

  /**
   * Returns the balance for the given contract for the given asset ID.
   *
   * @param contractId - The contract ID to get the balance for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getContractBalance(
    /** The contract ID to get the balance for */
    contractId: AbstractAddress,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const { contractBalance } = await this.operations.getContractBalance({
      contract: contractId.toB256(),
      asset: hexlify(assetId),
    });
    return bn(contractBalance.amount, 10);
  }

  /**
   * Returns the balance for the given owner for the given asset ID.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get.
   * @returns A promise that resolves to the balance.
   */
  async getBalance(
    /** The address to get coins for */
    owner: AbstractAddress,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const { balance } = await this.operations.getBalance({
      owner: owner.toB256(),
      assetId: hexlify(assetId),
    });
    return bn(balance.amount, 10);
  }

  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the balances.
   */
  async getBalances(
    /** The address to get coins for */
    owner: AbstractAddress,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<CoinQuantity[]> {
    const result = await this.operations.getBalances({
      first: 10,
      ...paginationArgs,
      filter: { owner: owner.toB256() },
    });

    const balances = result.balances.edges.map((edge) => edge.node);

    return balances.map((balance) => ({
      assetId: balance.assetId,
      amount: bn(balance.amount),
    }));
  }

  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments.
   * @returns A promise that resolves to the messages.
   */
  async getMessages(
    /** The address to get message from */
    address: AbstractAddress,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<Message[]> {
    const result = await this.operations.getMessages({
      first: 10,
      ...paginationArgs,
      owner: address.toB256(),
    });

    const messages = result.messages.edges.map((edge) => edge.node);

    return messages.map((message) => ({
      messageId: InputMessageCoder.getMessageId({
        sender: message.sender,
        recipient: message.recipient,
        nonce: message.nonce,
        amount: bn(message.amount),
        data: message.data,
      }),
      sender: Address.fromAddressOrString(message.sender),
      recipient: Address.fromAddressOrString(message.recipient),
      nonce: message.nonce,
      amount: bn(message.amount),
      data: InputMessageCoder.decodeData(message.data),
      daHeight: bn(message.daHeight),
    }));
  }

  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id.
   * @param commitBlockHeight - The commit block height.
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(
    /** The transaction to get message from */
    transactionId: string,
    nonce: string,
    commitBlockId?: string,
    commitBlockHeight?: BN
  ): Promise<MessageProof | null> {
    let inputObject: {
      /** The transaction to get message from */
      transactionId: string;
      /** The message id from MessageOut receipt */
      nonce: string;
      commitBlockId?: string;
      commitBlockHeight?: string;
    } = {
      transactionId,
      nonce,
    };

    if (commitBlockId && commitBlockHeight) {
      throw new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'commitBlockId and commitBlockHeight cannot be used together'
      );
    }

    if (commitBlockId) {
      inputObject = {
        ...inputObject,
        commitBlockId,
      };
    }

    if (commitBlockHeight) {
      inputObject = {
        ...inputObject,
        // Conver BN into a number string required on the query
        // This should problably be fixed on the fuel client side
        commitBlockHeight: commitBlockHeight.toNumber().toString(),
      };
    }

    const result = await this.operations.getMessageProof(inputObject);

    if (!result.messageProof) {
      return null;
    }

    const {
      messageProof,
      messageBlockHeader,
      commitBlockHeader,
      blockProof,
      sender,
      recipient,
      amount,
      data,
    } = result.messageProof;

    return {
      messageProof: {
        proofIndex: bn(messageProof.proofIndex),
        proofSet: messageProof.proofSet,
      },
      blockProof: {
        proofIndex: bn(blockProof.proofIndex),
        proofSet: blockProof.proofSet,
      },
      messageBlockHeader: {
        id: messageBlockHeader.id,
        daHeight: bn(messageBlockHeader.daHeight),
        transactionsCount: bn(messageBlockHeader.transactionsCount),
        transactionsRoot: messageBlockHeader.transactionsRoot,
        height: bn(messageBlockHeader.height),
        prevRoot: messageBlockHeader.prevRoot,
        time: messageBlockHeader.time,
        applicationHash: messageBlockHeader.applicationHash,
        messageReceiptRoot: messageBlockHeader.messageReceiptRoot,
        messageReceiptCount: bn(messageBlockHeader.messageReceiptCount),
      },
      commitBlockHeader: {
        id: commitBlockHeader.id,
        daHeight: bn(commitBlockHeader.daHeight),
        transactionsCount: bn(commitBlockHeader.transactionsCount),
        transactionsRoot: commitBlockHeader.transactionsRoot,
        height: bn(commitBlockHeader.height),
        prevRoot: commitBlockHeader.prevRoot,
        time: commitBlockHeader.time,
        applicationHash: commitBlockHeader.applicationHash,
        messageReceiptRoot: commitBlockHeader.messageReceiptRoot,
        messageReceiptCount: bn(commitBlockHeader.messageReceiptCount),
      },
      sender: Address.fromAddressOrString(sender),
      recipient: Address.fromAddressOrString(recipient),
      nonce,
      amount: bn(amount),
      data,
    };
  }

  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param nonce - The nonce of the message to get status from.
   * @returns A promise that resolves to the message status
   */
  async getMessageStatus(
    /** The nonce of the message to get status from */
    nonce: string
  ): Promise<MessageStatus> {
    const result = await this.operations.getMessageStatus({ nonce });
    return result.messageStatus;
  }

  /**
   * Lets you produce blocks with custom timestamps and the block number of the last block produced.
   *
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(amount: number, startTime?: number) {
    const { produceBlocks: latestBlockHeight } = await this.operations.produceBlocks({
      blocksToProduce: bn(amount).toString(10),
      startTimestamp: startTime ? fromUnixToTai64(startTime) : undefined,
    });
    return bn(latestBlockHeight);
  }
}
