import type { Provider, SnapshotConfigs } from 'fuels';
import { bn, hexlify, randomBytes } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { PredicateTrue } from '../test/typegen';

describe('utxo-consolidation', () => {
  test("doesn't consolidate nor estimate - only one coin", async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 1,
        amountPerCoin: 10000, // can cover maxFee but we don't consolidate one coin
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const sendSpy = vi.spyOn(provider, 'sendTransaction');

    const { coins } = await wallet.consolidateCoins();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(coins).toEqual(originalCoins);
  });

  test("doesn't consolidate - coins value is less than max fee", async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 5,
        amountPerCoin: 1,
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const sendSpy = vi.spyOn(provider, 'sendTransaction');

    const { coins } = await wallet.consolidateCoins();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(coins).toEqual(originalCoins);
  });

  test("doesn't consolidate - coins value is equal to max fee", async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 26, // this is the max fee value
        amountPerCoin: 1,
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const sendSpy = vi.spyOn(provider, 'sendTransaction');

    const { coins } = await wallet.consolidateCoins();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(coins).toEqual(originalCoins);
  });

  test('consolidates once - less than max_inputs coins', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 2,
        amountPerCoin: 1000,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());
    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));

    const { coins } = await wallet.consolidateCoins();

    expect(coins.length).toEqual(1);
    expect(originalCoins).not.toContainEqual(coins[0]);
    expect(initialAmount.gt(coins[0].amount)).toBe(true);
  });

  test('consolidates once - max_inputs + 1 coins', async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 256,
        amountPerCoin: 100,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const { coins } = await wallet.consolidateCoins();

    expect(coins.length).toEqual(2);
    const consolidatedCoin = coins.find((coin) => !originalCoins.some((c) => c.id === coin.id));
    expect(originalCoins).not.toContainEqual(consolidatedCoin);

    const leftoverCoin = coins.find((coin) => coin.id !== consolidatedCoin?.id);
    expect(originalCoins).toContainEqual(leftoverCoin);

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(resultingAmount)).toBe(true);
  });

  test(`consolidates once - max_inputs + >1 coins, second tx can't be funded`, async () => {
    const leftoverCoinsCount = 25;
    const coinsPerAsset = 255 + leftoverCoinsCount;
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset,
        amountPerCoin: 1,
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const { coins } = await wallet.consolidateCoins();

    expect(coins.length).toEqual(coinsPerAsset - maxInputs.toNumber() + 1);

    const consolidatedCoins = coins.filter((coin) => !originalCoins.some((c) => c.id === coin.id));

    expect(consolidatedCoins).toHaveLength(1);
    expect(originalCoins).not.toContainEqual(consolidatedCoins[0]);

    const leftoverCoins = coins.filter((coin) => !consolidatedCoins.some((c) => c.id === coin.id));
    expect(leftoverCoins).toHaveLength(leftoverCoinsCount);
    leftoverCoins.forEach((coin) => {
      expect(originalCoins).toContainEqual(coin);
    });

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(coins[0].amount)).toBe(true);
  });

  test(`consolidates twice - max_inputs + >1 coins, second tx can be funded`, async () => {
    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset: 280,
        amountPerCoin: 100,
      },
    });

    const {
      wallets: [wallet],
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const { coins } = await wallet.consolidateCoins();

    expect(coins.length).toEqual(2);

    coins.forEach((coin) => {
      expect(originalCoins).not.toContainEqual(coin);
    });

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(resultingAmount)).toBe(true);
  });

  test(`consolidates multiple times - no leftover coins`, async () => {
    // 4 tx with max_inputs and 1 tx with less than max_inputs;
    const coinsPerAsset = 255 * 4 + 134;

    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset,
        amountPerCoin: 1,
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const { coins } = await wallet.consolidateCoins();

    const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;
    // using Math.floor because the leftover coins are not enough for one more tx
    const amountOfConsolidations = Math.ceil(coinsPerAsset / maxInputs.toNumber());

    expect(coins.length).toEqual(amountOfConsolidations);

    coins.forEach((coin) => {
      expect(originalCoins).not.toContainEqual(coin);
    });

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(resultingAmount)).toBe(true);
  });

  test(`consolidates multiple times - leftover coins remain because of insufficient fee`, async () => {
    const leftoverCoinsCount = 5;
    const coinsPerAsset = 255 * 4 + leftoverCoinsCount;

    using launched = await launchTestNode({
      walletsConfig: {
        coinsPerAsset,
        amountPerCoin: 1,
      },
    });

    const {
      wallets: [wallet],
      provider,
    } = launched;

    const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

    const { coins } = await wallet.consolidateCoins();

    const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;
    // using Math.floor because the leftover coins are not enough for one more tx
    const amountOfConsolidations = Math.floor(coinsPerAsset / maxInputs.toNumber());

    expect(coins.length).toEqual(amountOfConsolidations + leftoverCoinsCount);

    const consolidatedCoins = coins.filter((coin) => !originalCoins.some((c) => c.id === coin.id));
    expect(consolidatedCoins.length).toEqual(amountOfConsolidations);

    const leftoverCoins = coins.filter((coin) => !consolidatedCoins.some((c) => c.id === coin.id));
    expect(leftoverCoins.length).toEqual(leftoverCoinsCount);

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(resultingAmount)).toBe(true);
  });

  test(`consolidates multiple times - predicate`, async () => {
    const predicate = new PredicateTrue({
      provider: {} as unknown as Provider,
    });

    const leftoverCoinsCount = 5;
    const coinsPerAsset = 255 * 4 + leftoverCoinsCount;

    const snapshotCoins: SnapshotConfigs['stateConfig']['coins'] = [];

    for (let i = 0; i < coinsPerAsset; i += 1) {
      snapshotCoins.push({
        amount: bn(1).toString(),
        asset_id: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
        owner: predicate.address.toHexString(),
        tx_pointer_block_height: 0,
        tx_pointer_tx_idx: 0,
        output_index: 0,
        tx_id: hexlify(randomBytes(32)),
      });
    }

    using launched = await launchTestNode({
      nodeOptions: {
        snapshotConfig: {
          stateConfig: {
            coins: snapshotCoins,
          },
        },
      },
    });

    const { provider } = launched;
    predicate.provider = provider;

    const originalCoins = await predicate.getAllCoins(await provider.getBaseAssetId());

    const { coins } = await predicate.consolidateCoins();

    const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;
    // using Math.floor because the leftover coins are not enough for one more tx
    const amountOfConsolidations = Math.floor(coinsPerAsset / maxInputs.toNumber());

    expect(coins.length).toEqual(amountOfConsolidations + leftoverCoinsCount);

    const consolidatedCoins = coins.filter((coin) => !originalCoins.some((c) => c.id === coin.id));
    expect(consolidatedCoins.length).toEqual(amountOfConsolidations);

    const leftoverCoins = coins.filter((coin) => !consolidatedCoins.some((c) => c.id === coin.id));
    expect(leftoverCoins.length).toEqual(leftoverCoinsCount);

    const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(initialAmount.gt(resultingAmount)).toBe(true);
  });
});
