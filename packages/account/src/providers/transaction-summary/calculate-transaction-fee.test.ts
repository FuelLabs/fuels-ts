import { bn } from '@fuel-ts/math';

import { MOCK_CHAIN } from '../../../test/fixtures/chain';
import {
  MOCK_TX_CREATE_RAW_PAYLOAD,
  MOCK_TX_MINT_RAW_PAYLOAD,
  MOCK_TX_SCRIPT_RAW_PAYLOAD,
} from '../../../test/fixtures/transaction-summary';

import { calculateTransactionFee } from './calculate-transaction-fee';

/**
 * @group node
 */
describe('calculateTransactionFee', () => {
  it('should properly calculate the transaction fee (SCRIPT TX)', () => {
    const transactionRawPayload = MOCK_TX_SCRIPT_RAW_PAYLOAD;
    const {
      gasCosts,
      txParams: { maxGasPerTx },
    } = MOCK_CHAIN.consensusParameters;

    const gasPriceFactor = 92;
    const gasPerByte = 4;

    const { fee, maxFee, minFee } = calculateTransactionFee({
      tip: bn(0),
      gasPrice: bn(1),
      consensusParameters: {
        feeParams: {
          gasPriceFactor,
          gasPerByte,
        },
        maxGasPerTx: bn(maxGasPerTx),
        gasCosts,
      },
      rawPayload: transactionRawPayload,
    });

    const expectedfee = bn(84);
    const expectedmaxFee = bn(84);
    const expectedminFee = bn(77);

    expect(fee.toNumber()).toEqual(expectedfee.toNumber());
    expect(maxFee.toNumber()).toEqual(expectedmaxFee.toNumber());
    expect(minFee.toNumber()).toEqual(expectedminFee.toNumber());
  });

  it('should properly calculate the transaction fee (CREATE TX)', () => {
    const transactionRawPayload = MOCK_TX_CREATE_RAW_PAYLOAD;
    const {
      gasCosts,
      txParams: { maxGasPerTx },
    } = MOCK_CHAIN.consensusParameters;

    const gasPriceFactor = 92;
    const gasPerByte = 4;

    const { fee, maxFee, minFee } = calculateTransactionFee({
      tip: bn(0),
      gasPrice: bn(1),
      consensusParameters: {
        feeParams: {
          gasPriceFactor,
          gasPerByte,
        },
        maxGasPerTx: bn(maxGasPerTx),
        gasCosts,
      },
      rawPayload: transactionRawPayload,
    });

    const expectedfee = bn(159);
    const expectedmaxFee = bn(159);
    const expectedminFee = bn(159);

    expect(fee.toNumber()).toEqual(expectedfee.toNumber());
    expect(maxFee.toNumber()).toEqual(expectedmaxFee.toNumber());
    expect(minFee.toNumber()).toEqual(expectedminFee.toNumber());
  });

  it('should properly calculate the transaction fee (MINT TX)', () => {
    const transactionRawPayload = MOCK_TX_MINT_RAW_PAYLOAD;
    const {
      gasCosts,
      txParams: { maxGasPerTx },
    } = MOCK_CHAIN.consensusParameters;

    const gasPriceFactor = 92;
    const gasPerByte = 4;

    const { fee, maxFee, minFee } = calculateTransactionFee({
      tip: bn(0),
      gasPrice: bn(1),
      consensusParameters: {
        feeParams: {
          gasPriceFactor,
          gasPerByte,
        },
        maxGasPerTx: bn(maxGasPerTx),
        gasCosts,
      },
      rawPayload: transactionRawPayload,
    });

    expect(fee.toNumber()).toEqual(0);
    expect(maxFee.toNumber()).toEqual(0);
    expect(minFee.toNumber()).toEqual(0);
  });
});
