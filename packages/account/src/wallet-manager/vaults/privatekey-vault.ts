import { Address } from '@fuel-ts/address';
import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { WalletUnlocked } from '../../wallet';
import { Wallet } from '../../wallet';
import type { WalletManagerAccount, Vault } from '../types';

export interface PkVaultOptions {
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

  getAccounts(): WalletManagerAccount[] {
    return this.#privateKeys.map((pk) => this.getPublicAccount(pk));
  }

  addAccount() {
    const wallet = Wallet.generate();

    this.#privateKeys.push(wallet.privateKey);

    return this.getPublicAccount(wallet.privateKey);
  }

  exportAccount(address: string | Address): string {
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

  getWallet(address: string | Address): WalletUnlocked {
    const privateKey = this.exportAccount(address);
    return Wallet.fromPrivateKey(privateKey);
  }
}
