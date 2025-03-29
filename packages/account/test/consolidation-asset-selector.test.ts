import { getRandomB256 } from '@fuel-ts/address';
import { bn } from '@fuel-ts/math';

import { consolidationAssetSelector } from '../src/consolidation-asset-selector';
import { generateFakeCoin } from '../src/test-utils/resources';

describe('UtxoConsolidationAssetSelector', () => {
  const baseAssetId = getRandomB256();
  const nonBaseAssetId = getRandomB256();
  const maxInputs = 255;
  const maxFee = bn(1_000);

  test('selects minimum amount of coins for maxInputs - 1 non-base assets', () => {
    const testBaseAssets = new Array(10)
      .fill(1)
      .map((x, index) => x + index)
      .map((x) => generateFakeCoin({ assetId: baseAssetId, amount: maxFee.div(x) }));

    const testConsolidationCoins = new Array(maxInputs - 1)
      .fill(1)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { baseAssets, consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    expect(consolidationCoins).toEqual(testConsolidationCoins);
    expect(baseAssets).toEqual(testBaseAssets.slice(0, 1));
    expect(baseAssets[0].amount.gte(maxFee)).toBe(true);
  });

  test('selects first least amount of base asset coins', () => {
    const testBaseAssets = new Array(10)
      .fill(1)
      .map((x, index) => x + index)
      .map((x) => generateFakeCoin({ assetId: baseAssetId, amount: maxFee.sub(x) }));

    const testConsolidationCoins = new Array(maxInputs - 2)
      .fill(1)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { baseAssets, consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    expect(consolidationCoins).toEqual(testConsolidationCoins);

    const baseAssetsAmount = baseAssets.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(baseAssetsAmount.gte(maxFee)).toBe(true);

    const expectedBaseAssets = testBaseAssets.sort((a, b) => a.amount.cmp(b.amount)).slice(0, 2);
    expect(baseAssets).toEqual(expectedBaseAssets);
  });

  test(`uses sliding window to select enough base assets
    when first least amount can't pay`, () => {
    const testBaseAssets = new Array(10)
      .fill(1)
      .map((x, index) => x + index)
      .map((x) => generateFakeCoin({ assetId: baseAssetId, amount: maxFee.div(x) }));

    const testConsolidationCoins = new Array(maxInputs - 5)
      .fill(1)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { baseAssets, consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    expect(consolidationCoins).toEqual(testConsolidationCoins);

    const baseAssetAmount = baseAssets.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(baseAssetAmount.gte(maxFee)).toBe(true);

    const expectedBaseAssets = testBaseAssets.sort((a, b) => a.amount.cmp(b.amount)).slice(3, 8);
    expect(baseAssets).toEqual(expectedBaseAssets);
  });

  test(`selects as many base asset coins as possible by least value`, () => {
    const testBaseAssets = new Array(maxInputs)
      .fill(1)
      .map((x) => generateFakeCoin({ assetId: baseAssetId, amount: maxFee.sub(x) }));

    const consolidationCoinCount = 10;
    const testConsolidationCoins = new Array(consolidationCoinCount)
      .fill(1)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { baseAssets, consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    expect(baseAssets).toEqual(
      testBaseAssets
        .sort((a, b) => a.amount.cmp(b.amount))
        .slice(0, maxInputs - consolidationCoinCount)
    );
    const baseAssetAmount = baseAssets.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    // even though one is enough, we consolidate all base assets because we can
    expect(baseAssetAmount.gte(maxFee)).toBe(true);

    expect(consolidationCoins).toEqual(testConsolidationCoins);
  });

  test(`if more base assets are needed than available spots,
    then base assets will be selected by most value`, () => {
    const testBaseAssets = new Array(maxInputs)
      .fill(1)
      .map((x, idx) => x + idx)
      .map((x) => generateFakeCoin({ assetId: baseAssetId, amount: maxFee.div(5).add(x) }));

    const testConsolidationCoins = new Array(maxInputs)
      .fill(1)
      .map((x, index) => x + index)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { baseAssets, consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    const expectedBaseAssets = testBaseAssets.sort((a, b) => b.amount.cmp(a.amount)).slice(0, 3);

    expect(baseAssets).toEqual(expectedBaseAssets);
    const baseAssetAmount = baseAssets.reduce((acc, coin) => acc.add(coin.amount), bn(0));
    expect(baseAssetAmount.gte(maxFee)).toBe(true);

    expect(consolidationCoins).toEqual(
      testConsolidationCoins.slice(0, maxInputs - baseAssets.length)
    );
  });

  test(`selects non-base assets by least value when >= maxInputs non-base`, () => {
    const testBaseAssets = [generateFakeCoin({ assetId: baseAssetId, amount: maxFee })];

    const testConsolidationCoins = new Array(maxInputs + 100)
      .fill(1)
      .map((x, index) => x + index)
      .map((x) => generateFakeCoin({ assetId: nonBaseAssetId, amount: bn(x) }));

    const { consolidationCoins } = consolidationAssetSelector({
      maxFee,
      maxInputs,
      baseAssets: testBaseAssets,
      consolidationCoins: testConsolidationCoins,
    });

    expect(consolidationCoins).toEqual(testConsolidationCoins.slice(0, maxInputs - 1));
  });

  test('base asset selection goes up to maxInputs - 2 and otherwise throws', () => {});

  test('throws maxFee insufficient thingie error when cant fund', () => {});

  test(`ignores UTXOs that are worth less than their price of execution`, () => {});
});
