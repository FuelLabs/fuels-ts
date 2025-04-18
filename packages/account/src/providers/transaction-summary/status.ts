import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { Transaction } from '@fuel-ts/transactions';
import { TransactionCoder } from '@fuel-ts/transactions';
import { arrayify } from '@fuel-ts/utils';

import type { TransactionResultReceipt } from '../transaction-response';
import { deserializeReceipt } from '../utils';

import { TransactionStatus } from './types';
import type { BlockId, GqlTransactionStatusesNames, GraphqlTransactionStatus, Time } from './types';

/** @hidden */
export const getTransactionStatusName = (gqlStatus: GqlTransactionStatusesNames) => {
  switch (gqlStatus) {
    case 'FailureStatus':
      return TransactionStatus.failure;
    case 'SuccessStatus':
      return TransactionStatus.success;
    case 'SubmittedStatus':
      return TransactionStatus.submitted;
    case 'SqueezedOutStatus':
      return TransactionStatus.squeezedout;
    case 'PreconfirmationSuccessStatus':
      return TransactionStatus.preconfirmationSuccess;
    case 'PreconfirmationFailureStatus':
      return TransactionStatus.preconfirmationFailure;
    default:
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${gqlStatus}.`
      );
  }
};

type IProcessGraphqlStatusResponse = {
  time?: Time;
  blockId?: BlockId;
  status?: TransactionStatus;
  totalFee?: BN;
  totalGas?: BN;
  receipts?: TransactionResultReceipt[];
  isStatusFailure: boolean;
  isStatusSuccess: boolean;
  isStatusPending: boolean;
  transaction?: Transaction;
  rawPayload?: string;
};

/** @hidden */
export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus) => {
  let time: Time | undefined;
  let blockId: BlockId | undefined;
  let status: TransactionStatus | undefined;
  let totalFee: BN | undefined;
  let totalGas: BN | undefined;
  let receipts: TransactionResultReceipt[] | undefined;
  let rawPayload: string | undefined;
  let transaction: Transaction | undefined;

  let isStatusFailure = false;
  let isStatusSuccess = false;
  let isStatusPending = false;

  if (gqlTransactionStatus?.type) {
    status = getTransactionStatusName(gqlTransactionStatus.type);

    switch (gqlTransactionStatus.type) {
      case 'SuccessStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block?.id;
        isStatusSuccess = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        break;

      case 'FailureStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block?.id;
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        break;

      case 'SubmittedStatus':
        time = gqlTransactionStatus.time;
        isStatusPending = true;
        break;

      case 'PreconfirmationSuccessStatus':
        isStatusPending = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = gqlTransactionStatus.preconfirmationReceipts?.map(deserializeReceipt);
        rawPayload = gqlTransactionStatus.preconfirmationTransaction?.rawPayload;
        break;

      case 'PreconfirmationFailureStatus':
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = gqlTransactionStatus.preconfirmationReceipts?.map(deserializeReceipt);
        rawPayload = gqlTransactionStatus.preconfirmationTransaction?.rawPayload;
        break;

      default:
    }
  }

  if (rawPayload) {
    [transaction] = new TransactionCoder().decode(arrayify(rawPayload), 0);
  }

  const processedGraphqlStatus: IProcessGraphqlStatusResponse = {
    time,
    blockId,
    status,
    totalFee,
    totalGas,
    receipts,
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
    transaction,
    rawPayload,
  };

  return processedGraphqlStatus;
};

/**
 * Returns the total fee from the transaction status.
 *
 * @param status - The transaction status.
 * @returns The total fee from the transaction status or undefined.
 */
export const getTotalFeeFromStatus = (status?: GraphqlTransactionStatus): BN | undefined =>
  status && 'totalFee' in status ? bn(status.totalFee) : undefined;
