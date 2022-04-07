import { Wallet } from '@fuel-ts/wallet';

import type { Vault } from '../types';

interface PkVaultOptions {
  secret?: string;
  accounts?: Array<string>;
}

export class PrivateKeyVault implements Vault<PkVaultOptions> {
  static readonly type = 'privateKey';

  accounts: Array<string> = [];

  constructor(options: PkVaultOptions) {
    // If privateKey vault is initialized with a secretKey creates
    // one account with the fallowing secret
    if (options.secret) {
      this.accounts = [options.secret];
    } else {
      this.accounts = options.accounts || [Wallet.generate().privateKey];
    }
  }

  serialize(): PkVaultOptions {
    return {
      accounts: this.accounts,
    };
  }

  getPublicAccount(privateKey: string) {
    const wallet = new Wallet(privateKey);
    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
    };
  }

  getAccounts(): { publicKey: string; address: string }[] {
    return this.accounts.map(this.getPublicAccount);
  }

  addAccount() {
    const wallet = Wallet.generate();

    this.accounts.push(wallet.privateKey);

    return this.getPublicAccount(wallet.privateKey);
  }

  exportAccount(address: string): string {
    const privateKey = this.accounts.find((pk) => new Wallet(pk).address === address);

    if (!privateKey) {
      throw new Error('Address not found');
    }

    return privateKey;
  }
}
