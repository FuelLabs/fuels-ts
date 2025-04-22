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
import type {
  AbiMap,
  BurnedAsset,
  GraphqlTransactionStatus,
  MintedAsset,
  Operation,
  PreConfirmationTransactionSummary,
  TransactionSummary,
  TransactionTypeName,
} from './types';

export interface AssembleTransactionSummaryParams {
  gasPerByte: BN;
  gasPriceFactor: BN;
  transaction: Transaction;
  id: string;
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

  const fee =
    totalFee ??
    calculateTXFeeForSummary({
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

export interface AssemblePreConfirmationTransactionSummaryParams {
  id: string;
  gqlTransactionStatus?: GraphqlTransactionStatus;
  abiMap?: AbiMap;
  maxInputs: BN;
  baseAssetId: string;
}

/** @hidden */
export function assemblePreConfirmationTransactionSummary<TTransactionType = void>(
  params: AssemblePreConfirmationTransactionSummaryParams
) {
  const { id, gqlTransactionStatus, abiMap, maxInputs, baseAssetId } = params;

  const {
    isStatusFailure,
    isStatusSuccess,
    status,
    totalFee,
    receipts,
    transaction,
    rawPayload,
    resolvedOutputs,
    errorReason,
  } = processGraphqlStatus(gqlTransactionStatus);

  let gasUsed: BN | undefined;
  let mintedAssets: MintedAsset[] = [];
  let burnedAssets: BurnedAsset[] = [];

  if (receipts) {
    gasUsed = getGasUsedFromReceipts(receipts);
    mintedAssets = extractMintedAssetsFromReceipts(receipts);
    burnedAssets = extractBurnedAssetsFromReceipts(receipts);
  }

  let tip: BN | undefined;
  let operations: Operation[] = [];
  let typeName: TransactionTypeName | undefined;

  if (transaction) {
    typeName = getTransactionTypeName(transaction.type);
    tip = bn(transaction.policies?.find((policy) => policy.type === PolicyType.Tip)?.data);

    if (receipts && rawPayload) {
      operations = getOperations({
        transactionType: transaction.type,
        inputs: transaction.inputs || [],
        outputs: transaction.outputs || [],
        receipts,
        rawPayload,
        abiMap,
        maxInputs,
        baseAssetId,
      });
    }
  }

  const transactionSummary: PreConfirmationTransactionSummary<TTransactionType> = {
    id,
    tip,
    fee: totalFee,
    gasUsed,
    operations,
    type: typeName,
    status,
    receipts,
    mintedAssets,
    burnedAssets,
    ...(transaction && {
      isTypeMint: isTypeMint(transaction.type),
      isTypeCreate: isTypeCreate(transaction.type),
      isTypeScript: isTypeScript(transaction.type),
      isTypeUpgrade: isTypeUpgrade(transaction.type),
      isTypeUpload: isTypeUpload(transaction.type),
      isTypeBlob: isTypeBlob(transaction.type),
    }),
    isStatusFailure,
    isStatusSuccess,
    isStatusPending: true,
    transaction: transaction as Transaction<TTransactionType>,
    resolvedOutputs,
    errorReason,
  };

  return transactionSummary;
}
