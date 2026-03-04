import type { Address } from '@fuel-ts/address';
import type { BytesLike } from '@fuel-ts/utils';

import type { Provider } from '../providers';

import { WalletLocked, WalletUnlocked } from './wallets';

/**
 * `Wallet` provides methods to create locked and unlocked wallet instances.
 */
export class Wallet {
  /**
   * Creates a locked wallet instance from an address and a provider.
   *
   * @param address - The address of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns A locked wallet instance.
   */
  static fromAddress(address: string | Address, provider?: Provider): WalletLocked {
    return new WalletLocked(address, provider);
  }

  /**
   * Creates an unlocked wallet instance from a private key and a provider.
   *
   * @param privateKey - The private key of the wallet.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromPrivateKey(privateKey: BytesLike, provider?: Provider) {
    return new WalletUnlocked(privateKey, provider);
  }

  /**
   * Generate a new Wallet Unlocked with a random key pair.
   *
   * @param generateOptions - Options to customize the generation process (optional).
   * @returns An unlocked wallet instance.
   */
  static generate = WalletUnlocked.generate;

  /**
   * Create a Wallet Unlocked from a seed.
   *
   * @param seed - The seed phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @returns An unlocked wallet instance.
   */
  static fromSeed = WalletUnlocked.fromSeed;

  /**
   * Create a Wallet Unlocked from a mnemonic phrase.
   *
   * @param mnemonic - The mnemonic phrase.
   * @param provider - A Provider instance (optional).
   * @param path - The derivation path (optional).
   * @param passphrase - The passphrase for the mnemonic (optional).
   * @returns An unlocked wallet instance.
   */
  static fromMnemonic = WalletUnlocked.fromMnemonic;

  /**
   * Create a Wallet Unlocked from an extended key.
   *
   * @param extendedKey - The extended key.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromExtendedKey = WalletUnlocked.fromExtendedKey;

  /**
   * Create a Wallet Unlocked from an encrypted JSON.
   *
   * @param jsonWallet - The encrypted JSON keystore.
   * @param password - The password to decrypt the JSON.
   * @param provider - A Provider instance (optional).
   * @returns An unlocked wallet instance.
   */
  static fromEncryptedJson = WalletUnlocked.fromEncryptedJson;
}
