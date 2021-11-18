import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Receipt } from '@fuel-ts/transactions';
import { OutputType, TransactionType, ReceiptCoder, TransactionCoder } from '@fuel-ts/transactions';
import { GraphQLClient } from 'graphql-request';

import { getSdk as getOperationsSdk } from './operations';
import type { TransactionRequest } from './transaction-request';
import { transactionFromRequest } from './transaction-request';
import { getContractId } from './util';

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
