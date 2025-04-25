import { bn } from '@fuel-ts/math';

import {
  MOCK_FAILURE_STATUS,
  MOCK_PRECONFIRMATION_FAILURE_STATUS,
  MOCK_PRECONFIRMATION_SUCCESS_STATUS,
  MOCK_SQUEEZEDOUT_STATUS,
  MOCK_SUBMITTED_STATUS,
  MOCK_SUCCESS_STATUS,
} from '../../../test/fixtures/transaction-summary';

import { getTotalFeeFromStatus, getTransactionStatusName, processGraphqlStatus } from './status';
import type { GqlTransactionStatusesNames, GraphqlTransactionStatus } from './types';
import { TransactionStatus } from './types';

/**
 * @group node
 */
describe('status', () => {
  it('should ensure getTransactionStatusName return status name just fine', () => {
    let status = getTransactionStatusName('FailureStatus');
    expect(status).toBe(TransactionStatus.failure);

    status = getTransactionStatusName('SuccessStatus');
    expect(status).toBe(TransactionStatus.success);

    status = getTransactionStatusName('SqueezedOutStatus');
    expect(status).toBe(TransactionStatus.squeezedout);

    status = getTransactionStatusName('SubmittedStatus');
    expect(status).toBe(TransactionStatus.submitted);

    status = getTransactionStatusName('PreconfirmationSuccessStatus');
    expect(status).toBe(TransactionStatus.preconfirmationSuccess);

    status = getTransactionStatusName('PreconfirmationFailureStatus');
    expect(status).toBe(TransactionStatus.preconfirmationFailure);

    expect(() =>
      getTransactionStatusName('UnknownStatus' as unknown as GqlTransactionStatusesNames)
    ).toThrowError('Invalid transaction status: UnknownStatus');
  });

  const statuses: Array<{
    name: string;
    status: GraphqlTransactionStatus;
    expected: Record<string, unknown>;
  }> = [
    {
      name: 'SuccessStatus',
      status: MOCK_SUCCESS_STATUS,
      expected: {
        isStatusFailure: false,
        isStatusPending: false,
        isStatusSuccess: true,
        blockIdType: 'string',
        status: TransactionStatus.success,
        timeType: 'string',
        totalFee: bn(1000),
        totalGas: bn(1000),
      },
    },
    {
      name: 'FailureStatus',
      status: MOCK_FAILURE_STATUS,
      expected: {
        isStatusFailure: true,
        isStatusPending: false,
        isStatusSuccess: false,
        blockIdType: 'string',
        status: TransactionStatus.failure,
        timeType: 'string',
        totalFee: bn(1000),
        totalGas: bn(1000),
      },
    },
    {
      name: 'SubmittedStatus',
      status: MOCK_SUBMITTED_STATUS,
      expected: {
        isStatusFailure: false,
        isStatusPending: true,
        isStatusSuccess: false,
        blockIdType: 'undefined',
        status: TransactionStatus.submitted,
        timeType: 'string',
      },
    },
    {
      name: 'SqueezedOutStatus',
      status: MOCK_SQUEEZEDOUT_STATUS,
      expected: {
        isStatusFailure: false,
        isStatusPending: false,
        isStatusSuccess: false,
        blockIdType: 'undefined',
        status: TransactionStatus.squeezedout,
        timeType: 'undefined',
      },
    },
    {
      name: 'PreconfirmationSuccessStatus',
      status: MOCK_PRECONFIRMATION_SUCCESS_STATUS,
      expected: {
        isStatusFailure: false,
        isStatusPending: false,
        isStatusSuccess: true,
        blockIdType: 'undefined',
        status: TransactionStatus.preconfirmationSuccess,
        timeType: 'undefined',
        totalFee: bn(1000),
        totalGas: bn(1000),
      },
    },
    {
      name: 'PreconfirmationFailureStatus',
      status: MOCK_PRECONFIRMATION_FAILURE_STATUS,
      expected: {
        isStatusFailure: true,
        isStatusPending: false,
        isStatusSuccess: false,
        blockIdType: 'undefined',
        status: TransactionStatus.preconfirmationFailure,
        timeType: 'undefined',
        totalFee: bn(1000),
        totalGas: bn(1000),
      },
    },
  ];

  statuses.forEach(({ name, status, expected }) => {
    it(`should ensure processGraphqlStatus works fine for ${name}`, () => {
      const {
        isStatusFailure,
        isStatusPending,
        isStatusSuccess,
        blockId,
        status: resultStatus,
        time,
        totalFee,
        totalGas,
      } = processGraphqlStatus(status);

      expect(isStatusFailure).toBe(expected.isStatusFailure);
      expect(isStatusPending).toBe(expected.isStatusPending);
      expect(isStatusSuccess).toBe(expected.isStatusSuccess);
      expect(typeof blockId).toBe(expected.blockIdType);
      expect(resultStatus).toBe(expected.status);
      expect(typeof time).toBe(expected.timeType);
      expect(totalFee).toStrictEqual(expected.totalFee);
      expect(totalGas).toStrictEqual(expected.totalGas);
    });
  });

  statuses.forEach(({ name, status, expected }) => {
    it(`should ensure getTotalFeeFromStatus works fine for ${name}`, () => {
      const totalFee = getTotalFeeFromStatus(status);
      expect(totalFee).toStrictEqual(expected.totalFee);
    });
  });
});
