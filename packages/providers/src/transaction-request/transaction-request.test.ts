import { Address } from '@fuel-ts/address';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { bn, toNumber } from '@fuel-ts/math';
import { InputType, OutputType, TransactionType } from '@fuel-ts/transactions';

import {
  MOCK_REQUEST_CHANGE_OUTPUT,
  MOCK_REQUEST_COIN_INPUT,
  MOCK_REQUEST_COIN_OUTPUT,
  MOCK_REQUEST_CONTRACT_INPUT,
  MOCK_REQUEST_CONTRACT_OUTPUT,
  MOCK_REQUEST_MESSAGE_INPUT,
} from '../../test/fixtures/inputs-and-outputs';
import type { CoinQuantity } from '../coin-quantity';

import type { CoinTransactionRequestInput } from './input';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike } from './types';
import { transactionRequestify } from './utils';

describe('TransactionRequest', () => {
  const assetIdA = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const assetIdB = '0x0202020202020202020202020202020202020202020202020202020202020202';

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
      expect(toNumber((<ScriptTransactionRequest>txRequest).gasLimit)).toEqual(
        txRequestLike.gasLimit
      );
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

      const address1 = Address.fromRandom();
      const address2 = Address.fromRandom();

      const amount1 = 100;
      const amount2 = 300;

      transactionRequest.addCoinOutput(address1, amount1, assetIdB);
      transactionRequest.addCoinOutput(address2, amount2, assetIdA);

      const result = transactionRequest.getCoinOutputsQuantities();

      expect(result).toEqual([
        {
          amount: bn(amount1),
          assetId: assetIdB,
        },
        {
          amount: bn(amount2),
          assetId: assetIdA,
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

  describe('fundWithFakeUtxos', () => {
    it('should fund with the expected quantities', () => {
      const transactionRequest = new ScriptTransactionRequest();

      const amountBase = bn(500);
      const amountA = bn(700);
      const amountB = bn(300);

      const quantities: CoinQuantity[] = [
        { assetId: BaseAssetId, amount: amountBase },
        { assetId: assetIdA, amount: amountA },
        { assetId: assetIdB, amount: amountB },
      ];

      transactionRequest.fundWithFakeUtxos(quantities);

      const inputs = transactionRequest.inputs as CoinTransactionRequestInput[];

      const inputA = inputs.find((i) => i.assetId === assetIdA);
      const inputB = inputs.find((i) => i.assetId === assetIdB);
      const inputBase = inputs.find((i) => i.assetId === BaseAssetId);

      expect(inputA?.amount).toEqual(bn(700));
      expect(inputB?.amount).toEqual(bn(300));
      expect(inputBase?.amount).toEqual(bn(500));
    });

    it('should add BaseAssetId with amount bn(1) if not present in quantities', () => {
      const transactionRequest = new ScriptTransactionRequest();

      const quantities: CoinQuantity[] = [{ assetId: assetIdB, amount: bn(10) }];

      transactionRequest.fundWithFakeUtxos(quantities);

      const baseAssetEntry = quantities.find((q) => q.assetId === BaseAssetId);
      expect(baseAssetEntry).not.toBeNull();
      expect(baseAssetEntry?.amount).toEqual(bn(1));
    });

    it('should not add BaseAssetId if it is already present in quantities', () => {
      const transactionRequest = new ScriptTransactionRequest();

      const quantities = [{ assetId: BaseAssetId, amount: bn(10) }];
      transactionRequest.fundWithFakeUtxos(quantities);
      const baseAssetEntries = quantities.filter((q) => q.assetId === BaseAssetId);
      expect(baseAssetEntries.length).toBe(1);
    });

    it('should filter inputs and outputs accordingly', () => {
      const transactionRequest = new ScriptTransactionRequest();

      transactionRequest.inputs = [
        MOCK_REQUEST_COIN_INPUT,
        MOCK_REQUEST_MESSAGE_INPUT,
        MOCK_REQUEST_CONTRACT_INPUT,
      ];
      transactionRequest.outputs = [
        MOCK_REQUEST_COIN_OUTPUT,
        MOCK_REQUEST_CONTRACT_OUTPUT,
        MOCK_REQUEST_CHANGE_OUTPUT,
      ];

      transactionRequest.fundWithFakeUtxos([]);

      const contractInput = transactionRequest.inputs.find((i) => i.type === InputType.Contract);
      const coinInput = transactionRequest.inputs.find((i) => i.type === InputType.Coin);
      const messageInput = transactionRequest.inputs.find((i) => i.type === InputType.Message);

      // Contract inputs should not be filtered out
      expect(contractInput).toBe(MOCK_REQUEST_CONTRACT_INPUT);

      // Coin and Message inputs should be filtered out
      expect(coinInput).not.toBe(MOCK_REQUEST_COIN_INPUT);
      expect(messageInput).not.toBe(MOCK_REQUEST_MESSAGE_INPUT);

      const coinOutput = transactionRequest.outputs.find((o) => o.type === OutputType.Coin);
      const contractOutput = transactionRequest.outputs.find((o) => o.type === OutputType.Contract);
      const changeOutput = transactionRequest.outputs.find((o) => o.type === OutputType.Change);

      // Coin and Contract outputs should not be filtered out
      expect(coinOutput).toBe(MOCK_REQUEST_COIN_OUTPUT);
      expect(contractOutput).toBe(MOCK_REQUEST_CONTRACT_OUTPUT);

      // Change output should be filtered out
      expect(changeOutput).not.toBe(MOCK_REQUEST_CHANGE_OUTPUT);
    });
  });
});
