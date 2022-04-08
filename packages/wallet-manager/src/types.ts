import type { StorageAbstract } from '@fuel-ts/interfaces';
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

export abstract class Vault<TOptions = any> {
  static readonly type: string;

  constructor(options: TOptions & { secret?: string }) {
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

  exportAccount(address: string): string {
    throw new Error('Not implemented');
  }

  getWallet(address: string): Wallet {
    throw new Error('Not implemented');
  }
}
