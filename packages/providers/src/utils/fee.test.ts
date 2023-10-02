import { arrayify } from '@ethersproject/bytes';
import { BN, bn } from '@fuel-ts/math';
import { ReceiptType, type Witness } from '@fuel-ts/transactions';

import { MOCK_TX_BYTES_HEX } from '../../test/fixtures/transaction-summary';
import type { TransactionResultReceipt } from '../transaction-response';

import {
  calculatePriceWithFactor,
  calculateTransactionFee,
  calculateTxChargeableBytesFee,
  getGasUsedFromReceipts,
} from './fee';

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

  describe('calculateTransactionFee', () => {
    it('should calculate transaction fee for script correctly', () => {
      const margin = 1;
      const gasUsed = new BN(1700);
      const gasPrice = new BN(50);
      const gasPriceFactor = new BN(92);
      const gasPerByte = new BN(1);
      const transactionWitnesses: Witness[] = [
        {
          dataLength: 64,
          data: '0x3d8943b87436d54d7f1282ed9b01d38633f8003a37676276bbaf0560390d21f826b5f6e9ea85b1bca435af2bec4982436c20c1294876025f78aaa0143867eb7f',
        },
      ];

      const transactionBytes = arrayify(MOCK_TX_BYTES_HEX);

      const receipts: TransactionResultReceipt[] = [
        {
          type: ReceiptType.ScriptResult,
          result: bn(50),
          gasUsed,
        },
      ];

      const result = calculateTransactionFee({
        receipts,
        gasPrice,
        gasPriceFactor,
        margin,
        transactionBytes,
        transactionWitnesses,
        gasPerByte,
      });

      const expectedFee = 1200;
      const expectedGasUsed = gasUsed;

      expect(result.fee.toNumber()).toStrictEqual(expectedFee);
      expect(result.gasUsed.toNumber()).toStrictEqual(expectedGasUsed.toNumber());
    });

    it('should calculate transaction fee for multiple receipts', () => {
      const gasUsed1 = new BN(900);
      const gasUsed2 = new BN(800);
      const gasPrice = new BN(50);
      const gasPriceFactor = new BN(1000000);
      const margin = 1;
      const gasPerByte = new BN(1);
      const transactionWitnesses: Witness[] = [
        {
          dataLength: 64,
          data: '0x741af9e1379d78d1882d6058888cb704f3ba5b4854ca919e6a26b759dbd6931877323cfbf6ced0ba63b18fbb15926fadd877218c93b8d9972564168b6198208d',
        },
      ];

      const transactionBytes = arrayify(MOCK_TX_BYTES_HEX);

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

      const result = calculateTransactionFee({
        receipts,
        gasPrice,
        gasPriceFactor,
        margin,
        transactionBytes,
        transactionWitnesses,
        gasPerByte,
      });

      const expectedGasUsed = bn(gasUsed1.toNumber() + gasUsed2.toNumber());
      const expectedFee = 100;

      expect(result.fee.toNumber()).toStrictEqual(expectedFee);
      expect(result.gasUsed.toNumber()).toStrictEqual(expectedGasUsed.toNumber());
    });
  });

  describe('calculateTxChargeableBytesFee', () => {
    it('should calculate gas used for contract created correctly', () => {
      const transactionBytes = arrayify(MOCK_TX_BYTES_HEX);
      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [{ dataLength: 0, data: '0x' }];
      const gasPrice = new BN(4);

      const chargeableBytesFee = calculateTxChargeableBytesFee({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(chargeableBytesFee.toNumber()).toEqual(1040);
    });

    it('should handle an empty witnesses array', () => {
      const transactionBytes = arrayify(MOCK_TX_BYTES_HEX);
      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [];

      const gasPrice = new BN(2);

      const chargeableBytesFee = calculateTxChargeableBytesFee({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(chargeableBytesFee.toNumber()).toEqual(520);
    });

    it('should round up the result', () => {
      const transactionBytes = arrayify(MOCK_TX_BYTES_HEX);

      const gasPerByte = new BN(1);
      const gasPriceFactor = new BN(2);
      const transactionWitnesses: Witness[] = [];

      const gasPrice = new BN(1);

      const chargeableBytesFee = calculateTxChargeableBytesFee({
        transactionBytes,
        gasPerByte,
        gasPriceFactor,
        transactionWitnesses,
        gasPrice,
      });

      expect(chargeableBytesFee.toNumber()).toEqual(260);
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
