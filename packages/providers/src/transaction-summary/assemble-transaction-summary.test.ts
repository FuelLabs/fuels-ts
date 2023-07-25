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
} from '../../test/fixtures/transaction-summary';
import type { TransactionResultReceipt } from '../transaction-response';

import {
  assembleTransactionSummary,
  getTransactionStatusName,
} from './assemble-transaction-summary';
import type { GqlTransactionStatusesNames, GraphqlTransactionStatus } from './types';
import {
  SimplifiedTransactionStatusNameEnum,
  type FailureStatus,
  type Operation,
  type SqueezedOutStatus,
  type SubmittedStatus,
  type SuccessStatus,
} from './types';

describe('TransactionSummary', () => {
  const id = '0x2bfbebca58da94ba3ee258698c9be5884e2874688bdffa29cb535cf05d665215';
  const gasPrice = bn(1);
  const gasPerByte = bn(2);
  const gasPriceFactor = bn(3);
  const transaction = MOCK_TRANSACTION;
  const transactionBytes = arrayify(MOCK_TRANSACTION_RAWPAYLOAD);
  let gqlTransactionStatus: GraphqlTransactionStatus;
  const receipts: TransactionResultReceipt[] = [
    MOCK_RECEIPT_CALL,
    MOCK_RECEIPT_TRANSFER_OUT,
    MOCK_RECEIPT_RETURN_DATA_1,
    MOCK_RECEIPT_RETURN_DATA_2,
    MOCK_RECEIPT_SCRIPT_RESULT,
  ];

  it('should assemble transaction summary just fine (SUCCESS)', () => {
    gqlTransactionStatus = {
      __typename: 'SuccessStatus',
      type: 'SuccessStatus',
      block: {
        __typename: 'Block',
        id: '0x683a99f5dd02cd3afdcdb50e616c612701a90e9caf273d73d01f28baf5bb6d4d',
      },
      time: '4611686020117673503',
    } as SuccessStatus;

    const transactionSummary = assembleTransactionSummary({
      id,
      gasPrice,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus,
    });

    expect(transactionSummary.id).toEqual(id);
    expect(transactionSummary.blockId).toEqual(gqlTransactionStatus.block.id);
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusPending).toBe(false);
    expect(transactionSummary.isStatusFailure).toBe(false);
    expect(transactionSummary.isStatusSuccess).toBe(true);
    expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transactionSummary.receipts).toStrictEqual(receipts);
    expect(transactionSummary.status).toEqual(expect.any(String));
    expect(transactionSummary.time).toEqual(expect.any(String));
    expect(transactionSummary.transaction).toStrictEqual(MOCK_TRANSACTION);
    expect(transactionSummary.type).toEqual(expect.any(String));
  });

  it('should assemble transaction summary just fine (FAILURE)', () => {
    gqlTransactionStatus = {
      __typename: 'FailureStatus',
      type: 'FailureStatus',
      block: {
        __typename: 'Block',
        id: '0x683a99f5dd02cd3afdcdb50e616c612701a90e9caf273d73d01f28baf5bb6d4d',
      },
      reason: 'Transaction reverted',
      time: '4611686020117673503',
    } as FailureStatus;

    const transactionSummary = assembleTransactionSummary({
      id,
      gasPrice,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus,
    });

    expect(transactionSummary.id).toEqual(id);
    expect(transactionSummary.blockId).toEqual(gqlTransactionStatus.block.id);
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusPending).toBe(false);
    expect(transactionSummary.isStatusFailure).toBe(true);
    expect(transactionSummary.isStatusSuccess).toBe(false);
    expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transactionSummary.receipts).toStrictEqual(receipts);
    expect(transactionSummary.status).toEqual(expect.any(String));
    expect(transactionSummary.time).toEqual(expect.any(String));
    expect(transactionSummary.transaction).toStrictEqual(MOCK_TRANSACTION);
    expect(transactionSummary.type).toEqual(expect.any(String));
  });

  it('should assemble transaction summary just fine (SUBMITTED)', () => {
    gqlTransactionStatus = {
      __typename: 'SubmittedStatus',
      type: 'SubmittedStatus',
      time: '4611686020117673503',
    } as SubmittedStatus;

    const transactionSummary = assembleTransactionSummary({
      gasPrice,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus,
    });

    expect(transactionSummary.id).toBeUndefined();
    expect(transactionSummary.blockId).toBeUndefined();
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusPending).toBe(true);
    expect(transactionSummary.isStatusFailure).toBe(false);
    expect(transactionSummary.isStatusSuccess).toBe(false);
    expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transactionSummary.receipts).toStrictEqual(receipts);
    expect(transactionSummary.status).toEqual(expect.any(String));
    expect(transactionSummary.time).toEqual(expect.any(String));
    expect(transactionSummary.transaction).toStrictEqual(MOCK_TRANSACTION);
    expect(transactionSummary.type).toEqual(expect.any(String));
  });

  it('should assemble transaction summary just fine (SQUEEZEDOUT)', () => {
    gqlTransactionStatus = {
      __typename: 'SqueezedOutStatus',
      type: 'SqueezedOutStatus',
    } as SqueezedOutStatus;

    const transactionSummary = assembleTransactionSummary({
      gasPrice,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus,
    });

    expect(transactionSummary.id).toBeUndefined();
    expect(transactionSummary.blockId).toBeUndefined();
    expect(transactionSummary.fee).toStrictEqual(expect.any(BN));
    expect(transactionSummary.gasUsed).toStrictEqual(expect.any(BN));
    expect(transactionSummary.isTypeCreate).toBe(false);
    expect(transactionSummary.isTypeMint).toBe(false);
    expect(transactionSummary.isTypeScript).toBe(true);
    expect(transactionSummary.isStatusPending).toBe(false);
    expect(transactionSummary.isStatusFailure).toBe(false);
    expect(transactionSummary.isStatusSuccess).toBe(false);
    expect(transactionSummary.operations).toStrictEqual(expect.any(Array<Operation>));
    expect(transactionSummary.receipts).toStrictEqual(receipts);
    expect(transactionSummary.status).toEqual(expect.any(String));
    expect(transactionSummary.time).toBeUndefined();
    expect(transactionSummary.transaction).toStrictEqual(MOCK_TRANSACTION);
    expect(transactionSummary.type).toEqual(expect.any(String));
  });

  it('should ensure getTransactionStatusName return status name just fine', () => {
    let status = getTransactionStatusName('FailureStatus');
    expect(status).toBe(SimplifiedTransactionStatusNameEnum.failure);

    status = getTransactionStatusName('SuccessStatus');
    expect(status).toBe(SimplifiedTransactionStatusNameEnum.success);

    status = getTransactionStatusName('SqueezedOutStatus');
    expect(status).toBe(SimplifiedTransactionStatusNameEnum.squeezedout);

    status = getTransactionStatusName('SubmittedStatus');
    expect(status).toBe(SimplifiedTransactionStatusNameEnum.submitted);

    expect(() =>
      getTransactionStatusName('UnknownStatus' as unknown as GqlTransactionStatusesNames)
    ).toThrowError('Unknown transaction status');
  });
});
