/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { concat, arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import { randomBytes } from '@ethersproject/random';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { NativeAssetId, ZeroBytes32 } from '@fuel-ts/constants';
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
import {
  ReceiptType,
  InputType,
  OutputType,
  TransactionType,
  ReceiptCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { GraphQLClient } from 'graphql-request';

import type { GqlReceiptFragmentFragment } from './__generated__/operations';
import {
  getSdk as getOperationsSdk,
  GqlCoinStatus as CoinStatus,
} from './__generated__/operations';
import { Script } from './script';
import type { TransactionRequest } from './transaction-request';
import { transactionFromRequest } from './transaction-request';
import { getContractId, getContractStorageRoot } from './util';

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
 * A Fuel coin
 */
export type Coin = {
  id: string;
  assetId: string;
  amount: BigNumber;
  owner: string;
  status: CoinStatus;
  maturity: BigNumber;
  blockCreated: BigNumber;
};
export { CoinStatus };

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

const contractCallScript = new Script(
  /*
    Opcode::ADDI(0x10, REG_ZERO, script_data_offset)
    Opcode::CALL(0x10, REG_ZERO, 0x10, REG_CGAS)
    Opcode::RET(REG_RET)
    Opcode::NOOP
  */
  '0x504001e82d40040a2434000047000000'
);

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
  async sendTransaction(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    const encodedTransaction = hexlify(
      new TransactionCoder('transaction').encode(transactionFromRequest(transactionRequest))
    );
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
  async call(transactionRequest: TransactionRequest): Promise<CallResult> {
    const encodedTransaction = hexlify(
      new TransactionCoder('transaction').encode(transactionFromRequest(transactionRequest))
    );
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
    owner: string,
    /** The spend query */
    spendQuery: { assetId: string; amount: BigNumber }[],
    /** Maximum number of coins to return */
    maxInputs?: number
  ): Promise<Coin[]> {
    const result = await this.operations.getCoinsToSpend({
      owner,
      spendQuery: spendQuery.map((e) => ({
        assetId: e.assetId,
        amount: e.amount.toString(),
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
   * Submits a Create transaction to the chain for contract deployment
   */
  async submitContract(
    /** bytecode of the contract */
    bytecode: BytesLike,
    /** salt to use for the contract */
    salt: BytesLike = ZeroBytes32
  ): Promise<{ contractId: string; transactionId: string; request: TransactionRequest }> {
    // TODO: Receive this as a parameter
    const storageSlots = [] as [];
    const stateRoot = getContractStorageRoot(storageSlots);
    const contractId = getContractId(bytecode, salt, stateRoot);
    const response = await this.sendTransaction({
      type: TransactionType.Create,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      bytecodeWitnessIndex: 0,
      salt,
      storageSlots,
      outputs: [
        {
          type: OutputType.ContractCreated,
          contractId,
          stateRoot,
        },
      ],
      witnesses: [bytecode],
    });

    await response.wait();

    return {
      contractId,
      transactionId: response.id,
      request: response.request,
    };
  }

  /**
   * Submits a Script transaction to the chain for contract execution
   */
  async submitContractCall(
    /** ID of the contract to call */
    contractId: string,
    /** call data */
    data: BytesLike
  ): Promise<{
    id: string;
    request: TransactionRequest;
    wait: () => Promise<TransactionResult & { data: Uint8Array }>;
  }> {
    const dataArray = arrayify(data);
    const functionSelector = dataArray.slice(0, 8);
    const isStructArg = dataArray.slice(8, 16).some((b) => b === 0x01);
    const arg = dataArray.slice(16);

    let scriptData;
    if (isStructArg) {
      scriptData = hexlify(
        concat([
          contractId,
          functionSelector,
          new NumberCoder('', 'u64').encode(contractCallScript.getArgOffset()),
          arg,
        ])
      );
    } else {
      scriptData = hexlify(concat([contractId, functionSelector, arg]));
    }

    const response = await this.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      bytePrice: 0,
      script: contractCallScript.bytes,
      scriptData,
      inputs: [
        {
          type: InputType.Contract,
          contractId,
        },
        // TODO: Remove this when it becomes unnecessary
        // A dummy coin to make the transaction hash change to avoid collisions
        {
          type: InputType.Coin,
          id: `${hexlify(randomBytes(32))}00`,
          assetId: NativeAssetId,
          amount: BigNumber.from(0),
          owner: ZeroBytes32,
          witnessIndex: 0,
          maturity: 0,
          predicate: '0x',
          predicateData: '0x',
        },
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
      ],
      witnesses: ['0x'],
    });

    return {
      ...response,
      wait: async () => {
        const result = await response.wait();

        if (result.receipts.length < 3) {
          throw new Error('Expected at least 3 receipts');
        }
        const returnReceipt = result.receipts[result.receipts.length - 3];
        switch (returnReceipt.type) {
          case ReceiptType.Return: {
            // The receipt doesn't have the expected encoding, so encode it manually
            const returnValue = new NumberCoder('', 'u64').encode(returnReceipt.val);

            return { ...result, data: returnValue };
          }
          case ReceiptType.ReturnData: {
            return { ...result, data: arrayify(returnReceipt.data) };
          }
          default: {
            throw new Error('Invalid receipt type');
          }
        }
      },
    };
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
        (tx) => new TransactionCoder('transaction').decode(arrayify(tx.rawPayload), 0)[0]
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
    return new TransactionCoder('transaction').decode(arrayify(transaction.rawPayload), 0)[0];
  }
}
