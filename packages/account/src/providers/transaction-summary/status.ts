import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';
import type { OutputChange, OutputVariable } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from '../transaction-response';
import { deserializeProcessedTxOutput, deserializeReceipt } from '../utils';

import { TransactionStatus } from './types';
import type {
  BlockId,
  GqlTransactionStatusesNames,
  GraphqlTransactionStatus,
  Time,
  ResolvedOutput,
  SerializedResolvedOutput,
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

/** @hidden */
export const extractResolvedOutputs = (
  serializedOutputs?: SerializedResolvedOutput[] | null
): ResolvedOutput[] => {
  const resolvedOutputs: ResolvedOutput[] = [];
  serializedOutputs?.forEach(({ utxoId, output }) =>
    resolvedOutputs.push({
      utxoId,
      output: deserializeProcessedTxOutput(output) as OutputChange | OutputVariable,
    })
  );
  return resolvedOutputs;
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
  isStatusPreConfirmationSuccess: boolean;
  isStatusPreConfirmationFailure: boolean;
  resolvedOutputs?: ResolvedOutput[];
  errorReason?: string;
};

/** @hidden */
export const processGraphqlStatus = (gqlTransactionStatus?: GraphqlTransactionStatus) => {
  let time: Time | undefined;
  let blockId: BlockId | undefined;
  let status: TransactionStatus | undefined;
  let totalFee: BN | undefined;
  let totalGas: BN | undefined;
  let receipts: TransactionResultReceipt[] | undefined;
  let resolvedOutputs: ResolvedOutput[] = [];
  let errorReason: string | undefined;

  let isStatusFailure = false;
  let isStatusSuccess = false;
  let isStatusPending = false;
  let isStatusPreConfirmationSuccess = false;
  let isStatusPreConfirmationFailure = false;

  if (gqlTransactionStatus?.type) {
    status = getTransactionStatusName(gqlTransactionStatus.type);

    switch (gqlTransactionStatus.type) {
      case 'SuccessStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block?.id;
        isStatusSuccess = true;
        receipts = gqlTransactionStatus.receipts?.map(deserializeReceipt);
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        break;

      case 'FailureStatus':
        time = gqlTransactionStatus.time;
        blockId = gqlTransactionStatus.block?.id;
        isStatusFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        receipts = gqlTransactionStatus.receipts?.map(deserializeReceipt);
        totalGas = bn(gqlTransactionStatus.totalGas);
        break;

      case 'SubmittedStatus':
        time = gqlTransactionStatus.time;
        isStatusPending = true;
        break;

      case 'PreconfirmationSuccessStatus':
        isStatusPreConfirmationSuccess = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = gqlTransactionStatus.preconfirmationReceipts?.map(deserializeReceipt);
        resolvedOutputs = extractResolvedOutputs(gqlTransactionStatus.resolvedOutputs);
        break;

      case 'PreconfirmationFailureStatus':
        isStatusPreConfirmationFailure = true;
        totalFee = bn(gqlTransactionStatus.totalFee);
        totalGas = bn(gqlTransactionStatus.totalGas);
        receipts = gqlTransactionStatus.preconfirmationReceipts?.map(deserializeReceipt);
        resolvedOutputs = extractResolvedOutputs(gqlTransactionStatus.resolvedOutputs);
        errorReason = gqlTransactionStatus.reason;
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
    receipts,
    isStatusFailure,
    isStatusSuccess,
    isStatusPending,
    isStatusPreConfirmationSuccess,
    isStatusPreConfirmationFailure,
    resolvedOutputs,
    errorReason,
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
