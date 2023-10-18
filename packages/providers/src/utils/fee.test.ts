import { BN, bn } from '@fuel-ts/math';
import { ReceiptType, type Witness } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from '../transaction-response';

import {
  calculatePriceWithFactor,
  calculateTransactionFeeForContractCreated,
  getGasUsedFromReceipts,
  calculateTransactionFeeForScript,
} from './fee';

/**
 * @group node
 */
describe(__filename, () => {
  describe('calculatePriceWithFactor', () => {
    it('should correctly calculate the price with factor', () => {
      const gasUsed = new BN(10);
      const gasPrice = new BN(2);
      const priceFactor = new BN(5);

      const result = calculatePriceWithFactor(gasUsed, gasPrice, priceFactor);

      expect(result.toNumber()).toEqual(4); // ceil(10 / 5) * 2 = 4
    });

    it('should correctly round up the result', () => {
      const gasUsed = new BN(11);
      const gasPrice = new BN(2);
      const priceFactor = new BN(5);

      const result = calculatePriceWithFactor(gasUsed, gasPrice, priceFactor);

      expect(result.toNumber()).toEqual(6); // ceil(11 / 5) * 2 = 6
    });
  });

  describe('calculateTransactionFeeForScript', () => {
    it('should calculate transaction fee for script correctly', () => {
      const gasUsed = new BN(1700);
      const gasPrice = new BN(50);
      const gasPriceFactor = new BN(1000000);
      const margin = 1;

      const receipts: TransactionResultReceipt[] = [
        {
          type: ReceiptType.ScriptResult,
          result: bn(50),
          gasUsed,
        },
      ];

      const result = calculateTransactionFeeForScript({
        receipts,
        gasPrice,
        gasPriceFactor,
        margin,
      });

      const expectedFee = bn(
        Math.ceil(gasUsed.toNumber() / gasPriceFactor.toNumber()) * gasPrice.toNumber()
      );

      const expectedGasUsed = gasUsed;

      expect(result.fee).toStrictEqual(expectedFee);
      expect(result.gasUsed).toStrictEqual(expectedGasUsed);
    });

    it('should calculate transaction fee for multiple receipts', () => {
      const gasUsed1 = new BN(900);
      const gasUsed2 = new BN(800);
      const gasPrice = new BN(50);
      const gasPriceFactor = new BN(1000000);
      const margin = 1;

      const receipts: TransactionResultReceipt[] = [
        {
          type: ReceiptType.ScriptResult,
          result: bn(50),
          gasUsed: gasUsed1,
        },
        {
          type: ReceiptType.ScriptResult,
          result: bn(90),
          gasUsed: gasUsed2,
        },
      ];

      const result = calculateTransactionFeeForScript({
        receipts,
        gasPrice,
        gasPriceFactor,
        margin,
      });

      const expectedGasUsed = bn(gasUsed1.toNumber() + gasUsed2.toNumber());

      const expectedFee = bn(
        Math.ceil(expectedGasUsed.toNumber() / gasPriceFactor.toNumber()) * gasPrice.toNumber()
      );

      expect(result.fee).toStrictEqual(expectedFee);
      expect(result.gasUsed).toStrictEqual(expectedGasUsed);
    });
  });

  describe('calculateTransactionFeeForContractCreated', () => {
    it('should calculate gas used for contract created correctly', () => {
      const transactionBytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [{ dataLength: 2, data: 'data' }];

      const gasPrice = new BN(4);

      const { fee, gasUsed } = calculateTransactionFeeForContractCreated({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(gasUsed.toNumber()).toEqual(2); // (6-2)*1/2 = 2
      expect(fee.toNumber()).toEqual(8); // 4*2 = 8
    });

    it('should handle an empty witnesses array', () => {
      const transactionBytes = new Uint8Array([0, 1, 2, 3, 4, 5]);
      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [];

      const gasPrice = new BN(2);

      const { fee, gasUsed } = calculateTransactionFeeForContractCreated({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(gasUsed.toNumber()).toEqual(3); // 6*1/2 = 3
      expect(fee.toNumber()).toEqual(6); // 3*2 = 6
    });

    it('should round up the result', () => {
      const transactionBytes = new Uint8Array([0, 1, 2]);
      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [];

      const gasPrice = new BN(1);

      const { fee, gasUsed } = calculateTransactionFeeForContractCreated({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(gasUsed.toNumber()).toEqual(2); // 3*1/2 = 1.5 which rounds up to 2
      expect(fee.toNumber()).toEqual(2); // 2*1 = 2
    });
  });

  describe('getGasUsedFromReceipts', () => {
    it('should return correct total gas used from ScriptResult receipts', () => {
      const receipts: Array<TransactionResultReceipt> = [
        {
          type: ReceiptType.Return,
          id: '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6',
          val: new BN(1),
          pc: new BN(2),
          is: new BN(3),
        },
        {
          type: ReceiptType.ScriptResult,
          result: new BN(4),
          gasUsed: new BN(5),
        },
        {
          type: ReceiptType.ScriptResult,
          result: new BN(6),
          gasUsed: new BN(7),
        },
      ];

      const result = getGasUsedFromReceipts(receipts);

      expect(result.toNumber()).toEqual(12); // 5 + 7 = 12
    });

    it('should return zero if there are no ScriptResult receipts', () => {
      const receipts: Array<TransactionResultReceipt> = [
        {
          type: ReceiptType.Return,
          id: '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6',
          val: new BN(1),
          pc: new BN(2),
          is: new BN(3),
        },
        {
          type: ReceiptType.Return,
          id: '0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132',
          val: new BN(4),
          pc: new BN(5),
          is: new BN(6),
        },
      ];

      const result = getGasUsedFromReceipts(receipts);

      expect(result.toNumber()).toEqual(0);
    });

    it('should return zero if the receipts array is empty', () => {
      const receipts: Array<TransactionResultReceipt> = [];

      const result = getGasUsedFromReceipts(receipts);

      expect(result.toNumber()).toEqual(0);
    });
  });
});
