import { hexlify } from '@ethersproject/bytes';
import type { BN } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from '../transaction-response';
import { calculateTransactionFee } from '../utils';

import {
  getOperations,
  getTransactionTypeName,
  isTypeMint,
  isTypeCreate,
  isTypeScript,
} from './operations';
import type {
  BlockId,
  GqlTransaction,
  GqlTransactionStatusesNames,
  Time,
  TransactionSummary,
} from './types';
import { SimplifiedTransactionStatusNameEnum } from './types';

export const getTransactionStatusName = (gqlStatus: GqlTransactionStatusesNames) => {
  switch (gqlStatus) {
    case 'FailureStatus':
      return SimplifiedTransactionStatusNameEnum.failure;
    case 'SuccessStatus':
      return SimplifiedTransactionStatusNameEnum.success;
    case 'SubmittedStatus':
      return SimplifiedTransactionStatusNameEnum.submitted;
    case 'SqueezedOutStatus':
      return SimplifiedTransactionStatusNameEnum.squeezedout;
    default:
      throw new Error('Unknown transaction status');
  }
};

export function assembleTransactionSummary<TTransactionType = void>(params: {
  id?: string;
  gasPrice: BN;
  gasPerByte?: BN;
  gasPriceFactor?: BN;
  transaction: Transaction;
  transactionBytes: Uint8Array;
  gqlTransactionStatus?: GqlTransaction['status'];
  receipts: TransactionResultReceipt[];
}) {
  const {
    receipts,
    gasPerByte,
    gasPrice,
    gasPriceFactor,
    transaction,
    transactionBytes,
    id,
    gqlTransactionStatus,
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
    // abiMap, TODO: update this when it's possible to get a contract JsonAbi using graphql
  });

  const typeName = getTransactionTypeName(transaction.type);

  let time: Time;
  let blockId: BlockId | undefined;
  let status: SimplifiedTransactionStatusNameEnum | undefined;

  let isStatusFailure = false;
  let isStatusSuccess = false;
  let isStatusPending = false;

  if (gqlTransactionStatus?.type) {
    status = getTransactionStatusName(gqlTransactionStatus.type);

    switch (gqlTransactionStatus.type) {
      case 'SuccessStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block.id;
        isStatusSuccess = true;
        break;

      case 'FailureStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block.id;
        isStatusFailure = true;
        break;

      case 'SubmittedStatus':
        time = gqlTransactionStatus.time;
        isStatusPending = true;
        break;
      default:
    }
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
