import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Input, Output, Receipt, Transaction } from '@fuel-ts/transactions';
import { TransactionType, ReceiptCoder, TransactionCoder } from '@fuel-ts/transactions';

import type {
  DryRunMutation,
  DryRunMutationVariables,
  EndSessionMutation,
  EndSessionMutationVariables,
  ExecuteMutation,
  ExecuteMutationVariables,
  GetVersionQuery,
  GetVersionQueryVariables,
  ResetMutation,
  ResetMutationVariables,
  StartSessionMutation,
  StartSessionMutationVariables,
} from './operations.types';
import gql from './utils/gql';
import graphqlFetch from './utils/graphqlFetch';

type TransactionRequestBase = {
  gasPrice: BigNumberish;
  gasLimit: BigNumberish;
  maturity: BigNumberish;
};

type ScriptTransactionRequest = TransactionRequestBase & {
  type: TransactionType.Script;
  script: BytesLike;
  scriptData: BytesLike;
  inputs: Input[];
};

type CreateTransactionRequest = TransactionRequestBase & {
  type: TransactionType.Create;
};

export type TransactionRequest = ScriptTransactionRequest | CreateTransactionRequest;

export type TransactionResponse = {
  receipts: Receipt[];
  outputs: Output[];
};

export default class Provider {
  constructor(public url: string) {}

  async getVersion(): Promise<string> {
    const { version } = await graphqlFetch<GetVersionQuery, GetVersionQueryVariables>(
      this.url,
      gql`
        query {
          version
        }
      `
    );

    return version;
  }

  async call(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    switch (transactionRequest.type) {
      case TransactionType.Script: {
        const emptyTreeRoot = '0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
        const script = arrayify(transactionRequest.script);
        const scriptData = arrayify(transactionRequest.scriptData);
        const inputs = transactionRequest.inputs;
        const outputs = [] as any[];
        const witnesses = [] as any[];

        const transaction: Transaction = {
          type: TransactionType.Script,
          data: {
            gasPrice: BigNumber.from(transactionRequest.gasPrice),
            gasLimit: BigNumber.from(transactionRequest.gasLimit),
            maturity: BigNumber.from(transactionRequest.maturity),
            scriptLength: BigNumber.from(script.length),
            scriptDataLength: BigNumber.from(scriptData.length),
            inputsCount: BigNumber.from(inputs.length),
            outputsCount: BigNumber.from(outputs.length),
            witnessesCount: BigNumber.from(witnesses.length),
            receiptsRoot: emptyTreeRoot,
            script: hexlify(script),
            scriptData: hexlify(scriptData),
            inputs,
            outputs,
            witnesses,
          },
        };

        return {
          receipts: await this.dryRun(transaction),
          outputs,
        };
      }
      case TransactionType.Create: {
        const inputs = [] as any[];
        const outputs = [] as any[];
        const witnesses = [] as any[];

        const transaction: Transaction = {
          type: TransactionType.Create,
          data: {
            gasPrice: BigNumber.from(transactionRequest.gasPrice),
            gasLimit: BigNumber.from(transactionRequest.gasLimit),
            maturity: BigNumber.from(transactionRequest.maturity),
            bytecodeLength: BigNumber.from(0),
            bytecodeWitnessIndex: BigNumber.from(0),
            staticContractsCount: BigNumber.from(0),
            inputsCount: BigNumber.from(0),
            outputsCount: BigNumber.from(0),
            witnessesCount: BigNumber.from(0),
            salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
            staticContracts: [],
            inputs,
            outputs,
            witnesses,
          },
        };

        return {
          receipts: await this.dryRun(transaction),
          outputs,
        };
      }
      default: {
        throw new Error('Not implemented');
      }
    }
  }

  async dryRun(transaction: Transaction): Promise<Receipt[]> {
    const encodedTransaction = hexlify(new TransactionCoder('transaction').encode(transaction));
    const { dryRun: encodedReceipts }: DryRunMutation = await graphqlFetch<
      DryRunMutation,
      DryRunMutationVariables
    >(
      this.url,
      gql`
        mutation ($encodedTransaction: String!) {
          dryRun(tx: $encodedTransaction)
        }
      `,
      {
        encodedTransaction,
      }
    );

    const receipts = encodedReceipts.map(
      (encodedReceipt: string) => new ReceiptCoder('receipt').decode(arrayify(encodedReceipt), 0)[0]
    );

    return receipts;
  }

  async sendTransaction(signedTransaction: unknown): Promise<string> {
    throw new Error('Not implemented');
  }

  async startSession(): Promise<string> {
    const { startSession: sessionId } = await graphqlFetch<
      StartSessionMutation,
      StartSessionMutationVariables
    >(
      this.url,
      gql`
        mutation startSession {
          startSession
        }
      `
    );

    return sessionId;
  }

  async endSession(sessionId: string): Promise<boolean> {
    const { endSession } = await graphqlFetch<EndSessionMutation, EndSessionMutationVariables>(
      this.url,
      gql`
        mutation endSession($sessionId: ID!) {
          endSession(id: $sessionId)
        }
      `,
      { sessionId }
    );

    return endSession;
  }

  async execute(sessionId: string, op: string): Promise<boolean> {
    const { execute } = await graphqlFetch<ExecuteMutation, ExecuteMutationVariables>(
      this.url,
      gql`
        mutation execute($sessionId: ID!, $op: String!) {
          execute(id: $sessionId, op: $op)
        }
      `,
      { sessionId, op }
    );

    return execute;
  }

  async reset(sessionId: string): Promise<boolean> {
    const { reset } = await graphqlFetch<ResetMutation, ResetMutationVariables>(
      this.url,
      gql`
        mutation reset($sessionId: ID!) {
          reset(id: $sessionId)
        }
      `,
      { sessionId }
    );

    return reset;
  }
}
