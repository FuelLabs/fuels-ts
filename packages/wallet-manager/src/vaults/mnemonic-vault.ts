import { Mnemonic } from '@fuel-ts/mnemonic';
import { Wallet } from '@fuel-ts/wallet';

import type { Vault } from '../types';

interface MnemonicVaultOptions {
  secret?: string;
  rootPath?: string;
  numberOfAccounts?: number | null;
}

export class MnemonicVault implements Vault<MnemonicVaultOptions> {
  static readonly type = 'mnemonic';
  readonly #secret: string;

  rootPath: string = `m/44'/60'/0'/0`;
  numberOfAccounts: number = 0;

  constructor(options: MnemonicVaultOptions) {
    this.#secret = options.secret || Mnemonic.generate();
    this.rootPath = options.rootPath || this.rootPath;
    // On creating the vault also adds one account
    this.numberOfAccounts = options.numberOfAccounts || 1;
  }

  serialize(): MnemonicVaultOptions {
    return {
      secret: this.#secret,
      rootPath: this.rootPath,
      numberOfAccounts: this.numberOfAccounts,
    };
  }

  getAccounts() {
    const accounts = [];
    let numberOfAccounts = 0;

    // Create all accounts to current vault
    do {
      const wallet = Wallet.fromMnemonic(this.#secret, `${this.rootPath}/${numberOfAccounts}`);
      accounts.push({
        publicKey: wallet.publicKey,
        address: wallet.address,
      });
      numberOfAccounts += 1;
    } while (numberOfAccounts < this.numberOfAccounts);

    return accounts;
  }

  addAccount() {
    this.numberOfAccounts += 1;
    const wallet = Wallet.fromMnemonic(this.#secret, `${this.rootPath}/${this.numberOfAccounts}`);

    return {
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }

  exportAccount(address: string): string {
    let numberOfAccounts = 0;

    // Look for the account that has the same address
    do {
      const wallet = Wallet.fromMnemonic(this.#secret, `${this.rootPath}/${numberOfAccounts}`);
      if (wallet.address === address) {
        return wallet.privateKey;
      }
      numberOfAccounts += 1;
    } while (numberOfAccounts < this.numberOfAccounts);

    throw new Error('Account not found');
  }

  getWallet(address: string): Wallet {
    const privateKey = this.exportAccount(address);
    return new Wallet(privateKey);
  }
}
