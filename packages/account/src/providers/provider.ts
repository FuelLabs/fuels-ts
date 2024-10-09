import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress, BytesLike } from '@fuel-ts/interfaces';
import { BN, bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import { InputType, InputMessageCoder, TransactionCoder } from '@fuel-ts/transactions';
import { arrayify, hexlify, DateTime, isDefined } from '@fuel-ts/utils';
import { checkFuelCoreVersionCompatibility, versions } from '@fuel-ts/versions';
import { equalBytes } from '@noble/curves/abstract/utils';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import type { GraphQLResponse } from 'graphql-request/src/types';
import gql from 'graphql-tag';
import { clone } from 'ramda';

import { getSdk as getOperationsSdk } from './__generated__/operations';
import type {
  GqlChainInfoFragment,
  GqlConsensusParametersVersion,
  GqlContractParameters as ContractParameters,
  GqlDryRunFailureStatusFragment,
  GqlDryRunSuccessStatusFragment,
  GqlFeeParameters as FeeParameters,
  GqlGasCosts as GasCosts,
  GqlPredicateParameters as PredicateParameters,
  GqlScriptParameters as ScriptParameters,
  GqlTxParameters as TxParameters,
  GqlPageInfo,
  GqlRelayedTransactionFailed,
  Requester,
} from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { FuelGraphqlSubscriber } from './fuel-graphql-subscriber';
import type { Message, MessageCoin, MessageProof, MessageStatus } from './message';
import type { ExcludeResourcesOption, Resource } from './resource';
import { ResourceCache } from './resource-cache';
import type {
  TransactionRequestLike,
  TransactionRequest,
  TransactionRequestInput,
  CoinTransactionRequestInput,
  JsonAbisFromAllCalls,
  ScriptTransactionRequest,
} from './transaction-request';
import {
  isTransactionTypeCreate,
  isTransactionTypeScript,
  transactionRequestify,
} from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response';
import { TransactionResponse, getDecodedLogs } from './transaction-response';
import { processGqlReceipt } from './transaction-summary/receipt';
import {
  calculateGasFee,
  extractTxError,
  getGasUsedFromReceipts,
  getReceiptsWithMissingData,
} from './utils';
import type { RetryOptions } from './utils/auto-retry-fetch';
import { autoRetryFetch } from './utils/auto-retry-fetch';
import { handleGqlErrorMessage } from './utils/handle-gql-error-message';

const MAX_RETRIES = 10;

export const RESOURCES_PAGE_SIZE_LIMIT = 512;
export const BLOCKS_PAGE_SIZE_LIMIT = 5;
export const DEFAULT_RESOURCE_CACHE_TTL = 20_000; // 20 seconds

export type DryRunFailureStatusFragment = GqlDryRunFailureStatusFragment;
export type DryRunSuccessStatusFragment = GqlDryRunSuccessStatusFragment;

export type DryRunStatus = DryRunFailureStatusFragment | DryRunSuccessStatusFragment;

export type CallResult = {
  receipts: TransactionResultReceipt[];
  dryRunStatus?: DryRunStatus;
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
  header: {
    daHeight: BN;
    stateTransitionBytecodeVersion: string;
    transactionsCount: string;
    transactionsRoot: string;
    messageOutboxRoot: string;
    eventInboxRoot: string;
    prevRoot: string;
    applicationHash: string;
  };
};

export type GetCoinsResponse = {
  coins: Coin[];
  pageInfo: GqlPageInfo;
};

export type GetMessagesResponse = {
  messages: Message[];
  pageInfo: GqlPageInfo;
};

export type GetBalancesResponse = {
  balances: CoinQuantity[];
};

export type GetTransactionsResponse = {
  transactions: Transaction[];
  pageInfo: GqlPageInfo;
};

export type GetBlocksResponse = {
  blocks: Block[];
  pageInfo: GqlPageInfo;
};

/**
 * Deployed Contract bytecode and contract id
 */
export type ContractResult = {
  id: string;
  bytecode: string;
};

type ModifyStringToBN<T> = {
  [P in keyof T]: P extends 'version' ? T[P] : T[P] extends string ? BN : T[P];
};

export {
  GasCosts,
  FeeParameters,
  ContractParameters,
  PredicateParameters,
  ScriptParameters,
  TxParameters,
};

export type ConsensusParameters = {
  version: GqlConsensusParametersVersion;
  chainId: BN;
  baseAssetId: string;
  feeParameters: ModifyStringToBN<FeeParameters>;
  contractParameters: ModifyStringToBN<ContractParameters>;
  predicateParameters: ModifyStringToBN<PredicateParameters>;
  scriptParameters: ModifyStringToBN<ScriptParameters>;
  txParameters: ModifyStringToBN<TxParameters>;
  gasCosts: GasCosts;
};

/**
 * Chain information
 */
export type ChainInfo = {
  name: string;
  baseChainHeight: BN;
  consensusParameters: ConsensusParameters;
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
  dryRunStatus?: DryRunStatus;
  updateMaxFee?: boolean;
};
// #endregion cost-estimation-1

const processGqlChain = (chain: GqlChainInfoFragment): ChainInfo => {
  const { name, daHeight, consensusParameters, latestBlock } = chain;

  const {
    contractParams,
    feeParams,
    predicateParams,
    scriptParams,
    txParams,
    gasCosts,
    baseAssetId,
    chainId,
    version,
  } = consensusParameters;

  return {
    name,
    baseChainHeight: bn(daHeight),
    consensusParameters: {
      version,
      chainId: bn(chainId),
      baseAssetId,
      feeParameters: {
        version: feeParams.version,
        gasPerByte: bn(feeParams.gasPerByte),
        gasPriceFactor: bn(feeParams.gasPriceFactor),
      },
      contractParameters: {
        version: contractParams.version,
        contractMaxSize: bn(contractParams.contractMaxSize),
        maxStorageSlots: bn(contractParams.maxStorageSlots),
      },
      txParameters: {
        version: txParams.version,
        maxInputs: bn(txParams.maxInputs),
        maxOutputs: bn(txParams.maxOutputs),
        maxWitnesses: bn(txParams.maxWitnesses),
        maxGasPerTx: bn(txParams.maxGasPerTx),
        maxSize: bn(txParams.maxSize),
        maxBytecodeSubsections: bn(txParams.maxBytecodeSubsections),
      },
      predicateParameters: {
        version: predicateParams.version,
        maxPredicateLength: bn(predicateParams.maxPredicateLength),
        maxPredicateDataLength: bn(predicateParams.maxPredicateDataLength),
        maxGasPerPredicate: bn(predicateParams.maxGasPerPredicate),
        maxMessageDataLength: bn(predicateParams.maxMessageDataLength),
      },
      scriptParameters: {
        version: scriptParams.version,
        maxScriptLength: bn(scriptParams.maxScriptLength),
        maxScriptDataLength: bn(scriptParams.maxScriptDataLength),
      },
      gasCosts,
    },
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
   * Resources cache for the given time [ms]. If set to -1, the cache will be disabled.
   */
  resourceCacheTTL?: number;
  /**
   * Retry options to use when fetching data from the node.
   */
  retryOptions?: RetryOptions;
  /**
   * Custom headers to include in the request.
   */
  headers?: RequestInit['headers'];
  /**
   * Middleware to modify the request before it is sent.
   * This can be used to add headers, modify the body, etc.
   */
  requestMiddleware?: (request: RequestInit) => RequestInit | Promise<RequestInit>;
};

/**
 * UTXO validation params
 */
export type UTXOValidationParams = {
  utxoValidation?: boolean;
};

/**
 * Transaction estimation params
 */
export type EstimateTransactionParams = {
  /**
   * Estimate the transaction dependencies.
   */
  estimateTxDependencies?: boolean;
};

export type TransactionCostParams = EstimateTransactionParams & {
  /**
   * The quantities to forward to the contract.
   */
  quantities?: CoinQuantity[];

  /**
   * A callback to sign the transaction.
   *
   * @param request - The transaction request to sign.
   * @returns A promise that resolves to the signed transaction request.
   */
  signatureCallback?: (request: ScriptTransactionRequest) => Promise<ScriptTransactionRequest>;
};

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

type Operations = ReturnType<typeof getOperationsSdk>;

type SdkOperations = Omit<
  Operations,
  'submitAndAwait' | 'statusChange' | 'submitAndAwaitStatus'
> & {
  /**
   * This method is DEPRECATED and will be REMOVED in v1.
   *
   * This method will hang until the transaction is fully processed, as described in https://github.com/FuelLabs/fuel-core/issues/2108.
   *
   * Please use the `submitAndAwaitStatus` method instead.
   */
  submitAndAwait: (
    ...args: Parameters<Operations['submitAndAwait']>
  ) => Promise<ReturnType<Operations['submitAndAwait']>>;
  statusChange: (
    ...args: Parameters<Operations['statusChange']>
  ) => Promise<ReturnType<Operations['statusChange']>>;
  submitAndAwaitStatus: (
    ...args: Parameters<Operations['submitAndAwaitStatus']>
  ) => Promise<ReturnType<Operations['submitAndAwaitStatus']>>;
  getBlobs: (variables: { blobIds: string[] }) => Promise<{ blob: { id: string } | null }[]>;
};

/**
 * A provider for connecting to a node
 */
export default class Provider {
  operations: SdkOperations;
  cache?: ResourceCache;

  /** @hidden */
  static clearChainAndNodeCaches() {
    Provider.nodeInfoCache = {};
    Provider.chainInfoCache = {};
  }

  /** @hidden */
  public url: string;
  /** @hidden */
  private urlWithoutAuth: string;
  /** @hidden */
  private static chainInfoCache: ChainInfoCache = {};
  /** @hidden */
  private static nodeInfoCache: NodeInfoCache = {};

  options: ProviderOptions = {
    timeout: undefined,
    resourceCacheTTL: undefined,
    fetch: undefined,
    retryOptions: undefined,
    headers: undefined,
  };

  /**
   * @hidden
   */
  private static getFetchFn(options: ProviderOptions): NonNullable<ProviderOptions['fetch']> {
    const { retryOptions, timeout, headers } = options;

    return autoRetryFetch(async (...args) => {
      const url = args[0];
      const request = args[1];
      const signal = timeout ? AbortSignal.timeout(timeout) : undefined;

      let fullRequest: RequestInit = {
        ...request,
        signal,
        headers: { ...request?.headers, ...headers },
      };

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
   * @param options - Additional options for the provider
   * @hidden
   */
  protected constructor(url: string, options: ProviderOptions = {}) {
    const { url: rawUrl, urlWithoutAuth, headers: authHeaders } = Provider.extractBasicAuth(url);

    this.url = rawUrl;
    this.urlWithoutAuth = urlWithoutAuth;
    this.url = url;

    const { FUELS } = versions;
    const headers = { ...authHeaders, ...options.headers, Source: `ts-sdk-${FUELS}` };

    this.options = {
      ...this.options,
      ...options,
      headers,
    };

    this.operations = this.createOperations();
    const { resourceCacheTTL } = this.options;
    if (isDefined(resourceCacheTTL)) {
      if (resourceCacheTTL !== -1) {
        this.cache = new ResourceCache(resourceCacheTTL);
      } else {
        this.cache = undefined;
      }
    } else {
      this.cache = new ResourceCache(DEFAULT_RESOURCE_CACHE_TTL);
    }
  }

  private static extractBasicAuth(url: string): {
    url: string;
    urlWithoutAuth: string;
    headers: ProviderOptions['headers'];
  } {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch (error) {
      throw new FuelError(FuelError.CODES.INVALID_URL, 'Invalid URL provided.', { url }, error);
    }

    const username = parsedUrl.username;
    const password = parsedUrl.password;
    const urlWithoutAuth = `${parsedUrl.origin}${parsedUrl.pathname}`;
    if (!(username && password)) {
      return { url, urlWithoutAuth: url, headers: undefined };
    }

    return {
      url,
      urlWithoutAuth,
      headers: { Authorization: `Basic ${btoa(`${username}:${password}`)}` },
    };
  }

  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   *
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   *
   * @returns A promise that resolves to a Provider instance.
   */
  static async create(url: string, options: ProviderOptions = {}): Promise<Provider> {
    const provider = new Provider(url, options);

    await provider.fetchChainAndNodeInfo();

    return provider;
  }

  /**
   * Returns the cached chainInfo for the current URL.
   *
   * @returns the chain information configuration.
   */
  getChain(): ChainInfo {
    const chain = Provider.chainInfoCache[this.urlWithoutAuth];
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
   *
   * @returns the node information configuration.
   */
  getNode(): NodeInfo {
    const node = Provider.nodeInfoCache[this.urlWithoutAuth];
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
    const {
      txParameters: { maxGasPerTx },
      predicateParameters: { maxGasPerPredicate },
      feeParameters: { gasPriceFactor, gasPerByte },
      gasCosts,
    } = this.getChain().consensusParameters;
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
   *
   * @param url - The URL to connect to.
   * @param options - Additional options for the provider.
   */
  async connect(url: string, options?: ProviderOptions): Promise<void> {
    const { url: rawUrl, urlWithoutAuth, headers } = Provider.extractBasicAuth(url);

    this.url = rawUrl;
    this.urlWithoutAuth = urlWithoutAuth;
    this.options = options ?? this.options;
    this.options = { ...this.options, headers: { ...this.options.headers, ...headers } };

    this.operations = this.createOperations();
    await this.fetchChainAndNodeInfo();
  }

  /**
   * Return the chain and node information.
   *
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo() {
    const { nodeInfo, chain } = await this.operations.getChainAndNodeInfo();

    const processedNodeInfo: NodeInfo = {
      maxDepth: bn(nodeInfo.maxDepth),
      maxTx: bn(nodeInfo.maxTx),
      nodeVersion: nodeInfo.nodeVersion,
      utxoValidation: nodeInfo.utxoValidation,
      vmBacktrace: nodeInfo.vmBacktrace,
    };

    Provider.ensureClientVersionIsSupported(processedNodeInfo);

    const processedChain = processGqlChain(chain);

    Provider.chainInfoCache[this.urlWithoutAuth] = processedChain;
    Provider.nodeInfoCache[this.urlWithoutAuth] = processedNodeInfo;

    return {
      chain: processedChain,
      nodeInfo: processedNodeInfo,
    };
  }

  /**
   * @hidden
   */
  private static ensureClientVersionIsSupported(nodeInfo: NodeInfo) {
    const { isMajorSupported, isMinorSupported, supportedVersion } =
      checkFuelCoreVersionCompatibility(nodeInfo.nodeVersion);

    if (!isMajorSupported || !isMinorSupported) {
      // eslint-disable-next-line no-console
      console.warn(
        `The Fuel Node that you are trying to connect to is using fuel-core version ${nodeInfo.nodeVersion},
which is not supported by the version of the TS SDK that you are using.
Things may not work as expected.
Supported fuel-core version: ${supportedVersion}.`
      );
    }
  }

  /**
   * Create GraphQL client and set operations.
   *
   * @returns The operation SDK object
   * @hidden
   */
  private createOperations(): SdkOperations {
    const fetchFn = Provider.getFetchFn(this.options);
    const gqlClient = new GraphQLClient(this.urlWithoutAuth, {
      fetch: (url: string, requestInit: RequestInit) => fetchFn(url, requestInit, this.options),
      responseMiddleware: (response: GraphQLResponse<unknown> | Error) => {
        if ('response' in response) {
          const graphQlResponse = response.response as GraphQLResponse;

          if (Array.isArray(graphQlResponse?.errors)) {
            for (const error of graphQlResponse.errors) {
              handleGqlErrorMessage(error.message, error);
            }
          }
        }
      },
    });

    const executeQuery = (query: DocumentNode, vars: Record<string, unknown>) => {
      const opDefinition = query.definitions.find((x) => x.kind === 'OperationDefinition') as {
        operation: string;
      };
      const isSubscription = opDefinition?.operation === 'subscription';

      if (isSubscription) {
        return FuelGraphqlSubscriber.create({
          url: this.urlWithoutAuth,
          query,
          fetchFn: (url, requestInit) => fetchFn(url as string, requestInit, this.options),
          variables: vars,
        });
      }
      return gqlClient.request(query, vars);
    };

    const customOperations = (requester: Requester) => ({
      getBlobs(variables: { blobIds: string[] }) {
        const queryParams = variables.blobIds.map((_, i) => `$blobId${i}: BlobId!`).join(', ');
        const blobParams = variables.blobIds
          .map((_, i) => `blob${i}: blob(id: $blobId${i}) { id }`)
          .join('\n');

        const updatedVariables = variables.blobIds.reduce(
          (acc, blobId, i) => {
            acc[`blobId${i}`] = blobId;
            return acc;
          },
          {} as Record<string, string>
        );

        const document = gql`
          query getBlobs(${queryParams}) {
            ${blobParams}
          }
        `;

        return requester(document, updatedVariables);
      },
    });

    // @ts-expect-error This is due to this function being generic. Its type is specified when calling a specific operation via provider.operations.xyz.
    return { ...getOperationsSdk(executeQuery), ...customOperations(executeQuery) };
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
   * Returns the latest block number.
   *
   * @returns A promise that resolves to the latest block number.
   */
  async getBlockNumber(): Promise<BN> {
    const { chain } = await this.operations.getChain();
    return bn(chain.latestBlock.height, 10);
  }

  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
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

    Provider.nodeInfoCache[this.urlWithoutAuth] = processedNodeInfo;

    return processedNodeInfo;
  }

  /**
   * Returns the chain information for the current provider network.
   *
   * @returns a promise that resolves to the chain information.
   */
  async fetchChain(): Promise<ChainInfo> {
    const { chain } = await this.operations.getChain();

    const processedChain = processGqlChain(chain);

    Provider.chainInfoCache[this.urlWithoutAuth] = processedChain;

    return processedChain;
  }

  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  getChainId() {
    const {
      consensusParameters: { chainId },
    } = this.getChain();
    return chainId.toNumber();
  }

  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
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
  #cacheInputs(inputs: TransactionRequestInput[], transactionId: string): void {
    if (!this.cache) {
      return;
    }

    const inputsToCache = inputs.reduce(
      (acc, input) => {
        if (input.type === InputType.Coin) {
          acc.utxos.push(input.id);
        } else if (input.type === InputType.Message) {
          acc.messages.push(input.nonce);
        }
        return acc;
      },
      { utxos: [], messages: [] } as Required<ExcludeResourcesOption>
    );

    this.cache.set(transactionId, inputsToCache);
  }

  private validateTransaction(tx: TransactionRequest, consensusParameters: ConsensusParameters) {
    const { maxOutputs, maxInputs } = consensusParameters.txParameters;
    if (bn(tx.inputs.length).gt(maxInputs)) {
      throw new FuelError(
        ErrorCode.MAX_INPUTS_EXCEEDED,
        'The transaction exceeds the maximum allowed number of inputs.'
      );
    }

    if (bn(tx.outputs.length).gt(maxOutputs)) {
      throw new FuelError(
        ErrorCode.MAX_OUTPUTS_EXCEEDED,
        'The transaction exceeds the maximum allowed number of outputs.'
      );
    }
  }

  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider send transaction parameters (optional).
   * @returns A promise that resolves to the transaction response object.
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike,
    { estimateTxDependencies = true }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    // #region Provider-sendTransaction
    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }
    // #endregion Provider-sendTransaction

    const { consensusParameters } = this.getChain();

    this.validateTransaction(transactionRequest, consensusParameters);

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());

    let abis: JsonAbisFromAllCalls | undefined;

    if (isTransactionTypeScript(transactionRequest)) {
      abis = transactionRequest.abis;
    }
    const subscription = await this.operations.submitAndAwaitStatus({ encodedTransaction });

    this.#cacheInputs(
      transactionRequest.inputs,
      transactionRequest.getTransactionId(this.getChainId())
    );

    return new TransactionResponse(transactionRequest, this, abis, subscription);
  }

  /**
   * Executes a transaction without actually submitting it to the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added.
   *
   * @param transactionRequestLike - The transaction request object.
   * @param sendTransactionParams - The provider call parameters (optional).
   * @returns A promise that resolves to the call result object.
   */
  async dryRun(
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
    const [{ receipts: rawReceipts, status: dryRunStatus }] = dryRunStatuses;
    const receipts = rawReceipts.map(processGqlReceipt);

    return { receipts, dryRunStatus };
  }

  /**
   * Verifies whether enough gas is available to complete transaction.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimated transaction request object.
   */
  async estimatePredicates<T extends TransactionRequest>(transactionRequest: T): Promise<T> {
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
   * @param transactionRequest - The transaction request object.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(
    transactionRequest: TransactionRequest
  ): Promise<EstimateTxDependenciesReturns> {
    if (isTransactionTypeCreate(transactionRequest)) {
      return {
        receipts: [],
        outputVariables: 0,
        missingContractIds: [],
      };
    }

    let receipts: TransactionResultReceipt[] = [];
    const missingContractIds: string[] = [];
    let outputVariables = 0;
    let dryRunStatus: DryRunStatus | undefined;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const {
        dryRun: [{ receipts: rawReceipts, status }],
      } = await this.operations.dryRun({
        encodedTransactions: [hexlify(transactionRequest.toTransactionBytes())],
        utxoValidation: false,
      });

      receipts = rawReceipts.map(processGqlReceipt);
      dryRunStatus = status;

      const { missingOutputVariables, missingOutputContractIds } =
        getReceiptsWithMissingData(receipts);

      const hasMissingOutputs =
        missingOutputVariables.length !== 0 || missingOutputContractIds.length !== 0;

      if (hasMissingOutputs && isTransactionTypeScript(transactionRequest)) {
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
      dryRunStatus,
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
      dryRunStatus: undefined,
    }));

    const allRequests = clone(transactionRequests);

    // Map of original request index to its serialized transaction (for ScriptTransactionRequest only)
    const serializedTransactionsMap = new Map();

    // Prepare ScriptTransactionRequests and their indices
    allRequests.forEach((req, index) => {
      if (isTransactionTypeScript(req)) {
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
        result.dryRunStatus = status;
        const { missingOutputVariables, missingOutputContractIds } = getReceiptsWithMissingData(
          result.receipts
        );
        const hasMissingOutputs =
          missingOutputVariables.length > 0 || missingOutputContractIds.length > 0;
        const request = allRequests[requestIdx];
        if (hasMissingOutputs && isTransactionTypeScript(request)) {
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

  /**
   * Dry runs multiple transactions.
   *
   * @param transactionRequests - Array of transaction request objects.
   * @param sendTransactionParams - The provider call parameters (optional).
   *
   * @returns A promise that resolves to an array of results for each transaction call.
   */
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
      return { receipts, dryRunStatus: status };
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
    if (isTransactionTypeScript(transactionRequest)) {
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
   * @param estimateTxParams - The estimate transaction params (optional).
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
   * @hidden
   *
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
    { signatureCallback }: TransactionCostParams = {}
  ): Promise<Omit<TransactionCost, 'requiredQuantities'>> {
    const txRequestClone = clone(transactionRequestify(transactionRequestLike));
    const updateMaxFee = txRequestClone.maxFee.eq(0);
    const isScriptTransaction = isTransactionTypeScript(txRequestClone);

    // Remove gasLimit to avoid gasLimit when estimating predicates
    if (isScriptTransaction) {
      txRequestClone.gasLimit = bn(0);
    }

    const signedRequest = clone(txRequestClone);
    let addedSignatures = 0;
    if (signatureCallback && isTransactionTypeScript(signedRequest)) {
      const lengthBefore = signedRequest.witnesses.length;
      await signatureCallback(signedRequest);
      addedSignatures = signedRequest.witnesses.length - lengthBefore;
    }

    await this.estimatePredicates(signedRequest);
    txRequestClone.updatePredicateGasUsed(signedRequest.inputs);

    /**
     * Calculate minGas and maxGas based on the real transaction
     */
    // eslint-disable-next-line prefer-const
    let { maxFee, maxGas, minFee, minGas, gasPrice, gasLimit } = await this.estimateTxGasAndFee({
      transactionRequest: signedRequest,
    });

    let receipts: TransactionResultReceipt[] = [];
    let dryRunStatus: DryRunStatus | undefined;
    let missingContractIds: string[] = [];
    let outputVariables = 0;
    let gasUsed = bn(0);

    txRequestClone.maxFee = maxFee;
    if (isScriptTransaction) {
      txRequestClone.gasLimit = gasLimit;
      if (signatureCallback) {
        await signatureCallback(txRequestClone);
      }

      ({ receipts, missingContractIds, outputVariables, dryRunStatus } =
        await this.estimateTxDependencies(txRequestClone));

      if (dryRunStatus && 'reason' in dryRunStatus) {
        throw this.extractDryRunError(txRequestClone, receipts, dryRunStatus);
      }

      gasUsed = getGasUsedFromReceipts(receipts);
      txRequestClone.gasLimit = gasUsed;

      ({ maxFee, maxGas, minFee, minGas, gasPrice } = await this.estimateTxGasAndFee({
        transactionRequest: txRequestClone,
        gasPrice,
      }));
    }

    return {
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
      dryRunStatus,
      updateMaxFee,
    };
  }

  /**
   * Returns coins for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param assetId - The asset ID of coins to get (optional).
   * @param paginationArgs - Pagination arguments (optional).
   *
   * @returns A promise that resolves to the coins.
   */
  async getCoins(
    owner: string | AbstractAddress,
    assetId?: BytesLike,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetCoinsResponse> {
    const ownerAddress = Address.fromAddressOrString(owner);
    const {
      coins: { edges, pageInfo },
    } = await this.operations.getCoins({
      ...this.validatePaginationArgs({
        paginationLimit: RESOURCES_PAGE_SIZE_LIMIT,
        inputArgs: paginationArgs,
      }),
      filter: { owner: ownerAddress.toB256(), assetId: assetId && hexlify(assetId) },
    });

    const coins = edges.map(({ node }) => ({
      id: node.utxoId,
      assetId: node.assetId,
      amount: bn(node.amount),
      owner: Address.fromAddressOrString(node.owner),
      blockCreated: bn(node.blockCreated),
      txCreatedIdx: bn(node.txCreatedIdx),
    }));

    return {
      coins,
      pageInfo,
    };
  }

  /**
   * Returns resources for the given owner satisfying the spend query.
   *
   * @param owner - The address to get resources for.
   * @param quantities - The coin quantities to get.
   * @param excludedIds - IDs of excluded resources from the selection (optional).
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(
    owner: string | AbstractAddress,
    quantities: CoinQuantityLike[],
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const ownerAddress = Address.fromAddressOrString(owner);
    const excludeInput = {
      messages: excludedIds?.messages?.map((nonce) => hexlify(nonce)) || [],
      utxos: excludedIds?.utxos?.map((id) => hexlify(id)) || [],
    };

    if (this.cache) {
      const cached = this.cache.getActiveData();
      excludeInput.messages.push(...cached.messages);
      excludeInput.utxos.push(...cached.utxos);
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
        switch (coin.type) {
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
   * Returns an array of blobIds that exist on chain, for a given array of blobIds.
   *
   * @param blobIds - blobIds to check.
   * @returns - A promise that resolves to an array of blobIds that exist on chain.
   */
  async getBlobs(blobIds: string[]): Promise<string[]> {
    const res = await this.operations.getBlobs({ blobIds });
    const blobs: (string | null)[] = [];

    Object.keys(res).forEach((key) => {
      // @ts-expect-error keys are strings
      const val = res[key];
      blobs.push(val?.id ?? null);
    });

    return blobs.filter((v) => v) as string[];
  }

  /**
   * Returns block matching the given ID or height.
   *
   * @param idOrHeight - ID or height of the block.
   * @returns A promise that resolves to the block or null.
   */
  async getBlock(idOrHeight: string | number | 'latest'): Promise<Block | null> {
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

    const { header, height, id, transactions } = block;

    return {
      id,
      height: bn(height),
      time: header.time,
      header: {
        applicationHash: header.applicationHash,
        daHeight: bn(header.daHeight),
        eventInboxRoot: header.eventInboxRoot,
        messageOutboxRoot: header.messageOutboxRoot,
        prevRoot: header.prevRoot,
        stateTransitionBytecodeVersion: header.stateTransitionBytecodeVersion,
        transactionsCount: header.transactionsCount,
        transactionsRoot: header.transactionsRoot,
      },
      transactionIds: transactions.map((tx) => tx.id),
    };
  }

  /**
   * Returns all the blocks matching the given parameters.
   *
   * @param params - The parameters to query blocks.
   * @returns A promise that resolves to the blocks.
   */
  async getBlocks(params?: CursorPaginationArgs): Promise<GetBlocksResponse> {
    const {
      blocks: { edges, pageInfo },
    } = await this.operations.getBlocks({
      ...this.validatePaginationArgs({
        paginationLimit: BLOCKS_PAGE_SIZE_LIMIT,
        inputArgs: params,
      }),
    });

    const blocks: Block[] = edges.map(({ node: block }) => ({
      id: block.id,
      height: bn(block.height),
      time: block.header.time,
      header: {
        applicationHash: block.header.applicationHash,
        daHeight: bn(block.header.daHeight),
        eventInboxRoot: block.header.eventInboxRoot,
        messageOutboxRoot: block.header.messageOutboxRoot,
        prevRoot: block.header.prevRoot,
        stateTransitionBytecodeVersion: block.header.stateTransitionBytecodeVersion,
        transactionsCount: block.header.transactionsCount,
        transactionsRoot: block.header.transactionsRoot,
      },
      transactionIds: block.transactions.map((tx) => tx.id),
    }));

    return { blocks, pageInfo };
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
      header: {
        applicationHash: block.header.applicationHash,
        daHeight: bn(block.header.daHeight),
        eventInboxRoot: block.header.eventInboxRoot,
        messageOutboxRoot: block.header.messageOutboxRoot,
        prevRoot: block.header.prevRoot,
        stateTransitionBytecodeVersion: block.header.stateTransitionBytecodeVersion,
        transactionsCount: block.header.transactionsCount,
        transactionsRoot: block.header.transactionsRoot,
      },
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

    try {
      return new TransactionCoder().decode(
        arrayify(transaction.rawPayload),
        0
      )?.[0] as Transaction<TTransactionType>;
    } catch (error) {
      if (error instanceof FuelError && error.code === ErrorCode.UNSUPPORTED_TRANSACTION_TYPE) {
        // eslint-disable-next-line no-console
        console.warn('Unsupported transaction type encountered');
        return null;
      }
      throw error;
    }
  }

  /**
   * Retrieves transactions based on the provided pagination arguments.
   * @param paginationArgs - The pagination arguments for retrieving transactions.
   * @returns A promise that resolves to an object containing the retrieved transactions and pagination information.
   */
  async getTransactions(paginationArgs?: CursorPaginationArgs): Promise<GetTransactionsResponse> {
    const {
      transactions: { edges, pageInfo },
    } = await this.operations.getTransactions(paginationArgs);

    const coder = new TransactionCoder();
    const transactions = edges
      .map(({ node: { rawPayload } }) => {
        try {
          return coder.decode(arrayify(rawPayload), 0)[0];
        } catch (error) {
          if (error instanceof FuelError && error.code === ErrorCode.UNSUPPORTED_TRANSACTION_TYPE) {
            // eslint-disable-next-line no-console
            console.warn('Unsupported transaction type encountered');
            return null;
          }
          throw error;
        }
      })
      .filter((tx): tx is Transaction => tx !== null);

    return { transactions, pageInfo };
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
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(owner: string | AbstractAddress): Promise<GetBalancesResponse> {
    const {
      balances: { edges },
    } = await this.operations.getBalances({
      /**
       * The query parameters for this method were designed to support pagination,
       * but the current Fuel-Core implementation does not support pagination yet.
       */
      first: 10000,
      filter: { owner: Address.fromAddressOrString(owner).toB256() },
    });

    const balances = edges.map(({ node }) => ({
      assetId: node.assetId,
      amount: bn(node.amount),
    }));

    return { balances };
  }

  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(
    address: string | AbstractAddress,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetMessagesResponse> {
    const {
      messages: { edges, pageInfo },
    } = await this.operations.getMessages({
      ...this.validatePaginationArgs({
        inputArgs: paginationArgs,
        paginationLimit: RESOURCES_PAGE_SIZE_LIMIT,
      }),
      owner: Address.fromAddressOrString(address).toB256(),
    });

    const messages = edges.map(({ node }) => ({
      messageId: InputMessageCoder.getMessageId({
        sender: node.sender,
        recipient: node.recipient,
        nonce: node.nonce,
        amount: bn(node.amount),
        data: node.data,
      }),
      sender: Address.fromAddressOrString(node.sender),
      recipient: Address.fromAddressOrString(node.recipient),
      nonce: node.nonce,
      amount: bn(node.amount),
      data: InputMessageCoder.decodeData(node.data),
      daHeight: bn(node.daHeight),
    }));

    return {
      messages,
      pageInfo,
    };
  }

  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt.
   *
   * @param transactionId - The transaction to get message from.
   * @param messageId - The message id from MessageOut receipt.
   * @param commitBlockId - The commit block id (optional).
   * @param commitBlockHeight - The commit block height (optional).
   * @returns A promise that resolves to the message proof.
   */
  async getMessageProof(
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
        transactionsCount: Number(messageBlockHeader.transactionsCount),
        transactionsRoot: messageBlockHeader.transactionsRoot,
        height: bn(messageBlockHeader.height),
        prevRoot: messageBlockHeader.prevRoot,
        time: messageBlockHeader.time,
        applicationHash: messageBlockHeader.applicationHash,
        messageReceiptCount: Number(messageBlockHeader.messageReceiptCount),
        messageOutboxRoot: messageBlockHeader.messageOutboxRoot,
        consensusParametersVersion: Number(messageBlockHeader.consensusParametersVersion),
        eventInboxRoot: messageBlockHeader.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(messageBlockHeader.stateTransitionBytecodeVersion),
      },
      commitBlockHeader: {
        id: commitBlockHeader.id,
        daHeight: bn(commitBlockHeader.daHeight),
        transactionsCount: Number(commitBlockHeader.transactionsCount),
        transactionsRoot: commitBlockHeader.transactionsRoot,
        height: bn(commitBlockHeader.height),
        prevRoot: commitBlockHeader.prevRoot,
        time: commitBlockHeader.time,
        applicationHash: commitBlockHeader.applicationHash,
        messageReceiptCount: Number(commitBlockHeader.messageReceiptCount),
        messageOutboxRoot: commitBlockHeader.messageOutboxRoot,
        consensusParametersVersion: Number(commitBlockHeader.consensusParametersVersion),
        eventInboxRoot: commitBlockHeader.eventInboxRoot,
        stateTransitionBytecodeVersion: Number(commitBlockHeader.stateTransitionBytecodeVersion),
      },
      sender: Address.fromAddressOrString(sender),
      recipient: Address.fromAddressOrString(recipient),
      nonce,
      amount: bn(amount),
      data,
    };
  }

  /**
   * Get the latest gas price from the node.
   *
   * @returns A promise that resolves to the latest gas price.
   */
  async getLatestGasPrice(): Promise<BN> {
    const { latestGasPrice } = await this.operations.getLatestGasPrice();
    return bn(latestGasPrice.gasPrice);
  }

  /**
   * Returns the estimate gas price for the given block horizon.
   *
   * @param blockHorizon - The block horizon to estimate gas price for.
   * @returns A promise that resolves to the estimated gas price.
   */
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
   * @param amount - The amount of blocks to produce.
   * @param startTime - The UNIX timestamp (milliseconds) to set for the first produced block (optional).
   * @returns A promise that resolves to the block number of the last produced block.
   */
  async produceBlocks(amount: number, startTime?: number) {
    const { produceBlocks: latestBlockHeight } = await this.operations.produceBlocks({
      blocksToProduce: bn(amount).toString(10),
      startTimestamp: startTime ? DateTime.fromUnixMilliseconds(startTime).toTai64() : undefined,
    });
    return bn(latestBlockHeight);
  }

  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  async getTransactionResponse(transactionId: string): Promise<TransactionResponse> {
    return new TransactionResponse(transactionId, this);
  }

  /**
   * Returns Message for given nonce.
   *
   * @param nonce - The nonce of the message to retrieve.
   * @returns A promise that resolves to the Message object or null.
   */
  async getMessageByNonce(nonce: string): Promise<Message | null> {
    const { message: rawMessage } = await this.operations.getMessageByNonce({ nonce });

    if (!rawMessage) {
      return null;
    }

    const message: Message = {
      messageId: InputMessageCoder.getMessageId({
        sender: rawMessage.sender,
        recipient: rawMessage.recipient,
        nonce: rawMessage.nonce,
        amount: bn(rawMessage.amount),
        data: rawMessage.data,
      }),
      sender: Address.fromAddressOrString(rawMessage.sender),
      recipient: Address.fromAddressOrString(rawMessage.recipient),
      nonce: rawMessage.nonce,
      amount: bn(rawMessage.amount),
      data: InputMessageCoder.decodeData(rawMessage.data),
      daHeight: bn(rawMessage.daHeight),
    };

    return message;
  }

  /**
   * Get the relayed transaction for the given transaction ID.
   *
   * @param relayedTransactionId - The relayed transaction ID to get the response for.
   * @returns A promise that resolves to the relayed transaction.
   */
  async getRelayedTransactionStatus(
    relayedTransactionId: string
  ): Promise<GqlRelayedTransactionFailed | null> {
    const { relayedTransactionStatus } = await this.operations.getRelayedTransactionStatus({
      relayedTransactionId,
    });

    if (!relayedTransactionStatus) {
      return null;
    }

    return relayedTransactionStatus;
  }

  /**
   * @hidden
   */
  private validatePaginationArgs(params: {
    inputArgs?: CursorPaginationArgs;
    paginationLimit: number;
  }): CursorPaginationArgs {
    const { paginationLimit, inputArgs = {} } = params;
    const { first, last, after, before } = inputArgs;

    if (after && before) {
      throw new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'Pagination arguments "after" and "before" cannot be used together'
      );
    }

    if ((first || 0) > paginationLimit || (last || 0) > paginationLimit) {
      throw new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        `Pagination limit for this query cannot exceed ${paginationLimit} items`
      );
    }

    if (first && before) {
      throw new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "first" with "before" is not supported'
      );
    }

    if (last && after) {
      throw new FuelError(
        ErrorCode.INVALID_INPUT_PARAMETERS,
        'The use of pagination argument "last" with "after" is not supported'
      );
    }

    // If neither first nor last is provided, set a default first value
    if (!first && !last) {
      inputArgs.first = paginationLimit;
    }

    return inputArgs;
  }

  /**
   * @hidden
   */
  private extractDryRunError(
    transactionRequest: ScriptTransactionRequest,
    receipts: TransactionResultReceipt[],
    dryRunStatus: DryRunStatus
  ): FuelError {
    const status = dryRunStatus as DryRunFailureStatusFragment;
    let logs: unknown[] = [];
    if (transactionRequest.abis) {
      logs = getDecodedLogs(
        receipts,
        transactionRequest.abis.main,
        transactionRequest.abis.otherContractsAbis
      );
    }

    return extractTxError({
      logs,
      receipts,
      statusReason: status.reason,
    });
  }
}
