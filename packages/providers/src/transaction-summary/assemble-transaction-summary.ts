import { bn, type BN } from '@fuel-ts/math';
import { type Transaction } from '@fuel-ts/transactions';
import { hexlify } from 'ethers';

import type { TransactionResultReceipt } from '../transaction-response';
import { calculateTransactionFee } from '../utils';

import { fromTai64ToDate } from './date';
import {
  getOperations,
  getTransactionTypeName,
  isTypeMint,
  isTypeCreate,
  isTypeScript,
} from './operations';
import { extractBurnedAssetsFromReceipts, extractMintedAssetsFromReceipts } from './receipt';
import { processGraphqlStatus } from './status';
import type { AbiMap, GraphqlTransactionStatus, TransactionSummary } from './types';

export interface AssembleTransactionSummaryParams {
  id?: string;
  gasPerByte?: BN;
  gasPriceFactor: BN;
  transaction: Transaction;
  transactionBytes: Uint8Array;
  gqlTransactionStatus?: GraphqlTransactionStatus;
  receipts: TransactionResultReceipt[];
  abiMap?: AbiMap;
  maxInputs: BN;
}

/** @hidden */
export function assembleTransactionSummary<TTransactionType = void>(
  params: AssembleTransactionSummaryParams
) {
  const {
    receipts,
    gasPerByte,
    gasPriceFactor,
    transaction,
    transactionBytes,
    id,
    gqlTransactionStatus,
    abiMap = {},
    maxInputs,
  } = params;

  const gasPrice = bn(transaction.gasPrice);

  const { gasUsed, fee } = calculateTransactionFee({
    receipts,
    gasPrice,
    transactionBytes,
    transactionWitnesses: transaction?.witnesses || [],
    gasPerByte,
    gasPriceFactor,
    transactionType: transaction.type,
  });

  const operations = getOperations({
    transactionType: transaction.type,
    inputs: transaction.inputs || [],
    outputs: transaction.outputs || [],
    receipts,
    rawPayload: hexlify(transactionBytes),
    abiMap,
    maxInputs,
  });

  const typeName = getTransactionTypeName(transaction.type);

  const { isStatusFailure, isStatusPending, isStatusSuccess, blockId, status, time } =
    processGraphqlStatus(gqlTransactionStatus);

  const mintedAssets = extractMintedAssetsFromReceipts(receipts);
  const burnedAssets = extractBurnedAssetsFromReceipts(receipts);

  let date: Date | undefined;

  if (time) {
    date = fromTai64ToDate(time);
  }

  const transactionSummary: TransactionSummary<TTransactionType> = {
    id,
    fee,
    gasUsed,
    operations,
    type: typeName,
    blockId,
    time,
    status,
    receipts,
    mintedAssets,
    burnedAssets,
    isTypeMint: isTypeMint(transaction.type),
    isTypeCreate: isTypeCreate(transaction.type),
    isTypeScript: isTypeScript(transaction.type),
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
    date,
    transaction: transaction as Transaction<TTransactionType>,
  };

  return transactionSummary;
}
