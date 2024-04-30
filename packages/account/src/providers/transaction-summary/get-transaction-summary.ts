import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type {
  GqlGetTransactionsByOwnerQueryVariables,
  GqlPageInfo,
  GqlReceiptFragmentFragment,
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
    arrayify(gqlTransaction.rawPayload),
    0
  );

  let txReceipts: GqlReceiptFragmentFragment[] = [];

  if (gqlTransaction?.status && 'receipts' in gqlTransaction.status) {
    txReceipts = gqlTransaction.status.receipts;
  }

  const receipts = txReceipts.map(processGqlReceipt);

  const {
    consensusParameters: { gasPerByte, gasPriceFactor, maxInputs, gasCosts, maxGasPerTx },
  } = provider.getChain();

  const gasPrice = await provider.getLatestGasPrice();

  const transactionInfo = assembleTransactionSummary<TTransactionType>({
    id: gqlTransaction.id,
    receipts,
    transaction: decodedTransaction,
    transactionBytes: arrayify(gqlTransaction.rawPayload),
    gqlTransactionStatus: gqlTransaction.status,
    gasPerByte: bn(gasPerByte),
    gasPriceFactor: bn(gasPriceFactor),
    abiMap,
    maxInputs,
    gasCosts,
    maxGasPerTx,
    gasPrice,
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

  const { gasPerByte, gasPriceFactor, gasCosts, maxGasPerTx } = provider.getGasConfig();
  const maxInputs = provider.getChain().consensusParameters.maxInputs;

  const transaction = transactionRequest.toTransaction();
  const transactionBytes = transactionRequest.toTransactionBytes();

  const gasPrice = await provider.getLatestGasPrice();

  const transactionSummary = assembleTransactionSummary<TTransactionType>({
    receipts,
    transaction,
    transactionBytes,
    abiMap,
    gasPerByte,
    gasPriceFactor,
    maxInputs,
    gasCosts,
    maxGasPerTx,
    gasPrice,
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
    consensusParameters: { gasPerByte, gasPriceFactor, maxInputs, gasCosts, maxGasPerTx },
  } = provider.getChain();

  const gasPrice = await provider.getLatestGasPrice();

  const transactions = edges.map((edge) => {
    const { node: gqlTransaction } = edge;

    const { id, rawPayload, status } = gqlTransaction;

    const [decodedTransaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

    let txReceipts: GqlReceiptFragmentFragment[] = [];

    if (gqlTransaction?.status && 'receipts' in gqlTransaction.status) {
      txReceipts = gqlTransaction.status.receipts;
    }

    const receipts = txReceipts.map(processGqlReceipt);

    const transactionSummary = assembleTransactionSummary({
      id,
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(rawPayload),
      gqlTransactionStatus: status,
      abiMap,
      gasPerByte,
      gasPriceFactor,
      maxInputs,
      gasCosts,
      maxGasPerTx,
      gasPrice,
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
