/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import type {
  ReceiptCall,
  ReceiptLog,
  ReceiptLogData,
  ReceiptPanic,
  ReceiptReturn,
  ReceiptReturnData,
  ReceiptRevert,
  ReceiptTransfer,
  ReceiptTransferOut,
  ReceiptScriptResult,
  Transaction,
} from '@fuel-ts/transactions';
import { ReceiptType, ReceiptCoder, TransactionCoder } from '@fuel-ts/transactions';
import { GraphQLClient } from 'graphql-request';

import type { GqlReceiptFragmentFragment } from './__generated__/operations';
import { getSdk as getOperationsSdk } from './__generated__/operations';
import type { Coin } from './coin';
import type { CoinQuantityLike } from './coin-quantity';
import { coinQuantityfy } from './coin-quantity';
import { transactionRequestify } from './transaction-request';
import type { TransactionRequest, TransactionRequestLike } from './transaction-request';

export type CallResult = {
  receipts: TransactionResultReceipt[];
};

export type TransactionResultReceipt =
  | ReceiptCall
  | ReceiptReturn
  | (ReceiptReturnData & { data: string })
  | ReceiptPanic
  | ReceiptRevert
  | ReceiptLog
  | (ReceiptLogData & { data: string })
  | ReceiptTransfer
  | ReceiptTransferOut
  | ReceiptScriptResult;

export type TransactionResult = {
  /** Receipts produced during the execution of the transaction */
  receipts: TransactionResultReceipt[];
  blockId: any;
  time: any;
  programState: any;
};

export type TransactionResponse = {
  /** Transaction ID */
  id: string;
  /** Transaction request */
  request: TransactionRequest;
  /** Waits for transaction to be confirmed and returns the result */
  wait: () => Promise<TransactionResult>;
};

/**
 * A Fuel block
 */
export type Block = {
  id: string;
  height: BigNumber;
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

const processGqlReceipt = (gqlReceipt: GqlReceiptFragmentFragment): TransactionResultReceipt => {
  const receipt = new ReceiptCoder('receipt').decode(arrayify(gqlReceipt.rawPayload), 0)[0];

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
    const { version } = await this.operations.getVersion();
    return version;
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
  async getBlockNumber(): Promise<BigNumber> {
    const { chain } = await this.operations.getChain();
    return BigNumber.from(chain.latestBlock.height);
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

    return {
      id: transactionId,
      request: transactionRequest,
      wait: async () => {
        const { transaction } = await this.operations.getTransactionWithReceipts({ transactionId });
        if (!transaction) {
          throw new Error('No Transaction was received from the client.');
        }

        switch (transaction.status?.type) {
          case 'FailureStatus': {
            throw new Error(transaction.status.reason);
          }
          case 'SuccessStatus': {
            return {
              receipts: transaction.receipts!.map(processGqlReceipt),
              blockId: transaction.status.block.id,
              time: transaction.status.time,
              programState: transaction.status.programState,
            };
          }
          case 'SubmittedStatus': {
            throw new Error('Not yet implemented');
          }
          default: {
            throw new Error('Invalid Transaction status');
          }
        }
      },
    };
  }

  /**
   * Executes a transaction without actually submitting it to the chain
   */
  async call(transactionRequestLike: TransactionRequestLike): Promise<CallResult> {
    const transactionRequest = transactionRequestify(transactionRequestLike);
    const encodedTransaction = hexlify(transactionRequest.toTransactionBytes());
    const { dryRun: gqlReceipts } = await this.operations.dryRun({ encodedTransaction });
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
      amount: BigNumber.from(coin.amount),
      owner: coin.owner,
      status: coin.status,
      maturity: BigNumber.from(coin.maturity),
      blockCreated: BigNumber.from(coin.blockCreated),
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
      amount: BigNumber.from(coin.amount),
      owner: coin.owner,
      maturity: BigNumber.from(coin.maturity),
      blockCreated: BigNumber.from(coin.blockCreated),
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
      variables = { blockHeight: BigNumber.from(idOrHeight).toString() };
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
      height: BigNumber.from(block.height),
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
      variables = { blockHeight: BigNumber.from(idOrHeight).toString() };
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
      height: BigNumber.from(block.height),
      time: block.time,
      producer: block.producer,
      transactionIds: block.transactions.map((tx) => tx.id),
      transactions: block.transactions.map(
        (tx) => new TransactionCoder('transaction').decode(arrayify(tx.rawPayload), 0)?.[0]
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
    return new TransactionCoder('transaction').decode(arrayify(transaction.rawPayload), 0)?.[0];
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
}
