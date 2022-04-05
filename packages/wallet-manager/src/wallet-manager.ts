import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import type { StorageAbstract } from '@fuel-ts/interfaces';

import type { Keystore } from './keystore';
import { encrypt, decrypt } from './keystore';
import MemoryStorage from './storages/memory-storage';
import type { Account } from './types';
import { MnemonicVault } from './vaults/mnemonic-vault';
import { PrivateKeyVault } from './vaults/privatekey-vault';

interface WalletManagerOptions {
  storage: StorageAbstract;
}

interface VaultConfig {
  type: string;
  secret: string;
}

export class WalletManager {
  static Vaults = [MnemonicVault, PrivateKeyVault];

  readonly active: number | null = null;
  readonly storage: StorageAbstract = new MemoryStorage();
  readonly STORAGE_KEY = 'WalletManager';

  accounts: Account[] = [];
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

  getVaultClass(type: string) {
    const Vault = WalletManager.Vaults.find((v) => v.type === type);

    if (!Vault) {
      throw new Error('Invalid vault type');
    }

    return Vault;
  }

  async getAccounts(): Promise<Account[]> {
    await this.loadStorage();
    return this.accounts;
  }

  async save() {
    this.assertUnlocked();
    const data = await encrypt(this.passphrase, this.accounts);
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async addAccount(vaultId: string, title?: string) {
    this.assertUnlocked();
    const vault = await this.getVault(vaultId);
    const accounts = await this.getAccounts();
    const vaultAccounts = accounts.filter((a) => a.vaultId === vaultId);
    const account = vault.addAccount(vaultAccounts.length);

    if (accounts.find((a) => a.publicKey === account.publicKey)) {
      throw new Error('Account already exists!');
    }

    this.accounts = accounts.concat({
      title: title || `Account ${vaultAccounts.length}`,
      publicKey: account.publicKey,
      address: account.address,
      vaultId,
    });

    // Save the accounts state
    await this.save();
  }

  async saveVault(vaultId: string, vault: VaultConfig) {
    const vaultKeystore = await encrypt(this.passphrase, vault);
    await this.storage.setItem(vaultId, JSON.stringify(vaultKeystore));
  }

  async getVault(vaultId: string) {
    const data = await this.storage.getItem<string>(vaultId);

    if (!data) {
      throw new Error('Vault not found!');
    }

    const vaultState = await decrypt<VaultConfig>(this.passphrase, <Keystore>JSON.parse(data));
    const Vault = this.getVaultClass(vaultState.type);

    return new Vault({ entropy: vaultState.secret });
  }

  async loadStorage() {
    const data = await this.storage.getItem<string>(this.STORAGE_KEY);

    if (data) {
      this.accounts = await decrypt(this.passphrase, <Keystore>JSON.parse(data));
    } else {
      this.accounts = [];
    }

    return this.accounts;
  }

  async addVault(vault: VaultConfig) {
    this.assertUnlocked();
    const vaultId = hexlify(randomBytes(12));

    await this.saveVault(vaultId, vault);

    return vaultId;
  }

  async lock() {
    this.assertUnlocked();
    this.passphrase = '';
    this.accounts = [];
    this.isLocked = true;
  }

  async unlock(passphrase: string) {
    this.passphrase = passphrase;
    this.isLocked = false;
    await this.loadStorage();
  }
}
