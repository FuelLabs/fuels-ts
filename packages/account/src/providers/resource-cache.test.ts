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

  it('should automatically clean up expired entries', async () => {
    const mockTtl = 1000;
    const resourceCache = new ResourceCache(mockTtl);
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

  it('should handle concurrent UTXO operations safely', async () => {
    const resourceCache = new ResourceCache(1000);
    const utxos = Array.from({ length: 100 }, (_, i) => `0x${i.toString(16).padStart(4, '0')}`);

    // Function to simulate a concurrent operation
    const simulateOperation = async (utxo: string, delayTime: number) => {
      await sleep(delayTime); // Simulate random delay
      await resourceCache.set(utxo, { utxos: [utxo], messages: [] });
      const isCached = await resourceCache.isCached(utxo);
      expect(isCached).toBe(true);
    };

    // Start all operations concurrently
    const operations = utxos.map(
      (utxo) => simulateOperation(utxo, Math.random() * 50) // Random delay up to 50ms
    );

    // Use a separate promise to check intermediate state
    const intermediateCheck = (async () => {
      await sleep(25); // Wait a bit to let some operations complete
      const midPointData = await resourceCache.getActiveData();
      // Some, but not all, UTXOs should be cached at this point
      expect(midPointData.utxos.length).toBeGreaterThan(0);
      expect(midPointData.utxos.length).toBeLessThan(utxos.length);
    })();

    // Wait for all operations and the intermediate check to complete
    await Promise.all([...operations, intermediateCheck]);

    // Final state check
    const finalData = await resourceCache.getActiveData();
    expect(finalData.utxos.length).toBe(utxos.length);
    utxos.forEach((utxo) => {
      expect(finalData.utxos).toContain(utxo);
    });
  });
});
