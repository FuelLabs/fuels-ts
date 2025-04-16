import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

import type { GqlPreconfirmationFailureStatusFragment, GqlReceiptFragment, GqlTransactionStatusSubscriptionFragment } from '../__generated__/operations';
import type { TransactionResultReceipt } from '../transaction-response';
import { deserializeReceipt } from '../utils';

import { TransactionStatus } from './types';
import type {
  BlockId,
  GqlTransactionStatusesNames,
  GraphqlTransactionStatus,
  PreconfirmationSuccessStatus,
  Time,
  TransactionStatusFromGetTransactionWithReceipts,
  TransactionStatusFromSubscription,
  TransactionSummary,
} from './types';


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
      return TransactionStatus.preconfirmationsuccess;
    case 'PreconfirmationFailureStatus':
      return TransactionStatus.preconfirmationfailure;
    default:
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${gqlStatus}.`
      );
  }
};

type IProcessGraphqlStatusResponse = Pick<
  TransactionSummary,
  'time' | 'blockId' | 'isStatusPending' | 'isStatusSuccess' | 'isStatusFailure' | 'status' | 'receipts'
> & { totalFee?: BN; totalGas?: BN };

const getOptionalReceipts = (status?: Pick<GqlPreconfirmationFailureStatusFragment, 'optionalReceipts'> | Pick<PreconfirmationSuccessStatus, 'receipts'>): GqlReceiptFragment[] => {
  if (!status) {
    return [];
  }

  if ('receipts' in status && status.receipts) {
    return status.receipts
  }

  if ('optionalReceipts' in status && status.optionalReceipts) {
    return status.optionalReceipts
  }

  return [];
}


export const deserializeGraphqlStatus = (gqlTransactionStatus?: TransactionStatusFromSubscription | TransactionStatusFromGetTransactionWithReceipts | null): undefined | GraphqlTransactionStatus => {
  if (!gqlTransactionStatus) {
    return undefined;
  }

  switch (gqlTransactionStatus.type) {
    case 'PreconfirmationSuccessStatus':
    case 'PreconfirmationFailureStatus': {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { optionalReceipts, ...rest } = gqlTransactionStatus;
      return {
        ...rest,
        receipts: getOptionalReceipts(gqlTransactionStatus)
      }
    }

    default:
      return gqlTransactionStatus;
  }
}

/** @hidden */
export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus | GqlTransactionStatusSubscriptionFragment): IProcessGraphqlStatusResponse => {
  let time: Time | undefined;
  let blockId: BlockId | undefined;
  let status: TransactionStatus | undefined;
  let totalFee: BN | undefined;
  let totalGas: BN | undefined;
  let receipts: TransactionResultReceipt[] = [];

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
        receipts = gqlTransactionStatus.receipts.map(deserializeReceipt);
        break;

      case 'FailureStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block?.id;
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = gqlTransactionStatus.receipts.map(deserializeReceipt);
        break;

      case 'SubmittedStatus':
        time = gqlTransactionStatus.time;
        isStatusPending = true;
        break;

      case 'PreconfirmationSuccessStatus':
        isStatusPending = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = getOptionalReceipts(gqlTransactionStatus).map(deserializeReceipt);
        break;

      case 'PreconfirmationFailureStatus':
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = getOptionalReceipts(gqlTransactionStatus).map(deserializeReceipt);
        break;

      default:
    }
  }

  const processedGraphqlStatus: IProcessGraphqlStatusResponse = {
    time,
    blockId,
    status,
    totalFee,
    totalGas,
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
    receipts
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
