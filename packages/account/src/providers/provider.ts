import type { AddressInput } from '@fuel-ts/address';
import { Address, isB256 } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import { InputMessageCoder, TransactionCoder } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify, DateTime, isDefined } from '@fuel-ts/utils';
import { checkFuelCoreVersionCompatibility, gte, versions } from '@fuel-ts/versions';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import type { GraphQLClientResponse, GraphQLResponse } from 'graphql-request/src/types';
import gql from 'graphql-tag';
import { clone } from 'ramda';

import { deferPromise } from '../connectors/utils/promises';

import { getSdk as getOperationsSdk } from './__generated__/operations';
import type {
  GqlReceiptFragment as TransactionReceiptJson,
  GqlNodeInfoFragment as NodeInfoJson,
  GqlChainInfoFragment as ChainInfoJson,
  GqlConsensusParametersVersion,
  GqlContractParameters as ContractParameters,
  GqlDryRunFailureStatusFragment,
  GqlDryRunSuccessStatusFragment,
  GqlFeeParameters as FeeParameters,
  GqlGasCostsFragment as GasCosts,
  GqlPredicateParameters as PredicateParameters,
  GqlScriptParameters as ScriptParameters,
  GqlTxParameters as TxParameters,
  GqlPageInfo,
  GqlRelayedTransactionFailed,
  Requester,
  GqlBlockFragment,
  GqlEstimatePredicatesQuery,
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
  isPredicate,
  isTransactionTypeCreate,
  isTransactionTypeScript,
  transactionRequestify,
  validateTransactionForAssetBurn,
} from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response';
import { TransactionResponse, getDecodedLogs } from './transaction-response';
import {
  calculateGasFee,
  extractTxError,
  getGasUsedFromReceipts,
  getReceiptsWithMissingData,
} from './utils';
import type { RetryOptions } from './utils/auto-retry-fetch';
import { autoRetryFetch } from './utils/auto-retry-fetch';
import { assertGqlResponseHasNoErrors } from './utils/handle-gql-error-message';
import { adjustResourcesToExclude } from './utils/helpers';
import type { ProviderCacheJson, TransactionSummaryJsonPartial } from './utils/serialization';
import {
  deserializeChain,
  deserializeNodeInfo,
  deserializeProviderCache,
  deserializeReceipt,
} from './utils/serialization';
import { validatePaginationArgs } from './utils/validate-pagination-args';

const MAX_RETRIES = 10;

export const RESOURCES_PAGE_SIZE_LIMIT = 512;
export const TRANSACTIONS_PAGE_SIZE_LIMIT = 60;
export const BALANCES_PAGE_SIZE_LIMIT = 100;
export const BLOCKS_PAGE_SIZE_LIMIT = 5;
export const DEFAULT_RESOURCE_CACHE_TTL = 20_000; // 20 seconds
export const GAS_USED_MODIFIER = 1.2;

export type Features = {
  balancePagination: boolean;
  amount128: boolean;
};

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
  rawReceipts: TransactionReceiptJson[];
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

export type PageInfo = GqlPageInfo;

export type GetCoinsResponse = {
  coins: Coin[];
  pageInfo: PageInfo;
};

export type GetMessagesResponse = {
  messages: Message[];
  pageInfo: PageInfo;
};

export type GetBalancesResponse = {
  balances: CoinQuantity[];
  pageInfo?: PageInfo;
};

export type GetTransactionsResponse = {
  transactions: Transaction[];
  pageInfo: PageInfo;
};

export type GetAssetDetailsResponse = {
  subId: string;
  contractId: string;
  totalSupply: BN;
};

export type GetBlocksResponse = {
  blocks: Block[];
  pageInfo: PageInfo;
};

export type GetAddressTypeResponse = 'Account' | 'Contract' | 'Transaction' | 'Blob' | 'Asset';

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

type NodeInfoJson = {
  utxoValidation: boolean;
  vmBacktrace: boolean;
  maxTx: string;
  maxDepth: string;
  nodeVersion: string;
  indexation?: {
    balances: boolean;
    coinsToSpend: boolean;
    assetMetadata: boolean;
  };
};

export {
  TransactionReceiptJson,
  NodeInfoJson,
  ChainInfoJson,
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
  indexation?: {
    balances: boolean;
    coinsToSpend: boolean;
    assetMetadata: boolean;
  };
};

/** @deprecated This type is no longer used. */
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
  rawReceipts: TransactionReceiptJson[];
  receipts: TransactionResultReceipt[];
  outputVariables: number;
  missingContractIds: string[];
  estimatedPredicates: TransactionRequestInput[];
  requiredQuantities: CoinQuantity[];
  addedSignatures: number;
  dryRunStatus?: DryRunStatus;
  updateMaxFee?: boolean;
  transactionSummary?: TransactionSummaryJsonPartial;
};
// #endregion cost-estimation-1

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
  /**
   * The cache can be passed in to avoid re-fetching the chain + node info.
   */
  cache?: ProviderCacheJson;
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

  /**
   * The gas price to use for the transaction.
   */
  gasPrice?: BN;
};

export type EstimateTxDependenciesParams = {
  /**
   * The gas price to use for the transaction.
   */
  gasPrice?: BN;
};

export type EstimateTxGasAndFeeParams = {
  /**
   * The transaction request to estimate the gas and fee for.
   */
  transactionRequest: TransactionRequest;

  /**
   * The gas price to use for the transaction.
   */
  gasPrice?: BN;
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
   * Whether to enable asset burn for the transaction.
   */
  enableAssetBurn?: boolean;
};

/**
 * URL - Consensus Params mapping.
 */
type ChainInfoCache = Record<string, ChainInfo>;

/**
 * URL - Node Info mapping.
 */
type NodeInfoCache = Record<string, NodeInfo>;

type Operations = ReturnType<typeof getOperationsSdk>;

type SdkOperations = Omit<Operations, 'statusChange' | 'submitAndAwaitStatus'> & {
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
    Provider.inflightFetchChainAndNodeInfoRequests = {};
    Provider.nodeInfoCache = {};
    Provider.chainInfoCache = {};
  }

  /** @hidden */
  public url: string;
  /** @hidden */
  private urlWithoutAuth: string;
  /** @hidden */
  private features: Features = {
    balancePagination: false,
    amount128: false,
  };

  /** @hidden */
  private static inflightFetchChainAndNodeInfoRequests: Record<string, Promise<number>> = {};
  /** @hidden */
  private static chainInfoCache: ChainInfoCache = {};
  /** @hidden */
  private static nodeInfoCache: NodeInfoCache = {};
  /** @hidden */
  private static incompatibleNodeVersionMessage: string = '';

  /** @hidden */
  public consensusParametersTimestamp?: number;

  options: ProviderOptions = {
    timeout: undefined,
    resourceCacheTTL: undefined,
    fetch: undefined,
    retryOptions: undefined,
    headers: undefined,
    cache: undefined,
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
  constructor(url: string, options: ProviderOptions = {}) {
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
    const { resourceCacheTTL, cache } = this.options;

    /**
     * Re-instantiate chain + node info from the passed in cache
     */
    if (cache) {
      const { consensusParametersTimestamp, chain, nodeInfo } = deserializeProviderCache(cache);
      this.consensusParametersTimestamp = consensusParametersTimestamp;
      Provider.chainInfoCache[this.urlWithoutAuth] = chain;
      Provider.nodeInfoCache[this.urlWithoutAuth] = nodeInfo;
    }

    /**
     * Instantiate the resource cache (for UTXO's + messages)
     */
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
   * Initialize Provider async stuff
   */
  async init(): Promise<Provider> {
    const { nodeInfo } = await this.fetchChainAndNodeInfo();
    this.setupFeatures(nodeInfo.nodeVersion);
    return this;
  }

  /**
   * Returns the `chainInfo` for the current network.
   *
   * @returns the chain information configuration.
   */
  async getChain(): Promise<ChainInfo> {
    await this.init();
    return Provider.chainInfoCache[this.urlWithoutAuth];
  }

  /**
   * Returns the `nodeInfo` for the current network.
   *
   * @returns the node information configuration.
   */
  async getNode(): Promise<NodeInfo> {
    await this.init();
    return Provider.nodeInfoCache[this.urlWithoutAuth];
  }

  /**
   * Returns some helpful parameters related to gas fees.
   */
  async getGasConfig() {
    const {
      txParameters: { maxGasPerTx },
      predicateParameters: { maxGasPerPredicate },
      feeParameters: { gasPriceFactor, gasPerByte },
      gasCosts,
    } = (await this.getChain()).consensusParameters;

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

    await this.init();
  }

  /**
   * Return the chain and node information.
   * @param ignoreCache - If true, ignores the cache and re-fetch configs.
   * @returns A promise that resolves to the Chain and NodeInfo.
   */
  async fetchChainAndNodeInfo(
    ignoreCache: boolean = false
  ): Promise<{ chain: ChainInfo; nodeInfo: NodeInfo }> {
    let nodeInfo: NodeInfo;
    let chain: ChainInfo;

    try {
      nodeInfo = Provider.nodeInfoCache[this.urlWithoutAuth];
      chain = Provider.chainInfoCache[this.urlWithoutAuth];

      const noCache = !nodeInfo || !chain;

      if (ignoreCache || noCache) {
        throw new Error(`Jumps to the catch block and re-fetch`);
      }
    } catch (_err) {
      const inflightRequest: Promise<number> =
        Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];

      // When an inflight is request is available, wait for it to complete
      // Then fetch (which will hit the cached values)
      if (inflightRequest) {
        const now = await inflightRequest;
        this.consensusParametersTimestamp = now;
        return this.fetchChainAndNodeInfo();
      }

      const { promise, resolve } = deferPromise<number>();
      Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth] = promise;

      const data = await this.getChainAndNodeInfo();
      nodeInfo = deserializeNodeInfo(data.nodeInfo);
      chain = deserializeChain(data.chain);

      Provider.setIncompatibleNodeVersionMessage(nodeInfo);
      Provider.chainInfoCache[this.urlWithoutAuth] = chain;
      Provider.nodeInfoCache[this.urlWithoutAuth] = nodeInfo;

      const now = Date.now();
      this.consensusParametersTimestamp = now;
      resolve(now);
      delete Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
    }

    return {
      chain,
      nodeInfo,
    };
  }

  private async getChainAndNodeInfo() {
    try {
      const data = await this.operations.getChainAndNodeInfoV2();
      return data;
    } catch (error) {
      if (/Unknown field/.test((error as FuelError).message)) {
        const data = await this.operations.getChainAndNodeInfo();
        return data;
      }

      throw error;
    }
  }

  /**
   * @hidden
   */
  private static setIncompatibleNodeVersionMessage(nodeInfo: NodeInfo) {
    const { isMajorSupported, isMinorSupported, supportedVersion } =
      checkFuelCoreVersionCompatibility(nodeInfo.nodeVersion);

    if (!isMajorSupported || !isMinorSupported) {
      Provider.incompatibleNodeVersionMessage = [
        `The Fuel Node that you are trying to connect to is using fuel-core version ${nodeInfo.nodeVersion}.`,
        `The TS SDK currently supports fuel-core version ${supportedVersion}.`,
        `Things may not work as expected.`,
      ].join('\n');
      FuelGraphqlSubscriber.incompatibleNodeVersionMessage =
        Provider.incompatibleNodeVersionMessage;
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
      fetch: (input: RequestInfo | URL, requestInit?: RequestInit) =>
        fetchFn(input.toString(), requestInit || {}, this.options),
      responseMiddleware: (response: GraphQLClientResponse<unknown> | Error) => {
        if ('response' in response) {
          const graphQlResponse = response.response as GraphQLResponse;
          assertGqlResponseHasNoErrors(
            graphQlResponse.errors,
            Provider.incompatibleNodeVersionMessage
          );
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
   * @hidden
   */
  private setupFeatures(nodeVersion: string) {
    if (gte(nodeVersion, '0.41.0')) {
      this.features.balancePagination = true;
      this.features.amount128 = true;
    }
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
    const {
      chain: {
        latestBlock: { height },
      },
    } = await this.operations.getLatestBlockHeight();
    return bn(height);
  }

  /**
   * Returns the node information for the current provider network.
   *
   * @returns a promise that resolves to the node information.
   */
  async fetchNode(): Promise<NodeInfo> {
    const { nodeInfo } = await this.operations.getNodeInfo();

    const processedNodeInfo: NodeInfo = deserializeNodeInfo(nodeInfo);

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

    const processedChain = deserializeChain(chain);

    Provider.chainInfoCache[this.urlWithoutAuth] = processedChain;

    return processedChain;
  }

  /**
   * Returns the chain ID for the current provider network.
   *
   * @returns A promise that resolves to the chain ID number.
   */
  async getChainId() {
    const {
      consensusParameters: { chainId },
    } = await this.getChain();
    return chainId.toNumber();
  }

  /**
   * Returns the base asset ID for the current provider network.
   *
   * @returns the base asset ID.
   */
  async getBaseAssetId() {
    const all = await this.getChain();
    const {
      consensusParameters: { baseAssetId },
    } = all;
    return baseAssetId;
  }

  /**
   * Retrieves the details of an asset given its ID.
   *
   * @param assetId - The unique identifier of the asset.
   * @returns A promise that resolves to an object containing the asset details.
   */
  async getAssetDetails(assetId: string): Promise<GetAssetDetailsResponse> {
    const { assetDetails } = await this.operations.getAssetDetails({ assetId });

    const { contractId, subId, totalSupply } = assetDetails;

    return {
      subId,
      contractId,
      totalSupply: bn(totalSupply),
    };
  }

  /**
   * @hidden
   */
  #cacheInputs(inputs: TransactionRequestInput[], transactionId: string): void {
    if (!this.cache) {
      return;
    }

    this.cache.set(transactionId, inputs);
  }

  /**
   * @hidden
   */
  async validateTransaction(tx: TransactionRequest) {
    const {
      consensusParameters: {
        txParameters: { maxInputs, maxOutputs },
      },
    } = await this.getChain();
    if (bn(tx.inputs.length).gt(maxInputs)) {
      throw new FuelError(
        ErrorCode.MAX_INPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of inputs. Tx inputs: ${tx.inputs.length}, max inputs: ${maxInputs}`
      );
    }

    if (bn(tx.outputs.length).gt(maxOutputs)) {
      throw new FuelError(
        ErrorCode.MAX_OUTPUTS_EXCEEDED,
        `The transaction exceeds the maximum allowed number of outputs. Tx outputs: ${tx.outputs.length}, max outputs: ${maxOutputs}`
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
    { estimateTxDependencies = true, enableAssetBurn }: ProviderSendTxParams = {}
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    validateTransactionForAssetBurn(
      await this.getBaseAssetId(),
      transactionRequest,
      enableAssetBurn
    );

    if (estimateTxDependencies) {
      await this.estimateTxDependencies(transactionRequest);
    }

    await this.validateTransaction(transactionRequest);

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());

    let abis: JsonAbisFromAllCalls | undefined;

    if (isTransactionTypeScript(transactionRequest)) {
      abis = transactionRequest.abis;
    }
    const subscription = await this.operations.submitAndAwaitStatus({ encodedTransaction });

    this.#cacheInputs(
      transactionRequest.inputs,
      transactionRequest.getTransactionId(await this.getChainId())
    );

    const chainId = await this.getChainId();
    return new TransactionResponse(transactionRequest, this, chainId, abis, subscription);
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
    const receipts = rawReceipts.map(deserializeReceipt);

    return { receipts, dryRunStatus };
  }

  /**
   * Estimates the gas usage for predicates in a transaction request.
   *
   * @template T - The type of the transaction request object.
   *
   * @param transactionRequest - The transaction request to estimate predicates for.
   * @returns A promise that resolves to the updated transaction request with estimated gas usage for predicates.
   */
  async estimatePredicates<T extends TransactionRequest>(transactionRequest: T): Promise<T> {
    const shouldEstimatePredicates = transactionRequest.inputs.some(
      (input) => isPredicate(input) && bn(input.predicateGasUsed).isZero()
    );

    if (!shouldEstimatePredicates) {
      return transactionRequest;
    }

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());

    const response = await this.operations.estimatePredicates({
      encodedTransaction,
    });

    const { estimatePredicates } = response;

    // eslint-disable-next-line no-param-reassign
    transactionRequest = this.parseEstimatePredicatesResponse(
      transactionRequest,
      estimatePredicates
    );

    return transactionRequest;
  }

  /**
   * Estimates the gas price and predicates for a given transaction request and block horizon.
   *
   * @param transactionRequest - The transaction request to estimate predicates and gas price for.
   * @param blockHorizon - The block horizon to use for gas price estimation.
   * @returns A promise that resolves to an object containing the updated transaction
   * request and the estimated gas price.
   */
  async estimatePredicatesAndGasPrice<T extends TransactionRequest>(
    transactionRequest: T,
    blockHorizon: number
  ) {
    const shouldEstimatePredicates = transactionRequest.inputs.some(
      (input) => isPredicate(input) && bn(input.predicateGasUsed).isZero()
    );

    if (!shouldEstimatePredicates) {
      const gasPrice = await this.estimateGasPrice(blockHorizon);

      return { transactionRequest, gasPrice };
    }

    const {
      estimateGasPrice: { gasPrice },
      estimatePredicates,
    } = await this.operations.estimatePredicatesAndGasPrice({
      blockHorizon: String(blockHorizon),
      encodedTransaction: hexlify(transactionRequest.toTransactionBytes()),
    });

    // eslint-disable-next-line no-param-reassign
    transactionRequest = this.parseEstimatePredicatesResponse(
      transactionRequest,
      estimatePredicates
    );

    return { transactionRequest, gasPrice: bn(gasPrice) };
  }

  /**
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * @param transactionRequest - The transaction request object.
   * @param gasPrice - The gas price to use for the transaction, if not provided it will be fetched.
   * @returns A promise that resolves to the estimate transaction dependencies.
   */
  async estimateTxDependencies(
    transactionRequest: TransactionRequest,
    { gasPrice: gasPriceParam }: EstimateTxDependenciesParams = {}
  ): Promise<EstimateTxDependenciesReturns> {
    if (isTransactionTypeCreate(transactionRequest)) {
      return {
        rawReceipts: [],
        receipts: [],
        outputVariables: 0,
        missingContractIds: [],
      };
    }

    let rawReceipts: TransactionReceiptJson[] = [];
    let receipts: TransactionResultReceipt[] = [];
    const missingContractIds: string[] = [];
    let outputVariables = 0;
    let dryRunStatus: DryRunStatus | undefined;

    await this.validateTransaction(transactionRequest);

    const gasPrice = gasPriceParam ?? (await this.estimateGasPrice(10));

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      const {
        dryRun: [{ receipts: serializedReceipts, status }],
      } = await this.operations.dryRun({
        encodedTransactions: [hexlify(transactionRequest.toTransactionBytes())],
        utxoValidation: false,
        gasPrice: gasPrice.toString(),
      });

      rawReceipts = serializedReceipts;
      receipts = serializedReceipts.map(deserializeReceipt);
      dryRunStatus = status;

      const { missingOutputVariables, missingOutputContractIds } =
        getReceiptsWithMissingData(receipts);

      const hasMissingOutputs =
        missingOutputVariables.length !== 0 || missingOutputContractIds.length !== 0;

      if (hasMissingOutputs && isTransactionTypeScript(transactionRequest)) {
        outputVariables += missingOutputVariables.length;
        transactionRequest.addVariableOutputs(missingOutputVariables.length);
        missingOutputContractIds.forEach(({ contractId }) => {
          transactionRequest.addContractInputAndOutput(new Address(contractId));
          missingContractIds.push(contractId);
        });

        const { maxFee } = await this.estimateTxGasAndFee({
          transactionRequest,
          gasPrice,
        });

        // eslint-disable-next-line no-param-reassign
        transactionRequest.maxFee = maxFee;
      } else {
        break;
      }
    }

    return {
      rawReceipts,
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
      rawReceipts: [],
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
        result.receipts = rawReceipts.map(deserializeReceipt);
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
            request.addContractInputAndOutput(new Address(contractId));
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
      const receipts = rawReceipts.map(deserializeReceipt);
      return { receipts, dryRunStatus: status };
    });

    return results;
  }

  public async autoRefetchConfigs() {
    const now = Date.now();
    const diff = now - (this.consensusParametersTimestamp ?? 0);

    if (diff < 60000) {
      return;
    }

    // no cache? refetch.
    if (!Provider.chainInfoCache?.[this.urlWithoutAuth]) {
      await this.fetchChainAndNodeInfo(true);
      return;
    }

    const chainInfo = Provider.chainInfoCache[this.urlWithoutAuth];

    const {
      consensusParameters: { version: previous },
    } = chainInfo;

    const {
      chain: {
        latestBlock: {
          header: { consensusParametersVersion: current },
        },
      },
    } = await this.operations.getConsensusParametersVersion();

    // old cache? refetch.
    if (previous !== current) {
      // calling with true to skip cache
      await this.fetchChainAndNodeInfo(true);
    }
  }

  /**
   * Estimates the transaction gas and fee based on the provided transaction request.
   * @param params - The parameters for estimating the transaction gas and fee.
   * @returns An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.
   */
  async estimateTxGasAndFee(params: EstimateTxGasAndFeeParams) {
    const { transactionRequest, gasPrice: gasPriceParam } = params;
    let gasPrice = gasPriceParam;

    await this.autoRefetchConfigs();

    const chainInfo = await this.getChain();
    const { gasPriceFactor, maxGasPerTx } = await this.getGasConfig();

    const minGas = transactionRequest.calculateMinGas(chainInfo);
    if (!isDefined(gasPrice)) {
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

      const processedReceipts = receipts.map(deserializeReceipt);

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
    { signatureCallback, gasPrice: gasPriceParam }: TransactionCostParams = {}
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

    let gasPrice: BN;

    if (gasPriceParam) {
      gasPrice = gasPriceParam;
      await this.estimatePredicates(signedRequest);
    } else {
      ({ gasPrice } = await this.estimatePredicatesAndGasPrice(signedRequest, 10));
    }

    txRequestClone.updatePredicateGasUsed(signedRequest.inputs);

    /**
     * Calculate minGas and maxGas based on the real transaction
     */
    // eslint-disable-next-line prefer-const
    let { maxFee, maxGas, minFee, minGas, gasLimit } = await this.estimateTxGasAndFee({
      // Fetches and returns a gas price
      transactionRequest: signedRequest,
      gasPrice,
    });

    let rawReceipts: TransactionReceiptJson[] = [];
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

      ({ rawReceipts, receipts, missingContractIds, outputVariables, dryRunStatus } =
        await this.estimateTxDependencies(txRequestClone, { gasPrice }));

      if (dryRunStatus && 'reason' in dryRunStatus) {
        throw this.extractDryRunError(txRequestClone, receipts, dryRunStatus);
      }

      const { maxGasPerTx } = await this.getGasConfig();

      const pristineGasUsed = getGasUsedFromReceipts(receipts);
      gasUsed = bn(pristineGasUsed.muln(GAS_USED_MODIFIER)).max(maxGasPerTx.sub(minGas));
      txRequestClone.gasLimit = gasUsed;

      ({ maxFee, maxGas, minFee, minGas } = await this.estimateTxGasAndFee({
        transactionRequest: txRequestClone,
        gasPrice,
      }));
    }

    const transactionSummary: TransactionSummaryJsonPartial = {
      gasPrice: gasPrice.toString(),
      receipts: rawReceipts,
    };

    return {
      rawReceipts,
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
      transactionSummary,
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
    owner: AddressInput,
    assetId?: BytesLike,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetCoinsResponse> {
    const ownerAddress = new Address(owner);
    const {
      coins: { edges, pageInfo },
    } = await this.operations.getCoins({
      ...validatePaginationArgs({
        paginationLimit: RESOURCES_PAGE_SIZE_LIMIT,
        inputArgs: paginationArgs,
      }),
      filter: { owner: ownerAddress.toB256(), assetId: assetId && hexlify(assetId) },
    });

    const coins = edges.map(({ node }) => ({
      id: node.utxoId,
      assetId: node.assetId,
      amount: bn(node.amount),
      owner: ownerAddress,
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
    owner: AddressInput,
    quantities: CoinQuantityLike[],
    excludedIds?: ExcludeResourcesOption
  ): Promise<Resource[]> {
    const ownerAddress = new Address(owner);
    let idsToExclude = {
      messages: excludedIds?.messages?.map((nonce) => hexlify(nonce)) || [],
      utxos: excludedIds?.utxos?.map((id) => hexlify(id)) || [],
    };

    if (this.cache) {
      const cached = this.cache.getActiveData(ownerAddress.toB256());
      if (cached.utxos.length || cached.messages.length) {
        const {
          consensusParameters: {
            txParameters: { maxInputs },
          },
        } = await this.getChain();
        idsToExclude = adjustResourcesToExclude({
          userInput: idsToExclude,
          cached,
          maxInputs: maxInputs.toNumber(),
        });
      }
    }

    const coinsQuery = {
      owner: ownerAddress.toB256(),
      queryPerAsset: quantities
        .map(coinQuantityfy)
        .map(({ assetId, amount, max: maxPerAsset }) => ({
          assetId: hexlify(assetId),
          amount: (amount.eqn(0) ? bn(1) : amount).toString(10),
          max: maxPerAsset ? maxPerAsset.toString(10) : undefined,
        })),
      excludedIds: idsToExclude,
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
              sender: new Address(coin.sender),
              recipient: new Address(coin.recipient),
              nonce: coin.nonce,
            } as MessageCoin;
          case 'Coin':
            return {
              id: coin.utxoId,
              amount: bn(coin.amount),
              assetId: coin.assetId,
              owner: ownerAddress,
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
  async getBlock(idOrHeight: BigNumberish | 'latest'): Promise<Block | null> {
    let block: GqlBlockFragment | undefined | null;

    if (idOrHeight === 'latest') {
      const {
        chain: { latestBlock },
      } = await this.operations.getLatestBlock();
      block = latestBlock;
    } else {
      const isblockId = typeof idOrHeight === 'string' && isB256(idOrHeight);
      const variables = isblockId
        ? { blockId: idOrHeight }
        : { height: bn(idOrHeight).toString(10) };
      const response = await this.operations.getBlock(variables);
      block = response.block;
    }

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
      ...validatePaginationArgs({
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
    idOrHeight: BigNumberish | 'latest'
  ): Promise<(Block & { transactions: Transaction[] }) | null> {
    let variables;
    if (typeof idOrHeight === 'number') {
      variables = { blockHeight: bn(idOrHeight).toString(10) };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: (await this.getBlockNumber()).toString() };
    } else if (typeof idOrHeight === 'string' && isB256(idOrHeight)) {
      variables = { blockId: idOrHeight };
    } else {
      variables = { blockHeight: bn(idOrHeight).toString() };
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
    } = await this.operations.getTransactions({
      ...validatePaginationArgs({
        inputArgs: paginationArgs,
        paginationLimit: TRANSACTIONS_PAGE_SIZE_LIMIT,
      }),
    });

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
   * Fetches a compressed block at the specified height.
   *
   * @param height - The height of the block to fetch.
   * @returns The compressed block if available, otherwise `null`.
   */
  async daCompressedBlock(height: string) {
    const { daCompressedBlock } = await this.operations.daCompressedBlock({
      height,
    });

    if (!daCompressedBlock) {
      return null;
    }

    return daCompressedBlock;
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
    contractId: string | Address,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const { contractBalance } = await this.operations.getContractBalance({
      contract: new Address(contractId).toB256(),
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
    owner: AddressInput,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<BN> {
    const ownerStr = new Address(owner).toB256();
    const assetIdStr = hexlify(assetId);

    if (!this.features.amount128) {
      const { balance } = await this.operations.getBalance({
        owner: ownerStr,
        assetId: assetIdStr,
      });
      return bn(balance.amount, 10);
    }

    const { balance } = await this.operations.getBalanceV2({
      owner: ownerStr,
      assetId: assetIdStr,
    });
    return bn(balance.amountU128, 10);
  }

  /**
   * Returns balances for the given owner.
   *
   * @param owner - The address to get coins for.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the balances.
   */
  async getBalances(
    owner: string | Address,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetBalancesResponse> {
    if (!this.features.balancePagination) {
      return this.getBalancesV1(owner, paginationArgs);
    }

    return this.getBalancesV2(owner, paginationArgs);
  }

  /**
   * @hidden
   */
  private async getBalancesV1(
    owner: string | Address,
    _paginationArgs?: CursorPaginationArgs
  ): Promise<GetBalancesResponse> {
    const {
      balances: { edges },
    } = await this.operations.getBalances({
      /**
       * The query parameters for this method were designed to support pagination,
       * but the current Fuel-Core implementation does not support pagination yet.
       */
      first: 10000,
      filter: { owner: new Address(owner).toB256() },
    });

    const balances = edges.map(({ node }) => ({
      assetId: node.assetId,
      amount: bn(node.amount),
    }));

    return { balances };
  }

  /**
   * @hidden
   */
  private async getBalancesV2(
    owner: string | Address,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetBalancesResponse> {
    const {
      balances: { edges, pageInfo },
    } = await this.operations.getBalancesV2({
      ...validatePaginationArgs({
        inputArgs: paginationArgs,
        paginationLimit: BALANCES_PAGE_SIZE_LIMIT,
      }),
      filter: { owner: new Address(owner).toB256() },
    });

    const balances = edges.map(({ node }) => ({
      assetId: node.assetId,
      amount: bn(node.amountU128),
    }));

    return { balances, pageInfo };
  }

  /**
   * Returns message for the given address.
   *
   * @param address - The address to get message from.
   * @param paginationArgs - Pagination arguments (optional).
   * @returns A promise that resolves to the messages.
   */
  async getMessages(
    address: AddressInput,
    paginationArgs?: CursorPaginationArgs
  ): Promise<GetMessagesResponse> {
    const {
      messages: { edges, pageInfo },
    } = await this.operations.getMessages({
      ...validatePaginationArgs({
        inputArgs: paginationArgs,
        paginationLimit: RESOURCES_PAGE_SIZE_LIMIT,
      }),
      owner: new Address(address).toB256(),
    });

    const messages = edges.map(({ node }) => ({
      messageId: InputMessageCoder.getMessageId({
        sender: node.sender,
        recipient: node.recipient,
        nonce: node.nonce,
        amount: bn(node.amount),
        data: node.data,
      }),
      sender: new Address(node.sender),
      recipient: new Address(node.recipient),
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
  ): Promise<MessageProof> {
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
        // Convert BN into a number string required on the query
        // This should probably be fixed on the fuel client side
        commitBlockHeight: commitBlockHeight.toNumber().toString(),
      };
    }

    const result = await this.operations.getMessageProof(inputObject);

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
      sender: new Address(sender),
      recipient: new Address(recipient),
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
   * Check if the given ID is an account.
   *
   * @param id - The ID to check.
   * @returns A promise that resolves to the result of the check.
   */
  async isUserAccount(id: string): Promise<boolean> {
    const type = await this.getAddressType(id);
    return type === 'Account';
  }

  /**
   * Determines the type of address based on the provided ID.
   *
   * @param id - The ID to be checked.
   * @returns A promise that resolves to a string indicating the type of address.
   */
  async getAddressType(id: string): Promise<GetAddressTypeResponse> {
    const { contract, blob, transaction } = await this.operations.isUserAccount({
      blobId: id,
      contractId: id,
      transactionId: id,
    });

    if (contract) {
      return 'Contract';
    }
    if (blob) {
      return 'Blob';
    }
    if (transaction) {
      return 'Transaction';
    }

    try {
      // Unlike the previous queries this one will throw if the ID is not an assetId
      const asset = await this.getAssetDetails(id);
      if (asset) {
        return 'Asset';
      }
    } catch (e) {}

    return 'Account';
  }

  /**
   * Get the transaction response for the given transaction ID.
   *
   * @param transactionId - The transaction ID to get the response for.
   * @returns A promise that resolves to the transaction response.
   */

  async getTransactionResponse(transactionId: string): Promise<TransactionResponse> {
    const chainId = await this.getChainId();
    return new TransactionResponse(transactionId, this, chainId);
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
        nonce,
        amount: bn(rawMessage.amount),
        data: rawMessage.data,
      }),
      sender: new Address(rawMessage.sender),
      recipient: new Address(rawMessage.recipient),
      nonce,
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

  /**
   * @hidden
   */
  private parseEstimatePredicatesResponse<T extends TransactionRequest>(
    transactionRequest: T,
    { inputs }: GqlEstimatePredicatesQuery['estimatePredicates']
  ): T {
    if (inputs) {
      inputs.forEach((input, i) => {
        if (input && 'predicateGasUsed' in input && bn(input.predicateGasUsed).gt(0)) {
          // eslint-disable-next-line no-param-reassign
          (<CoinTransactionRequestInput>transactionRequest.inputs[i]).predicateGasUsed =
            input.predicateGasUsed;
        }
      });
    }

    return transactionRequest;
  }
}
