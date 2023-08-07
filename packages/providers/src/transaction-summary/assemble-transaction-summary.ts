import { hexlify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import { type Transaction } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from '../transaction-response';
import { calculateTransactionFee } from '../utils';

import {
  getOperations,
  getTransactionTypeName,
  isTypeMint,
  isTypeCreate,
  isTypeScript,
} from './operations';
import { extractAssetIdFromBurnOrMintReceipts } from './receipt';
import { processGraphqlStatus } from './status';
import type { AbiParam, GraphqlTransactionStatus, TransactionSummary } from './types';

interface IAssembleTransactionSummaryParams {
  id?: string;
  gasPrice: BN;
  gasPerByte?: BN;
  gasPriceFactor?: BN;
  transaction: Transaction;
  transactionBytes: Uint8Array;
  gqlTransactionStatus?: GraphqlTransactionStatus;
  receipts: TransactionResultReceipt[];
  abiParam?: AbiParam;
}

export function assembleTransactionSummary<TTransactionType = void>(
  params: IAssembleTransactionSummaryParams
) {
  const {
    receipts,
    gasPerByte,
    gasPrice,
    gasPriceFactor,
    transaction,
    transactionBytes,
    id,
    gqlTransactionStatus,
    abiParam,
  } = params;

  const { gasUsed, fee } = calculateTransactionFee({
    receipts,
    gasPrice,
    gasPerByte,
    gasPriceFactor,
    transactionBytes,
    transactionType: transaction.type,
    transactionWitnesses: transaction?.witnesses || [],
  });

  const operations = getOperations({
    transactionType: transaction.type,
    inputs: transaction.inputs || [],
    outputs: transaction.outputs || [],
    receipts,
    rawPayload: hexlify(transactionBytes),
    abiMap: abiParam?.abiMap,
  });

  const typeName = getTransactionTypeName(transaction.type);

  const { isStatusFailure, isStatusPending, isStatusSuccess, blockId, status, time } =
    processGraphqlStatus(gqlTransactionStatus);

  const { mintedAssets, burnedAssets } = extractAssetIdFromBurnOrMintReceipts(receipts);

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
    transaction: transaction as Transaction<TTransactionType>,
  };

  return transactionSummary;
}
