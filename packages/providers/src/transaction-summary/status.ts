import type {
  BlockId,
  GqlTransactionStatusesNames,
  GraphqlTransactionStatus,
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

type IProcessGraphqlStatusResponse = Pick<
  TransactionSummary,
  'time' | 'blockId' | 'isStatusPending' | 'isStatusSuccess' | 'isStatusFailure' | 'status'
>;

export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus) => {
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
