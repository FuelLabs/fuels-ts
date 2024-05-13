import { getRandomB256, Address } from '@fuel-ts/address';
import { ZeroBytes32 } from '@fuel-ts/address/configs';
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
  isRequestInputCoin,
  isRequestInputMessage,
  isRequestInputResource,
  getRequestInputResourceOwner,
  isRequestInputResourceFromOwner,
  getAssetAmountInRequestInputs,
  cacheRequestInputsResources,
  cacheRequestInputsResourcesFromOwner,
} from './helpers';
import { ScriptTransactionRequest } from './script-transaction-request';

/**
 * @group node
 * @group browser
 */
describe('helpers', () => {
  const ASSET_A: string = '0x0101010101010101010101010101010101010101010101010101010101010101';
  const ASSET_B: string = '0x0202020202020202020202020202020202020202020202020202020202020202';
  const baseAssetId = ZeroBytes32;
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

  it('should ensure getRequestInputResourceOwner works just fine', () => {
    // Coin
    expect(getRequestInputResourceOwner(coinInput)).toBe(coinInput.owner);

    // MessageCoin
    expect(getRequestInputResourceOwner(messageInput)).toBe(messageInput.recipient);
  });

  it('should ensure isRequestInputResourceFromOwner works just fine', () => {
    const address1 = getRandomB256();
    const address2 = getRandomB256();

    // Coin
    const resourceInput1 = generateFakeRequestInputCoin({ owner: address1 });

    expect(
      isRequestInputResourceFromOwner(resourceInput1, Address.fromString(address1))
    ).toBeTruthy();
    expect(
      isRequestInputResourceFromOwner(resourceInput1, Address.fromString(address2))
    ).toBeFalsy();

    // Message
    const resourceInput2 = generateFakeRequestInputCoin({ owner: address2 });

    expect(
      isRequestInputResourceFromOwner(resourceInput2, Address.fromString(address1))
    ).toBeFalsy();
    expect(
      isRequestInputResourceFromOwner(resourceInput2, Address.fromString(address2))
    ).toBeTruthy();
  });

  describe('should ensure cacheRequestInputsResourcesFromOwner works just fine', () => {
    const owner = Address.fromRandom();
    const coinInput1 = generateFakeRequestInputCoin({ owner: owner.toB256() });
    const coinInput2 = generateFakeRequestInputCoin();
    const messageInput1 = generateFakeRequestInputMessage({ recipient: owner.toB256() });
    const messageInput2 = generateFakeRequestInputMessage();

    it('should handle an empty array', () => {
      const result = cacheRequestInputsResourcesFromOwner([], owner);
      expect(result.utxos).toEqual([]);
      expect(result.messages).toEqual([]);
    });

    it('should cache Coins just fine', () => {
      const inputs = [coinInput1, coinInput2];

      const result = cacheRequestInputsResourcesFromOwner(inputs, owner);

      expect(result.utxos).toContain(coinInput1.id);
      expect(result.utxos).not.toContain(coinInput2.id);
      expect(result.messages).toEqual([]);
    });

    it('should cache MessageCoins just fine', () => {
      const inputs = [messageInput1, messageInput2];

      const result = cacheRequestInputsResourcesFromOwner(inputs, owner);

      expect(result.messages).toContain(messageInput1.nonce);
      expect(result.messages).not.toContain(messageInput2.nonce);
      expect(result.utxos).toEqual([]);
    });

    it('should cache both resources just fine', () => {
      const resources = [coinInput1, coinInput2, messageInput1, messageInput2];

      const result = cacheRequestInputsResourcesFromOwner(resources, owner);
      expect(result.utxos).toContain(coinInput1.id);
      expect(result.utxos).not.toContain(coinInput2.id);
      expect(result.messages).toContain(messageInput1.nonce);
      expect(result.messages).not.toContain(messageInput2.nonce);
    });

    describe('getAssetAmountInRequestInputs', () => {
      it('should handle empty inputs array', () => {
        const tx = new ScriptTransactionRequest();
        const total = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, baseAssetId);
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

        const assetATotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_A, baseAssetId);
        expect(assetATotal.eq(amount.mul(2))).toBeTruthy();

        const assetBTotal = getAssetAmountInRequestInputs(tx.inputs, ASSET_B, baseAssetId);
        expect(assetBTotal.eq(amount)).toBeTruthy();
      });

      it('should properly sum base asset considering MessageTransactionRequestInput', () => {
        const amount = bn(100);
        const tx = new ScriptTransactionRequest();
        tx.addResources([
          generateFakeCoin({ assetId: baseAssetId, amount }),
          generateFakeCoin({ assetId: ASSET_A, amount }),
          generateFakeCoin({ assetId: ASSET_B, amount }),
          generateFakeMessageCoin({ assetId: baseAssetId, amount }),
        ]);

        const expectedTotal = amount.mul(2);

        const assetATotal = getAssetAmountInRequestInputs(tx.inputs, baseAssetId, baseAssetId);
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
});
