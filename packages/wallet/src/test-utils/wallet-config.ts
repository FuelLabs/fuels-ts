import { hexlify } from '@ethersproject/bytes';
import { BaseAssetId } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { toHex } from '@fuel-ts/math';

import { WalletUnlocked } from '../wallets';

import type { ChainConfig } from './launch-custom-provider-and-get-wallets';

export class WalletConfig {
  public coins: ChainConfig['coins'];
  public wallets: WalletUnlocked[];

  public static default() {
    return new WalletConfig(2, 1, 1, 1_000_000_000);
  }

  /**
   * @param numWallets - number of wallets to generate.
   * @param numOfAssets - number of unique asset ids each wallet will own.
   * @param coinsPerAsset - number of coins (UTXOs) per asset id.
   * @param amountPerCoin - for each coin, the amount it'll contain.
   */
  constructor(
    numWallets: number,
    numOfAssets: number,
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    WalletConfig.guard(numWallets, numOfAssets, coinsPerAsset, amountPerCoin);
    const wallets: WalletUnlocked[] = [];
    for (let index = 0; index < numWallets; index++) {
      // @ts-expect-error will be updated later
      wallets.push(WalletUnlocked.generate({ provider: null }));
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
    numWallets: number,
    numberOfAssets: number,
    coinsPerAsset: number,
    amountPerCoin: number
  ) {
    if (numWallets <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_WALLET_CONFIG,
        'Number of wallets must be greater than zero.'
      );
    }
    if (numberOfAssets <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_WALLET_CONFIG,
        'Number of assets per wallet must be greater than zero.'
      );
    }
    if (coinsPerAsset <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_WALLET_CONFIG,
        'Number of coins per asset must be greater than zero.'
      );
    }
    if (amountPerCoin <= 0) {
      throw new FuelError(
        FuelError.CODES.INVALID_WALLET_CONFIG,
        'Amount per coin must be greater than zero.'
      );
    }
  }
}
