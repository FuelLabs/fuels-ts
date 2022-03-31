import type { StorageAbstract } from '@fuel-ts/interfaces';

import type { Keystore } from './keystore';
import { encrypt, decrypt } from './keystore';
import MemoryStorage from './storage';

interface Account {
  address: string;
  vaultId: string;
}

interface Vault {
  type: 'mnemonic' | 'seed';
  entropy: string;
}

interface WalletManagerState {
  accounts: Account[];
}

interface WalletManagerOptions {
  storage: StorageAbstract;
}

export class WalletManager {
  readonly active: number | null = null;
  readonly storage: StorageAbstract = new MemoryStorage();
  readonly STORAGE_KEY = 'WalletManager';

  isLocked: boolean = false;
  state: WalletManagerState | null = {
    accounts: [],
  };

  vaults: Array<Vault> | null = [];

  constructor(options: WalletManagerOptions) {
    this.storage = options.storage;
  }

  async createAccount(password: string) {
    const vault = await this.createVault();
    await this.addAccount(vault);
  }

  async addAccountFromMnemonic(mnemonic: string) {
    const vault = {
      type: 'mnemonic',
      entropy: mnemonic,
    };

    await this.addAccount(vault);
  }

  async lock(passphrase: string) {
    const password = String(passphrase).normalize('NFKC');
    const data = await encrypt(password, this.state);

    await this.storage.setItem(this.STORAGE_KEY, data);
    this.state = null;
    this.isLocked = true;
  }

  async unlock(passphrase: string) {
    const password = String(passphrase).normalize('NFKC');
    const data = await this.storage.getItem<Keystore>(this.STORAGE_KEY);

    if (data) {
      this.state = await decrypt(password, data);
      this.isLocked = false;
    }
  }
}
