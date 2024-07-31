import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { hexlify } from '@fuel-ts/utils';

import { AssetId } from './asset-id';
import type { WalletsConfigOptions } from './wallet-config';
import { WalletsConfig } from './wallet-config';

/**
 * @group node
 */
describe('WalletsConfig', () => {
  const configOptions: WalletsConfigOptions = {
    count: 2,
    assets: [AssetId.A, AssetId.B],
    coinsPerAsset: 1,
    amountPerCoin: 10_000_000_000,
    messages: [],
  };
  it('throws on invalid number of wallets', async () => {
    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, count: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, count: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      )
    );
  });

  it('throws on invalid number of assets', async () => {
    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, assets: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, assets: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );
    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, assets: [] }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );
  });

  it('throws on invalid number of coins per asset', async () => {
    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, coinsPerAsset: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of coins per asset must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, coinsPerAsset: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of coins per asset must be greater than zero.'
      )
    );
  });

  it('throws on invalid amount per coin', async () => {
    await expectToThrowFuelError(
      () => new WalletsConfig(hexlify(randomBytes(32)), { ...configOptions, amountPerCoin: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Amount per coin must be greater than or equal to zero.'
      )
    );
  });

  it('allows custom assets to be provided', () => {
    const [assetId] = AssetId.random();
    const baseAssetId = hexlify(randomBytes(32));
    const {
      stateConfig: { coins: allCoins },
    } = new WalletsConfig(baseAssetId, { ...configOptions, assets: [assetId] }).apply({});

    const coins = allCoins.filter((coin, _index, arr) => coin.owner === arr[0].owner);

    expect(coins[0].asset_id).toEqual(baseAssetId);
    expect(coins[1].asset_id).toEqual(assetId.value);
    expect(coins.length).toBe(2);
  });
});
