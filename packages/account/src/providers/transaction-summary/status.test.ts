import {
  MOCK_FAILURE_STATUS,
  MOCK_SQUEEZEDOUT_STATUS,
  MOCK_SUBMITTED_STATUS,
  MOCK_SUCCESS_STATUS,
} from '../../../test/fixtures/transaction-summary';

import { getTransactionStatusName, processGraphqlStatus } from './status';
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
      } = processGraphqlStatus(status);

      expect(isStatusFailure).toBe(expected.isStatusFailure);
      expect(isStatusPending).toBe(expected.isStatusPending);
      expect(isStatusSuccess).toBe(expected.isStatusSuccess);
      expect(typeof blockId).toBe(expected.blockIdType);
      expect(resultStatus).toBe(expected.status);
      expect(typeof time).toBe(expected.timeType);
    });
  });
});
