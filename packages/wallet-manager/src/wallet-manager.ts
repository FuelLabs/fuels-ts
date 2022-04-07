import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import type { StorageAbstract } from '@fuel-ts/interfaces';
import { EventEmitter } from 'events';

import type { Keystore } from './keystore';
import { encrypt, decrypt } from './keystore';
import MemoryStorage from './storages/memory-storage';
import type { Account, Vault } from './types';
import { MnemonicVault } from './vaults/mnemonic-vault';
import { PrivateKeyVault } from './vaults/privatekey-vault';

interface WalletManagerOptions {
  storage: StorageAbstract;
  storageKey?: string;
}

interface VaultConfig {
  type: string;
  title?: string;
  secret?: string;
  // Improve the way to get opts from the type
  [key: string]: unknown;
}

type VaultsState = Array<{
  type: string;
  title?: string;
  data?: VaultConfig;
  vault: Vault;
}>;
interface WalletManagerState {
  vaults: VaultsState;
  accounts: Account[];
  isLocked: boolean;
}

const getInitialState = (): WalletManagerState => ({
  vaults: [],
  accounts: [],
  isLocked: false,
});

export class WalletManager extends EventEmitter {
  static Vaults = [MnemonicVault, PrivateKeyVault];
  readonly storage: StorageAbstract = new MemoryStorage();
  readonly STORAGE_KEY: string = 'WalletManager';

  state: WalletManagerState = getInitialState();

  // Uses native JavaScript encapsulation to make it accessible only inside class instance
  #passphrase = '';

  constructor(options?: WalletManagerOptions) {
    super();
    this.storage = options?.storage || this.storage;
  }

  getVaultClass(type: string) {
    const VaultClass = WalletManager.Vaults.find((v) => v.type === type);

    if (!VaultClass) {
      throw new Error('Invalid vault type');
    }

    return VaultClass;
  }

  addressAlreadyExists(address: string): boolean {
    return !!this.state.accounts.find((account) => account.address === address);
  }

  async getAccounts(): Promise<Account[]> {
    return this.state.accounts;
  }

  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(options?: { vaultIndex: number; title?: string }) {
    // Make sure before add new vault state is fully loaded
    await this.loadState();
    // Get vault instance
    const vaultState = this.state.vaults[options?.vaultIndex || 0];

    if (!vaultState) {
      throw new Error('Vault not found');
    }

    const account = vaultState.vault.addAccount();

    if (this.addressAlreadyExists(account.address)) {
      throw new Error('Account already exists');
    }

    const accounts = this.state.accounts;
    this.state.accounts = accounts.concat({
      title: options?.title || `Account ${accounts.length}`,
      publicKey: account.publicKey,
      address: account.address,
    });

    // Save the accounts state
    await this.saveState();
  }

  /**
   * Serialize all vaults to store
   */
  serializeVaults(vaults: VaultsState) {
    return vaults.map(({ title, type, vault }) => ({
      title,
      type,
      data: vault.serialize(),
    }));
  }

  /**
   * Deserialize all vaults to state
   */
  async deserializeVaults(vaults: VaultsState) {
    return vaults.map(({ title, type, data: vaultConfig }) => {
      const VaultClass = this.getVaultClass(type);
      return {
        title,
        type,
        vault: new VaultClass(<VaultConfig>vaultConfig),
      };
    });
  }

  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    const data = await this.storage.getItem<string>(this.STORAGE_KEY);

    if (data) {
      const state = await decrypt<WalletManagerState>(this.#passphrase, <Keystore>JSON.parse(data));
      this.state = {
        ...state,
        vaults: await this.deserializeVaults(state.vaults),
      };
    }
  }

  /**
   * Encrypt and store WalletManager state on storage
   */
  async saveState() {
    const vaults = this.serializeVaults(this.state.vaults);
    const encryptedData = await encrypt(this.#passphrase, {
      ...this.state,
      vaults,
    });
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(encryptedData));
  }

  /**
   * Remove vault by index
   */
  async removeVault(index: number) {
    this.state.vaults.splice(index, 0);
    this.saveState();
  }

  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(vaultConfig: VaultConfig) {
    // Make sure before add new vault state is fully loaded
    this.loadState();
    // Check if vault is supported
    const Vault = this.getVaultClass(vaultConfig.type);
    // create Vault instance
    const vault = new Vault(vaultConfig);
    // Push vaults to state
    this.state.vaults.push({
      title: vaultConfig.title,
      type: vaultConfig.type,
      vault,
    });
    this.state.accounts = this.state.accounts.concat(
      vault.getAccounts().map<Account>((account, index) => ({
        title: `Account ${index}`,
        ...account,
      }))
    );

    // Emit update storage
    await this.saveState();
  }

  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  async lock() {
    await this.saveState();
    this.#passphrase = '';
    this.state.accounts = [];
    this.state.vaults = [];
    this.state.isLocked = true;
    this.emit('unlock', this.state);
  }

  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(passphrase: string) {
    this.#passphrase = passphrase;
    await this.loadState();
    this.state.isLocked = false;
    this.emit('unlock', this.state);
  }
}
