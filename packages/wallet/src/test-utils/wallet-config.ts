import { hexlify } from '@ethersproject/bytes';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { toHex } from '@fuel-ts/math';

import { WalletUnlocked } from '../wallets';

import type { ChainConfig } from './launch-custom-provider-and-get-wallets';

interface WalletConfigOptions {
  /**
   * Number of wallets to generate.
   */
  numWallets: number | WalletUnlocked[];

  /**
   * Number of unique asset ids each wallet will own.
   */
  numOfAssets: number;

  /**
   * Number of coins (UTXOs) per asset id.
   */
  coinsPerAsset: number;

  /**
   * For each coin, the amount it'll contain.
   */
  amountPerCoin: number;
}

export class WalletConfig {
  public coins: ChainConfig['coins'];
  public wallets: WalletUnlocked[];

  /**
   * Used for configuring the wallets that should exist in the genesis block of a test node.
   */
  constructor({
    numWallets = 1,
    numOfAssets = 1,
    coinsPerAsset = 1,
    amountPerCoin = 1_000_000_00,
  }: Partial<WalletConfigOptions> = {}) {
    WalletConfig.guard(numWallets, numOfAssets, coinsPerAsset, amountPerCoin);
    let wallets: WalletUnlocked[] = [];

    if (Array.isArray(numWallets)) {
      wallets = numWallets;
    } else {
      for (let index = 0; index < numWallets; index++) {
        // @ts-expect-error will be updated later
        wallets.push(WalletUnlocked.generate({ provider: null }));
      }
    }

    this.wallets = wallets;

    this.coins = WalletConfig.createAssets(wallets, numOfAssets, coinsPerAsset, amountPerCoin);
  }

  private static createAssets(
    wallets: WalletUnlocked[],
    numberOfAssets: number,
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    const coins: ChainConfig['coins'] = [];

    const assetIds: string[] = [];
    for (let index = 0; index < numberOfAssets; index++) {
      assetIds.push(index === 0 ? BaseAssetId : hexlify(randomBytes(32)));
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

  private static guard(
    numWallets: number | WalletUnlocked[],
    numberOfAssets: number,
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    if (
      (Array.isArray(numWallets) && numWallets.length === 0) ||
      (typeof numWallets === 'number' && numWallets <= 0)
    ) {
      throw new FuelError(
        FuelError.CODES.INVALID_INPUT_PARAMETERS,
        'Number of wallets must be greater than zero.'
      );
    }
    if (numberOfAssets <= 0) {
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
