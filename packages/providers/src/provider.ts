import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { max, bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import {
  InputType,
  TransactionType,
  InputMessageCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { getDifferenceToUserFuelCoreVersion } from '@fuel-ts/versions';
import { print } from 'graphql';
import { GraphQLClient } from 'graphql-request';
import type { Client } from 'graphql-sse';
import { createClient } from 'graphql-sse';
import { clone } from 'ramda';

import { getSdk as getOperationsSdk } from './__generated__/operations';
import type {
  GqlChainInfoFragmentFragment,
  GqlGetBlocksQueryVariables,
} from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { MemoryCache } from './memory-cache';
import type { Message, MessageCoin, MessageProof } from './message';
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
import { calculateTransactionFee, fromUnixToTai64, getReceiptsWithMissingData } from './utils';

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
};

/**
 * Chain information
 */
export type ChainInfo = {
  name: string;
  baseChainHeight: BN;
  peerCount: number;
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
  minGasPrice: BN;
  maxTx: BN;
  maxDepth: BN;
  nodeVersion: string;
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
  minGasPrice: BN;
  gasPrice: BN;
  gasUsed: BN;
  fee: BN;
};
// #endregion cost-estimation-1

const processGqlChain = (chain: GqlChainInfoFragmentFragment): ChainInfo => {
  const { name, baseChainHeight, peerCount, consensusParameters, latestBlock } = chain;

  return {
    name,
    baseChainHeight: bn(baseChainHeight),
    peerCount,
    consensusParameters: {
      contractMaxSize: bn(consensusParameters.contractMaxSize),
      maxInputs: bn(consensusParameters.maxInputs),
      maxOutputs: bn(consensusParameters.maxOutputs),
      maxWitnesses: bn(consensusParameters.maxWitnesses),
      maxGasPerTx: bn(consensusParameters.maxGasPerTx),
      maxScriptLength: bn(consensusParameters.maxScriptLength),
      maxScriptDataLength: bn(consensusParameters.maxScriptDataLength),
      maxStorageSlots: bn(consensusParameters.maxStorageSlots),
      maxPredicateLength: bn(consensusParameters.maxPredicateLength),
      maxPredicateDataLength: bn(consensusParameters.maxPredicateDataLength),
      maxGasPerPredicate: bn(consensusParameters.maxGasPerPredicate),
      gasPriceFactor: bn(consensusParameters.gasPriceFactor),
      gasPerByte: bn(consensusParameters.gasPerByte),
      maxMessageDataLength: bn(consensusParameters.maxMessageDataLength),
      chainId: bn(consensusParameters.chainId),
    },
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

export type BuildPredicateOptions = {
  fundTransaction?: boolean;
} & Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'>;

export type FetchRequestOptions = {
  method: 'POST';
  headers: { [key: string]: string };
  body: string;
};

export type CustomFetch<R extends Response = Response> = (
  url: string,
  options: FetchRequestOptions,
  providerOptions?: Partial<Omit<ProviderOptions<R>, 'fetch'>>
) => Promise<R>;
/*
 * Provider initialization options
 */
export type ProviderOptions<FetchResponse extends Response = Response> = {
  fetch: CustomFetch<FetchResponse> | undefined;
  cacheUtxo: number | undefined;
  timeout: number | undefined;
};
/**
 * Provider Call transaction params
 */
export type ProviderCallParams = {
  utxoValidation?: boolean;
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
  operations!: ReturnType<typeof getOperationsSdk>;
  #subscriptionClient!: Client;

  cache?: MemoryCache;
  options: ProviderOptions = {
    timeout: undefined,
    cacheUtxo: undefined,
    fetch: undefined,
  };

  private static getFetchFn(options: ProviderOptions) {
    return options.fetch !== undefined
      ? options.fetch
      : (url: string, request: FetchRequestOptions) =>
          fetch(url, {
            ...request,
            signal:
              options.timeout !== undefined ? AbortSignal.timeout(options.timeout) : undefined,
          });
  }

  static chainInfoCache: ChainInfoCache = {};
  static nodeInfoCache: NodeInfoCache = {};

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
    options: Partial<ProviderOptions> = {}
  ) {
    this.options = { ...this.options, ...options };
    this.createOperations();
    this.cache = this.options.cacheUtxo ? new MemoryCache(this.options.cacheUtxo) : undefined;
  }

  /**
   * Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.
   * @param url - GraphQL endpoint of the Fuel node
   * @param options - Additional options for the provider
   */
  static async create(url: string, options: Partial<ProviderOptions> = {}) {
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
    const { maxGasPerTx, maxGasPerPredicate, gasPriceFactor, gasPerByte } =
      this.getChain().consensusParameters;
    return {
      minGasPrice,
      maxGasPerTx,
      maxGasPerPredicate,
      gasPriceFactor,
      gasPerByte,
    };
  }

  /**
   * Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.
   */
  async switchUrl(url: string) {
    this.url = url;
    this.createOperations();
    await this.fetchChainAndNodeInfo();
  }

  /**
   * Retrieves and caches chain and node information if not already cached.
   *
   * - Checks the cache for existing chain and node information based on the current URL.
   * - If not found in cache, fetches the information, caches it, and then returns the data.
   *
   * @returns NodeInfo and Chain
   */
  async fetchChainAndNodeInfo() {
    let nodeInfo = Provider.nodeInfoCache[this.url];
    let chain = Provider.chainInfoCache[this.url];

    if (!nodeInfo) {
      nodeInfo = await this.fetchNode();
      Provider.nodeInfoCache[this.url] = nodeInfo;
    }

    if (!chain) {
      chain = await this.fetchChain();
      Provider.chainInfoCache[this.url] = chain;
    }

    Provider.ensureClientVersionIsSupported(nodeInfo);

    return {
      chain,
      nodeInfo,
    };
  }

  private static ensureClientVersionIsSupported(nodeInfo: NodeInfo) {
    const { difference, userVersion } = getDifferenceToUserFuelCoreVersion(nodeInfo.nodeVersion);

    if (difference === 'major' || difference === 'minor') {
      throw new FuelError(
        FuelError.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `Fuel client version: ${nodeInfo.nodeVersion}, Supported version: ${userVersion}`
      );
    }

    if (difference === 'patch') {
      // eslint-disable-next-line no-console
      console.warn(
        FuelError.CODES.UNSUPPORTED_FUEL_CLIENT_VERSION,
        `The patch versions of the client and sdk differ. Fuel client version: ${nodeInfo.nodeVersion}, Supported version: ${userVersion}`
      );
    }
  }

  /**
   * Create GraphQL client and set operations.
   *
   * @param url - The URL of the Fuel node
   * @param options - Additional options for the provider
   * @returns The operation SDK object
   */
  private createOperations() {
    const fetchFn = Provider.getFetchFn(this.options);
    const gqlClient = new GraphQLClient(this.url, {
      fetch: (nodeUrl: string, request: FetchRequestOptions) =>
        fetchFn(nodeUrl, request, this.options),
    });

    if (this.#subscriptionClient) this.#subscriptionClient.dispose();
    this.#subscriptionClient = Provider.createSubscriptionClient(this.url, fetchFn, this.options);

    // @ts-expect-error This is due to this function being generic and us using multiple libraries. Its type is specified when calling a specific operation via provider.operations.xyz.
    this.operations = getOperationsSdk((query, vars) => {
      const isSubscription =
        (query.definitions.find((x) => x.kind === 'OperationDefinition') as { operation: string })
          ?.operation === 'subscription';
      if (isSubscription) {
        return this.#subscriptionClient.iterate({
          query: print(query),
          variables: vars as Record<string, unknown>,
        });
      }

      return gqlClient.request(query, vars);
    });
  }

  private static createSubscriptionClient(
    url: string,
    fetchFn: ReturnType<typeof Provider.getFetchFn>,
    options: ProviderOptions
  ) {
    return createClient({
      url: `${url}-sub`,
      onMessage: (msg) => {
        /*
          This is the only place where I've managed to wedge in error throwing
          without the error being converted to the graphql-sse library's NetworkError or being silently ignored.
          These are errors returned from the node as a field of the `data` property with a 200 response code,
          so they aren't treated as errors by the graphql-sse library.
          This function (onMessage) gets called after a fetch but before message processing.
          So the fetchFn below gets called first, the node returns errors, then this function is called.
          The _isError property is added in the response processing in the fetchFn as a way to differentiate between errors and successful responses.
          See here: https://github.com/enisdenjo/graphql-sse/blob/370ec133f8ca9c7b763a6ca0223c756a09169c59/src/client.ts#L872
        */
        if ((msg.data as { _isError: boolean })._isError) {
          throw new FuelError(ErrorCode.FUEL_NODE_ERROR, JSON.stringify(msg.data?.errors));
        }
      },
      fetchFn: async (
        subscriptionUrl: string,
        request: FetchRequestOptions & { signal: AbortSignal }
      ) => Provider.adaptSubscriptionResponse(await fetchFn(subscriptionUrl, request, options)),
    });
  }

  /**
    The subscription response processing serves two purposes:
    1. To add an `event` field which is mandated by the graphql-sse library (not by the SSE protocol)
    (see [the library's protocol](https://github.com/enisdenjo/graphql-sse/blob/master/PROTOCOL.md))
    2. To process the node's response because it's a different format to the types generated by graphql-codegen.
  */
  private static async adaptSubscriptionResponse(originalResponse: Response): Promise<Response> {
    const originalResponseText = await originalResponse.text();
    const originalResponseData = JSON.parse(originalResponseText.split('data:')[1]);
    const data = originalResponseData.data;
    const errors = originalResponseData.errors;

    let text = 'event:next';
    text += `\ndata:${JSON.stringify(data ?? { _isError: true, errors })}`;
    text += '\n\n';
    return new Response(text, originalResponse);
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
    return Promise.resolve({
      name: 'fuelv2',
      chainId: 0xdeadbeef,
    });
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
    return {
      maxDepth: bn(nodeInfo.maxDepth),
      maxTx: bn(nodeInfo.maxTx),
      minGasPrice: bn(nodeInfo.minGasPrice),
      nodeVersion: nodeInfo.nodeVersion,
      utxoValidation: nodeInfo.utxoValidation,
      vmBacktrace: nodeInfo.vmBacktrace,
    };
  }

  /**
   * Fetches the `chainInfo` for the given node URL.
   * @param url - The URL of the Fuel node
   * @returns ChainInfo object
   */
  async fetchChain(): Promise<ChainInfo> {
    const { chain } = await this.operations.getChain();
    return processGqlChain(chain);
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
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    this.#cacheInputs(transactionRequest.inputs);
    await this.estimateTxDependencies(transactionRequest);
    // #endregion Provider-sendTransaction

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { gasUsed, minGasPrice } = await this.getTransactionCost(transactionRequest, 0);

    // Fail transaction before submit to avoid submit failure
    // Resulting in lost of funds on a OutOfGas situation.
    if (bn(gasUsed).gt(bn(transactionRequest.gasLimit))) {
      throw new FuelError(
        ErrorCode.GAS_PRICE_TOO_LOW,
        `Gas limit '${transactionRequest.gasLimit}' is lower than the required: '${gasUsed}'.`
      );
    } else if (bn(minGasPrice).gt(bn(transactionRequest.gasPrice))) {
      throw new FuelError(
        ErrorCode.GAS_LIMIT_TOO_LOW,
        `Gas price '${transactionRequest.gasPrice}' is lower than the required: '${minGasPrice}'.`
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
    { utxoValidation }: ProviderCallParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.estimateTxDependencies(transactionRequest);
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
      arrayify(response.estimatePredicates.rawPayload),
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

    const encodedTransaction = transactionRequest.hasPredicateInput()
      ? hexlify((await this.estimatePredicates(transactionRequest)).toTransactionBytes())
      : hexlify(transactionRequest.toTransactionBytes());

    do {
      const { dryRun: gqlReceipts } = await this.operations.dryRun({
        encodedTransaction,
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

      if (transactionRequest instanceof ScriptTransactionRequest) {
        transactionRequest.addVariableOutputs(missingOutputVariableCount);

        missingOutputContractIds.forEach(({ contractId }) =>
          transactionRequest.addContractInputAndOutput(Address.fromString(contractId))
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
  async simulate(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.estimateTxDependencies(transactionRequest);
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
    tolerance: number = 0.2
  ): Promise<TransactionCost> {
    const transactionRequest = transactionRequestify(clone(transactionRequestLike));
    const { minGasPrice, gasPerByte, gasPriceFactor, maxGasPerTx } = this.getGasConfig();
    const gasPrice = max(transactionRequest.gasPrice, minGasPrice);
    const margin = 1 + tolerance;

    // Set gasLimit to the maximum of the chain
    // and gasPrice to 0 for measure
    // Transaction without arrive to OutOfGas
    transactionRequest.gasLimit = maxGasPerTx;
    transactionRequest.gasPrice = bn(0);

    // Execute dryRun not validated transaction to query gasUsed
    const { receipts } = await this.call(transactionRequest);
    const transaction = transactionRequest.toTransaction();

    const { fee, gasUsed } = calculateTransactionFee({
      gasPrice,
      transactionBytes: transactionRequest.toTransactionBytes(),
      transactionWitnesses: transaction?.witnesses || [],
      gasPerByte,
      gasPriceFactor,
      transactionType: transaction.type,
      receipts,
      margin,
    });

    return {
      minGasPrice,
      gasPrice,
      gasUsed,
      fee,
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
      variables = { blockHeight: bn(idOrHeight).toString(10) };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: (await this.getBlockNumber()).toString(10) };
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
    /** The message id from MessageOut receipt */
    messageId: string,
    commitBlockId?: string,
    commitBlockHeight?: BN
  ): Promise<MessageProof | null> {
    let inputObject: {
      /** The transaction to get message from */
      transactionId: string;
      /** The message id from MessageOut receipt */
      messageId: string;
      commitBlockId?: string;
      commitBlockHeight?: string;
    } = {
      transactionId,
      messageId,
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
      nonce,
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
