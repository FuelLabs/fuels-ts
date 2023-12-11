import { BN } from '@fuel-ts/math';
import { ReceiptType } from '@fuel-ts/transactions';

import type { TransactionResultReceipt } from '../transaction-response';

import { calculatePriceWithFactor, getGasUsedFromReceipts } from './calculate-fee';

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

      expect(result.toNumber()).toEqual(5); // ceil(11 * 2) / 2 = 5
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

      const gasUsed = getGasUsedFromReceipts(receipts);

      expect(gasUsed.toNumber()).toEqual(12);
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
