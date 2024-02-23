import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type {
  BlockId,
  GqlTransactionStatusesNames,
  GraphqlTransactionStatus,
  Time,
  TransactionSummary,
} from './types';
import { TransactionStatus } from './types';

/**
 * @hidden
 * 
 * @throws {FuelError} {@link ErrorCode.INVALID_TRANSACTION_STATUS}
 * When the transaction status is not recognized (valid statuses: {@link TransactionStatus}).
 */
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
    default:
      throw new FuelError(
        ErrorCode.INVALID_TRANSACTION_STATUS,
        `Invalid transaction status: ${gqlStatus}. Must be one of the following: ${Object.values(TransactionStatus).join(', ')}`
      );
  }
};

type IProcessGraphqlStatusResponse = Pick<
  TransactionSummary,
  'time' | 'blockId' | 'isStatusPending' | 'isStatusSuccess' | 'isStatusFailure' | 'status'
>;

/** @hidden */
export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus) => {
  let time: Time;
  let blockId: BlockId | undefined;
  let status: TransactionStatus | undefined;

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

  const processedGraphqlStatus: IProcessGraphqlStatusResponse = {
    time,
    blockId,
    status,
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
  };

  return processedGraphqlStatus;
};
