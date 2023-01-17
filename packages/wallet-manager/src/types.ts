/* eslint-disable max-classes-per-file */
import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { WalletUnlocked } from '@fuel-ts/wallet';

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

export abstract class Vault<TOptions = { secret?: string }> {
  static readonly type: string;

  constructor(_options: TOptions) {
    throw new Error('Not implemented');
  }

  serialize(): TOptions {
    throw new Error('Not implemented');
  }

  getAccounts(): Account[] {
    throw new Error('Not implemented');
  }

  addAccount(): Account {
    throw new Error('Not implemented');
  }

  exportAccount(_address: AbstractAddress): string {
    throw new Error('Not implemented');
  }

  getWallet(_address: AbstractAddress): WalletUnlocked {
    throw new Error('Not implemented');
  }
}

export abstract class StorageAbstract {
  abstract setItem(key: string, value: string): Promise<void>;
  abstract getItem(key: string): Promise<string | null | undefined>;
  abstract removeItem(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
