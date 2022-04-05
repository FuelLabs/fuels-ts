import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import type { StorageAbstract } from '@fuel-ts/interfaces';

import type { Keystore } from './keystore';
import { encrypt, decrypt } from './keystore';
import MemoryStorage from './storage';
import type { Account } from './types';
import { MnemonicVault } from './vaults/mnemonic-vault';
import { PrivateKeyVault } from './vaults/privatekey-vault';

interface WalletManagerState {
  accounts: Account[];
  vaults: {
    [vaultId: string]: {
      type: string;
      secret: string;
    };
  };
}

interface WalletManagerOptions {
  storage: StorageAbstract;
}

export class WalletManager {
  static readonly initialState: WalletManagerState = {
    accounts: [],
    vaults: {},
  };

  static Vaults = [MnemonicVault, PrivateKeyVault];

  readonly active: number | null = null;
  readonly storage: StorageAbstract = new MemoryStorage();
  readonly STORAGE_KEY = 'WalletManager';

  state = WalletManager.initialState;
  isLocked: boolean = false;
  passphrase = '';

  constructor(options?: WalletManagerOptions) {
    this.storage = options?.storage || this.storage;
  }

  assertUnlocked() {
    if (this.isLocked) {
      throw new Error('Wallet is locked!');
    }
  }

  getVault(type: string) {
    const Vault = WalletManager.Vaults.find((v) => v.type === type);

    if (!Vault) {
      throw new Error('Invalid vault type');
    }

    return Vault;
  }

  getAccounts(vaultId?: string): Account[] {
    const accounts = this.state.accounts;

    if (vaultId) {
      return accounts.filter((a) => a.vaultId === vaultId);
    }

    return accounts;
  }

  async save() {
    this.assertUnlocked();
    const data = await encrypt(this.passphrase, this.state);
    await this.storage.setItem(this.STORAGE_KEY, data);
  }

  async addAccount(vaultId: string, title?: string) {
    this.assertUnlocked();
    const vaultState = this.state.vaults[vaultId];
    const Vault = this.getVault(vaultState.type);

    if (!vaultState || !Vault) {
      throw new Error('Vault not found!');
    }

    const accounts = this.getAccounts(vaultId);
    const vaultAccounts = this.getAccounts(vaultId);
    const vault = new Vault({
      entropy: vaultState.secret,
    });
    const account = vault.addAccount(vaultAccounts.length);

    if (accounts.find((a) => a.publicKey === account.publicKey)) {
      throw new Error('Account already exists!');
    }

    this.state.accounts = accounts.concat({
      title: title || `Account ${vaultAccounts.length}`,
      publicKey: account.publicKey,
      address: account.address,
      vaultId,
    });
    await this.save();
  }

  async addVault(vault: { type: string; secret: string }) {
    this.assertUnlocked();
    const Vault = this.getVault(vault.type);
    const vaultId = hexlify(randomBytes(12));

    this.state.vaults[vaultId] = {
      type: Vault.type,
      secret: vault.secret,
    };
    await this.save();

    return vaultId;
  }

  async lock() {
    this.assertUnlocked();
    this.passphrase = '';
    this.state = WalletManager.initialState;
    this.isLocked = true;
  }

  async unlock(passphrase: string) {
    const data = await this.storage.getItem<Keystore>(this.STORAGE_KEY);

    if (data) {
      this.state = await decrypt(passphrase, data);
    }

    this.state = WalletManager.initialState;
    this.passphrase = passphrase;
    this.isLocked = false;
  }
}
