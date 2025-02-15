import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { ErrorCode } from '@fuel-ts/errors';
import { safeExec, expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { hexlify } from '@fuel-ts/utils';

import { setupTestProviderAndWallets, TestMessage } from '../test-utils';
import {
  generateFakeRequestInputCoin,
  generateFakeRequestInputMessage,
} from '../test-utils/transactionRequest';

import type { Coin } from './coin';
import type { Message } from './message';
import { DEFAULT_RESOURCE_CACHE_TTL } from './provider';
import { isCoin, type ExcludeResourcesOption } from './resource';
import { ResourceCache } from './resource-cache';
import type {
  CoinTransactionRequestInput,
  MessageTransactionRequestInput,
} from './transaction-request';
import {
  isRequestInputCoin,
  isRequestInputMessage,
  ScriptTransactionRequest,
} from './transaction-request';

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

  it('can set cache ttl', async () => {
    const ttl = 10000;
    using launched = await setupTestProviderAndWallets({
      providerOptions: {
        resourceCacheTTL: ttl,
      },
    });
    const { provider } = launched;

    expect(provider.cache?.ttl).toEqual(ttl);
  });

  it('should use resource cache by default', async () => {
    using launched = await setupTestProviderAndWallets();
    const { provider } = launched;

    expect(provider.cache?.ttl).toEqual(DEFAULT_RESOURCE_CACHE_TTL);
  });

  it('should validate resource cache value [invalid numerical]', async () => {
    const { error } = await safeExec(async () => {
      await setupTestProviderAndWallets({ providerOptions: { resourceCacheTTL: -500 } });
    });
    expect(error?.message).toMatch(/Invalid TTL: -500\. Use a value greater than zero/);
  });

  it('should be possible to disable the cache by using -1', async () => {
    using launched = await setupTestProviderAndWallets({
      providerOptions: {
        resourceCacheTTL: -1,
      },
    });
    const { provider } = launched;

    expect(provider.cache).toBeUndefined();
  });

  it('should cache resources only when TX is successfully submitted', async () => {
    const resourceAmount = 5_000;
    const utxosAmount = 2;

    const testMessage = new TestMessage({ amount: resourceAmount });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      // 3 resources with a total of 15_000
      walletsConfig: {
        coinsPerAsset: utxosAmount,
        amountPerCoin: resourceAmount,
        messages: [testMessage],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const { coins } = await wallet.getCoins(baseAssetId);

    expect(coins.length).toBe(utxosAmount);

    // Tx will cost 10_000 for the transfer + 1 for fee. All resources will be used
    const EXPECTED = {
      utxos: coins.map((coin) => coin.id),
      messages: [testMessage.nonce],
    };

    await wallet.transfer(receiver.address, 10_000);

    const cachedResources = provider.cache?.getActiveData(wallet.address.toB256());
    expect(new Set(cachedResources?.utxos)).toEqual(new Set(EXPECTED.utxos));
    expect(new Set(cachedResources?.messages)).toEqual(new Set(EXPECTED.messages));
  });

  it('should NOT cache resources when TX submission fails', async () => {
    const message = new TestMessage({ amount: 100_000 });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 2,
        amountPerCoin: 20_000,
        messages: [message],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const maxFee = 100_000;
    const transferAmount = 10_000;

    const { coins } = await wallet.getCoins(baseAssetId);
    const utxos = coins.map((c) => c.id);
    const messages = [message.nonce];

    // No enough funds to pay for the TX fee
    const resources = await wallet.getResourcesToSpend([[transferAmount, baseAssetId]]);

    const request = new ScriptTransactionRequest({
      maxFee,
    });

    request.addCoinOutput(receiver.address, transferAmount, baseAssetId);
    request.addResources(resources);

    await expectToThrowFuelError(
      () => wallet.sendTransaction(request, { estimateTxDependencies: false }),
      { code: ErrorCode.INVALID_REQUEST }
    );

    // No resources were cached since the TX submission failed
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(wallet.address.toB256(), key)).toBeFalsy();
    });
  });

  it('should unset cached resources when TX execution fails', async () => {
    const message = new TestMessage({ amount: 100_000 });

    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 100_000,
        messages: [message],
      },
    });
    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;

    const baseAssetId = await provider.getBaseAssetId();
    const maxFee = 100_000;
    const transferAmount = 10_000;

    const { coins } = await wallet.getCoins(baseAssetId);
    const utxos = coins.map((c) => c.id);
    const messages = [message.nonce];

    // Should fetch resources enough to pay for the TX fee and transfer amount
    const resources = await wallet.getResourcesToSpend([[maxFee + transferAmount, baseAssetId]]);

    const request = new ScriptTransactionRequest({
      maxFee,
      // No enough gas to execute the TX
      gasLimit: 0,
    });

    request.addCoinOutput(receiver.address, transferAmount, baseAssetId);
    request.addResources(resources);

    // TX submission will succeed
    const submitted = await wallet.sendTransaction(request, { estimateTxDependencies: false });

    // Resources were cached since the TX submission succeeded
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(wallet.address.toB256(), key)).toBeTruthy();
    });

    // TX execution will fail
    await expectToThrowFuelError(() => submitted.waitForResult(), {
      code: ErrorCode.SCRIPT_REVERTED,
    });

    // Ensure user's resources were unset from the cache
    [...utxos, ...messages].forEach((key) => {
      expect(provider.cache?.isCached(wallet.address.toB256(), key)).toBeFalsy();
    });
  });

  it('should ensure cached resources are not being queried', async () => {
    // Fund the wallet with 2 resources
    const testMessage = new TestMessage({ amount: 100_000_000_000 });
    using launched = await setupTestProviderAndWallets({
      nodeOptions: {
        args: ['--poa-instant', 'false', '--poa-interval-period', '1s'],
      },
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 100_000_000_000,
        messages: [testMessage],
      },
    });

    const {
      provider,
      wallets: [wallet, receiver],
    } = launched;
    const baseAssetId = await provider.getBaseAssetId();
    const transferAmount = 10_000;

    const {
      coins: [coin],
    } = await wallet.getCoins(baseAssetId);

    const {
      messages: [message],
    } = await wallet.getMessages();

    const owner = wallet.address.toB256();

    // One of the resources will be cached as the TX submission was successful
    await wallet.transfer(receiver.address, transferAmount);

    // Determine the used and unused resource
    const cachedResource = provider.cache?.isCached(owner, coin.id) ? coin : message;
    const uncachedResource = provider.cache?.isCached(owner, coin.id) ? message : coin;

    expect(cachedResource).toBeDefined();
    expect(uncachedResource).toBeDefined();

    // Spy on the getCoinsToSpend method to ensure the cached resource is not being queried
    const resourcesToSpendSpy = vi.spyOn(provider.operations, 'getCoinsToSpend');
    const fetchedResources = await wallet.getResourcesToSpend([[transferAmount, baseAssetId]]);

    // Only one resource is available as the other one was cached
    expect(fetchedResources.length).toBe(1);

    // Ensure the returned resource is the non-cached one
    const excludedIds: Required<ExcludeResourcesOption> = { messages: [], utxos: [] };
    if (isCoin(fetchedResources[0])) {
      excludedIds.messages = expect.arrayContaining([(<Message>cachedResource).nonce]);
      excludedIds.utxos = expect.arrayContaining([]);
      expect(fetchedResources[0].id).toEqual((<Coin>uncachedResource).id);
    } else {
      excludedIds.utxos = expect.arrayContaining([(<Coin>cachedResource).id]);
      excludedIds.messages = expect.arrayContaining([]);
      expect(fetchedResources[0].nonce).toEqual((<Message>uncachedResource).nonce);
    }

    // Ensure the getCoinsToSpend query was called excluding the cached resource
    expect(resourcesToSpendSpy).toHaveBeenCalledWith({
      owner,
      queryPerAsset: [
        {
          assetId: baseAssetId,
          amount: String(transferAmount),
          max: undefined,
        },
      ],
      excludedIds,
    });
  });
});
