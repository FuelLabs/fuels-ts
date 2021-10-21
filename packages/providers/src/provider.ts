import { arrayify, hexlify } from '@ethersproject/bytes';
import type { Receipt, Transaction } from '@fuels-ts/transactions';
import { ReceiptCoder, TransactionCoder } from '@fuels-ts/transactions';

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

  async call(transaction: Transaction): Promise<Receipt[]> {
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
