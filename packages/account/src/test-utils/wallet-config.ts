import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { toHex } from '@fuel-ts/math';
import type { ChainConfig } from '@fuel-ts/utils';
import type { PartialDeep } from 'type-fest';

import { WalletUnlocked } from '../wallet';

import { AssetId } from './asset-id';
import type { TestMessage } from './test-message';

export interface WalletConfigOptions {
  /**
   * Number of wallets to generate.
   */
  count: number;

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

  /**
   * Messages that are supposed to be on the wallet.
   * The `recipient` field of the message is overriden to be the wallet's address.
   */
  messages: TestMessage[];
}

/**
 * Used for configuring the wallets that should exist in the genesis block of a test node.
 */
export class WalletConfig {
  private initialState: ChainConfig['initial_state'];
  private options: WalletConfigOptions;
  public wallets: WalletUnlocked[];
  private generateWallets: () => WalletUnlocked[] = () => {
    const generatedWallets: WalletUnlocked[] = [];
    for (let index = 1; index <= this.options.count; index++) {
      generatedWallets.push(new WalletUnlocked(randomBytes(32)));
    }
    return generatedWallets;
  };

  constructor(config: WalletConfigOptions) {
    WalletConfig.guard(config);

    this.options = config;

    const { assets, coinsPerAsset, amountPerCoin, messages } = this.options;
    this.wallets = this.generateWallets();
    this.initialState = {
      messages: WalletConfig.createMessages(this.wallets, messages),
      coins: WalletConfig.createCoins(this.wallets, assets, coinsPerAsset, amountPerCoin),
    };
  }

  apply(chainConfig: PartialDeep<ChainConfig> | undefined): PartialDeep<ChainConfig> & {
    initial_state: { coins: ChainConfig['initial_state']['coins'] };
  } {
    return {
      ...chainConfig,
      initial_state: {
        ...chainConfig?.initial_state,
        coins: this.initialState.coins.concat(chainConfig?.initial_state?.coins || []),
        messages: this.initialState.messages.concat(chainConfig?.initial_state?.messages ?? []),
      },
    };
  }

  private static createMessages(wallets: WalletUnlocked[], messages: TestMessage[]) {
    return messages
      .map((msg) => wallets.map((wallet) => msg.toChainMessage(wallet.address)))
      .flatMap((x) => x);
  }

  private static createCoins(
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

  private static guard({
    count: wallets,
    assets,
    coinsPerAsset,
    amountPerCoin,
  }: WalletConfigOptions) {
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
