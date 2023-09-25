import { arrayify } from '@ethersproject/bytes';
import { BN, bn } from '@fuel-ts/math';

import {
  MOCK_RECEIPT_CALL,
  MOCK_RECEIPT_TRANSFER_OUT,
  MOCK_RECEIPT_RETURN_DATA_1,
  MOCK_RECEIPT_RETURN_DATA_2,
  MOCK_RECEIPT_SCRIPT_RESULT,
  MOCK_TRANSACTION_RAWPAYLOAD,
  MOCK_TRANSACTION,
  MOCK_SUCCESS_STATUS,
  MOCK_FAILURE_STATUS,
  MOCK_SUBMITTED_STATUS,
  MOCK_SQUEEZEDOUT_STATUS,
} from '../../test/fixtures/transaction-summary';
import type { TransactionResultReceipt } from '../transaction-response';

import { assembleTransactionSummary } from './assemble-transaction-summary';
import type { GraphqlTransactionStatus, Operation } from './types';

describe('TransactionSummary', () => {
  const id = '0x2bfbebca58da94ba3ee258698c9be5884e2874688bdffa29cb535cf05d665215';
  const gasPerByte = bn(2);
  const gasPriceFactor = bn(3);
  const transaction = MOCK_TRANSACTION;
  const transactionBytes = arrayify(MOCK_TRANSACTION_RAWPAYLOAD);
  const receipts: TransactionResultReceipt[] = [
    MOCK_RECEIPT_CALL,
    MOCK_RECEIPT_TRANSFER_OUT,
    MOCK_RECEIPT_RETURN_DATA_1,
    MOCK_RECEIPT_RETURN_DATA_2,
    MOCK_RECEIPT_SCRIPT_RESULT,
  ];

  const runTest = (status: GraphqlTransactionStatus, expected: Record<string, unknown>) => {
    const transactionSummary = assembleTransactionSummary({
      id,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus: status,
    });

    expect(transactionSummary).toMatchObject(expected);
  };

  it('should assemble transaction summary just fine (SUCCESS)', () => {
    const expected = {
      id,
      blockId: MOCK_SUCCESS_STATUS.block.id,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isStatusPending: false,
      isStatusFailure: false,
      isStatusSuccess: true,
      operations: expect.any(Array<Operation>),
      receipts,
      status: expect.any(String),
      time: expect.any(String),
      transaction: MOCK_TRANSACTION,
      type: expect.any(String),
    };

    runTest(MOCK_SUCCESS_STATUS, expected);
  });

  it('should assemble transaction summary just fine (FAILURE)', () => {
    const expected = {
      id,
      blockId: MOCK_FAILURE_STATUS.block.id,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isStatusPending: false,
      isStatusFailure: true,
      isStatusSuccess: false,
      operations: expect.any(Array<Operation>),
      receipts,
      status: expect.any(String),
      time: expect.any(String),
      transaction: MOCK_TRANSACTION,
      type: expect.any(String),
    };

    runTest(MOCK_FAILURE_STATUS, expected);
  });

  it('should assemble transaction summary just fine (SUBMITTED)', () => {
    const expected = {
      id,
      blockId: undefined,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isStatusPending: true,
      isStatusFailure: false,
      isStatusSuccess: false,
      operations: expect.any(Array<Operation>),
      receipts,
      status: expect.any(String),
      time: expect.any(String),
      transaction: MOCK_TRANSACTION,
      type: expect.any(String),
    };

    runTest(MOCK_SUBMITTED_STATUS, expected);
  });

  it('should assemble transaction summary just fine (SQUEEZEDOUT)', () => {
    const expected = {
      id,
      blockId: undefined,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isStatusPending: false,
      isStatusFailure: false,
      isStatusSuccess: false,
      operations: expect.any(Array<Operation>),
      receipts,
      status: expect.any(String),
      time: undefined,
      transaction: MOCK_TRANSACTION,
      type: expect.any(String),
    };

    runTest(MOCK_SQUEEZEDOUT_STATUS, expected);
  });
});
