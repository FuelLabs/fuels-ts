import { randomBytes } from '@fuel-ts/crypto';
import { hexlify, sleep } from '@fuel-ts/utils';

import { ResourceCache } from './resource-cache';

/**
 * @group node
 * @group browser
 */
describe('Resource Cache', () => {
  const randomValue = () => hexlify(randomBytes(32));

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

  it('can validade if it is cached [UTXO]', async () => {
    const resourceCache = new ResourceCache(1000);
    const utxoId = randomValue();

    expect(await resourceCache.isCached(utxoId)).toBeFalsy();

    const txID = randomValue();
    await resourceCache.set(txID, { utxos: [utxoId], messages: [] });

    expect(await resourceCache.isCached(utxoId)).toBeTruthy();
  });

  it('can validade if it is cached [Message]', async () => {
    const resourceCache = new ResourceCache(1000);
    const messageNonce = randomValue();

    expect(await resourceCache.isCached(messageNonce)).toBeFalsy();

    const txID = randomValue();
    await resourceCache.set(txID, { utxos: [], messages: [messageNonce] });

    expect(await resourceCache.isCached(messageNonce)).toBeTruthy();
  });

  it('can get active [no data]', async () => {
    const EXPECTED = { utxos: [], messages: [] };
    const resourceCache = new ResourceCache(1);

    await sleep(1);

    expect(await resourceCache.getActiveData()).toStrictEqual(EXPECTED);
  });

  it('can get active', async () => {
    const EXPECTED = {
      utxos: [randomValue(), randomValue()],
      messages: [randomValue(), randomValue(), randomValue()],
    };
    const resourceCache = new ResourceCache(1000);

    const txId = randomValue();
    await resourceCache.set(txId, EXPECTED);

    const activeData = await resourceCache.getActiveData();

    expect(activeData.messages).containSubset(EXPECTED.messages);
    expect(activeData.utxos).containSubset(EXPECTED.utxos);
  });

  it('should remove expired when getting active data', async () => {
    const ttl = 1000;
    const resourceCache = new ResourceCache(ttl);

    const txId1 = randomValue();
    const txId1Resources = {
      utxos: [randomValue()],
      messages: [randomValue()],
    };

    await resourceCache.set(txId1, txId1Resources);
    let activeData = await resourceCache.getActiveData();

    expect(activeData.utxos).containSubset(txId1Resources.utxos);
    expect(activeData.messages).containSubset(txId1Resources.messages);

    await sleep(ttl);

    activeData = await resourceCache.getActiveData();

    expect(activeData.utxos.length).toEqual(0);
    expect(activeData.messages.length).toEqual(0);
  });

  it('should remove cached data based on transaction ID', async () => {
    const ttl = 1000;
    const resourceCache = new ResourceCache(ttl);

    const txId1 = randomValue();
    const txId2 = randomValue();

    const txId1Resources = {
      utxos: [randomValue()],
      messages: [randomValue(), randomValue()],
    };

    const txId2Resources = {
      utxos: [randomValue(), randomValue()],
      messages: [randomValue()],
    };

    await resourceCache.set(txId1, txId1Resources);
    await resourceCache.set(txId2, txId2Resources);

    let activeData = await resourceCache.getActiveData();

    expect(activeData.utxos).containSubset([...txId1Resources.utxos, ...txId2Resources.utxos]);
    expect(activeData.messages).containSubset([
      ...txId1Resources.messages,
      ...txId2Resources.messages,
    ]);

    await resourceCache.unset(txId1);

    activeData = await resourceCache.getActiveData();

    expect(activeData.utxos).not.containSubset(txId1Resources.utxos);
    expect(activeData.messages).not.containSubset(txId1Resources.messages);

    expect(activeData.utxos).containSubset(txId2Resources.utxos);
    expect(activeData.messages).containSubset(txId2Resources.messages);
  });

  it('can clear cache', async () => {
    const resourceCache = new ResourceCache(1000);

    const txId1 = randomValue();
    const txId2 = randomValue();

    const txId1Resources = {
      utxos: [randomValue()],
      messages: [randomValue(), randomValue()],
    };

    const txId2Resources = {
      utxos: [randomValue(), randomValue()],
      messages: [randomValue()],
    };

    await resourceCache.set(txId1, txId1Resources);
    await resourceCache.set(txId2, txId2Resources);

    const activeData = await resourceCache.getActiveData();

    expect(activeData.utxos).containSubset([...txId1Resources.utxos, ...txId2Resources.utxos]);
    expect(activeData.messages).containSubset([
      ...txId1Resources.messages,
      ...txId2Resources.messages,
    ]);

    await resourceCache.clear();

    expect(await resourceCache.getActiveData()).toStrictEqual({ utxos: [], messages: [] });
  });

  describe('Concurrent operations', () => {
    const mockTtl = 100; // 100ms TTL for testing
    let resourceCache: ResourceCache;

    beforeEach(() => {
      resourceCache = new ResourceCache(mockTtl);
    });

    afterEach(async () => {
      await resourceCache.destroy();
    });

    it('should handle concurrent operations safely', async () => {
      const transactionId1 = '0x1234';
      const transactionId2 = '0x5678';
      const resources1 = {
        utxos: ['0xabcd'],
        messages: ['0xef01'],
      };
      const resources2 = {
        utxos: ['0x2345'],
        messages: ['0x6789'],
      };

      // Simulate concurrent operations
      await Promise.all([
        resourceCache.set(transactionId1, resources1),
        resourceCache.set(transactionId2, resources2),
        resourceCache.getActiveData(),
        resourceCache.isCached('0xabcd'),
      ]);

      const cachedData = await resourceCache.getActiveData();
      expect(cachedData.utxos).toContain('0xabcd');
      expect(cachedData.utxos).toContain('0x2345');
      expect(cachedData.messages).toContain('0xef01');
      expect(cachedData.messages).toContain('0x6789');
    });

    it('should automatically clean up expired entries', async () => {
      const transactionId = '0x1234';
      const resources = {
        utxos: ['0xabcd'],
        messages: ['0xef01'],
      };

      await resourceCache.set(transactionId, resources);

      // Wait for the TTL to expire
      await sleep(mockTtl + 10);

      // Trigger a cleanup by calling getActiveData
      const cachedData = await resourceCache.getActiveData();
      expect(cachedData.utxos).not.toContain('0xabcd');
      expect(cachedData.messages).not.toContain('0xef01');
    });

    it('should handle high concurrency without race conditions', async () => {
      const iterations = 100;

      const runOperation = async (i: number) => {
        const transactionId = `0x${i.toString(16).padStart(4, '0')}`;
        const resources = {
          utxos: [`0x${(i * 2).toString(16).padStart(4, '0')}`],
          messages: [`0x${(i * 2 + 1).toString(16).padStart(4, '0')}`],
        };

        await resourceCache.set(transactionId, resources);
        await sleep(Math.random() * 10); // Random delay to increase chance of overlap
        const isCached = await resourceCache.isCached(resources.utxos[0]);
        expect(isCached).toBe(true);

        const activeData = await resourceCache.getActiveData();
        expect(activeData.utxos).toContain(resources.utxos[0]);
        expect(activeData.messages).toContain(resources.messages[0]);
      };

      const operations = Array.from({ length: iterations }, (_, i) => runOperation(i));
      await Promise.all(operations);

      const finalCachedData = await resourceCache.getActiveData();
      expect(finalCachedData.utxos.length).toBe(iterations);
      expect(finalCachedData.messages.length).toBe(iterations);
    });
  });
});
