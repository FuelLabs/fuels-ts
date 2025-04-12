import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

import { TransactionStatus } from './types';
import type {
  BlockId,
  GqlTransactionStatusesNames,
  GraphqlTransactionStatus,
  Time,
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

type IProcessGraphqlStatusResponse = Pick<
  TransactionSummary,
  'time' | 'blockId' | 'isStatusPending' | 'isStatusSuccess' | 'isStatusFailure' | 'status'
> & { totalFee?: BN; totalGas?: BN };

/** @hidden */
export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus) => {
  let time: Time | undefined;
  let blockId: BlockId | undefined;
  let status: TransactionStatus | undefined;
  let totalFee: BN | undefined;
  let totalGas: BN | undefined;

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
        break;

      case 'PreconfirmationFailureStatus':
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
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
