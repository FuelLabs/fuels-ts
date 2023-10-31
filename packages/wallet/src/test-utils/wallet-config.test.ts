import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { WalletUnlocked } from '../wallets';

import { AssetId } from './asset-id';
import { WalletConfig } from './wallet-config';

describe('WalletConfig', () => {
  it('throws on invalid number of wallets', async () => {
    await expectToThrowFuelError(
      () => new WalletConfig({ wallets: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletConfig({ wallets: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletConfig({ wallets: [] }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      )
    );
  });

  it('throws on invalid number of assets', async () => {
    await expectToThrowFuelError(
      () => new WalletConfig({ assets: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletConfig({ assets: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );
    await expectToThrowFuelError(
      () => new WalletConfig({ assets: [] }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      )
    );
  });

  it('throws on invalid number of coins per asset', async () => {
    await expectToThrowFuelError(
      () => new WalletConfig({ coinsPerAsset: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of coins per asset must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletConfig({ coinsPerAsset: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of coins per asset must be greater than zero.'
      )
    );
  });

  it('throws on invalid amount per coin', async () => {
    await expectToThrowFuelError(
      () => new WalletConfig({ amountPerCoin: -1 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Amount per coin must be greater than zero.'
      )
    );

    await expectToThrowFuelError(
      () => new WalletConfig({ amountPerCoin: 0 }),
      new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Amount per coin must be greater than zero.'
      )
    );
  });

  it('allows custom wallets to be provided', () => {
    // @ts-expect-error currently mandatory - shouldn't be?
    const wallet1 = WalletUnlocked.generate({ provider: null });
    // @ts-expect-error currently mandatory - shouldn't be?
    const wallet2 = WalletUnlocked.generate({ provider: null });

    const { getWallets: wallets } = new WalletConfig({ wallets: [wallet1, wallet2] });

    expect(wallets).toEqual([wallet1, wallet2]);
  });

  it('allows custom assets to be provided', () => {
    const assetId = AssetId.random();
    const {
      initial_state: { coins },
    } = new WalletConfig({ assets: [assetId] }).apply({});

    expect(coins[0].asset_id).toEqual(AssetId.BaseAssetId.value);
    expect(coins[1].asset_id).toEqual(assetId.value);
    expect(coins.length).toBe(2);
  });

  it('generated wallets are deterministic', () => {
    const config1 = new WalletConfig();
    const config2 = new WalletConfig();
    expect(config1.getWallets()[0].address.toB256()).toEqual(
      config2.getWallets()[0].address.toB256()
    );
  });
});
