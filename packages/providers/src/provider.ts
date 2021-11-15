import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, concat, hexlify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
// import { calcRoot } from '@fuel-ts/merkle';
import type { Receipt, Transaction } from '@fuel-ts/transactions';
import {
  InputType,
  OutputType,
  TransactionType,
  ReceiptCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';
import { createHash } from 'crypto';
import { GraphQLClient } from 'graphql-request';

import { getSdk as getOperationsSdk } from './operations';
import type { TransactionRequest } from './transaction-request';
import { transactionFromRequest } from './transaction-request';
import { ephemeralMerkleRoot } from './util';

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

const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytecode.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }
  // TODO: Use `calcRoot()` when fuel-vm starts using it
  // return calcRoot(chunks.map((c) => hexlify(c)));
  return ephemeralMerkleRoot(chunks);
};

export const getContractId = (bytecode: BytesLike, salt: string): string => {
  const root = getContractRoot(arrayify(bytecode));
  const contractId = sha256(concat([arrayify('0x4655454C'), arrayify(salt), root]));
  return contractId;
};

export const getCoinUtxoId = (transactionId: BytesLike, outputIndex: BigNumberish): string => {
  const hasher = createHash('sha256');
  hasher.update(arrayify(transactionId));
  hasher.update(Uint8Array.from([BigNumber.from(outputIndex).toNumber()]));
  return hexlify(hasher.digest());
};

export const getSignableTransaction = (transaction: Transaction): Transaction => {
  const signableTransaction = { ...transaction, data: { ...transaction.data } } as Transaction;
  switch (signableTransaction.type) {
    case TransactionType.Script: {
      signableTransaction.data.receiptsRoot =
        '0x00000000000000000000000000000000000000000000000000000000';
      break;
    }
    case TransactionType.Create: {
      break;
    }
    default: {
      throw new Error('Not implemented');
    }
  }

  signableTransaction.data.inputs = signableTransaction.data.inputs.map((input) => {
    if (input.type === InputType.Contract) {
      return {
        ...input,
        data: {
          ...input.data,
          utxoID: '0x00000000000000000000000000000000000000000000000000000000',
          balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
          stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
        },
      };
    }
    return input;
  });

  signableTransaction.data.outputs = signableTransaction.data.outputs.map((output) => {
    switch (output.type) {
      case OutputType.Contract: {
        return {
          ...output,
          data: {
            ...output.data,
            balanceRoot: '0x00000000000000000000000000000000000000000000000000000000',
            stateRoot: '0x00000000000000000000000000000000000000000000000000000000',
          },
        };
      }
      case OutputType.Change: {
        return {
          ...output,
          data: {
            ...output.data,
            amount: BigNumber.from(0),
          },
        };
      }
      case OutputType.Variable: {
        return {
          ...output,
          data: {
            ...output.data,
            to: '0x00000000000000000000000000000000000000000000000000000000',
            amount: BigNumber.from(0),
            color: '0x00000000000000000000000000000000000000000000000000000000',
          },
        };
      }
      default: {
        return output;
      }
    }
  });

  return signableTransaction;
};

export const getTransactionId = (transaction: Transaction): string => {
  const signableTransaction = getSignableTransaction(transaction);

  const encodedTransaction = new TransactionCoder('signableTransaction').encode(
    signableTransaction
  );

  return sha256(encodedTransaction);
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
      maturity: 0,
      bytecodeWitnessIndex: 0,
      salt,
      staticContracts: [],
      inputs: [],
      outputs: [
        {
          type: OutputType.ContractCreated,
          data: {
            contractId,
          },
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
}
