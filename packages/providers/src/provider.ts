/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import type { Transaction } from '@fuel-ts/transactions';
import { ReceiptType, ReceiptCoder, TransactionCoder } from '@fuel-ts/transactions';
import { GraphQLClient } from 'graphql-request';

import type {
  GqlChainInfoFragmentFragment,
  GqlGetInfoQuery,
  GqlReceiptFragmentFragment,
} from './__generated__/operations';
import { getSdk as getOperationsSdk } from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantity, CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { transactionRequestify } from './transaction-request';
import type { TransactionRequestLike } from './transaction-request';
import type { TransactionResultReceipt } from './transaction-response/transaction-response';
import { TransactionResponse } from './transaction-response/transaction-response';

export type CallResult = {
  receipts: TransactionResultReceipt[];
};

/**
 * A Fuel block
 */
export type Block = {
  id: string;
  height: bigint;
  time: string;
  producer: string;
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
  baseChainHeight: bigint;
  peerCount: number;
  consensusParameters: {
    gasPriceFactor: bigint;
    maxGasPerTx: bigint;
    maxScriptLength: bigint;
  };
  latestBlock: {
    id: string;
    height: bigint;
    producer: string;
    time: string;
    transactions: Array<{ id: string }>;
  };
};

/**
 * Node information
 */
export type NodeInfo = {
  minBytePrice: bigint;
  minGasPrice: bigint;
  nodeVersion: string;
};

/**
 * Combine result of Chain and Node information
 */
export type Info = {
  chain: ChainInfo;
  nodeInfo: NodeInfo;
};

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

const processGqlChain = (chain: GqlChainInfoFragmentFragment): ChainInfo => ({
  name: chain.name,
  baseChainHeight: BigInt(chain.baseChainHeight),
  peerCount: chain.peerCount,
  consensusParameters: {
    gasPriceFactor: BigInt(chain.consensusParameters.gasPriceFactor),
    maxGasPerTx: BigInt(chain.consensusParameters.maxGasPerTx),
    maxScriptLength: BigInt(chain.consensusParameters.maxScriptLength),
  },
  latestBlock: {
    id: chain.latestBlock.id,
    height: BigInt(chain.latestBlock.height),
    producer: chain.latestBlock.producer,
    time: chain.latestBlock.time,
    transactions: chain.latestBlock.transactions.map((i) => ({
      id: i.id,
    })),
  },
});

const processNodeInfo = (nodeInfo: GqlGetInfoQuery['nodeInfo']) => ({
  minBytePrice: BigInt(nodeInfo.minBytePrice),
  minGasPrice: BigInt(nodeInfo.minGasPrice),
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
    public url: string
  ) {
    const gqlClient = new GraphQLClient(url);
    this.operations = getOperationsSdk(gqlClient);
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
    return {
      name: 'fuelv2',
      chainId: 0xdeadbeef,
    };
  }

  /**
   * Returns the current block number
   */
  async getBlockNumber(): Promise<bigint> {
    const { chain } = await this.operations.getChain();
    return BigInt(chain.latestBlock.height);
  }

  /**
   * Returns node information
   */
  async getInfo(): Promise<Info> {
    const { chain, nodeInfo } = await this.operations.getInfo();
    return {
      chain: processGqlChain(chain),
      nodeInfo: processNodeInfo(nodeInfo),
    };
  }

  /**
   * Returns chain information
   */
  async getChain(): Promise<ChainInfo> {
    const { chain } = await this.operations.getChain();
    return processGqlChain(chain);
  }

  /**
   * Submits a transaction to the chain to be executed
   */
  async sendTransaction(
    transactionRequestLike: TransactionRequestLike
  ): Promise<TransactionResponse> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const {
      submit: { id: transactionId },
    } = await this.operations.submit({ encodedTransaction });

    const response = new TransactionResponse(transactionId, transactionRequest, this);
    return response;
  }

  /**
   * Executes a transaction without actually submitting it to the chain
   */
  async call(
    transactionRequestLike: TransactionRequestLike,
    { utxoValidation }: ProviderCallParams = {}
  ): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
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
   * Returns coins for the given owner
   */
  async getCoins(
    /** The address to get coins for */
    owner: BytesLike,
    /** The asset ID of coins to get */
    assetId?: BytesLike,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<Coin[]> {
    const result = await this.operations.getCoins({
      first: 10,
      ...paginationArgs,
      filter: { owner: hexlify(owner), assetId: assetId && hexlify(assetId) },
    });

    const coins = result.coins.edges!.map((edge) => edge!.node!);

    return coins.map((coin) => ({
      id: coin.utxoId,
      assetId: coin.assetId,
      amount: BigInt(coin.amount),
      owner: coin.owner,
      status: coin.status,
      maturity: BigInt(coin.maturity),
      blockCreated: BigInt(coin.blockCreated),
    }));
  }

  /**
   * Returns coins for the given owner satisfying the spend query
   */
  async getCoinsToSpend(
    /** The address to get coins for */
    owner: BytesLike,
    /** The quantitites to get */
    quantities: CoinQuantityLike[],
    /** Maximum number of coins to return */
    maxInputs?: number
  ): Promise<Coin[]> {
    const result = await this.operations.getCoinsToSpend({
      owner: hexlify(owner),
      spendQuery: quantities.map(coinQuantityfy).map((quantity) => ({
        assetId: hexlify(quantity.assetId),
        amount: quantity.amount.toString(),
      })),
      maxInputs,
    });

    const coins = result.coinsToSpend;

    return coins.map((coin) => ({
      id: coin.utxoId,
      status: coin.status,
      assetId: coin.assetId,
      amount: BigInt(coin.amount),
      owner: coin.owner,
      maturity: BigInt(coin.maturity),
      blockCreated: BigInt(coin.blockCreated),
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
      variables = { blockHeight: BigInt(idOrHeight).toString() };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: (await this.getBlockNumber()).toString() };
    } else {
      variables = { blockId: idOrHeight };
    }

    const { block } = await this.operations.getBlock(variables);

    if (!block) {
      return null;
    }

    return {
      id: block.id,
      height: BigInt(block.height),
      time: block.time,
      producer: block.producer,
      transactionIds: block.transactions.map((tx) => tx.id),
    };
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
      variables = { blockHeight: BigInt(idOrHeight).toString() };
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
      height: BigInt(block.height),
      time: block.time,
      producer: block.producer,
      transactionIds: block.transactions.map((tx) => tx.id),
      transactions: block.transactions.map(
        (tx) => new TransactionCoder().decode(arrayify(tx.rawPayload), 0)?.[0]
      ),
    };
  }

  /**
   * Get transaction with the given ID
   */
  async getTransaction(transactionId: string): Promise<Transaction | null> {
    const { transaction } = await this.operations.getTransaction({ transactionId });
    if (!transaction) {
      return null;
    }
    return new TransactionCoder().decode(arrayify(transaction.rawPayload), 0)?.[0];
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
   * Returns the balance for the given owner for the given asset ID
   */
  async getBalance(
    /** The address to get coins for */
    owner: BytesLike,
    /** The asset ID of coins to get */
    assetId: BytesLike
  ): Promise<bigint> {
    const { balance } = await this.operations.getBalance({
      owner: hexlify(owner),
      assetId: hexlify(assetId),
    });
    return BigInt(balance.amount);
  }

  /**
   * Returns balances for the given owner
   */
  async getBalances(
    /** The address to get coins for */
    owner: BytesLike,
    /** Pagination arguments */
    paginationArgs?: CursorPaginationArgs
  ): Promise<CoinQuantity[]> {
    const result = await this.operations.getBalances({
      first: 10,
      ...paginationArgs,
      filter: { owner: hexlify(owner) },
    });

    const balances = result.balances.edges!.map((edge) => edge!.node!);

    return balances.map((balance) => ({
      assetId: balance.assetId,
      amount: BigInt(balance.amount),
    }));
  }
}
