/* eslint-disable max-classes-per-file */
import type { Wallet } from '@fuel-ts/wallet';

export type Account = {
  address: string;
  publicKey: string;
};

export type WalletManagerOptions = {
  storage: StorageAbstract;
};

export type VaultConfig = {
  type: string;
  title?: string;
  secret?: string;
};

export type VaultsState = Array<{
  type: string;
  title?: string;
  data?: VaultConfig;
  vault: Vault;
}>;

export interface WalletManagerState {
  vaults: VaultsState;
}

export abstract class Vault<TOptions = unknown> {
  static readonly type: string;

  constructor(options: TOptions & { secret?: string }) {
    throw new Error('Not implemented');
  }

  serialize(): TOptions & { secret?: string } {
    throw new Error('Not implemented');
  }

  getAccounts(): Account[] {
    throw new Error('Not implemented');
  }

  addAccount(): Account {
    throw new Error('Not implemented');
  }

  exportAccount(address: string): string {
    throw new Error('Not implemented');
  }

  getWallet(address: string): Wallet {
    throw new Error('Not implemented');
  }
}

export abstract class StorageAbstract {
  abstract setItem<T>(key: string, value: T): Promise<unknown>;
  abstract getItem<T>(key: string): Promise<T | null>;
  abstract removeItem(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
