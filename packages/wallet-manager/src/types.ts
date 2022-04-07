import type { StorageAbstract } from '@fuel-ts/interfaces';

export interface Account {
  title: string;
  address: string;
  publicKey: string;
}

export interface WalletManagerOptions {
  storage: StorageAbstract;
}

export interface VaultConfig {
  type: string;
  title?: string;
  secret?: string;
  // TODO: Improve to export all Vault constructor options Dynamically
  [key: string]: unknown;
}

export type VaultsState = Array<{
  type: string;
  title?: string;
  data?: VaultConfig;
  vault: Vault;
}>;

export interface WalletManagerState {
  vaults: VaultsState;
  accounts: Account[];
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
