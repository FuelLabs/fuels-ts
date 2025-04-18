import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { TransactionCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { GqlGetTransactionsByOwnerQueryVariables } from '../__generated__/operations';
import { TRANSACTIONS_PAGE_SIZE_LIMIT } from '../provider';
import type Provider from '../provider';
import type { TransactionReceiptJson, PageInfo } from '../provider';
import type { TransactionRequest } from '../transaction-request';
import type { TransactionResult } from '../transaction-response';
import { deserializeReceipt } from '../utils/serialization';
import { validatePaginationArgs } from '../utils/validate-pagination-args';

import { assembleTransactionSummary } from './assemble-transaction-summary';
import { getTotalFeeFromStatus } from './status';
import type { AbiMap, GraphqlTransactionStatus, TransactionSummary } from './types';
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

  let txReceipts: TransactionReceiptJson[] = [];

  if (gqlTransaction?.status && 'receipts' in gqlTransaction.status) {
    txReceipts = gqlTransaction.status.receipts;
  }

  const receipts = txReceipts.map(deserializeReceipt);

  const {
    consensusParameters: {
      feeParameters: { gasPerByte, gasPriceFactor },
      txParameters: { maxInputs, maxGasPerTx },
      gasCosts,
    },
  } = await provider.getChain();

  // If we have the total fee, we do not need to refetch the gas price
  const totalFee = getTotalFeeFromStatus(gqlTransaction.status);
  const gasPrice = totalFee ? bn(0) : await provider.getLatestGasPrice();

  const baseAssetId = await provider.getBaseAssetId();

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
    baseAssetId,
  });

  return {
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

  const { receipts } = await provider.dryRun(transactionRequest);

  const { gasPerByte, gasPriceFactor, gasCosts, maxGasPerTx } = await provider.getGasConfig();
  const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;

  const transaction = transactionRequest.toTransaction();
  const transactionBytes = transactionRequest.toTransactionBytes();

  const gasPrice = await provider.getLatestGasPrice();
  const baseAssetId = await provider.getBaseAssetId();

  const transactionSummary = assembleTransactionSummary<TTransactionType>({
    id: transactionRequest.getTransactionId(await provider.getChainId()),
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
    baseAssetId,
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
  pageInfo: PageInfo;
}

/**
 * Gets transaction summaries for a given owner/address.
 *
 * @param params - The filters to apply to the query.
 * @returns The transaction summaries.
 */
export async function getTransactionsSummaries(
  params: GetTransactionsSummariesParams
): Promise<GetTransactionsSummariesReturns> {
  const { filters, provider, abiMap } = params;

  const { owner, ...inputArgs } = filters;

  const validPaginationParams = validatePaginationArgs({
    inputArgs,
    paginationLimit: TRANSACTIONS_PAGE_SIZE_LIMIT,
  });

  const { transactionsByOwner } = await provider.operations.getTransactionsByOwner({
    ...validPaginationParams,
    owner,
  });

  const { edges, pageInfo } = transactionsByOwner;

  const {
    consensusParameters: {
      feeParameters: { gasPerByte, gasPriceFactor },
      txParameters: { maxInputs, maxGasPerTx },
      gasCosts,
    },
  } = await provider.getChain();

  const gasPrice = await provider.getLatestGasPrice();
  const baseAssetId = await provider.getBaseAssetId();

  const transactions = edges.map((edge) => {
    const { node: gqlTransaction } = edge;

    const { id, rawPayload, status } = gqlTransaction;

    const [decodedTransaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);

    let txReceipts: TransactionReceiptJson[] = [];

    if (gqlTransaction?.status && 'receipts' in gqlTransaction.status) {
      txReceipts = gqlTransaction.status.receipts;
    }

    const receipts = txReceipts.map(deserializeReceipt);

    const transactionSummary = assembleTransactionSummary({
      id,
      receipts,
      transaction: decodedTransaction,
      transactionBytes: arrayify(rawPayload),
      gqlTransactionStatus: status as GraphqlTransactionStatus,
      abiMap,
      gasPerByte,
      gasPriceFactor,
      maxInputs,
      gasCosts,
      maxGasPerTx,
      gasPrice,
      baseAssetId,
    });

    const output: TransactionResult = {
      ...transactionSummary,
    };

    return output;
  });

  return {
    transactions,
    pageInfo,
  };
}
