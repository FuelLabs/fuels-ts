import { Wallet } from '@fuel-ts/wallet';

import type { Account, Vault } from '../types';

interface PkVaultOptions {
  secret?: string;
  accounts?: Array<string>;
}

export class PrivateKeyVault implements Vault<PkVaultOptions> {
  static readonly type = 'privateKey';

  #privateKeys: Array<string> = [];

  constructor(options: PkVaultOptions) {
    // If privateKey vault is initialized with a secretKey creates
    // one account with the fallowing secret
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
    const wallet = new Wallet(privateKey);
    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
    };
  }

  getAccounts(): Account[] {
    return this.#privateKeys.map(this.getPublicAccount);
  }

  addAccount() {
    const wallet = Wallet.generate();

    this.#privateKeys.push(wallet.privateKey);

    return this.getPublicAccount(wallet.privateKey);
  }

  exportAccount(address: string): string {
    const privateKey = this.#privateKeys.find((pk) => new Wallet(pk).address === address);

    if (!privateKey) {
      throw new Error('Address not found');
    }

    return privateKey;
  }

  getWallet(address: string): Wallet {
    const privateKey = this.exportAccount(address);
    return new Wallet(privateKey);
  }
}
