import { arrayify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';

import type { GqlGetTransactionsByOwnerQueryVariables } from '../__generated__/operations';
import type Provider from '../provider';
import type { TransactionRequest } from '../transaction-request';
import type { TransactionSummary } from '../transaction-summary/types';
import { getTransactionSummary } from '../transaction-summary/utils';

import type { TransactionResult } from './transaction-response';
import { processGqlReceipt } from './utils';

export async function getTransaction<TTransactionType = void>(
  id: string,
  provider: Provider
): Promise<TransactionResult> {
  const {
    transaction: gqlTransaction,
    chain: {
      consensusParameters: { gasPerByte, gasPriceFactor },
    },
  } = await provider.operations.getTransactionWithReceipts({
    transactionId: id,
  });

  if (!gqlTransaction) {
    throw new Error('transaction not found');
  }

  const [decodedTransaction] = new TransactionCoder().decode(
    arrayify(gqlTransaction.rawPayload),
    0
  );

  const receipts = gqlTransaction.receipts?.map(processGqlReceipt) || [];

  const transactionInfo = getTransactionSummary<TTransactionType>({
    id: gqlTransaction.id,
    gasPrice: bn(gqlTransaction.gasPrice),
    receipts,
    transaction: decodedTransaction,
    transactionBytes: arrayify(gqlTransaction.rawPayload),
    gqlTransactionStatus: gqlTransaction.status,
    gasPerByte: bn(gasPerByte),
    gasPriceFactor: bn(gasPriceFactor),
  });

  return {
    gqlTransaction,
    ...transactionInfo,
  };
}

export async function getTransactionFromRequest<TTransactionType = void>(
  transactionRequest: TransactionRequest,
  provider: Provider
): Promise<TransactionSummary<TTransactionType>> {
  const { receipts } = await provider.simulate(transactionRequest);

  const transaction = transactionRequest.toTransaction();
  const transactionBytes = transactionRequest.toTransactionBytes();

  const transactionSummary = getTransactionSummary<TTransactionType>({
    gasPrice: transaction.gasPrice,
    receipts,
    transaction,
    transactionBytes,
  });

  return transactionSummary;
}

export async function getTransactions(
  provider: Provider,
  filters: GqlGetTransactionsByOwnerQueryVariables
) {
  const { transactionsByOwner } = await provider.operations.getTransactionsByOwner(filters);

  const { edges, pageInfo } = transactionsByOwner;

  const transactions = edges.map((edge) => {
    const { node: gqlTransaction } = edge;

    const { id, rawPayload, gasPrice, receipts: gqlReceipts, status } = gqlTransaction;

    const [decodedTransaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

    const receipts = gqlReceipts?.map(processGqlReceipt) || [];

    const transactionInfo = getTransactionSummary({
      id,
      gasPrice: bn(gasPrice),
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(rawPayload),
      gqlTransactionStatus: status,
    });

    return {
      gqlTransaction,
      ...transactionInfo,
    };
  });

  return {
    transactions,
    pageInfo,
  };
}
