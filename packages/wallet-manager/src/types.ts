/* eslint-disable max-classes-per-file */
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Wallet } from '@fuel-ts/wallet';

export type Account = {
  address: AbstractAddress;
  publicKey: string;
  vaultId?: number;
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

  // The variables are not used on the abstract class
  // Did not look enough to find a way to not need to use comments.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exportAccount(address: AbstractAddress): string {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWallet(address: AbstractAddress): Wallet {
    throw new Error('Not implemented');
  }
}

export abstract class StorageAbstract {
  abstract setItem<T>(key: string, value: T): Promise<unknown>;
  abstract getItem<T>(key: string): Promise<T | null>;
  abstract removeItem(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
