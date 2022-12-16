//
// Because WalletLocked and WalletUnlocked has a cycle dependency
// it's not possible to split the two classes in different files
//
/* eslint-disable max-classes-per-file */
import type { BytesLike } from '@ethersproject/bytes';
import { HDWallet } from '@fuel-ts/hdwallet';
import { Mnemonic } from '@fuel-ts/mnemonic';
import type { Provider } from '@fuel-ts/providers';
import { Signer } from '@fuel-ts/signer';

import { BaseWalletLocked } from './base-locked-wallet';
import { BaseWalletUnlocked } from './base-unlocked-wallet';
import type { GenerateOptions } from './types/GenerateOptions';

/**
 * WalletLocked
 */
export class WalletLocked extends BaseWalletLocked {
  unlock(privateKey: BytesLike) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new WalletUnlocked(privateKey, this.provider);
  }
}

/**
 * WalletUnlocked
 */
export class WalletUnlocked extends BaseWalletUnlocked {
  lock(): WalletLocked {
    this.signer = () => new Signer('0x00');
    return new WalletLocked(this.address, this.provider);
  }

  /**
   * Generate a new Wallet Unlocked with a random keyPair
   *
   * @param options - GenerateOptions
   * @returns wallet - Wallet instance
   */
  static generate(generateOptions?: GenerateOptions): WalletUnlocked {
    const privateKey = Signer.generatePrivateKey(generateOptions?.entropy);

    return new WalletUnlocked(privateKey, generateOptions?.provider);
  }

  /**
   * Create Wallet Unlocked from a seed
   */
  static fromSeed(seed: string, path?: string, provider?: Provider): WalletUnlocked {
    const hdWallet = HDWallet.fromSeed(seed);
    const childWallet = hdWallet.derivePath(path || WalletUnlocked.defaultPath);

    return new WalletUnlocked(<string>childWallet.privateKey, provider);
  }

  /**
   * Create Wallet Unlocked from mnemonic phrase
   */
  static fromMnemonic(
    mnemonic: string,
    path?: string,
    passphrase?: BytesLike,
    provider?: Provider
  ): WalletUnlocked {
    const seed = Mnemonic.mnemonicToSeed(mnemonic, passphrase);
    const hdWallet = HDWallet.fromSeed(seed);
    const childWallet = hdWallet.derivePath(path || WalletUnlocked.defaultPath);

    return new WalletUnlocked(<string>childWallet.privateKey, provider);
  }

  /**
   * Create Wallet Unlocked from extended key
   */
  static fromExtendedKey(extendedKey: string, provider?: Provider): WalletUnlocked {
    const hdWallet = HDWallet.fromExtendedKey(extendedKey);

    return new WalletUnlocked(<string>hdWallet.privateKey, provider);
  }
}
