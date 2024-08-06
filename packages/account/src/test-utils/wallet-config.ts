import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { defaultSnapshotConfigs, hexlify, type SnapshotConfigs } from '@fuel-ts/utils';
import type { PartialDeep } from 'type-fest';

import { WalletUnlocked } from '../wallet';

import { AssetId } from './asset-id';
import type { TestMessage } from './test-message';

export interface WalletsConfigOptions {
  /**
   * Number of wallets to generate.
   */
  count: number;

  /**
   * If `number`, the number of unique asset ids each wallet will own with the base asset included.
   *
   * If `AssetId[]`, the asset ids the each wallet will own besides the base asset.
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
export class WalletsConfig {
  private initialState: SnapshotConfigs['stateConfig'];
  private options: WalletsConfigOptions;
  public wallets: WalletUnlocked[];

  private generateWallets: () => WalletUnlocked[] = () => {
    const generatedWallets: WalletUnlocked[] = [];
    for (let index = 1; index <= this.options.count; index++) {
      generatedWallets.push(new WalletUnlocked(randomBytes(32)));
    }
    return generatedWallets;
  };

  constructor(baseAssetId: string, config: WalletsConfigOptions) {
    WalletsConfig.validate(config);

    this.options = config;

    const { assets, coinsPerAsset, amountPerCoin, messages } = this.options;

    this.wallets = this.generateWallets();

    this.initialState = {
      messages: WalletsConfig.createMessages(this.wallets, messages),
      coins: WalletsConfig.createCoins(
        this.wallets,
        baseAssetId,
        assets,
        coinsPerAsset,
        amountPerCoin
      ),
    };
  }

  apply(snapshotConfig: PartialDeep<SnapshotConfigs> | undefined): PartialDeep<SnapshotConfigs> & {
    stateConfig: { coins: SnapshotConfigs['stateConfig']['coins'] };
  } {
    return {
      ...snapshotConfig,
      stateConfig: {
        ...(snapshotConfig?.stateConfig ?? defaultSnapshotConfigs.stateConfig),
        coins: this.initialState.coins.concat(snapshotConfig?.stateConfig?.coins || []),
        messages: this.initialState.messages.concat(snapshotConfig?.stateConfig?.messages ?? []),
      },
    };
  }

  /**
   * Create messages for the wallets in the format that the chain expects.
   */
  private static createMessages(wallets: WalletUnlocked[], messages: TestMessage[]) {
    return messages
      .map((msg) => wallets.map((wallet) => msg.toChainMessage(wallet.address)))
      .flatMap((x) => x);
  }

  /**
   * Create coins for the wallets in the format that the chain expects.
   */
  private static createCoins(
    wallets: WalletUnlocked[],
    baseAssetId: string,
    assets: number | AssetId[],
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    const coins: SnapshotConfigs['stateConfig']['coins'] = [];

    let assetIds: string[] = [baseAssetId];
    if (Array.isArray(assets)) {
      assetIds = assetIds.concat(assets.map((a) => a.value));
    } else {
      assetIds = assetIds.concat(AssetId.random(assets - 1).map((a) => a.value));
    }

    wallets
      .map((wallet) => wallet.address.toHexString())
      .forEach((walletAddress) => {
        assetIds.forEach((assetId) => {
          for (let index = 0; index < coinsPerAsset; index++) {
            coins.push({
              amount: amountPerCoin,
              asset_id: assetId,
              owner: walletAddress,
              tx_pointer_block_height: 0,
              tx_pointer_tx_idx: 0,
              output_index: 0,
              tx_id: hexlify(randomBytes(32)),
            });
          }
        });
      });

    return coins;
  }

  private static validate({
    count: wallets,
    assets,
    coinsPerAsset,
    amountPerCoin,
  }: WalletsConfigOptions) {
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
    if (amountPerCoin < 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Amount per coin must be greater than or equal to zero.'
      );
    }
  }
}
