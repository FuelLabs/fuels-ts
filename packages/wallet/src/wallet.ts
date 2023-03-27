import type { BytesLike } from '@ethersproject/bytes';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';

import { FUEL_NETWORK_URL } from './configs';
import { WalletLocked, WalletUnlocked } from './wallets';

export class Wallet {
  static fromAddress(
    address: string | AbstractAddress,
    provider: string | Provider = FUEL_NETWORK_URL
  ): WalletLocked {
    return new WalletLocked(address, provider);
  }

  static fromPrivateKey(privateKey: BytesLike, provider: string | Provider = FUEL_NETWORK_URL) {
    return new WalletUnlocked(privateKey, provider);
  }

  static generate = WalletUnlocked.generate;
  static fromSeed = WalletUnlocked.fromSeed;
  static fromMnemonic = WalletUnlocked.fromMnemonic;
  static fromExtendedKey = WalletUnlocked.fromExtendedKey;
}
