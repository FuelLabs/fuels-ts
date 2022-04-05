import { Mnemonic } from '@fuel-ts/mnemonic';
import { Wallet } from '@fuel-ts/wallet';

import type { Vault } from '../types';

interface MnemonicVaultOptions {
  entropy?: string;
  rootPath?: string;
}

export class MnemonicVault implements Vault<MnemonicVaultOptions> {
  static readonly type = 'mnemonic';
  readonly entropy: string;

  rootPath: string = `m/44'/60'/0'/0`;

  constructor(options: MnemonicVaultOptions) {
    this.entropy = options.entropy || Mnemonic.generate();
    this.rootPath = options.rootPath || this.rootPath;
  }

  addAccount(index: number) {
    const wallet = Wallet.fromMnemonic(this.entropy, `${this.rootPath}/${index}`);

    return {
      publicKey: wallet.publicKey,
      address: wallet.address,
    };
  }

  exportAccount(index: number): string {
    const wallet = Wallet.fromMnemonic(this.entropy, `${this.rootPath}/${index}`);

    return wallet.privateKey;
  }
}
