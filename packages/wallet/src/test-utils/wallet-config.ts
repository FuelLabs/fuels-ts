import { FuelError } from '@fuel-ts/errors';
import { toHex } from '@fuel-ts/math';
import type { ChainConfig } from '@fuel-ts/providers/test-utils';
import type { PartialDeep } from 'type-fest';

import { WalletUnlocked } from '../wallets';

import { AssetId } from './asset-id';

interface WalletConfigOptions {
  /**
   * If `number`, this sets the number of wallets to generate.
   *
   * If `WalletUnlocked[]`, their addresses are used for seed data and their providers are set.
   */
  wallets: number | WalletUnlocked[];

  /**
   * If `number`, the number of unique asset ids each wallet will own.
   *
   * If `AssetId[]`, the asset ids the each wallet will own besides `AssetId.BaseAssetId`.
   */
  assets: number | AssetId[];

  /**
   * Number of coins (UTXOs) per asset id.
   */
  coinsPerAsset: number;

  /**
   * For each coin, the amount it'll contain.
   */
  amountPerCoin: number;
}

/**
 * Used for configuring the wallets that should exist in the genesis block of a test node.
 */
export class WalletConfig {
  private coins: ChainConfig['initial_state']['coins'];
  private options: WalletConfigOptions;
  public getWallets: () => WalletUnlocked[] = () => {
    if (Array.isArray(this.options.wallets)) {
      return this.options.wallets;
    }
    const generatedWallets: WalletUnlocked[] = [];
    for (let index = 1; index <= this.options.wallets; index++) {
      const pk = new Uint8Array(32);
      pk[31] = index;
      // @ts-expect-error will be updated later
      generatedWallets.push(new WalletUnlocked(pk, null));
    }
    return generatedWallets;
  };

  constructor({
    wallets = 1,
    assets = 1,
    coinsPerAsset = 1,
    amountPerCoin = 1_000_000_00,
  }: Partial<WalletConfigOptions> = {}) {
    WalletConfig.guard({ wallets, assets, coinsPerAsset, amountPerCoin });
    this.options = {
      wallets,
      assets,
      coinsPerAsset,
      amountPerCoin,
    };
    this.coins = WalletConfig.createAssets(this.getWallets(), assets, coinsPerAsset, amountPerCoin);
  }

  apply(chainConfig: PartialDeep<ChainConfig> | undefined): PartialDeep<ChainConfig> & {
    initial_state: { coins: ChainConfig['initial_state']['coins'] };
  } {
    return {
      ...chainConfig,
      initial_state: {
        ...chainConfig?.initial_state,
        coins: this.coins.concat(chainConfig?.initial_state?.coins || []),
      },
    };
  }

  private static createAssets(
    wallets: WalletUnlocked[],
    assets: number | AssetId[],
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    const coins: ChainConfig['initial_state']['coins'] = [];

    let assetIds: string[] = [AssetId.BaseAssetId.value];
    if (Array.isArray(assets)) {
      assetIds = assetIds.concat(assets.map((a) => a.value));
    } else {
      for (let index = 0; index < assets - 1; index++) {
        assetIds.push(AssetId.random().value);
      }
    }

    wallets
      .map((wallet) => wallet.address.toHexString())
      .forEach((walletAddress) => {
        assetIds.forEach((assetId) => {
          for (let index = 0; index < coinsPerAsset; index++) {
            coins.push({
              amount: toHex(amountPerCoin, 8),
              asset_id: assetId,
              owner: walletAddress,
            });
          }
        });
      });

    return coins;
  }

  private static guard({ wallets, assets, coinsPerAsset, amountPerCoin }: WalletConfigOptions) {
    if (
      (Array.isArray(wallets) && wallets.length === 0) ||
      (typeof wallets === 'number' && wallets <= 0)
    ) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      );
    }
    if (
      (Array.isArray(assets) && assets.length === 0) ||
      (typeof assets === 'number' && assets <= 0)
    ) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of assets per wallet must be greater than zero.'
      );
    }
    if (coinsPerAsset <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of coins per asset must be greater than zero.'
      );
    }
    if (amountPerCoin <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Amount per coin must be greater than zero.'
      );
    }
  }
}
