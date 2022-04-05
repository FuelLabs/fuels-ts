import { Wallet } from '@fuel-ts/wallet';

import type { Vault } from '../types';

interface PkVaultOptions {
  entropy?: string;
}

export class PrivateKeyVault implements Vault<PkVaultOptions> {
  static readonly type = 'privateKey';
  readonly entropy: string;

  constructor(options: PkVaultOptions) {
    this.entropy = options.entropy || Wallet.generate().privateKey;
  }

  addAccount() {
    const wallet = new Wallet(this.entropy);

    return {
      address: wallet.address,
      publicKey: wallet.publicKey,
    };
  }

  exportAccount(): string {
    const wallet = new Wallet(this.entropy);
    return wallet.privateKey;
  }
}
