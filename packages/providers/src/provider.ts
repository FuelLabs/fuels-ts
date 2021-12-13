import type { BytesLike } from '@ethersproject/bytes';
import { concat, arrayify, hexlify } from '@ethersproject/bytes';
import type { Network } from '@ethersproject/networks';
import { NumberCoder } from '@fuel-ts/abi-coder';
import type { Receipt, ReceiptReturn, Transaction } from '@fuel-ts/transactions';
import {
  ReceiptType,
  InputType,
  OutputType,
  TransactionType,
  ReceiptCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { GraphQLClient } from 'graphql-request';

import { getSdk as getOperationsSdk } from './operations';
import type { TransactionRequest } from './transaction-request';
import { transactionFromRequest } from './transaction-request';
import { getContractId } from './util';

const genBytes32 = () => hexlify(new Uint8Array(32).map(() => Math.floor(Math.random() * 256)));

export type CallResult = {
  receipts: Receipt[];
};

export type TransactionStatusSubmitted = {
  type: 'Submitted';
  time: any;
};
export type TransactionStatusFailure = {
  type: 'Failure';
  blockId: any;
  time: any;
  reason: string;
};
export type TransactionStatusSuccess = {
  type: 'Success';
  blockId: any;
  time: any;
  programState: any;
};
export type TransactionStatus =
  | TransactionStatusSubmitted
  | TransactionStatusFailure
  | TransactionStatusSuccess;

export type TransactionResult = {
  receipts: Receipt[];
  blockId: any;
  time: any;
  programState: any;
};

export type TransactionResponse = {
  id: string;
  request: TransactionRequest;
  wait: () => Promise<TransactionResult>;
};

export type Block = {
  id: string;
  height: number;
  time: number;
  producer: string;
  transactionIds: string[];
};

export default class Provider {
  operations: ReturnType<typeof getOperationsSdk>;

  constructor(public url: string) {
    const gqlClient = new GraphQLClient(url);
    this.operations = getOperationsSdk(gqlClient);
  }

  async getVersion(): Promise<string> {
    const { version } = await this.operations.getVersion();
    return version;
  }

  async getNetwork(): Promise<Network> {
    return {
      name: 'fuelv2',
      chainId: 0xdeadbeef,
    };
  }

  async getBlockNumber(): Promise<number> {
    const { chain } = await this.operations.getChain();
    return chain.latestBlock.height;
  }

  async sendTransaction(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    const encodedTransaction = hexlify(
      new TransactionCoder('transaction').encode(transactionFromRequest(transactionRequest))
    );
    const { submit: transactionId } = await this.operations.submit({ encodedTransaction });

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
              receipts: transaction.receipts!.map(
                ({ rawPayload }: any) =>
                  new ReceiptCoder('receipt').decode(arrayify(rawPayload), 0)[0]
              ),
              blockId: transaction.status.blockId,
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

  async call(transactionRequest: TransactionRequest): Promise<CallResult> {
    const encodedTransaction = hexlify(
      new TransactionCoder('transaction').encode(transactionFromRequest(transactionRequest))
    );
    const { dryRun: encodedReceipts } = await this.operations.dryRun({ encodedTransaction });
    const receipts = encodedReceipts.map(
      (encodedReceipt) =>
        new ReceiptCoder('receipt').decode(arrayify(encodedReceipt.rawPayload), 0)[0]
    );
    return {
      receipts,
    };
  }

  async submitContract(
    bytecode: BytesLike,
    salt: string = '0x0000000000000000000000000000000000000000000000000000000000000000'
  ): Promise<{ contractId: string; transactionId: string; request: TransactionRequest }> {
    const contractId = getContractId(bytecode, salt);
    const response = await this.sendTransaction({
      type: TransactionType.Create,
      gasPrice: 0,
      gasLimit: 1000000,
      bytecodeWitnessIndex: 0,
      salt,
      outputs: [
        {
          type: OutputType.ContractCreated,
          contractId,
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

  async submitContractCall(
    contractId: string,
    data: BytesLike
  ): Promise<{
    id: string;
    request: TransactionRequest;
    wait: () => Promise<TransactionResult & { data: Uint8Array }>;
  }> {
    const response = await this.sendTransaction({
      type: TransactionType.Script,
      gasPrice: 0,
      gasLimit: 1000000,
      script:
        /*
          Opcode::ADDI(0x10, REG_ZERO, script_data_offset)
          Opcode::CALL(0x10, REG_ZERO, 0x10, REG_CGAS)
          Opcode::RET(REG_RET)
          Opcode::NOOP
        */
        '0x504001e02d40040a2434000047000000',
      scriptData: hexlify(concat([contractId, data])),
      inputs: [
        {
          type: InputType.Contract,
          contractId,
        },
      ],
      outputs: [
        {
          type: OutputType.Contract,
          inputIndex: 0,
        },
      ],
      witnesses: [
        // TODO: Remove this when it becomes unnecessary
        // A dummy witness to make the transaction hash change to avoid collisions
        genBytes32(),
      ],
    });

    return {
      ...response,
      wait: async () => {
        const result = await response.wait();

        /*
          Here, we are getting and decoding the result of the call.
          For now only returning a single u64 is supported.
        */
        const receipts = result.receipts as Receipt[];
        const returnReceipt = receipts
          .reverse()
          .find((receipt) => receipt.type === ReceiptType.Return) as ReceiptReturn;
        // The receipt doesn't have the expected encoding, so encode it manually
        const returnValue = new NumberCoder('', 'u64').encode(returnReceipt.val);

        return { ...result, data: returnValue };
      },
    };
  }

  async getBlock(idOrHeight: string | number | 'latest'): Promise<Block | null> {
    let variables;
    if (typeof idOrHeight === 'number') {
      variables = { blockHeight: idOrHeight };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: await this.getBlockNumber() };
    } else {
      variables = { blockId: idOrHeight };
    }

    const { block } = await this.operations.getBlock(variables);

    if (!block) {
      return null;
    }

    return {
      id: block.id,
      height: block.height,
      time: block.time,
      producer: block.producer,
      transactionIds: block.transactions.map((tx) => tx.id),
    };
  }

  async getBlockWithTransactions(
    idOrHeight: string | number | 'latest'
  ): Promise<(Block & { transactions: Transaction[] }) | null> {
    let variables;
    if (typeof idOrHeight === 'number') {
      variables = { blockHeight: idOrHeight };
    } else if (idOrHeight === 'latest') {
      variables = { blockHeight: await this.getBlockNumber() };
    } else {
      variables = { blockId: idOrHeight };
    }

    const { block } = await this.operations.getBlockWithTransactions(variables);

    if (!block) {
      return null;
    }

    return {
      id: block.id,
      height: block.height,
      time: block.time,
      producer: block.producer,
      transactionIds: block.transactions.map((tx) => tx.id),
      transactions: block.transactions.map(
        (tx) => new TransactionCoder('transaction').decode(tx.rawPayload, 0)[0]
      ),
    };
  }

  async getTransaction(transactionId: string): Promise<Transaction | null> {
    const { transaction } = await this.operations.getTransaction({ transactionId });
    if (!transaction) {
      return null;
    }
    return new TransactionCoder('transaction').decode(transaction.rawPayload, 0)[0];
  }
}
