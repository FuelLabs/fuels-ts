import type { BigNumberish } from '@ethersproject/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
import type { BytesLike } from '@ethersproject/bytes';
import { zeroPad, arrayify, concat, hexlify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { NumberCoder } from '@fuel-ts/abi-coder';
import { calcRoot } from '@fuel-ts/merkle';
import type { Receipt, Transaction } from '@fuel-ts/transactions';
import {
  InputType,
  OutputType,
  TransactionType,
  ReceiptCoder,
  TransactionCoder,
} from '@fuel-ts/transactions';

import type {
  BlockFragmentFragment,
  DryRunMutation,
  DryRunMutationVariables,
  EndSessionMutation,
  EndSessionMutationVariables,
  ExecuteMutation,
  ExecuteMutationVariables,
  GetBlockQuery,
  GetBlockQueryVariables,
  GetBlocksQuery,
  GetBlocksQueryVariables,
  GetCoinQuery,
  GetCoinQueryVariables,
  GetTransactionQuery,
  GetTransactionQueryVariables,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  GetVersionQuery,
  GetVersionQueryVariables,
  ResetMutation,
  ResetMutationVariables,
  StartSessionMutation,
  StartSessionMutationVariables,
  SubmitMutation,
  SubmitMutationVariables,
} from './operations.types';
import type { TransactionRequest } from './transaction-request';
import { transactionFromRequest } from './transaction-request';
import gql from './utils/gql';
import graphqlFetch from './utils/graphqlFetch';

export type TransactionResponse = {
  receipts: Receipt[];
};

const blockFragment = gql`
  fragment blockFragment on Block {
    id
    height
    producer
    transactions {
      id
      rawPayload
    }
    time
  }
`;

const getContractRoot = (bytecode: Uint8Array): string => {
  const chunkSize = 8;
  const chunks: Uint8Array[] = [];
  for (let offset = 0; offset < bytecode.length; offset += chunkSize) {
    const chunk = bytecode.slice(offset, offset + chunkSize);
    chunks.push(chunk);
  }

  chunks[chunks.length - 1] = zeroPad(chunks[chunks.length - 1], chunkSize);

  return calcRoot(chunks.map((c) => hexlify(c)));
};

export const getContractId = (bytecode: BytesLike, salt: string): string => {
  const contractId = sha256(
    concat([arrayify('0x4655454C'), arrayify(salt), getContractRoot(arrayify(bytecode))])
  );
  return contractId;
};

export const getCoinUtxoId = (transactionId: BytesLike, outputIndex: BigNumberish): string => {
  const contractId = sha256(
    concat([
      arrayify(transactionId),
      new NumberCoder('dataLength', 'u8').encode(BigNumber.from(outputIndex)),
    ])
  );

  return contractId;
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

  async getTransaction(transactionId: string): Promise<Transaction | void> {
    const { transaction } = await graphqlFetch<GetTransactionQuery, GetTransactionQueryVariables>(
      this.url,
      gql`
        query getTransaction($transactionId: HexString256!) {
          transaction(id: $transactionId) {
            id
            rawPayload
          }
        }
      `,
      { transactionId }
    );

    if (!transaction) {
      return undefined;
    }

    return new TransactionCoder('transaction').decode(arrayify(transaction.rawPayload), 0)[0];
  }

  async getTransactions(variables: GetTransactionsQueryVariables): Promise<Transaction[]> {
    const { transactions } = await graphqlFetch<
      GetTransactionsQuery,
      GetTransactionsQueryVariables
    >(
      this.url,
      gql`
        query getTransactions($after: String, $before: String, $first: Int, $last: Int) {
          transactions(after: $after, before: $before, first: $first, last: $last) {
            edges {
              node {
                id
                rawPayload
              }
            }
          }
        }
      `,
      variables
    );

    return transactions.edges!.map(
      (edge) => new TransactionCoder('transaction').decode(arrayify(edge!.node!.rawPayload), 0)[0]
    );
  }

  async getBlock(blockId: string): Promise<GetBlockQuery['block'] | void> {
    const { block } = await graphqlFetch<GetBlockQuery, GetBlockQueryVariables>(
      this.url,
      gql`
        query getBlock($blockId: HexString256!) {
          block(id: $blockId) {
            id
            height
            producer
            transactions {
              id
              rawPayload
            }
            time
          }
        }
      `,
      { blockId }
    );

    if (!block) {
      return undefined;
    }

    return block;
  }

  async getBlocks(variables: GetBlocksQueryVariables): Promise<BlockFragmentFragment[]> {
    const { blocks } = await graphqlFetch<GetBlocksQuery, GetBlocksQueryVariables>(
      this.url,
      gql`
        query getBlocks($after: String, $before: String, $first: Int, $last: Int) {
          blocks(after: $after, before: $before, first: $first, last: $last) {
            edges {
              node {
                ...blockFragment
              }
            }
          }
        }
        ${blockFragment}
      `,
      variables
    );

    return blocks.edges!.map((edge) => edge!.node!);
  }

  async getCoin(coinId: string): Promise<GetCoinQuery['coin'] | void> {
    const { coin } = await graphqlFetch<GetCoinQuery, GetCoinQueryVariables>(
      this.url,
      gql`
        query getCoin($coinId: HexString256!) {
          coin(id: $coinId) {
            id
            owner
            amount
            color
            maturity
            status
            blockCreated
          }
        }
      `,
      { coinId }
    );

    if (!coin) {
      return undefined;
    }

    return coin;
  }

  async call(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    const transaction = transactionFromRequest(transactionRequest);

    return {
      receipts: await this.dryRun(transaction),
    };
  }

  async submitContract(
    bytecode: BytesLike,
    salt: string = '0x0000000000000000000000000000000000000000000000000000000000000000'
  ): Promise<{ contractId: string; transactionId: string; transaction: Transaction }> {
    const contractId = getContractId(bytecode, salt);
    const transactionId = await this.submit(
      transactionFromRequest({
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
      })
    );

    const transaction = await this.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('No Transaction was received from the client.');
    }

    return {
      contractId,
      transactionId,
      transaction,
    };
  }

  async sendTransaction(
    transactionRequest: TransactionRequest
  ): Promise<{ transactionId: string; transaction: Transaction }> {
    const transactionId = await this.submit(transactionFromRequest(transactionRequest));

    const transaction = await this.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('No Transaction was received from the client.');
    }

    return {
      transactionId,
      transaction,
    };
  }

  async dryRun(transaction: Transaction): Promise<Receipt[]> {
    const encodedTransaction = hexlify(new TransactionCoder('transaction').encode(transaction));
    const { dryRun: clientReceipts }: DryRunMutation = await graphqlFetch<
      DryRunMutation,
      DryRunMutationVariables
    >(
      this.url,
      gql`
        mutation ($encodedTransaction: HexString!) {
          dryRun(tx: $encodedTransaction) {
            rawPayload
          }
        }
      `,
      {
        encodedTransaction,
      }
    );

    const receipts = clientReceipts.map(
      (encodedReceipt) =>
        new ReceiptCoder('receipt').decode(arrayify(encodedReceipt.rawPayload), 0)[0]
    );

    return receipts;
  }

  async submit(transaction: Transaction): Promise<string> {
    const encodedTransaction = hexlify(new TransactionCoder('transaction').encode(transaction));
    const { submit: transactionId }: SubmitMutation = await graphqlFetch<
      SubmitMutation,
      SubmitMutationVariables
    >(
      this.url,
      gql`
        mutation submit($encodedTransaction: HexString!) {
          submit(tx: $encodedTransaction)
        }
      `,
      {
        encodedTransaction,
      }
    );

    return transactionId;
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
