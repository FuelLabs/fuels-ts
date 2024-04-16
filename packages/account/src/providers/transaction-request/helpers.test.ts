import { Address, getRandomB256 } from '@fuel-ts/address';
import { InputType } from '@fuel-ts/transactions';

import { generateFakeCoin, generateFakeMessageCoin } from '../../test-utils/resources';
import {
  generateFakeRequestInputCoin,
  generateFakeRequestInputContract,
  generateFakeRequestInputMessage,
} from '../../test-utils/transactionRequest';

import {
  cacheResources,
  getRequestInputResourceOwner,
  isRequestInputCoin,
  isRequestInputMessage,
  isRequestInputResource,
  isRequestInputResourceFromOwner,
} from './helpers';

/**
 * @group node
 * @group browser
 */
describe(__filename, () => {
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

  describe('should ensure cacheResources works just fine', () => {
    const coin1 = generateFakeCoin();
    const coin2 = generateFakeCoin();
    const message1 = generateFakeMessageCoin();
    const message2 = generateFakeMessageCoin();

    it('should handle an empty array', () => {
      const result = cacheResources([]);
      expect(result.utxos).toEqual([]);
      expect(result.messages).toEqual([]);
    });

    it('should cache Coins just fine', () => {
      const resources = [coin1, coin2];

      const result = cacheResources(resources);

      expect(result.utxos).toContain(coin1.id);
      expect(result.utxos).toContain(coin2.id);
      expect(result.messages).toEqual([]);
    });

    it('should cache MessageCoins just fine', () => {
      const resources = [message1, message2];

      const result = cacheResources(resources);

      expect(result.messages).toContain(message1.nonce);
      expect(result.messages).toContain(message2.nonce);
      expect(result.utxos).toEqual([]);
    });

    it('should cache both resources just fine', () => {
      const resources = [coin1, message1, message2, coin2];

      const result = cacheResources(resources);
      expect(result.utxos).toContain(coin1.id);
      expect(result.utxos).toContain(coin2.id);
      expect(result.messages).toContain(message1.nonce);
      expect(result.messages).toContain(message2.nonce);
    });
  });
});
