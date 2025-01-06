import { BN, bn } from '@fuel-ts/math';
import { arrayify } from '@fuel-ts/utils';

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
} from '../../../test/fixtures/transaction-summary';
import { setupTestProviderAndWallets } from '../../test-utils';
import type { GasCosts } from '../provider';
import type { TransactionResultReceipt } from '../transaction-response';

import { assembleTransactionSummary } from './assemble-transaction-summary';
import * as calculateTransactionFeeMod from './calculate-tx-fee-for-summary';
import type { GraphqlTransactionStatus, Operation } from './types';

/**
 * @group node
 */
describe('TransactionSummary', () => {
  let gasCosts: GasCosts;

  const id = '0x2bfbebca58da94ba3ee258698c9be5884e2874688bdffa29cb535cf05d665215';
  const gasPerByte = bn(2);
  const gasPriceFactor = bn(3);
  const maxInputs = bn(255);
  const maxGasPerTx = bn(10000000);
  const transaction = MOCK_TRANSACTION;
  const transactionBytes = arrayify(MOCK_TRANSACTION_RAWPAYLOAD);
  const receipts: TransactionResultReceipt[] = [
    MOCK_RECEIPT_CALL,
    MOCK_RECEIPT_TRANSFER_OUT,
    MOCK_RECEIPT_RETURN_DATA_1,
    MOCK_RECEIPT_RETURN_DATA_2,
    MOCK_RECEIPT_SCRIPT_RESULT,
  ];

  const mockCalculateTransactionFee = () => {
    const calculateTransactionFee = vi
      .spyOn(calculateTransactionFeeMod, 'calculateTXFeeForSummary')
      .mockReturnValue(bn(0));

    return {
      calculateTransactionFee,
    };
  };

  const runTest = (
    status: GraphqlTransactionStatus,
    expected: Record<string, unknown>,
    baseAssetId: string
  ) => {
    const { calculateTransactionFee } = mockCalculateTransactionFee();

    const transactionSummary = assembleTransactionSummary({
      id,
      gasPerByte,
      gasPriceFactor,
      transaction,
      transactionBytes,
      receipts,
      gqlTransactionStatus: status,
      maxInputs,
      gasCosts,
      abiMap: {},
      maxGasPerTx,
      gasPrice: bn(1),
      baseAssetId,
    });

    expect(transactionSummary).toMatchObject(expected);
    expect(calculateTransactionFee).toHaveBeenCalledTimes(1);
  };

  it('should assemble transaction summary just fine (SUCCESS)', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const expected = {
      id,
      blockId: MOCK_SUCCESS_STATUS.block?.id,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isTypeBlob: false,
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

    runTest(MOCK_SUCCESS_STATUS, expected, await provider.getBaseAssetId());
  });

  it('should assemble transaction summary just fine (FAILURE)', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const expected = {
      id,
      blockId: MOCK_FAILURE_STATUS.block?.id,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeBlob: false,
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

    runTest(MOCK_FAILURE_STATUS, expected, await provider.getBaseAssetId());
  });

  it('should assemble transaction summary just fine (SUBMITTED)', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const expected = {
      id,
      blockId: undefined,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isTypeBlob: false,
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

    runTest(MOCK_SUBMITTED_STATUS, expected, await provider.getBaseAssetId());
  });

  it('should assemble transaction summary just fine (SQUEEZEDOUT)', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    const expected = {
      id,
      blockId: undefined,
      fee: expect.any(BN),
      gasUsed: expect.any(BN),
      isTypeCreate: false,
      isTypeMint: false,
      isTypeScript: true,
      isTypeBlob: false,
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

    runTest(MOCK_SQUEEZEDOUT_STATUS, expected, await provider.getBaseAssetId());
  });
});
