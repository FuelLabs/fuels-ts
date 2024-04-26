import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAccount, AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import { BN, bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import {
  InputType,
  TransactionType,
  InputMessageCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { arrayify, hexlify, DateTime } from '@fuel-ts/utils';
import { checkFuelCoreVersionCompatibility } from '@fuel-ts/versions';
import { equalBytes } from '@noble/curves/abstract/utils';
import { Network } from 'ethers';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import { clone } from 'ramda';

import type { Predicate } from '../predicate';

import { getSdk as getOperationsSdk } from './__generated__/operations';
import type {
  GqlChainInfoFragmentFragment,
  GqlDryRunFailureStatusFragmentFragment,
  GqlDryRunSuccessStatusFragmentFragment,
  GqlGasCosts,
  GqlGetBlocksQueryVariables,
} from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { FuelGraphqlSubscriber } from './fuel-graphql-subscriber';
import { MemoryCache } from './memory-cache';
import type { Message, MessageCoin, MessageProof, MessageStatus } from './message';
import type { ExcludeResourcesOption, Resource } from './resource';
import type {
  TransactionRequestLike,
  TransactionRequest,
  TransactionRequestInput,
  CoinTransactionRequestInput,
  ScriptTransactionRequest,
  JsonAbisFromAllCalls,
} from './transaction-request';
import { transactionRequestify } from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response';
import { TransactionResponse } from './transaction-response';
import { processGqlReceipt } from './transaction-summary/receipt';
import { calculateGasFee, getGasUsedFromReceipts, getReceiptsWithMissingData } from './utils';
import type { RetryOptions } from './utils/auto-retry-fetch';
import { autoRetryFetch } from './utils/auto-retry-fetch';
import { mergeQuantities } from './utils/merge-quantities';

const MAX_RETRIES = 10;

export type DryRunStatus =
  | Omit<GqlDryRunFailureStatusFragmentFragment, '__typename'>
  | Omit<GqlDryRunSuccessStatusFragmentFragment, '__typename'>;

export type CallResult = {
  receipts: TransactionResultReceipt[];
  dryrunStatus?: DryRunStatus;
};

export type EstimateTxDependenciesReturns = CallResult & {
  outputVariables: number;
  missingContractIds: string[];
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
  baseAssetId: string;
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
  maxTx: BN;
  maxDepth: BN;
  nodeVersion: string;
};

export type NodeInfoAndConsensusParameters = {
  nodeVersion: string;
  gasPerByte: BN;
  gasPriceFactor: BN;
  maxGasPerTx: BN;
};

// #region cost-estimation-1
export type TransactionCost = {
  gasPrice: BN;
  gasUsed: BN;
  minGas: BN;
  minFee: BN;
  maxFee: BN;
  maxGas: BN;
  receipts: TransactionResultReceipt[];
  outputVariables: number;
  missingContractIds: string[];
  estimatedPredicates: TransactionRequestInput[];
  requiredQuantities: CoinQuantity[];
  addedSignatures: number;
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
      baseAssetId: consensusParameters.baseAssetId,
      gasCosts,
    },
    gasCosts,
    latestBlock: {
      id: latestBlock.id,
      height: bn(latestBlock.height),
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

/*
 * Provider initialization options
 */
export type ProviderOptions = {
  /**
   * Custom fetch function to use for making requests.
   */
  fetch?: (
    url: string,
    requestInit?: RequestInit,
    providerOptions?: Omit<ProviderOptions, 'fetch'>
  ) => Promise<Response>;
  /**
   * Timeout [ms] after which every request will be aborted.
   */
  timeout?: number;
  /**
   * Cache UTXOs for the given time [ms].
   */
  cacheUtxo?: number;
  /**
   * Retry options to use when fetching data from the node.
   */
  retryOptions?: RetryOptions;
  /**
   * Middleware to modify the request before it is sent.
   * This can be used to add headers, modify the body, etc.
   */
  requestMiddleware?: (request: RequestInit) => RequestInit | Promise<RequestInit>;
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

export type TransactionCostParams = EstimateTransactionParams & {
  resourcesOwner?: AbstractAccount;
  quantitiesToContract?: CoinQuantity[];
  signatureCallback?: (request: ScriptTransactionRequest) => Promise<ScriptTransactionRequest>;
};

/**
 * Provider Call transaction params
 */
export type ProviderCallParams = UTXOValidationParams & EstimateTransactionParams;

/**
 * Provider Send transaction params
 */
export type ProviderSendTxParams = EstimateTransactionParams & {
  /**
   * By default, the promise will resolve immediately after the transaction is submitted.
   *
   * If set to true, the promise will resolve only when the transaction changes status
   * from `SubmittedStatus` to one of `SuccessStatus`, `FailureStatus` or `SqueezedOutStatus`.
   *
   */
  awaitExecution?: boolean;
};

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

  private static getFetchFn(options: ProviderOptions): NonNullable<ProviderOptions['fetch']> {
    const { retryOptions, timeout } = options;

    return autoRetryFetch(async (...args) => {
      const url = args[0];
      const request = args[1];
      const signal = timeout ? AbortSignal.timeout(timeout) : undefined;

      let fullRequest: RequestInit = { ...request, signal };

      if (options.requestMiddleware) {
        fullRequest = await options.requestMiddleware(fullRequest);
      }

      return options.fetch ? options.fetch(url, fullRequest, options) : fetch(url, fullRequest);
    }, retryOptions);
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
    const { maxGasPerTx, maxGasPerPredicate, gasPriceFactor, gasPerByte, gasCosts } =
      this.getChain().consensusParameters;
    return {
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
      fetch: (url: string, requestInit: RequestInit) => fetchFn(url, requestInit, this.options),
    });

    const executeQuery = (query: DocumentNode, vars: Record<string, unknown>) => {
      const opDefinition = query.definitions.find((x) => x.kind === 'OperationDefinition') as {
        operation: string;
      };
      const isSubscription = opDefinition?.operation === 'subscription';

      if (isSubscription) {
        return new FuelGraphqlSubscriber({
          url: this.url,
          query,
          fetchFn: (url, requestInit) => fetchFn(url as string, requestInit, this.options),
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
    return bn(chain.latestBlock.height, 10);
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
      nodeVersion: nodeInfo.nodeVersion,
      utxoValidation: nodeInfo.utxoValidation,
      vmBacktrace: nodeInfo.vmBacktrace,
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
   * Returns the base asset ID for the current provider network
   *
   * @returns the base asset ID
   */
  getBaseAssetId() {
    const {
      consensusParameters: { baseAssetId },
    } = this.getChain();
    return baseAssetId;
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
    { estimateTxDependencies = true, awaitExecution = false }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    this.#cacheInputs(transactionRequest.inputs);
    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }
    // #endregion Provider-sendTransaction

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());

    let abis: JsonAbisFromAllCalls | undefined;

    if (transactionRequest.type === TransactionType.Script) {
      abis = transactionRequest.abis;
    }

    if (awaitExecution) {
      const subscription = this.operations.submitAndAwait({ encodedTransaction });
      for await (const { submitAndAwait } of subscription) {
        if (submitAndAwait.type === 'SqueezedOutStatus') {
          throw new FuelError(
            ErrorCode.TRANSACTION_SQUEEZED_OUT,
            `Transaction Squeezed Out with reason: ${submitAndAwait.reason}`
          );
        }

        if (submitAndAwait.type !== 'SubmittedStatus') {
          break;
        }
      }

      const transactionId = transactionRequest.getTransactionId(this.getChainId());
      const response = new TransactionResponse(transactionId, this, abis);
      await response.fetch();
      return response;
    }

    const {
      submit: { id: transactionId },
    } = await this.operations.submit({ encodedTransaction });

    return new TransactionResponse(transactionId, this, abis);
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
      return this.estimateTxDependencies(transactionRequest);
    }
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { dryRun: dryRunStatuses } = await this.operations.dryRun({
      encodedTransactions: encodedTransaction,
      utxoValidation: utxoValidation || false,
    });
    const [{ receipts: rawReceipts, status }] = dryRunStatuses;
    const receipts = rawReceipts.map(processGqlReceipt);

    return { receipts, dryrunStatus: status };
  }

  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates(transactionRequest: TransactionRequest): Promise<TransactionRequest> {
    const shouldEstimatePredicates = Boolean(
      transactionRequest.inputs.find(
        (input) =>
          'predicate' in input &&
          input.predicate &&
          !equalBytes(arrayify(input.predicate), arrayify('0x')) &&
          new BN(input.predicateGasUsed).isZero()
      )
    );
    if (!shouldEstimatePredicates) {
      return transactionRequest;
    }
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const response = await this.operations.estimatePredicates({
      encodedTransaction,
    });

    const {
      estimatePredicates: { inputs },
    } = response;

    if (inputs) {
      inputs.forEach((input, index) => {
        if ('predicateGasUsed' in input && bn(input.predicateGasUsed).gt(0)) {
          // eslint-disable-next-line no-param-reassign
          (<CoinTransactionRequestInput>transactionRequest.inputs[index]).predicateGasUsed =
            input.predicateGasUsed;
        }
      });
    }

    return transactionRequest;
  }

  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise.
   */
  async estimateTxDependencies(
    transactionRequest: TransactionRequest
  ): Promise<EstimateTxDependenciesReturns> {
    if (transactionRequest.type === TransactionType.Create) {
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: [],
      };
    }

    let receipts: TransactionResultReceipt[] = [];
    const missingContractIds: string[] = [];
    let outputVariables = 0;
    let dryrunStatus: DryRunStatus | undefined;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const {
        dryRun: [{ receipts: rawReceipts, status }],
      } = await this.operations.dryRun({
        encodedTransactions: [hexlify(transactionRequest.toTransactionBytes())],
        utxoValidation: false,
      });

      receipts = rawReceipts.map(processGqlReceipt);
      dryrunStatus = status;

      const { missingOutputVariables, missingOutputContractIds } =
        getReceiptsWithMissingData(receipts);

      const hasMissingOutputs =
        missingOutputVariables.length !== 0 || missingOutputContractIds.length !== 0;

      if (hasMissingOutputs) {
        outputVariables += missingOutputVariables.length;
        transactionRequest.addVariableOutputs(missingOutputVariables.length);
        missingOutputContractIds.forEach(({ contractId }) => {
          transactionRequest.addContractInputAndOutput(Address.fromString(contractId));
          missingContractIds.push(contractId);
        });

        const { maxFee } = await this.estimateTxGasAndFee({
          transactionRequest,
        });

        // eslint-disable-next-line no-param-reassign
        transactionRequest.maxFee = maxFee;
      } else {
        break;
      }
    }

    return {
      receipts,
      outputVariables,
      missingContractIds,
      dryrunStatus,
    };
  }

  /**
   * Dry runs multiple transactions and checks for missing dependencies in batches.
   *
   * Transactions are dry run in batches. After each dry run, transactions requiring
   * further modifications are identified. The method iteratively updates these transactions
   * and performs subsequent dry runs until all dependencies for each transaction are satisfied.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @returns A promise that resolves to an array of results for each transaction.
   */
  async estimateMultipleTxDependencies(
    transactionRequests: TransactionRequest[]
  ): Promise<EstimateTxDependenciesReturns[]> {
    const results: EstimateTxDependenciesReturns[] = transactionRequests.map(() => ({
      receipts: [],
      outputVariables: 0,
      missingContractIds: [],
      dryrunStatus: undefined,
    }));

    const allRequests = clone(transactionRequests);

    // Map of original request index to its serialized transaction (for ScriptTransactionRequest only)
    const serializedTransactionsMap = new Map();

    // Prepare ScriptTransactionRequests and their indices
    allRequests.forEach((req, index) => {
      if (req.type === TransactionType.Script) {
        serializedTransactionsMap.set(index, hexlify(req.toTransactionBytes()));
      }
    });

    // Indices of ScriptTransactionRequests
    let transactionsToProcess = Array.from(serializedTransactionsMap.keys());
    let attempt = 0;

    while (transactionsToProcess.length > 0 && attempt < MAX_RETRIES) {
      const encodedTransactions = transactionsToProcess.map((index) =>
        serializedTransactionsMap.get(index)
      );
      const dryRunResults = await this.operations.dryRun({
        encodedTransactions,
        utxoValidation: false,
      });

      const nextRoundTransactions = [];

      for (let i = 0; i < dryRunResults.dryRun.length; i++) {
        const requestIdx = transactionsToProcess[i];
        const { receipts: rawReceipts, status } = dryRunResults.dryRun[i];
        const result = results[requestIdx];
        result.receipts = rawReceipts.map(processGqlReceipt);
        result.dryrunStatus = status;
        const { missingOutputVariables, missingOutputContractIds } = getReceiptsWithMissingData(
          result.receipts
        );
        const hasMissingOutputs =
          missingOutputVariables.length > 0 || missingOutputContractIds.length > 0;
        const request = allRequests[requestIdx];
        if (hasMissingOutputs && request?.type === TransactionType.Script) {
          result.outputVariables += missingOutputVariables.length;
          request.addVariableOutputs(missingOutputVariables.length);
          missingOutputContractIds.forEach(({ contractId }) => {
            request.addContractInputAndOutput(Address.fromString(contractId));
            result.missingContractIds.push(contractId);
          });
          const { maxFee } = await this.estimateTxGasAndFee({
            transactionRequest: request,
          });
          request.maxFee = maxFee;
          // Prepare for the next round of dry run
          serializedTransactionsMap.set(requestIdx, hexlify(request.toTransactionBytes()));
          nextRoundTransactions.push(requestIdx);
        }
      }

      transactionsToProcess = nextRoundTransactions;
      attempt += 1;
    }

    return results;
  }

  async dryRunMultipleTransactions(
    transactionRequests: TransactionRequest[],
    { utxoValidation, estimateTxDependencies = true }: ProviderCallParams = {}
  ): Promise<CallResult[]> {
    if (estimateTxDependencies) {
      return this.estimateMultipleTxDependencies(transactionRequests);
    }
    const encodedTransactions = transactionRequests.map((tx) => hexlify(tx.toTransactionBytes()));
    const { dryRun: dryRunStatuses } = await this.operations.dryRun({
      encodedTransactions,
      utxoValidation: utxoValidation || false,
    });

    const results = dryRunStatuses.map(({ receipts: rawReceipts, status }) => {
      const receipts = rawReceipts.map(processGqlReceipt);
      return { receipts, dryrunStatus: status };
    });

    return results;
  }

  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param transactionRequest - The transaction request object.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(params: { transactionRequest: TransactionRequest; gasPrice?: BN }) {
    const { transactionRequest } = params;
    let { gasPrice } = params;

    const chainInfo = this.getChain();
    const { gasPriceFactor, maxGasPerTx } = this.getGasConfig();

    const minGas = transactionRequest.calculateMinGas(chainInfo);
    if (!gasPrice) {
      gasPrice = await this.estimateGasPrice(10);
    }

    const minFee = calculateGasFee({
      gasPrice: bn(gasPrice),
      gas: minGas,
      priceFactor: gasPriceFactor,
      tip: transactionRequest.tip,
    }).add(1);

    let gasLimit = bn(0);

    // Only Script transactions consume gas
    if (transactionRequest.type === TransactionType.Script) {
      // If the gasLimit is set to 0, it means we need to estimate it.
      gasLimit = transactionRequest.gasLimit;
      if (transactionRequest.gasLimit.eq(0)) {
        transactionRequest.gasLimit = minGas;

        /*
         * Adjusting the gasLimit of a transaction (TX) impacts its maxGas.
         * Consequently, this affects the maxFee, as it is derived from the maxGas. To accurately estimate the
         * gasLimit for a transaction, especially when the exact gas consumption is uncertain (as in an estimation dry-run),
         * the following steps are required:
         * 1 - Initially, set the gasLimit using the calculated minGas.
         * 2 - Based on this initial gasLimit, calculate the maxGas.
         * 3 - Get the maximum gas per transaction allowed by the chain, and subtract the previously calculated maxGas from this limit.
         * 4 - The result of this subtraction should then be adopted as the new, definitive gasLimit.
         * 5 - Recalculate the maxGas with the updated gasLimit. This new maxGas is then used to compute the maxFee.
         * 6 - The calculated maxFee represents the safe, estimated cost required to fund the transaction.
         */
        transactionRequest.gasLimit = maxGasPerTx.sub(
          transactionRequest.calculateMaxGas(chainInfo, minGas)
        );

        gasLimit = transactionRequest.gasLimit;
      }
    }
    const maxGas = transactionRequest.calculateMaxGas(chainInfo, minGas);
    const maxFee = calculateGasFee({
      gasPrice: bn(gasPrice),
      gas: maxGas,
      priceFactor: gasPriceFactor,
      tip: transactionRequest.tip,
    }).add(1);

    return {
      minGas,
      minFee,
      maxGas,
      maxFee,
      gasPrice,
      gasLimit,
    };
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
      return this.estimateTxDependencies(transactionRequest);
    }
    const encodedTransactions = [hexlify(transactionRequest.toTransactionBytes())];

    const { dryRun: dryRunStatuses } = await this.operations.dryRun({
      encodedTransactions,
      utxoValidation: true,
    });

    const callResult = dryRunStatuses.map((dryRunStatus) => {
      const { id, receipts, status } = dryRunStatus;

      const processedReceipts = receipts.map(processGqlReceipt);

      return { id, receipts: processedReceipts, status };
    });

    return { receipts: callResult[0].receipts };
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
    { resourcesOwner, signatureCallback, quantitiesToContract = [] }: TransactionCostParams = {}
  ): Promise<TransactionCost> {
    const txRequestClone = clone(transactionRequestify(transactionRequestLike));
    const isScriptTransaction = txRequestClone.type === TransactionType.Script;
    const baseAssetId = this.getBaseAssetId();

    // Fund with fake UTXOs to avoid not enough funds error
    // Getting coin quantities from amounts being transferred
    const coinOutputsQuantities = txRequestClone.getCoinOutputsQuantities();
    // Combining coin quantities from amounts being transferred and forwarding to contracts
    const allQuantities = mergeQuantities(coinOutputsQuantities, quantitiesToContract);
    // Funding transaction with fake utxos
    txRequestClone.fundWithFakeUtxos(allQuantities, baseAssetId, resourcesOwner?.address);

    /**
     * Estimate predicates gasUsed
     */
    // Remove gasLimit to avoid gasLimit when estimating predicates
    txRequestClone.maxFee = bn(0);
    if (isScriptTransaction) {
      txRequestClone.gasLimit = bn(0);
    }

    /**
     * The fake utxos added above can be from a predicate
     * If the resources owner is a predicate,
     * we need to populate the resources with the predicate's data
     * so that predicate estimation can happen.
     */
    if (resourcesOwner && 'populateTransactionPredicateData' in resourcesOwner) {
      (resourcesOwner as Predicate<[]>).populateTransactionPredicateData(txRequestClone);
    }

    const signedRequest = clone(txRequestClone) as ScriptTransactionRequest;

    let addedSignatures = 0;
    if (signatureCallback && isScriptTransaction) {
      const lengthBefore = signedRequest.witnesses.length;
      await signatureCallback(signedRequest);
      addedSignatures = signedRequest.witnesses.length - lengthBefore;
    }

    await this.estimatePredicates(signedRequest);

    /**
     * Calculate minGas and maxGas based on the real transaction
     */
    // eslint-disable-next-line prefer-const
    let { maxFee, maxGas, minFee, minGas, gasPrice, gasLimit } = await this.estimateTxGasAndFee({
      transactionRequest: signedRequest,
    });

    let receipts: TransactionResultReceipt[] = [];
    let missingContractIds: string[] = [];
    let outputVariables = 0;
    let gasUsed = bn(0);

    txRequestClone.updatePredicateGasUsed(signedRequest.inputs);

    txRequestClone.maxFee = maxFee;
    if (isScriptTransaction) {
      txRequestClone.gasLimit = gasLimit;
      if (signatureCallback) {
        await signatureCallback(txRequestClone);
      }

      const result = await this.estimateTxDependencies(txRequestClone);
      receipts = result.receipts;
      outputVariables = result.outputVariables;
      missingContractIds = result.missingContractIds;
      gasUsed = isScriptTransaction ? getGasUsedFromReceipts(receipts) : gasUsed;

      txRequestClone.gasLimit = gasUsed;

      ({ maxFee, maxGas, minFee, minGas, gasPrice } = await this.estimateTxGasAndFee({
        transactionRequest: txRequestClone,
        gasPrice,
      }));
    }

    return {
      requiredQuantities: allQuantities,
      receipts,
      gasUsed,
      gasPrice,
      minGas,
      maxGas,
      minFee,
      maxFee,
      outputVariables,
      missingContractIds,
      addedSignatures,
      estimatedPredicates: txRequestClone.inputs,
    };
  }

  async getResourcesForTransaction(
    owner: string | AbstractAddress,
    transactionRequestLike: TransactionRequestLike,
    quantitiesToContract: CoinQuantity[] = []
  ) {
    const ownerAddress = Address.fromAddressOrString(owner);
    const transactionRequest = transactionRequestify(clone(transactionRequestLike));
    const transactionCost = await this.getTransactionCost(transactionRequest, {
      quantitiesToContract,
    });

    // Add the required resources to the transaction from the owner
    transactionRequest.addResources(
      await this.getResourcesToSpend(ownerAddress, transactionCost.requiredQuantities)
    );
    // Refetch transaction costs with the new resources
    // TODO: we could find a way to avoid fetch estimatePredicates again, by returning the transaction or
    // returning a specific gasUsed by the predicate.
    // Also for the dryRun we could have the same issue as we are going to run twice the dryRun and the
    // estimateTxDependencies as we don't have access to the transaction, maybe returning the transaction would
    // be better.
    const { requiredQuantities, ...txCost } = await this.getTransactionCost(transactionRequest, {
      quantitiesToContract,
    });
    const resources = await this.getResourcesToSpend(ownerAddress, requiredQuantities);

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
    owner: string | AbstractAddress,
    /** The asset ID of coins to get */
    assetId?: BytesLike,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<Coin[]> {
    const ownerAddress = Address.fromAddressOrString(owner);
    const result = await this.operations.getCoins({
      first: 10,
      ...paginationArgs,
      filter: { owner: ownerAddress.toB256(), assetId: assetId && hexlify(assetId) },
    });

    const coins = result.coins.edges.map((edge) => edge.node);

    return coins.map((coin) => ({
      id: coin.utxoId,
      assetId: coin.assetId,
      amount: bn(coin.amount),
      owner: Address.fromAddressOrString(coin.owner),
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
    owner: string | AbstractAddress,
    /** The quantities to get */
    quantities: CoinQuantityLike[],
    /** IDs of excluded resources from the selection. */
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const ownerAddress = Address.fromAddressOrString(owner);
    const excludeInput = {
      messages: excludedIds?.messages?.map((nonce) => hexlify(nonce)) || [],
      utxos: excludedIds?.utxos?.map((id) => hexlify(id)) || [],
    };

    if (this.cache) {
      const uniqueUtxos = new Set(
        excludeInput.utxos.concat(this.cache?.getActiveData().map((id) => hexlify(id)))
      );
      excludeInput.utxos = Array.from(uniqueUtxos);
    }
    const coinsQuery = {
      owner: ownerAddress.toB256(),
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
      height: bn(block.height),
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
      height: bn(block.height),
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
      height: bn(block.height, 10),
      time: block.header.time,
      transactionIds: block.transactions.map((tx) => tx.id),
      transactions: block.transactions.map(
        (tx) => new TransactionCoder().decode(arrayify(tx.rawPayload), 0)?.[0]
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
      arrayify(transaction.rawPayload),
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
    contractId: string | AbstractAddress,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const { contractBalance } = await this.operations.getContractBalance({
      contract: Address.fromAddressOrString(contractId).toB256(),
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
    owner: string | AbstractAddress,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const { balance } = await this.operations.getBalance({
      owner: Address.fromAddressOrString(owner).toB256(),
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
    owner: string | AbstractAddress,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<CoinQuantity[]> {
    const result = await this.operations.getBalances({
      first: 10,
      ...paginationArgs,
      filter: { owner: Address.fromAddressOrString(owner).toB256() },
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
    address: string | AbstractAddress,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<Message[]> {
    const result = await this.operations.getMessages({
      first: 10,
      ...paginationArgs,
      owner: Address.fromAddressOrString(address).toB256(),
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
        messageReceiptCount: bn(messageBlockHeader.messageReceiptCount),
        messageOutboxRoot: messageBlockHeader.messageOutboxRoot,
        consensusParametersVersion: messageBlockHeader.consensusParametersVersion,
        eventInboxRoot: messageBlockHeader.eventInboxRoot,
        stateTransitionBytecodeVersion: messageBlockHeader.stateTransitionBytecodeVersion,
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
        messageReceiptCount: bn(commitBlockHeader.messageReceiptCount),
        messageOutboxRoot: commitBlockHeader.messageOutboxRoot,
        consensusParametersVersion: commitBlockHeader.consensusParametersVersion,
        eventInboxRoot: commitBlockHeader.eventInboxRoot,
        stateTransitionBytecodeVersion: commitBlockHeader.stateTransitionBytecodeVersion,
      },
      sender: Address.fromAddressOrString(sender),
      recipient: Address.fromAddressOrString(recipient),
      nonce,
      amount: bn(amount),
      data,
    };
  }

  async getLatestGasPrice(): Promise<BN> {
    const { latestGasPrice } = await this.operations.getLatestGasPrice();
    return bn(latestGasPrice.gasPrice);
  }

  async estimateGasPrice(blockHorizon: number): Promise<BN> {
    const { estimateGasPrice } = await this.operations.estimateGasPrice({
      blockHorizon: String(blockHorizon),
    });
    return bn(estimateGasPrice.gasPrice);
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
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(amount: number, startTime?: number) {
    const { produceBlocks: latestBlockHeight } = await this.operations.produceBlocks({
      blocksToProduce: bn(amount).toString(10),
      startTimestamp: startTime ? DateTime.fromUnixMilliseconds(startTime).toTai64() : undefined,
    });
    return bn(latestBlockHeight);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(transactionId: string): Promise<TransactionResponse> {
    return new TransactionResponse(transactionId, this);
  }
}
