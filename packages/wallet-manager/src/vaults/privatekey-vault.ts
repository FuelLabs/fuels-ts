import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { Wallet } from '@fuel-ts/wallet';

import type { Account, Vault } from '../types';

interface PkVaultOptions {
  secret?: string;
  accounts?: Array<string>;
}

export class PrivateKeyVault implements Vault<PkVaultOptions> {
  static readonly type = 'privateKey';

  #privateKeys: Array<string> = [];

  /**
   * If privateKey vault is initialized with a secretKey, it creates
   * one account with the fallowing secret
   */
  constructor(options: PkVaultOptions = {}) {
    if (options.secret) {
      this.#privateKeys = [options.secret];
    } else {
      this.#privateKeys = options.accounts || [Wallet.generate().privateKey];
    }
  }

  serialize(): PkVaultOptions {
    return {
      accounts: this.#privateKeys,
    };
  }

  getPublicAccount(privateKey: string) {
    const wallet = Wallet.fromPrivateKey(privateKey);
    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
    };
  }

  getAccounts(): Account[] {
    return this.#privateKeys.map((pk) => this.getPublicAccount(pk));
  }

  addAccount() {
    const wallet = Wallet.generate();

    this.#privateKeys.push(wallet.privateKey);

    return this.getPublicAccount(wallet.privateKey);
  }

  exportAccount(address: string | AbstractAddress): string {
    const ownerAddress = Address.fromAddressOrString(address);
    const privateKey = this.#privateKeys.find((pk) =>
      Wallet.fromPrivateKey(pk).address.equals(ownerAddress)
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
    return Wallet.fromPrivateKey(privateKey);
  }
}
