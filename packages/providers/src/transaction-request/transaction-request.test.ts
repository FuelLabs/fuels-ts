import { Address } from '@fuel-ts/address';
import { bn, toNumber } from '@fuel-ts/math';
import { TransactionType } from '@fuel-ts/transactions';

import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike } from './types';
import { transactionRequestify } from './utils';

describe('TransactionRequest', () => {
  describe('transactionRequestify', () => {
    it('should keep data from input in transaction request created', () => {
      const script = Uint8Array.from([1, 2, 3, 4]);
      const scriptData = Uint8Array.from([5, 6]);
      const txRequestLike: TransactionRequestLike = {
        type: TransactionType.Script,
        script,
        scriptData,
        gasPrice: 1,
        gasLimit: 10000,
        maturity: 1,
        inputs: [],
        outputs: [],
        witnesses: [],
      };
      const txRequest = transactionRequestify(txRequestLike);

      if (txRequest.type === TransactionType.Script) {
        expect(txRequest.script).toEqual(txRequestLike.script);
        expect(txRequest.scriptData).toEqual(txRequestLike.scriptData);
      }

      expect(txRequest.type).toEqual(txRequestLike.type);
      expect(toNumber(txRequest.gasPrice)).toEqual(txRequestLike.gasPrice);
      expect(toNumber(txRequest.gasLimit)).toEqual(txRequestLike.gasLimit);
      expect(txRequest.maturity).toEqual(txRequestLike.maturity);
      expect(txRequest.inputs).toEqual(txRequestLike.inputs);
      expect(txRequest.outputs).toEqual(txRequestLike.outputs);
      expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
    });

    it('should throw error if invalid transaction type', () => {
      const txRequestLike = {
        type: 5,
        gasPrice: 1,
      };

      expect(() => transactionRequestify(txRequestLike)).toThrow('Invalid transaction type: 5');
    });
  });

  describe('getCoinOutputsQuantities', () => {
    it('should correctly map all the coin outputs to CoinQuantity', () => {
      const transactionRequest = new ScriptTransactionRequest();

      const assetIdA = '0x0000000000000000000000000000000000000000000000000000000000000000';
      const assetIdB = '0x0101010101010101010101010101010101010101010101010101010101010101';

      const address1 = Address.fromRandom();
      const address2 = Address.fromRandom();

      const amount1 = 100;
      const amount2 = 300;

      transactionRequest.addCoinOutput(address1, amount1, assetIdA);
      transactionRequest.addCoinOutput(address2, amount2, assetIdB);

      const result = transactionRequest.getCoinOutputsQuantities();

      expect(result).toEqual([
        {
          amount: bn(amount1),
          assetId: assetIdA,
        },
        {
          amount: bn(amount2),
          assetId: assetIdB,
        },
      ]);
    });

    it('should return an empty array if there are no coin outputs', () => {
      // Mock the getCoinOutputs method
      const transactionRequest = new ScriptTransactionRequest();

      const result = transactionRequest.getCoinOutputsQuantities();

      expect(result).toEqual([]);
    });
  });
});
