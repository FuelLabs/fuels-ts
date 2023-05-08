/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import { Address } from '@fuel-ts/address';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { max, bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import {
  TransactionType,
  InputMessageCoder,
  ReceiptType,
  ReceiptCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { MAX_GAS_PER_TX } from '@fuel-ts/transactions/configs';
import { GraphQLClient } from 'graphql-request';
import cloneDeep from 'lodash.clonedeep';

import type {
  GqlChainInfoFragmentFragment,
  GqlGetBlocksQueryVariables,
  GqlGetInfoQuery,
  GqlReceiptFragmentFragment,
} from './__generated__/operations';
import { getSdk as getOperationsSdk } from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import type { Message, MessageProof } from './message';
import type { ExcludeResourcesOption } from './resource';
import { transactionRequestify } from './transaction-request';
import type { TransactionRequestLike, TransactionRequest } from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response/transaction-response';
import { TransactionResponse } from './transaction-response/transaction-response';
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

/**
 * Chain information
 */
export type ChainInfo = {
  name: string;
  baseChainHeight: BN;
  peerCount: number;
  consensusParameters: {
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
    gasPriceFactor: BN;
    gasPerByte: BN;
    maxMessageDataLength: BN;
    chainId: BN;
  };
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
  minGasPrice: BN;
  nodeVersion: string;
};

// #region cost-estimation-1
export type TransactionCost = {
  minGasPrice: BN;
  gasPrice: BN;
  gasUsed: BN;
  fee: BN;
};
// #endregion cost-estimation-1

const processGqlReceipt = (gqlReceipt: GqlReceiptFragmentFragment): TransactionResultReceipt => {
  const receipt = new ReceiptCoder().decode(arrayify(gqlReceipt.rawPayload), 0)[0];

  switch (receipt.type) {
    case ReceiptType.ReturnData: {
      return {
        ...receipt,
        data: gqlReceipt.data!,
      };
    }
    case ReceiptType.LogData: {
      return {
        ...receipt,
        data: gqlReceipt.data!,
      };
    }
    default:
      return receipt;
  }
};

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

const processNodeInfo = (nodeInfo: GqlGetInfoQuery['nodeInfo']) => ({
  minGasPrice: bn(nodeInfo.minGasPrice),
  nodeVersion: nodeInfo.nodeVersion,
});

/**
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

/*
 * Provider initialization options
 */
export type ProviderOptions = {
  fetch?: (url: string, options: FetchRequestOptions) => Promise<unknown>;
};

/**
 * Provider Call transaction params
 */
export type ProviderCallParams = {
  utxoValidation?: boolean;
};
/**
 * A provider for connecting to a Fuel node
 */
export default class Provider {
  operations: ReturnType<typeof getOperationsSdk>;

  constructor(
    /** GraphQL endpoint of the Fuel node */
    public url: string,
    public options: ProviderOptions = {}
  ) {
    this.operations = this.createOperations(url, options);
  }

  /**
   * Create GraphQL client and set operations
   */
  private createOperations(url: string, options: ProviderOptions = {}) {
    this.url = url;
    const gqlClient = new GraphQLClient(url, options.fetch ? { fetch: options.fetch } : undefined);
    return getOperationsSdk(gqlClient);
  }

  /**
   * Connect provider to a different Fuel node url
   */
  connect(url: string) {
    this.operations = this.createOperations(url);
  }

  /**
   * Returns the version of the connected Fuel node
   */
  async getVersion(): Promise<string> {
    const {
      nodeInfo: { nodeVersion },
    } = await this.operations.getVersion();
    return nodeVersion;
  }

  /**
   * Returns the network configuration of the connected Fuel node
   */
  async getNetwork(): Promise<Network> {
    return Promise.resolve({
      name: 'fuelv2',
      chainId: 0xdeadbeef,
    });
  }

  /**
   * Returns the current block number
   */
  async getBlockNumber(): Promise<BN> {
    const { chain } = await this.operations.getChain();
    return bn(chain.latestBlock.header.height, 10);
  }

  /**
   * Returns node information
   */
  async getNodeInfo(): Promise<NodeInfo> {
    const { nodeInfo } = await this.operations.getInfo();
    return processNodeInfo(nodeInfo);
  }

  /**
   * Returns chain information
   */
  async getChain(): Promise<ChainInfo> {
    const { chain } = await this.operations.getChain();
    return processGqlChain(chain);
  }

  /**
   * Submits a transaction to the chain to be executed.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
   */
  // #region Provider-sendTransaction
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    await this.estimateTxDependencies(transactionRequest);
    // #endregion Provider-sendTransaction

    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { gasUsed, minGasPrice } = await this.getTransactionCost(transactionRequest, 0);

    // Fail transaction before submit to avoid submit failure
    // Resulting in lost of funds on a OutOfGas situation.
    if (bn(gasUsed).gt(bn(transactionRequest.gasLimit))) {
      throw new Error(
        `gasLimit(${transactionRequest.gasLimit}) is lower than the required (${gasUsed})`
      );
    } else if (bn(minGasPrice).gt(bn(transactionRequest.gasPrice))) {
      throw new Error(
        `gasPrice(${transactionRequest.gasPrice}) is lower than the required ${minGasPrice}`
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
   * Will dryRun a transaction and check for missing dependencies.
   *
   * If there are missing variable outputs,
   * `addVariableOutputs` is called on the transaction.
   *
   * TODO: Investigate support for missing contract IDs
   *
   * TODO: Add support for missing output messages
   */
  async estimateTxDependencies(transactionRequest: TransactionRequest): Promise<void> {
    let missingOutputVariableCount = 0;
    let missingOutputContractIdsCount = 0;
    let tries = 0;

    if (transactionRequest.type === TransactionType.Create) {
      return;
    }

    do {
      const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
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

      transactionRequest.addVariableOutputs(missingOutputVariableCount);

      missingOutputContractIds.forEach(({ contractId }) =>
        transactionRequest.addContract(Address.fromString(contractId))
      );
      tries += 1;
    } while (tries < MAX_RETRIES);
  }

  /**
   * Executes a signed transaction without applying the states changes
   * on the chain.
   *
   * If the transaction is missing any dependencies,
   * the transaction will be mutated and those dependencies will be added
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
   * The tolerance is add on top of the gasUsed calculated
   * from the node, this create a safe margin costs like
   * change states on transfer that don't occur on the dryRun
   * transaction. The default value is 0.2 or 20%
   */
  async getTransactionCost(
    transactionRequestLike: TransactionRequestLike,
    tolerance: number = 0.2
  ): Promise<TransactionCost> {
    const transactionRequest = transactionRequestify(cloneDeep(transactionRequestLike));
    const { minGasPrice } = await this.getNodeInfo();
    const gasPrice = max(transactionRequest.gasPrice, minGasPrice);
    const margin = 1 + tolerance;

    // Set gasLimit to the maximum of the chain
    // and gasPrice to 0 for measure
    // Transaction without arrive to OutOfGas
    transactionRequest.gasLimit = MAX_GAS_PER_TX;
    transactionRequest.gasPrice = bn(0);

    // Execute dryRun not validated transaction to query gasUsed
    const { receipts } = await this.call(transactionRequest);
    const { gasUsed, fee } = calculateTransactionFee({
      gasPrice,
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
   * Returns coins for the given owner
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

    const coins = result.coins.edges!.map((edge) => edge!.node!);

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
   * Returns resources for the given owner satisfying the spend query
   */
  async getResourcesToSpend(
    /** The address to get coins for */
    owner: AbstractAddress,
    /** The quantities to get */
    quantities: CoinQuantityLike[],
    /** IDs of excluded resources from the selection. */
    excludedIds?: ExcludeResourcesOption
  ): Promise<Coin[]> {
    const excludeInput = {
      messages: excludedIds?.messages?.map((id) => hexlify(id)) || [],
      utxos: excludedIds?.utxos?.map((id) => hexlify(id)) || [],
    };
    const result = await this.operations.getCoinsToSpend({
      owner: owner.toB256(),
      queryPerAsset: quantities
        .map(coinQuantityfy)
        .map(({ assetId, amount, max: maxPerAsset }) => ({
          assetId: hexlify(assetId),
          amount: amount.toString(10),
          max: maxPerAsset ? maxPerAsset.toString(10) : undefined,
        })),
      excludedIds: excludeInput,
    });

    return result.coinsToSpend.flat().map((resource) => ({
      id: resource.utxoId,
      amount: bn(resource.amount),
      assetId: resource.assetId,
      owner: Address.fromAddressOrString(resource.owner),
      maturity: bn(resource.maturity).toNumber(),
      blockCreated: bn(resource.blockCreated),
      txCreatedIdx: bn(resource.txCreatedIdx),
    }));
  }

  /**
   * Returns block matching the given ID or type
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

  /*
    Returns all the blocks matching the given parameters
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
   * Returns block matching the given ID or type, including transaction data
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
   * Get transaction with the given ID
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
   * Get deployed contract with the given ID
   *
   * @returns contract bytecode and contract id
   */
  async getContract(contractId: string): Promise<ContractResult | null> {
    const { contract } = await this.operations.getContract({ contractId });
    if (!contract) {
      return null;
    }
    return contract;
  }

  /**
   * Returns the balance for the given contract for the given asset ID
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
   * Returns the balance for the given owner for the given asset ID
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
   * Returns balances for the given owner
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

    const balances = result.balances.edges!.map((edge) => edge!.node!);

    return balances.map((balance) => ({
      assetId: balance.assetId,
      amount: bn(balance.amount),
    }));
  }

  /**
   * Returns message for the given address
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

    const messages = result.messages.edges!.map((edge) => edge!.node!);

    return messages.map((message) => ({
      sender: Address.fromAddressOrString(message.sender),
      recipient: Address.fromAddressOrString(message.recipient),
      nonce: bn(message.nonce),
      amount: bn(message.amount),
      data: InputMessageCoder.decodeData(message.data),
      daHeight: bn(message.daHeight),
    }));
  }

  /**
   * Returns Message Proof for given transaction id and the message id from MessageOut receipt
   */
  async getMessageProof(
    /** The transaction to get message from */
    transactionId: string,
    /** The message id from MessageOut receipt */
    messageId: string,
    commitBlockId?: string,
    commitBlockHeight?: string
  ): Promise<MessageProof | null> {
    const result = await this.operations.getMessageProof({
      transactionId,
      messageId,
      commitBlockId,
      commitBlockHeight,
    });

    if (!result.messageProof) {
      return null;
    }

    return {
      proofSet: result.messageProof.proofSet,
      proofIndex: bn(result.messageProof.proofIndex),
      sender: Address.fromAddressOrString(result.messageProof.sender),
      recipient: Address.fromAddressOrString(result.messageProof.recipient),
      nonce: result.messageProof.nonce,
      amount: bn(result.messageProof.amount),
      data: result.messageProof.data,
      signature: result.messageProof.signature,
      header: {
        id: result.messageProof.header.id,
        daHeight: bn(result.messageProof.header.daHeight),
        transactionsCount: bn(result.messageProof.header.transactionsCount),
        outputMessagesCount: bn(result.messageProof.header.outputMessagesCount),
        transactionsRoot: result.messageProof.header.transactionsRoot,
        outputMessagesRoot: result.messageProof.header.outputMessagesRoot,
        height: bn(result.messageProof.header.height),
        prevRoot: result.messageProof.header.prevRoot,
        time: result.messageProof.header.time,
        applicationHash: result.messageProof.header.applicationHash,
      },
    };
  }

  /**
   * Lets you produce blocks with custom timestamps.
   * Returns the block number of the last block produced.
   * @param amount - The amount of blocks to produce
   * @param startTime - The UNIX timestamp to set for the first produced block
   */
  async produceBlocks(amount: number, startTime?: number) {
    const { produceBlocks: latestBlockHeight } = await this.operations.produceBlocks({
      blocksToProduce: bn(amount).toString(10),
      startTimestamp: startTime ? fromUnixToTai64(startTime) : undefined,
    });
    return bn(latestBlockHeight);
  }
}
