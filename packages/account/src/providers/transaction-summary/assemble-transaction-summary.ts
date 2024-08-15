import { bn, type BN } from '@fuel-ts/math';
import { PolicyType, type Transaction } from '@fuel-ts/transactions';
import { DateTime, hexlify } from '@fuel-ts/utils';

import type { GasCosts } from '../provider';
import type { TransactionResultReceipt } from '../transaction-response';
import { getGasUsedFromReceipts } from '../utils';

import { calculateTXFeeForSummary } from './calculate-tx-fee-for-summary';
import {
  getOperations,
  getTransactionTypeName,
  isTypeMint,
  isTypeCreate,
  isTypeScript,
  isTypeUpgrade,
  isTypeUpload,
  isTypeBlob,
} from './operations';
import { extractBurnedAssetsFromReceipts, extractMintedAssetsFromReceipts } from './receipt';
import { processGraphqlStatus } from './status';
import type { AbiMap, GraphqlTransactionStatus, TransactionSummary } from './types';

export interface AssembleTransactionSummaryParams {
  gasPerByte: BN;
  gasPriceFactor: BN;
  transaction: Transaction;
  id?: string;
  transactionBytes: Uint8Array;
  gqlTransactionStatus?: GraphqlTransactionStatus;
  receipts: TransactionResultReceipt[];
  abiMap?: AbiMap;
  maxInputs: BN;
  gasCosts: GasCosts;
  maxGasPerTx: BN;
  gasPrice: BN;
  baseAssetId: string;
}

/** @hidden */
export function assembleTransactionSummary<TTransactionType = void>(
  params: AssembleTransactionSummaryParams
) {
  const {
    id,
    receipts,
    gasPerByte,
    gasPriceFactor,
    transaction,
    transactionBytes,
    gqlTransactionStatus,
    abiMap = {},
    maxInputs,
    gasCosts,
    maxGasPerTx,
    gasPrice,
    baseAssetId,
  } = params;

  const gasUsed = getGasUsedFromReceipts(receipts);

  const rawPayload = hexlify(transactionBytes);

  const operations = getOperations({
    transactionType: transaction.type,
    inputs: transaction.inputs || [],
    outputs: transaction.outputs || [],
    receipts,
    rawPayload,
    abiMap,
    maxInputs,
    baseAssetId,
  });

  const typeName = getTransactionTypeName(transaction.type);

  const tip = bn(transaction.policies?.find((policy) => policy.type === PolicyType.Tip)?.data);

  const { isStatusFailure, isStatusPending, isStatusSuccess, blockId, status, time, totalFee } =
    processGraphqlStatus(gqlTransactionStatus);

  const fee = calculateTXFeeForSummary({
    totalFee,
    gasPrice,
    rawPayload,
    tip,
    consensusParameters: {
      gasCosts,
      maxGasPerTx,
      feeParams: {
        gasPerByte,
        gasPriceFactor,
      },
    },
  });

  const mintedAssets = extractMintedAssetsFromReceipts(receipts);
  const burnedAssets = extractBurnedAssetsFromReceipts(receipts);

  let date: DateTime | undefined;

  if (time) {
    date = DateTime.fromTai64(time);
  }

  const transactionSummary: TransactionSummary<TTransactionType> = {
    id,
    tip,
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
    isTypeUpgrade: isTypeUpgrade(transaction.type),
    isTypeUpload: isTypeUpload(transaction.type),
    isTypeBlob: isTypeBlob(transaction.type),
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
    date,
    transaction: transaction as Transaction<TTransactionType>,
  };

  return transactionSummary;
}
