import { BaseAssetId } from '@fuel-ts/address/configs';
import { bn } from '@fuel-ts/math';
import { InputType } from '@fuel-ts/transactions';

import { generateFakeCoin, generateFakeMessageCoin } from '../../test-utils/resources';
import {
  generateFakeRequestInputCoin,
  generateFakeRequestInputMessage,
  generateFakeRequestInputContract,
} from '../../test-utils/transactionRequest';

import { CreateTransactionRequest } from './create-transaction-request';
import {
  cacheRequestInputsResources,
  getAssetAmountInRequestInputs,
  isRequestInputCoin,
  isRequestInputMessage,
  isRequestInputResource,
} from './helpers';
import { ScriptTransactionRequest } from './script-transaction-request';

/**
 * @group node
 * @group browser
 */
describe('helpers', () => {
  const ASSET_A: string = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const ASSET_B: string = '0x0202020202020202020202020202020202020202020202020202020202020202';
  const coinInput = generateFakeRequestInputCoin();
  const messageInput = generateFakeRequestInputMessage();
  const contractInput = generateFakeRequestInputContract();

  it('should ensure isRequestInputCoin works just fine', () => {
    expect(coinInput.type).toBe(InputType.Coin);
    expect(isRequestInputCoin(coinInput)).toBeTruthy();

    expect(isRequestInputCoin(messageInput)).toBeFalsy();
    expect(isRequestInputCoin(contractInput)).toBeFalsy();
  });

  it('should ensure isRequestInputMessage works just fine', () => {
    expect(messageInput.type).toBe(InputType.Message);
    expect(isRequestInputMessage(messageInput)).toBeTruthy();

    expect(isRequestInputMessage(coinInput)).toBeFalsy();
    expect(isRequestInputMessage(contractInput)).toBeFalsy();
  });

  it('should ensure isRequestInputResource works just fine', () => {
    expect(isRequestInputResource(coinInput)).toBeTruthy();
    expect(isRequestInputResource(messageInput)).toBeTruthy();

    expect(isRequestInputResource(contractInput)).toBeFalsy();
  });

  describe('getAssetAmountInRequestInputs', () => {
    it('should handle empty inputs array', () => {
      const tx = new ScriptTransactionRequest();
      const total = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, BaseAssetId);
      expect(total.eq(0)).toBeTruthy();
    });

    it('should sum assets on TransactionRequestsInputs just fine', () => {
      const amount = bn(100);
      const tx = new ScriptTransactionRequest();
      tx.addResources([
        generateFakeCoin({ assetId: ASSET_A, amount }),
        generateFakeCoin({ assetId: ASSET_A, amount }),
        generateFakeCoin({ assetId: ASSET_B, amount }),
      ]);

      const assetATotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, BaseAssetId);
      expect(assetATotal.eq(amount.mul(2))).toBeTruthy();

      const assetBTotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_B, BaseAssetId);
      expect(assetBTotal.eq(amount)).toBeTruthy();
    });

    it('should properly sum base asset considering MessageTransactionRequestInput', () => {
      const amount = bn(100);
      const tx = new ScriptTransactionRequest();
      tx.addResources([
        generateFakeCoin({ assetId: BaseAssetId, amount }),
        generateFakeCoin({ assetId: ASSET_A, amount }),
        generateFakeCoin({ assetId: ASSET_B, amount }),
        generateFakeMessageCoin({ assetId: BaseAssetId, amount }),
      ]);

      const expectedTotal = amount.mul(2);

      const assetATotal = getAssetAmountInRequestInputs(tx.inputs, BaseAssetId, BaseAssetId);
      expect(assetATotal.eq(expectedTotal)).toBeTruthy();
    });
  });

  describe('cacheRequestInputsResources', () => {
    it('should handle empty inputs array', () => {
      const tx = new ScriptTransactionRequest();
      const cached = cacheRequestInputsResources(tx.inputs);
      expect(cached.messages).toHaveLength(0);
      expect(cached.utxos).toHaveLength(0);
    });

    it('should sum assets on TransactionRequestsInputs just fine', () => {
      const amount = bn(100);
      const input1 = generateFakeRequestInputCoin({ assetId: ASSET_A, amount });
      const input2 = generateFakeRequestInputCoin({ assetId: ASSET_B, amount });
      const input3 = generateFakeRequestInputMessage({ amount });
      const tx = new CreateTransactionRequest({
        inputs: [input2, input1, input3],
      });

      const cached = cacheRequestInputsResources(tx.inputs);
      expect(cached.utxos).toStrictEqual([input2.id, input1.id]);
      expect(cached.messages).toStrictEqual([input3.nonce]);
    });
  });
});
