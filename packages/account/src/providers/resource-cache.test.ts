import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { hexlify } from '@fuel-ts/utils';

import {
  generateFakeRequestInputCoin,
  generateFakeRequestInputMessage,
} from '../test-utils/transactionRequest';

import type { ExcludeResourcesOption } from './resource';
import { ResourceCache } from './resource-cache';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './transaction-request';
import { isRequestInputCoin, isRequestInputMessage } from './transaction-request';

/**
 * @group node
 * @group browser
 */
describe('Resource Cache', () => {
  const randomTxId = () => hexlify(randomBytes(32));

  const inputsToExcludeResourcesOption = (
    inputs: Array<CoinTransactionRequestInput | MessageTransactionRequestInput>
  ): ExcludeResourcesOption =>
    inputs.reduce(
      (acc, input) => {
        isRequestInputCoin(input) ? acc.utxos.push(input.id) : acc.messages.push(input.nonce);
        return acc;
      },
      { utxos: [], messages: [] } as Required<ExcludeResourcesOption>
    );

  afterEach(() => {
    // Reset the cache after each test
    const resourceCache = new ResourceCache(1000);
    resourceCache.clear();
  });

  it('can instantiate [valid numerical ttl]', () => {
    const memCache = new ResourceCache(1000);

    expect(memCache.ttl).toEqual(1000);
  });

  it('can memCache [invalid numerical ttl]', () => {
    expect(() => new ResourceCache(-1)).toThrow(/Invalid TTL: -1. Use a value greater than zero./);
  });

  it('can memCache [invalid mistyped ttl]', () => {
    // @ts-expect-error intentional invalid input
    expect(() => new ResourceCache('bogus')).toThrow(
      /Invalid TTL: bogus. Use a value greater than zero./
    );
  });

  it('can validate if it is cached [UTXO]', () => {
    const resourceCache = new ResourceCache(1000);
    const owner = Address.fromRandom().b256Address;
    const utxo = generateFakeRequestInputCoin({ owner });
    const utxoId = String(utxo.id);

    expect(resourceCache.isCached(owner, utxoId)).toBeFalsy();

    const txID = randomTxId();
    resourceCache.set(txID, [utxo]);

    expect(resourceCache.isCached(owner, utxoId)).toBeTruthy();
  });

  it('can validate if it is cached [Message]', () => {
    const resourceCache = new ResourceCache(1000);
    const owner = Address.fromRandom().b256Address;
    const message = generateFakeRequestInputMessage({ recipient: owner });
    const messageNonce = String(message.nonce);

    expect(resourceCache.isCached(owner, messageNonce)).toBeFalsy();

    const txID = randomTxId();
    resourceCache.set(txID, [message]);

    expect(resourceCache.isCached(owner, messageNonce)).toBeTruthy();
  });

  it('can get active [no data]', () => {
    const expected = { utxos: [], messages: [] };
    const resourceCache = new ResourceCache(1000);
    const owner = Address.fromRandom().b256Address;

    expect(resourceCache.getActiveData(owner)).toStrictEqual(expected);
  });

  it('can get active', () => {
    const owner = Address.fromRandom().b256Address;

    const inputs = [
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
    ];

    const resourceCache = new ResourceCache(1000);

    const txId = randomTxId();
    resourceCache.set(txId, inputs);

    const activeData = resourceCache.getActiveData(owner);

    const expected = inputsToExcludeResourcesOption(inputs);

    expect(activeData.messages).containSubset(expected.messages);
    expect(activeData.utxos).containSubset(expected.utxos);
  });

  it('should ensure active data is owner specific', () => {
    const owner1 = Address.fromRandom().b256Address;
    const owner2 = Address.fromRandom().b256Address;

    // Owner 1 inputs
    const owner1Inputs = [
      generateFakeRequestInputCoin({ owner: owner1 }),
      generateFakeRequestInputCoin({ owner: owner1 }),
      generateFakeRequestInputMessage({ recipient: owner1 }),
    ];

    // Owner 2 inputs
    const owner2Inputs = [
      generateFakeRequestInputCoin({ owner: owner2 }),
      generateFakeRequestInputCoin({ owner: owner2 }),
      generateFakeRequestInputMessage({ recipient: owner2 }),
    ];

    const resourceCache = new ResourceCache(1000);

    const txId1 = randomTxId();
    const txId2 = randomTxId();

    resourceCache.set(txId1, owner1Inputs);
    resourceCache.set(txId2, owner2Inputs);

    const activeData = resourceCache.getActiveData(owner1);

    const owner1Expected = inputsToExcludeResourcesOption(owner1Inputs);
    const owner2Expected = inputsToExcludeResourcesOption(owner2Inputs);

    expect(activeData.messages).containSubset(owner1Expected.messages);
    expect(activeData.utxos).containSubset(owner1Expected.utxos);

    expect(activeData.messages).not.containSubset(owner2Expected.messages);
    expect(activeData.utxos).not.containSubset(owner2Expected.utxos);
  });

  it('should remove expired when getting active data', () => {
    const ttl = 500;
    const resourceCache = new ResourceCache(ttl);

    const owner = Address.fromRandom().b256Address;

    const inputs = [
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
    ];

    const txId1 = randomTxId();
    const originalTimeStamp = 946684800;
    let dateSpy = vi.spyOn(Date, 'now').mockImplementation(() => originalTimeStamp);

    resourceCache.set(txId1, inputs);
    const oldActiveData = resourceCache.getActiveData(owner);

    expect(dateSpy).toHaveBeenCalled();

    oldActiveData.utxos.forEach((utxo) => {
      const match = inputs.filter(isRequestInputCoin).find((input) => input.id === utxo);
      expect(match).toBeDefined();
    });

    oldActiveData.messages.forEach((nonce) => {
      const match = inputs.filter(isRequestInputMessage).find((input) => input.nonce === nonce);
      expect(match).toBeDefined();
    });

    const expiredTimeStamp = originalTimeStamp + ttl;
    dateSpy = vi.spyOn(Date, 'now').mockImplementation(() => expiredTimeStamp);

    const newActiveData = resourceCache.getActiveData(owner);

    newActiveData.utxos.forEach((utxo) => {
      const match = inputs.filter(isRequestInputCoin).find((input) => input.id === utxo);
      expect(match).toBeUndefined();
    });

    newActiveData.messages.forEach((nonce) => {
      const match = inputs.filter(isRequestInputMessage).find((input) => input.nonce === nonce);
      expect(match).toBeUndefined();
    });

    vi.restoreAllMocks();
  });

  it('should remove cached data based on transaction ID', () => {
    // use long ttl to avoid cache expiration
    const ttl = 10_000;
    const resourceCache = new ResourceCache(ttl);
    const owner = Address.fromRandom().b256Address;

    const txId1 = randomTxId();
    const txId2 = randomTxId();

    const utxo1 = generateFakeRequestInputCoin({ owner });
    const utxo2 = generateFakeRequestInputCoin({ owner });
    const utxo3 = generateFakeRequestInputCoin({ owner });

    const message1 = generateFakeRequestInputMessage({ recipient: owner });
    const message2 = generateFakeRequestInputMessage({ recipient: owner });
    const message3 = generateFakeRequestInputMessage({ recipient: owner });

    const tx1Inputs = [utxo1, message1, message2];
    const tx2Inputs = [utxo2, utxo3, message3];

    resourceCache.set(txId1, tx1Inputs);
    resourceCache.set(txId2, tx2Inputs);

    let activeData = resourceCache.getActiveData(owner);

    expect(activeData.utxos).containSubset([utxo1.id, utxo2.id, utxo3.id]);
    expect(activeData.messages).containSubset([message1.nonce, message2.nonce, message3.nonce]);

    resourceCache.unset(txId1);

    activeData = resourceCache.getActiveData(owner);

    expect(activeData.utxos).not.containSubset([utxo1.id]);
    expect(activeData.utxos).containSubset([utxo2.id, utxo3.id]);

    expect(activeData.messages).not.containSubset([message1.nonce, message2.nonce]);
    expect(activeData.messages).containSubset([message3.nonce]);
  });

  it('can clear cache', () => {
    // use long ttl to avoid cache expiration
    const resourceCache = new ResourceCache(10_000);
    const owner1 = Address.fromRandom().b256Address;
    const owner2 = Address.fromRandom().b256Address;

    const txId1 = randomTxId();
    const txId2 = randomTxId();

    const tx1Inputs = [
      generateFakeRequestInputCoin({ owner: owner1 }),
      generateFakeRequestInputMessage({ recipient: owner1 }),
      generateFakeRequestInputMessage({ recipient: owner1 }),
    ];

    const tx2Inputs = [
      generateFakeRequestInputMessage({ recipient: owner2 }),
      generateFakeRequestInputMessage({ recipient: owner2 }),
      generateFakeRequestInputCoin({ owner: owner2 }),
    ];

    resourceCache.set(txId1, tx1Inputs);
    resourceCache.set(txId2, tx2Inputs);

    // Verifies that cached resources from owner 1 is correct
    const owner1Cached = resourceCache.getActiveData(owner1);

    const owner1Expected = inputsToExcludeResourcesOption(tx1Inputs);

    expect(owner1Cached.utxos).containSubset(owner1Expected.utxos);
    expect(owner1Cached.messages).containSubset(owner1Expected.messages);

    // Verifies that cached resources from owner 2 is correct
    const owner2Cached = resourceCache.getActiveData(owner2);

    const owner2Expected = inputsToExcludeResourcesOption(tx2Inputs);

    expect(owner2Cached.utxos).containSubset(owner2Expected.utxos);
    expect(owner2Cached.messages).containSubset(owner2Expected.messages);

    resourceCache.clear();

    // All cache was cleared
    expect(resourceCache.getActiveData(owner1)).toStrictEqual({ utxos: [], messages: [] });
    expect(resourceCache.getActiveData(owner2)).toStrictEqual({ utxos: [], messages: [] });
  });

  it('should validate that ResourceCache uses a global cache', () => {
    const oldTxId = randomTxId();
    const owner = Address.fromRandom().b256Address;
    const oldInputs = [
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputCoin({ owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
    ];

    const oldInstance = new ResourceCache(800);
    oldInstance.set(oldTxId, oldInputs);

    const newTxId = randomTxId();

    const newInputs = [
      generateFakeRequestInputMessage({ recipient: owner }),
      generateFakeRequestInputMessage({ recipient: owner }),
      generateFakeRequestInputCoin({ owner }),
    ];

    const newInstance = new ResourceCache(300);
    newInstance.set(newTxId, newInputs);

    const activeData = newInstance.getActiveData(owner);

    const allCached = inputsToExcludeResourcesOption([...oldInputs, ...newInputs]);

    expect(activeData.utxos).containSubset(allCached.utxos);
    expect(activeData.messages).containSubset(allCached.messages);
  });
});
