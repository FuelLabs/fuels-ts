import { Wallet } from '@fuel-ts/wallet';

import type { Keystore } from './keystore';

export interface Account {
  title: string;
  address: string;
  publicKey: string;
}

export abstract class Vault<TOptions = any> {
  static readonly type: string;

  constructor(options: TOptions & { secret?: string }) {
    throw new Error('Not implemented');
  }

  serialize(): TOptions {
    throw new Error('Not implemented');
  }

  getAccounts(): { publicKey: string; address: string }[] {
    throw new Error('Not implemented');
  }

  addAccount(): { publicKey: string; address: string } {
    throw new Error('Not implemented');
  }

  exportAccount(address: string): string {
    throw new Error('Not implemented');
  }
}
