import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';
import type { SnapshotConfigs } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';
import { randomBytes } from 'crypto';

import { type TransactionResult, type Provider, TRANSACTIONS_PAGE_SIZE_LIMIT } from '../src';
import { setupTestProviderAndWallets, TestAssetId } from '../src/test-utils';

/**
 * @group node
 * @group browser
 */
describe('utxo-consolidation', () => {
  describe('base asset', () => {
    test("doesn't consolidate - only one coin", async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 1,
          amountPerCoin: 10000, // can cover maxFee but we don't consolidate one coin
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

      const sendSpy = vi.spyOn(provider, 'sendTransaction');

      const { coins } = await wallet.consolidateCoins({ assetId: baseAssetId });

      expect(sendSpy).not.toHaveBeenCalled();
      expect(coins).toEqual(originalCoins);
    });

    test('throws - coins value is less than max fee, under 255 coins', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 5,
          amountPerCoin: 1,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      await expectToThrowFuelError(
        () => wallet.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `The account sending the transaction doesn't have enough funds to cover the transaction.`
        )
      );
    });

    test('throws - coins value is equal to max fee, under 255 coins', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 26, // this is the max fee value
          amountPerCoin: 1,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      await expectToThrowFuelError(
        () => wallet.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `The account sending the transaction doesn't have enough funds to cover the transaction.`
        )
      );
    });

    test('consolidates once - less than max_inputs coins', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 2,
          amountPerCoin: 1000,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());
      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));

      const { coins } = await wallet.consolidateCoins({ assetId: baseAssetId });

      expect(coins.length).toEqual(1);
      expect(originalCoins).not.toContainEqual(coins[0]);
      expect(initialAmount.gt(coins[0].amount)).toBe(true);
    });

    test('consolidates once - max_inputs + 1 coins', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 256,
          amountPerCoin: 100,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

      const { coins } = await wallet.consolidateCoins({ assetId: baseAssetId });

      expect(coins.length).toEqual(2);
      const consolidatedCoin = coins.find((coin) => !originalCoins.some((c) => c.id === coin.id));
      expect(originalCoins).not.toContainEqual(consolidatedCoin);

      const leftoverCoin = coins.find((coin) => coin.id !== consolidatedCoin?.id);
      expect(originalCoins).toContainEqual(leftoverCoin);

      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      expect(initialAmount.gt(resultingAmount)).toBe(true);
    });

    test(`consolidates once and then throws -
    max_inputs + >1 coins, second tx can't be funded`, async () => {
      const leftoverCoinsCount = 25;
      const coinsPerAsset = 255 + leftoverCoinsCount;
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset,
          amountPerCoin: 1,
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;

      const originalCoins = await wallet.getAllCoins(baseAssetId);

      const error = await expectToThrowFuelError(
        () => wallet.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `The account sending the transaction doesn't have enough funds to cover the transaction.`
        )
      );

      const { transactions } = error.metadata as { transactions: TransactionResult[] };

      expect(transactions).toHaveLength(1);
      expect(transactions[0].isStatusSuccess).toBe(true);

      const coins = await wallet.getAllCoins(baseAssetId);

      expect(coins.length).toEqual(coinsPerAsset - maxInputs.toNumber() + 1);

      const consolidatedCoins = coins.filter(
        (coin) => !originalCoins.some((c) => c.id === coin.id)
      );

      expect(consolidatedCoins).toHaveLength(1);
      expect(originalCoins).not.toContainEqual(consolidatedCoins[0]);

      const leftoverCoins = coins.filter(
        (coin) => !consolidatedCoins.some((c) => c.id === coin.id)
      );
      expect(leftoverCoins).toHaveLength(leftoverCoinsCount);
      leftoverCoins.forEach((coin) => {
        expect(originalCoins).toContainEqual(coin);
      });

      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      expect(initialAmount.gt(coins[0].amount)).toBe(true);
    });

    test(`consolidates multiple times - no leftover coins`, async () => {
      // 4 tx with max_inputs and 1 tx with less than max_inputs;
      const coinsPerAsset = 255 * 4 + 134;

      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset,
          amountPerCoin: 1,
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();

      const originalCoins = await wallet.getAllCoins(await wallet.provider.getBaseAssetId());

      const { coins } = await wallet.consolidateCoins({ assetId: baseAssetId });

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

      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset,
          amountPerCoin: 1,
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const baseAssetId = await wallet.provider.getBaseAssetId();
      const originalCoins = await wallet.getAllCoins(baseAssetId);

      const error = await expectToThrowFuelError(
        () => wallet.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `The account sending the transaction doesn't have enough funds to cover the transaction.`
        )
      );

      const { transactions } = error.metadata as { transactions: TransactionResult[] };

      const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;
      // using Math.floor because the leftover coins are not enough for one more tx
      const amountOfConsolidations = Math.floor(coinsPerAsset / maxInputs.toNumber());

      expect(transactions).toHaveLength(amountOfConsolidations);
      transactions.forEach((tx) => {
        expect(tx.isStatusSuccess).toBe(true);
      });

      const coins = await wallet.getAllCoins(baseAssetId);

      expect(coins.length).toEqual(amountOfConsolidations + leftoverCoinsCount);

      const consolidatedCoins = coins.filter(
        (coin) => !originalCoins.some((c) => c.id === coin.id)
      );
      expect(consolidatedCoins.length).toEqual(amountOfConsolidations);

      const leftoverCoins = coins.filter(
        (coin) => !consolidatedCoins.some((c) => c.id === coin.id)
      );
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
          // baseAssetId
          asset_id: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
          owner: predicate.address.toHexString(),
          tx_pointer_block_height: 0,
          tx_pointer_tx_idx: 0,
          output_index: 0,
          tx_id: hexlify(randomBytes(32)),
        });
      }

      using launched = await setupTestProviderAndWallets({
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

      const estimatePredicatesSpy = vi.spyOn(provider, 'estimatePredicates');

      const baseAssetId = await provider.getBaseAssetId();
      const originalCoins = await predicate.getAllCoins(baseAssetId);

      const error = await expectToThrowFuelError(
        () => predicate.consolidateCoins({ assetId: baseAssetId }),
        new FuelError(
          ErrorCode.INSUFFICIENT_FUNDS_OR_MAX_COINS,
          `The account sending the transaction doesn't have enough funds to cover the transaction.`
        )
      );

      const { transactions } = error.metadata as { transactions: TransactionResult[] };

      const maxInputs = (await provider.getChain()).consensusParameters.txParameters.maxInputs;
      // using Math.floor because the leftover coins are not enough for one more tx
      const amountOfConsolidations = Math.floor(coinsPerAsset / maxInputs.toNumber());

      expect(transactions).toHaveLength(amountOfConsolidations);
      transactions.forEach((tx) => {
        expect(tx.isStatusSuccess).toBe(true);
      });

      const coins = await predicate.getAllCoins(baseAssetId);

      expect(estimatePredicatesSpy).toHaveBeenCalledTimes(1);

      expect(coins.length).toEqual(amountOfConsolidations + leftoverCoinsCount);

      const consolidatedCoins = coins.filter(
        (coin) => !originalCoins.some((c) => c.id === coin.id)
      );
      expect(consolidatedCoins.length).toEqual(amountOfConsolidations);

      const leftoverCoins = coins.filter(
        (coin) => !consolidatedCoins.some((c) => c.id === coin.id)
      );
      expect(leftoverCoins.length).toEqual(leftoverCoinsCount);

      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      expect(initialAmount.gt(resultingAmount)).toBe(true);
    });
  });

  describe('non-base asset', () => {
    const assets = TestAssetId.random();
    const testAssetId = assets[0].value;

    test("doesn't consolidate - only one coin", async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 1,
          assets,
        },
      });

      const {
        wallets: [wallet],
        provider,
      } = launched;

      const originalCoins = await wallet.getAllCoins(testAssetId);

      const sendSpy = vi.spyOn(provider, 'sendTransaction');

      const { coins } = await wallet.consolidateCoins({ assetId: testAssetId });

      expect(sendSpy).not.toHaveBeenCalled();
      expect(coins).toEqual(originalCoins);
    });

    test('consolidates once - less than max_inputs coins', async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 2,
          assets,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const originalCoins = await wallet.getAllCoins(testAssetId);
      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));

      const { coins } = await wallet.consolidateCoins({ assetId: testAssetId });

      expect(coins.length).toEqual(1);
      expect(originalCoins).not.toContainEqual(coins[0]);
      expect(coins[0].amount).toEqualBn(initialAmount);
    });

    test(`consolidates once - max_inputs coins, one base-asset UTXO can pay`, async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 255,
          assets,
          amountPerCoin: 1_000_000,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const originalCoins = await wallet.getAllCoins(testAssetId);
      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));

      const { coins, transactions } = await wallet.consolidateCoins({ assetId: testAssetId });

      expect(transactions).toHaveLength(1);
      expect(coins.length).toEqual(2);

      const consolidatedCoin = coins.find((coin) => !originalCoins.some((c) => c.id === coin.id));
      expect(consolidatedCoin).toBeDefined();
      expect(originalCoins).not.toContainEqual(consolidatedCoin);

      const coinsInOriginal = coins.filter((coin) => originalCoins.some((c) => c.id === coin.id));
      expect(coinsInOriginal.length).toEqual(1);

      const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      expect(resultingAmount).toEqualBn(initialAmount);
    });

    test(`consolidates twice - max_inputs coins, one base-asset UTXO can't pay`, async () => {
      using launched = await setupTestProviderAndWallets({
        walletsConfig: {
          coinsPerAsset: 255,
          amountPerCoin: 1_000_00,
          assets,
        },
      });

      const {
        wallets: [wallet],
      } = launched;

      const originalCoins = await wallet.getAllCoins(testAssetId);
      const initialAmount = originalCoins.reduce((acc, coin) => acc.add(coin.amount), bn(0));

      const { coins, transactions } = await wallet.consolidateCoins({ assetId: testAssetId });

      expect(transactions.length).toEqual(2);
      expect(coins.length).toEqual(2);
      coins.forEach((coin) => {
        expect(originalCoins).not.toContainEqual(coin);
      });

      const resultingAmount = coins.reduce((acc, coin) => acc.add(coin.amount), bn(0));
      expect(resultingAmount).toEqualBn(initialAmount);
    });

    test('factors in change outputs coins of base assets', () => {});
  });
});
