import { arrayify } from '@ethersproject/bytes';
import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';

import type { GqlGetTransactionsByOwnerQueryVariables } from '../__generated__/operations';
import type Provider from '../provider';
import type { TransactionRequest } from '../transaction-request';

import type { TransactionInfo, TransactionResult } from './types';
import { getTransactionInfo, processGqlReceipt } from './utils';

export async function getTransaction<TTransactionType = void>(
  id: string,
  provider: Provider
): Promise<TransactionResult> {
  const {
    transaction: gqlTransaction,
    chain: {
      consensusParameters: { gasPerByte, gasPriceFactor },
    },
  } = await provider.operations.getTransaction({
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

  const transactionInfo = getTransactionInfo<TTransactionType>({
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
): Promise<TransactionInfo<TTransactionType>> {
  const { receipts } = await provider.simulate(transactionRequest);

  const transaction = transactionRequest.toTransaction();
  const transactionBytes = transactionRequest.toTransactionBytes();

  const transactionInfo = getTransactionInfo<TTransactionType>({
    gasPrice: transaction.gasPrice,
    receipts,
    transaction,
    transactionBytes,
  });

  return transactionInfo;
}

export async function getTransactions(
  provider: Provider,
  filters: GqlGetTransactionsByOwnerQueryVariables
) {
  const { transactionsByOwner } = await provider.operations.getTransactionsByOwner(filters);

  const { edges, pageInfo } = transactionsByOwner;

  const transacions = edges.map((edge) => {
    const { node: gqlTransaction } = edge;

    const { id, rawPayload, gasPrice, receipts: gqlReceipts, status } = gqlTransaction;

    const [decodedTransaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

    const receipts = gqlReceipts?.map(processGqlReceipt) || [];

    const transactionInfo = getTransactionInfo({
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
    transacions,
    pageInfo,
  };
}
