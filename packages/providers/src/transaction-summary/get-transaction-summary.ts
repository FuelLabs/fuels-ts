import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';
import { getBytesCopy } from 'ethers';

import type {
  GqlGetTransactionsByOwnerQueryVariables,
  GqlPageInfo,
} from '../__generated__/operations';
import type Provider from '../provider';
import type { TransactionRequest } from '../transaction-request';
import type { TransactionResult } from '../transaction-response';

import { assembleTransactionSummary } from './assemble-transaction-summary';
import { processGqlReceipt } from './receipt';
import type { AbiMap, TransactionSummary } from './types';

/** @hidden */
export interface GetTransactionSummaryParams {
  id: string;
  provider: Provider;
  abiMap?: AbiMap;
}

export async function getTransactionSummary<TTransactionType = void>(
  params: GetTransactionSummaryParams
): Promise<TransactionResult> {
  const { id, provider, abiMap } = params;

  const { transaction: gqlTransaction } = await provider.operations.getTransactionWithReceipts({
    transactionId: id,
  });

  if (!gqlTransaction) {
    throw new FuelError(
      ErrorCode.TRANSACTION_NOT_FOUND,
      `Transaction not found for given id: ${id}.`
    );
  }

  const [decodedTransaction] = new TransactionCoder().decode(
    getBytesCopy(gqlTransaction.rawPayload),
    0
  );

  const receipts = gqlTransaction.receipts?.map(processGqlReceipt) || [];

  const {
    consensusParameters: { gasPerByte, gasPriceFactor, maxInputs, gasCosts },
  } = provider.getChain();

  const transactionInfo = assembleTransactionSummary<TTransactionType>({
    id: gqlTransaction.id,
    receipts,
    transaction: decodedTransaction,
    transactionBytes: getBytesCopy(gqlTransaction.rawPayload),
    gqlTransactionStatus: gqlTransaction.status,
    gasPerByte: bn(gasPerByte),
    gasPriceFactor: bn(gasPriceFactor),
    abiMap,
    maxInputs,
    gasCosts,
  });

  return {
    gqlTransaction,
    ...transactionInfo,
  };
}

export interface GetTransactionSummaryFromRequestParams {
  transactionRequest: TransactionRequest;
  provider: Provider;
  abiMap?: AbiMap;
}

/** @hidden */
export async function getTransactionSummaryFromRequest<TTransactionType = void>(
  params: GetTransactionSummaryFromRequestParams
): Promise<TransactionSummary<TTransactionType>> {
  const { provider, transactionRequest, abiMap } = params;

  const { receipts } = await provider.call(transactionRequest);

  const { gasPerByte, gasPriceFactor, gasCosts } = provider.getGasConfig();
  const maxInputs = provider.getChain().consensusParameters.maxInputs;

  const transaction = transactionRequest.toTransaction();
  const transactionBytes = transactionRequest.toTransactionBytes();

  const transactionSummary = assembleTransactionSummary<TTransactionType>({
    receipts,
    transaction,
    transactionBytes,
    abiMap,
    gasPerByte,
    gasPriceFactor,
    maxInputs,
    gasCosts,
  });

  return transactionSummary;
}

export interface GetTransactionsSummariesParams {
  provider: Provider;
  filters: GqlGetTransactionsByOwnerQueryVariables;
  abiMap?: AbiMap;
}

export interface GetTransactionsSummariesReturns {
  transactions: TransactionResult[];
  pageInfo: GqlPageInfo;
}

/** @hidden */
export async function getTransactionsSummaries(
  params: GetTransactionsSummariesParams
): Promise<GetTransactionsSummariesReturns> {
  const { filters, provider, abiMap } = params;

  const { transactionsByOwner } = await provider.operations.getTransactionsByOwner(filters);

  const { edges, pageInfo } = transactionsByOwner;

  const {
    consensusParameters: { gasPerByte, gasPriceFactor, maxInputs, gasCosts },
  } = provider.getChain();

  const transactions = edges.map((edge) => {
    const { node: gqlTransaction } = edge;

    const { id, rawPayload, receipts: gqlReceipts, status } = gqlTransaction;

    const [decodedTransaction] = new TransactionCoder().decode(getBytesCopy(rawPayload), 0);

    const receipts = gqlReceipts?.map(processGqlReceipt) || [];

    const transactionSummary = assembleTransactionSummary({
      id,
      receipts,
      transaction: decodedTransaction,
      transactionBytes: getBytesCopy(rawPayload),
      gqlTransactionStatus: status,
      abiMap,
      gasPerByte,
      gasPriceFactor,
      maxInputs,
      gasCosts,
    });

    const output: TransactionResult = {
      gqlTransaction,
      ...transactionSummary,
    };

    return output;
  });

  return {
    transactions,
    pageInfo,
  };
}
