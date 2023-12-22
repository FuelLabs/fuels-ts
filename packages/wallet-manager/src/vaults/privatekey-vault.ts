import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Provider } from '@fuel-ts/providers';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { Wallet } from '@fuel-ts/wallet';

import type { Account, Vault } from '../types';

interface PkVaultOptions {
  secret?: string;
  accounts?: Array<string>;
  provider: Provider;
}

export class PrivateKeyVault implements Vault<PkVaultOptions> {
  static readonly type = 'privateKey';
  provider: Provider;

  #privateKeys: Array<string> = [];

  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(options: PkVaultOptions) {
    this.provider = options.provider;
    if (options.secret) {
      this.#privateKeys = [options.secret];
    } else {
      this.#privateKeys = options.accounts || [
        Wallet.generate({
          provider: options.provider,
        }).privateKey,
      ];
    }
  }

  serialize(): PkVaultOptions {
    return {
      accounts: this.#privateKeys,
      provider: this.provider,
    };
  }

  getPublicAccount(privateKey: string) {
    const wallet = Wallet.fromPrivateKey(privateKey, this.provider);
    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
    };
  }

  getAccounts(): Account[] {
    return this.#privateKeys.map((pk) => this.getPublicAccount(pk));
  }

  addAccount() {
    const wallet = Wallet.generate({
      provider: this.provider,
    });

    this.#privateKeys.push(wallet.privateKey);

    return this.getPublicAccount(wallet.privateKey);
  }

  exportAccount(address: string | AbstractAddress): string {
    const bech32Address = Address.fromAddressOrBech32String(address);
    const privateKey = this.#privateKeys.find((pk) =>
      Wallet.fromPrivateKey(pk, this.provider).address.equals(bech32Address)
    );

    if (!privateKey) {
      throw new FuelError(
        ErrorCode.WALLET_MANAGER_ERROR,
        `No private key found for address '${address}'.`
      );
    }

    return privateKey;
  }

  getWallet(address: string | AbstractAddress): WalletUnlocked {
    const privateKey = this.exportAccount(address);
    return Wallet.fromPrivateKey(privateKey, this.provider);
  }
}
