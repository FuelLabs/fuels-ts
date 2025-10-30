import type { AddressInput } from '@fuel-ts/address';
import { Address, isB256 } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BigNumberish, BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import { InputMessageCoder, TransactionCoder, TransactionType } from '@fuel-ts/transactions';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify, DateTime, isDefined, sleep } from '@fuel-ts/utils';
import { checkFuelCoreVersionCompatibility, versions } from '@fuel-ts/versions';
import type { DocumentNode } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import type { GraphQLClientResponse, GraphQLResponse } from 'graphql-request/src/types';
import gql from 'graphql-tag';
import { clone } from 'ramda';

import type { Account } from '../account';

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
  GqlExcludeInput,
} from './__generated__/operations';
import { resolveAccountForAssembleTxParams } from './assemble-tx-helpers';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { FuelGraphqlSubscriber } from './fuel-graphql-subscriber';
import type { Message, MessageCoin, MessageProof, MessageStatus } from './message';
import type { Resource } from './resource';
import { ResourceCache } from './resource-cache';
import type {
  TransactionRequestLike,
  TransactionRequest,
  TransactionRequestInput,
  JsonAbisFromAllCalls,
  ScriptTransactionRequest,
  CoinTransactionRequestInput,
} from './transaction-request';
import {
  isPredicate,
  isTransactionTypeCreate,
  isTransactionTypeScript,
  transactionRequestify,
  validateTransactionForAssetBurn,
} from './transaction-request';
import type { DecodedLogs, TransactionResultReceipt } from './transaction-response';
import { TransactionResponse, getAllDecodedLogs } from './transaction-response';
import {
  calculateGasFee,
  extractTxError,
  getGasUsedFromReceipts,
  getReceiptsWithMissingData,
} from './utils';
import type { RetryOptions } from './utils/auto-retry-fetch';
import { autoRetryFetch, getWaitDelay } from './utils/auto-retry-fetch';
import { assertGqlResponseHasNoErrors } from './utils/handle-gql-error-message';
import { parseGraphqlResponse } from './utils/parse-graphql-response';
import type { ProviderCacheJson, TransactionSummaryJsonPartial } from './utils/serialization';
import {
  deserializeChain,
  deserializeNodeInfo,
  deserializeProviderCache,
  deserializeReceipt,
  deserializeInput,
  deserializeOutput,
} from './utils/serialization';
import { validatePaginationArgs } from './utils/validate-pagination-args';

const MAX_RETRIES = 10;

export const RESOURCES_PAGE_SIZE_LIMIT = 512;
export const TRANSACTIONS_PAGE_SIZE_LIMIT = 60;
export const BALANCES_PAGE_SIZE_LIMIT = 100;
export const NON_PAGINATED_BALANCES_SIZE = 10000;
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

export type ResourcesIdsToIgnore = {
  utxos?: BytesLike[];
  messages?: BytesLike[];
};

export type AccountCoinQuantity = {
  assetId: string;
  amount: BigNumberish;
  account?: Account;
  changeOutputAccount?: Account;
};

// #region assemble-tx-params
export type AssembleTxParams<T extends TransactionRequest = TransactionRequest> = {
  // The transaction request to assemble
  request: T;
  // Coin quantities required for the transaction, optional if transaction only needs funds for the fee
  accountCoinQuantities?: AccountCoinQuantity[];
  // Account that will pay for the transaction fees
  feePayerAccount: Account;
  // Block horizon for gas price estimation (default: 10)
  blockHorizon?: number;
  // Whether to estimate predicates (default: true)
  estimatePredicates?: boolean;
  // Resources to be ignored when funding the transaction (optional)
  resourcesIdsToIgnore?: ResourcesIdsToIgnore;
  // Amount of gas to reserve (optional)
  reserveGas?: BigNumberish;
};

export type AssembleTxResponse<T extends TransactionRequest = TransactionRequest> = {
  assembledRequest: T;
  gasPrice: BN;
  receipts: TransactionResultReceipt[];
  rawReceipts: TransactionReceiptJson[];
};
// #endregion assemble-tx-params
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
  latestBlock: {
    header: {
      consensusParametersVersion: string;
    };
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
  indexation: {
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
  /**
   * Whether to include the pre-confirmation status for the transaction.
   */
  includePreConfirmation?: boolean;
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

const WRITE_OPERATIONS: Array<keyof SdkOperations> = [
  'submit',
  'submitAndAwaitStatus',
  'produceBlocks',
];

/**
 * A provider for connecting to a node
 */
export default class Provider {
  operations: SdkOperations;
  cache?: ResourceCache;

  /**
   * @hidden
   * @param url - If provided, clears cache only for given url
   */
  static clearChainAndNodeCaches(url?: string) {
    if (url) {
      delete Provider.inflightFetchChainAndNodeInfoRequests[url];
      delete Provider.chainInfoCache[url];
      delete Provider.nodeInfoCache[url];
      delete Provider.currentBlockHeightCache[url];
      return;
    }
    Provider.inflightFetchChainAndNodeInfoRequests = {};
    Provider.nodeInfoCache = {};
    Provider.chainInfoCache = {};
    Provider.currentBlockHeightCache = {};
  }

  /** @hidden */
  public url: string;
  /** @hidden */
  private urlWithoutAuth: string;

  /**
   * Governs whether to include the required block height in the request body
   * for block-sensitive operations like when submitting a transaction.
   *
   * This ensures that the operation is executed at the correct block height,
   * regardless of which node in the network the request is routed to.
   *
   * `true` by default.
   */
  public static ENABLE_RPC_CONSISTENCY: boolean = true;
  /** @hidden */
  private static inflightFetchChainAndNodeInfoRequests: Record<
    string,
    Promise<{ consensusParametersTimestamp: number }>
  > = {};

  /** @hidden */
  private static chainInfoCache: ChainInfoCache = {};
  /** @hidden */
  private static nodeInfoCache: NodeInfoCache = {};
  /** @hidden */
  private static currentBlockHeightCache: Record<string, number> = {};
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

  private static extractOperationName(body: BodyInit | undefined | null) {
    return body?.toString().match(/"operationName":"(.+)"/)?.[1] as keyof SdkOperations;
  }

  private static isWriteOperation(body: BodyInit | undefined | null) {
    return WRITE_OPERATIONS.includes(this.extractOperationName(body));
  }

  private static normalizeUrl(url: string) {
    return url.replace(/-sub$/, '');
  }

  private static hasWriteOperationHappened(url: string) {
    return isDefined(Provider.currentBlockHeightCache[this.normalizeUrl(url)]);
  }

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

      if (Provider.ENABLE_RPC_CONSISTENCY && Provider.hasWriteOperationHappened(url)) {
        Provider.applyBlockHeight(fullRequest, url);
      }

      const response = await Provider.fetchAndProcessBlockHeight(url, fullRequest, options);
      if (response.body === null) {
        throw new FuelError(
          ErrorCode.RESPONSE_BODY_EMPTY,
          'The response from the server is missing the body',
          { timestamp: new Date().toISOString(), request, response }
        );
      }

      return response;
    }, retryOptions);
  }

  private static applyBlockHeight(request: RequestInit, url: string) {
    const normalizedUrl = this.normalizeUrl(url);

    // Apply the block height to the request
    const currentBlockHeight = Provider.currentBlockHeightCache[normalizedUrl] ?? 0;
    request.body = request.body
      ?.toString()
      .replace(/}$/, `,"extensions":{"required_fuel_block_height":${currentBlockHeight}}}`);
  }

  private static async fetchAndProcessBlockHeight(
    url: string,
    request: RequestInit,
    options: ProviderOptions
  ): Promise<Response> {
    const fetchFn = () =>
      options.fetch ? options.fetch(url, request, options) : fetch(url, request);

    const isWriteOperation = Provider.isWriteOperation(request.body);

    // If it is a write operation, we will initialize the block height cache
    if (isWriteOperation && !Provider.hasWriteOperationHappened(url)) {
      Provider.currentBlockHeightCache[Provider.normalizeUrl(url)] = 0;
    }

    let response: Response = await fetchFn();

    if (!Provider.ENABLE_RPC_CONSISTENCY) {
      return response;
    }

    const retryOptions: RetryOptions = {
      maxRetries: 5,
      baseDelay: 500,
    };

    for (let retriesLeft = retryOptions.maxRetries; retriesLeft > 0; --retriesLeft) {
      if (response.body) {
        const { extensions } = await parseGraphqlResponse({
          response,
          isSubscription: url.endsWith('-sub'),
        });
        Provider.setCurrentBlockHeight(url, extensions?.current_fuel_block_height);

        if (!extensions?.fuel_block_height_precondition_failed) {
          break;
        }
      }

      const retryAttempt = retryOptions.maxRetries - retriesLeft + 1;
      const sleepTime = getWaitDelay(retryOptions, retryAttempt);
      await sleep(sleepTime);

      response = await fetchFn();
    }

    return response;
  }

  private static setCurrentBlockHeight(url: string, height?: number) {
    /**
     * If the height is undefined, there is nothing to set. We can also return early if
     * no write operation has happened yet, as it means the 'currentBlockHeightCache' was
     * not initialized and the current block height should not be used.
     */
    const writeOperationHappened = Provider.hasWriteOperationHappened(url);
    if (!isDefined(height) || !writeOperationHappened) {
      return;
    }

    const normalizedUrl = Provider.normalizeUrl(url);

    if (height > Provider.currentBlockHeightCache[normalizedUrl]) {
      Provider.currentBlockHeightCache[normalizedUrl] = height;
    }
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
    await this.fetchChainAndNodeInfo();
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
    await this.init();

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
    const nodeInfo: NodeInfo | undefined = Provider.nodeInfoCache[this.urlWithoutAuth];
    const chain: ChainInfo | undefined = Provider.chainInfoCache[this.urlWithoutAuth];

    // If we have a cache and we're not ignoring it, return the cache
    const hasCache = nodeInfo && chain;
    if (hasCache && !ignoreCache) {
      return { nodeInfo, chain };
    }

    // Obtain any inflight requests from other instances of Provider
    const inflightRequest: Promise<{ consensusParametersTimestamp: number }> =
      Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];

    // If there is an inflight request, then wait for it to resolve and return the cached values
    if (inflightRequest) {
      return inflightRequest.then((data) => {
        this.consensusParametersTimestamp = data.consensusParametersTimestamp;
        return {
          nodeInfo: Provider.nodeInfoCache[this.urlWithoutAuth],
          chain: Provider.chainInfoCache[this.urlWithoutAuth],
        };
      });
    }

    // If there is no inflight request, then fetch the chain and node info from the network
    const getChainAndNodeInfoFromNetwork = this.operations
      .getChainAndNodeInfo()
      .then((data) => ({
        chain: deserializeChain(data.chain),
        nodeInfo: deserializeNodeInfo(data.nodeInfo),
        consensusParametersTimestamp: Date.now(),
      }))
      .then((data) => {
        Provider.setIncompatibleNodeVersionMessage(data.nodeInfo);
        Provider.chainInfoCache[this.urlWithoutAuth] = data.chain;
        Provider.nodeInfoCache[this.urlWithoutAuth] = data.nodeInfo;
        this.consensusParametersTimestamp = data.consensusParametersTimestamp;
        return data;
      })
      .catch((err) => {
        const error = new FuelError(
          FuelError.CODES.CONNECTION_REFUSED,
          'Unable to fetch chain and node info from the network',
          { url: this.urlWithoutAuth },
          err
        );
        error.cause = { code: 'ECONNREFUSED' };

        throw error;
      })
      .finally(() => {
        delete Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth];
      });

    // Set the inflight request to the network request
    Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth] =
      getChainAndNodeInfoFromNetwork;

    // Return the cached values once the network request resolves
    return Provider.inflightFetchChainAndNodeInfoRequests[this.urlWithoutAuth].then((data) => {
      this.consensusParametersTimestamp = data.consensusParametersTimestamp;
      return {
        nodeInfo: Provider.nodeInfoCache[this.urlWithoutAuth],
        chain: Provider.chainInfoCache[this.urlWithoutAuth],
      };
    });
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
        name: { kind: 'Name'; value: string };
      };
      const isSubscription = opDefinition?.operation === 'subscription';

      if (isSubscription) {
        return FuelGraphqlSubscriber.create({
          url: this.urlWithoutAuth,
          query,
          fetchFn: (url, requestInit) => fetchFn(url as string, requestInit, this.options),
          variables: vars,
          operationName: opDefinition.name.value,
          onEvent: (event) => {
            Provider.setCurrentBlockHeight(
              this.urlWithoutAuth,
              event.extensions?.current_fuel_block_height as number
            );
          },
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
  async getAssetDetails(assetId: string): Promise<GetAssetDetailsResponse | null> {
    const { assetMetadata } = await this.getNodeFeatures();

    if (!assetMetadata) {
      throw new FuelError(
        ErrorCode.UNSUPPORTED_FEATURE,
        'The current node does not supports fetching asset details'
      );
    }

    const { assetDetails } = await this.operations.getAssetDetails({ assetId });

    if (!assetDetails) {
      return null;
    }

    const { contractId, subId, totalSupply } = assetDetails ?? {};

    return {
      subId: subId ?? '',
      contractId: contractId ?? '',
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
    {
      enableAssetBurn,
      estimateTxDependencies = true,
      includePreConfirmation: _includePreConfirmation = true,
    }: ProviderSendTxParams = {}
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
    const subscription = await this.operations.submitAndAwaitStatus({
      encodedTransaction,
      includePreConfirmation: true,
    });

    this.#cacheInputs(
      transactionRequest.inputs,
      transactionRequest.getTransactionId(await this.getChainId())
    );

    const chainId = await this.getChainId();
    return new TransactionResponse({
      transactionRequestOrId: transactionRequest,
      provider: this,
      chainId,
      abis,
      submitAndAwaitSubscription: subscription,
    });
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
      latestBlock: {
        header: { consensusParametersVersion: previous },
      },
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
   *
   * @deprecated Use provider.assembleTx instead
   * Check the migration guide https://docs.fuel.network/docs/fuels-ts/transactions/assemble-tx-migration-guide/ for more information.
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
        throw this.extractDryRunError(txRequestClone, receipts, dryRunStatus.reason);
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
   * Assembles a transaction by completely estimating and funding it.
   *
   * @param params - Parameters used to assemble the transaction.
   *
   * @returns The assembled transaction request, estimated gas price, and receipts
   */
  async assembleTx<T extends TransactionRequest>(
    params: AssembleTxParams<T>
  ): Promise<AssembleTxResponse<T>> {
    const {
      request,
      reserveGas,
      resourcesIdsToIgnore,
      feePayerAccount,
      blockHorizon = 10,
      estimatePredicates = true,
      accountCoinQuantities = [],
    } = params;

    /**
     * A set of all addresses that are involved in the transaction. This is used later
     * to recover cached resources IDs from these users.
     */
    const allAddresses = new Set<string>();
    const baseAssetId = await this.getBaseAssetId();

    /**
     * Setting the index of the fee payer account to -1 as we don't know it yet.
     */
    let feePayerIndex = -1;

    /**
     * The change output for the base asset.
     */
    let baseAssetChange: string | undefined;

    const requiredBalances = accountCoinQuantities.map((quantity, index) => {
      // When the `account` property is not provided, it defaults to the fee payer account.
      const { amount, assetId, account = feePayerAccount, changeOutputAccount } = quantity;

      const changeAccountAddress = changeOutputAccount
        ? changeOutputAccount.address.toB256()
        : account.address.toB256();

      allAddresses.add(account.address.toB256());

      const changePolicy = {
        change: changeAccountAddress,
      };

      if (assetId === baseAssetId) {
        baseAssetChange = changePolicy.change;
      }

      /**
       * If the account is the same as the fee payer account, set the index to the current index.
       */
      if (account.address.equals(feePayerAccount.address)) {
        feePayerIndex = index;
      }

      const requiredBalance = {
        account: resolveAccountForAssembleTxParams(account),
        amount: bn(amount).toString(10),
        assetId,
        changePolicy,
      };

      return requiredBalance;
    });

    /**
     * If the fee payer index is still -1, it means that the fee payer account was not added to the required balances.
     */
    if (feePayerIndex === -1) {
      allAddresses.add(feePayerAccount.address.toB256());

      const newLength = requiredBalances.push({
        account: resolveAccountForAssembleTxParams(feePayerAccount),
        amount: bn(0).toString(10), // Since the correct fee amount cannot be determined yet, we can use 0
        assetId: baseAssetId,
        changePolicy: {
          change: baseAssetChange || feePayerAccount.address.toB256(),
        },
      });

      feePayerIndex = newLength - 1;
    }

    /**
     * Retrieving from the cache the resources IDs that should be excluded based on the addresses
     * that are involved in the transaction.
     */
    const excludeInput = await this.adjustResourcesToIgnoreForAddresses(
      Array.from(allAddresses),
      resourcesIdsToIgnore
    );

    const {
      assembleTx: { status, transaction: gqlTransaction, gasPrice },
    } = await this.operations.assembleTx({
      tx: hexlify(request.toTransactionBytes()),
      blockHorizon: String(blockHorizon),
      feeAddressIndex: String(feePayerIndex),
      requiredBalances,
      estimatePredicates,
      excludeInput,
      reserveGas: reserveGas ? bn(reserveGas).toString(10) : undefined,
    });

    if (status.type === 'DryRunFailureStatus') {
      const parsedReceipts = status.receipts.map(deserializeReceipt);

      throw this.extractDryRunError(request, parsedReceipts, status.reason);
    }

    request.witnesses = gqlTransaction.witnesses || request.witnesses;

    request.inputs = gqlTransaction.inputs?.map(deserializeInput) || request.inputs;
    request.outputs = gqlTransaction.outputs?.map(deserializeOutput) || request.outputs;

    if (gqlTransaction.policies?.maxFee) {
      request.maxFee = bn(gqlTransaction.policies.maxFee);
    }

    if (request.type === TransactionType.Script) {
      request.gasLimit = bn(gqlTransaction.scriptGasLimit).add(bn(reserveGas));
    }

    const rawReceipts = status.receipts;
    const chainId = await this.getChainId();

    request.updateState(chainId, 'funded', {
      gasPrice: gasPrice.toString(),
      receipts: rawReceipts,
    });

    return {
      assembledRequest: request,
      gasPrice: bn(gasPrice),
      receipts: status.receipts.map(deserializeReceipt),
      rawReceipts,
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
   * @param resourcesIdsToIgnore - IDs of excluded resources from the selection (optional).
   * @returns A promise that resolves to the resources.
   */
  async getResourcesToSpend(
    owner: AddressInput,
    quantities: CoinQuantityLike[],
    resourcesIdsToIgnore?: ResourcesIdsToIgnore
  ): Promise<Resource[]> {
    const ownerAddress = new Address(owner);

    const excludedIds = await this.adjustResourcesToIgnoreForAddresses(
      [ownerAddress.b256Address],
      resourcesIdsToIgnore
    );

    const coinsQuery = {
      owner: ownerAddress.toB256(),
      queryPerAsset: quantities
        .map(coinQuantityfy)
        .map(({ assetId, amount, max: maxPerAsset }) => ({
          assetId: hexlify(assetId),
          amount: (amount.eqn(0) ? bn(1) : amount).toString(10),
          max: maxPerAsset ? maxPerAsset.toString(10) : undefined,
        })),
      excludedIds,
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
    const { balance } = await this.operations.getBalanceV2({
      owner: new Address(owner).toB256(),
      assetId: hexlify(assetId),
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
    // The largest possible size allowed by the node.
    let args: CursorPaginationArgs = { first: NON_PAGINATED_BALANCES_SIZE };

    const { balancesPagination: supportsPagination } = await this.getNodeFeatures();

    if (supportsPagination) {
      // If the node supports pagination, we use the provided pagination arguments.
      args = validatePaginationArgs({
        inputArgs: paginationArgs,
        paginationLimit: BALANCES_PAGE_SIZE_LIMIT,
      });
    }

    const {
      balances: { edges, pageInfo },
    } = await this.operations.getBalancesV2({
      ...args,
      filter: { owner: new Address(owner).toB256() },
      supportsPagination,
    });

    const balances = edges.map(({ node }) => ({
      assetId: node.assetId,
      amount: bn(node.amountU128),
    }));

    return {
      balances,
      ...(supportsPagination ? { pageInfo } : {}),
    };
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
    return new TransactionResponse({
      transactionRequestOrId: transactionId,
      provider: this,
      chainId,
    });
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
    transactionRequest: TransactionRequest,
    receipts: TransactionResultReceipt[],
    reason: string
  ): FuelError {
    let logs: DecodedLogs['logs'] = [];
    let groupedLogs: DecodedLogs['groupedLogs'] = {};
    let abis: JsonAbisFromAllCalls | undefined;

    if (transactionRequest.type === TransactionType.Script && transactionRequest.abis) {
      ({ logs, groupedLogs } = getAllDecodedLogs({
        receipts,
        mainAbi: transactionRequest.abis.main,
        externalAbis: transactionRequest.abis.otherContractsAbis,
      }));

      abis = transactionRequest.abis;
    }

    return extractTxError({
      logs,
      groupedLogs,
      receipts,
      statusReason: reason,
      abis,
    });
  }

  /**
   * @hidden
   */
  async getNodeFeatures() {
    const { indexation } = await this.getNode();

    return {
      assetMetadata: Boolean(indexation?.assetMetadata),
      balancesPagination: Boolean(indexation?.balances),
      coinsToSpend: Boolean(indexation?.coinsToSpend),
    };
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

  /**
   * @hidden
   *
   * This helper adjusts the resources to be excluded for a given set of addresses.
   * Supporting multiple addresses is important because of the `assembleTx` method,
   * which may be invoked with different addresses. It handles both messages and UTXOs,
   * ensuring the total number of inputs does not exceed the maximum allowed by the chain's
   * consensus parameters. The resources specified in the `resourcesIdsToIgnore` parameter have priority
   * over those retrieved from the cache.
   */
  private async adjustResourcesToIgnoreForAddresses(
    addresses: string[],
    resourcesIdsToIgnore?: ResourcesIdsToIgnore
  ): Promise<GqlExcludeInput> {
    const final = {
      messages: resourcesIdsToIgnore?.messages?.map((nonce) => hexlify(nonce)) || [],
      utxos: resourcesIdsToIgnore?.utxos?.map((id) => hexlify(id)) || [],
    };

    if (this.cache) {
      const cache = this.cache;
      const allCached = addresses.map((address) => cache.getActiveData(address));

      const {
        consensusParameters: {
          txParameters: { maxInputs: maxInputsBn },
        },
      } = await this.getChain();

      const maxInputs = maxInputsBn.toNumber();

      for (let i = 0; i < allCached.length; i++) {
        let total = final.utxos.length + final.messages.length;
        if (total >= maxInputs) {
          break;
        }

        final.utxos = [...final.utxos, ...allCached[i].utxos.slice(0, maxInputs - total)];

        total = final.utxos.length + final.messages.length;

        if (total >= maxInputs) {
          break;
        }

        final.messages = [...final.messages, ...allCached[i].messages.slice(0, maxInputs - total)];
      }
    }

    return final;
  }
}
