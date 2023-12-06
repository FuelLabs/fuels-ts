import { bn, type BN } from '@fuel-ts/math';
import { PolicyType, type Transaction } from '@fuel-ts/transactions';
import { hexlify } from 'ethers';

import type { GqlGasCosts } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import { calculatePriceWithFactor, getGasUsedFromReceipts } from '../utils';
import {
  calculateMetadataGasForTxCreate,
  calculateMetadataGasForTxScript,
  getMinGas,
} from '../utils/gas';

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
  gasPerByte: BN;
  gasPriceFactor: BN;
  transaction: Transaction;
  transactionBytes: Uint8Array;
  gqlTransactionStatus?: GraphqlTransactionStatus;
  receipts: TransactionResultReceipt[];
  abiMap?: AbiMap;
  maxInputs: BN;
  gasCosts: GqlGasCosts;
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
  } = params;

  const { policies } = transaction;

  const gasPrice =
    bn(policies?.find((policy) => policy.type === PolicyType.GasPrice)?.data) || bn(0);
  const gasUsed = getGasUsedFromReceipts(receipts);

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

  const isScriptTx = isTypeScript(transaction.type);
  let metadataGas: BN;

  if (isScriptTx) {
    metadataGas = calculateMetadataGasForTxScript({
      gasCosts,
      txBytesSize: transactionBytes.length,
    });
  } else {
    const { storageSlotsCount = 0, witnesses = [], bytecodeWitnessIndex = -1 } = transaction;
    const contractBytesSize = bn(witnesses[bytecodeWitnessIndex]?.dataLength || 0);

    metadataGas = calculateMetadataGasForTxCreate({
      contractBytesSize,
      gasCosts,
      stateRootSize: storageSlotsCount,
      txBytesSize: transactionBytes.length,
    });
  }

  const minGas = getMinGas({
    gasCosts,
    gasPerByte,
    inputs: transaction.inputs || [],
    metadataGas,
    txBytesSize: transactionBytes.length,
  });

  const minFee = calculatePriceWithFactor(minGas, gasPrice, gasPriceFactor);

  const usedFee = calculatePriceWithFactor(gasUsed, gasPrice, gasPriceFactor);

  const fee = minFee.add(usedFee);

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
