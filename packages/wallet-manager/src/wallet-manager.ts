import type { AbstractAddress } from '@fuel-ts/interfaces';
import type { Keystore } from '@fuel-ts/keystore';
import { encrypt, decrypt } from '@fuel-ts/keystore';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { EventEmitter } from 'events';

import MemoryStorage from './storages/memory-storage';
import type {
  StorageAbstract,
  Account,
  VaultConfig,
  VaultsState,
  WalletManagerOptions,
  WalletManagerState,
  Vault,
} from './types';
import { MnemonicVault } from './vaults/mnemonic-vault';
import { PrivateKeyVault } from './vaults/privatekey-vault';

const ERROR_MESSAGES = {
  invalid_vault_type: 'Invalid VaultType',
  address_not_found: 'Address not found',
  vault_not_found: 'Vault not found',
  wallet_not_unlocked: 'Wallet is locked',
  passphrase_not_match: "Passphrase didn't match",
};

/**
 * Generic assert function to avoid undesirable errors
 */
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

/**
 * WalletManager is a upper package to manage multiple vaults like mnemonic and privateKeys.
 *
 * - VaultTypes can be add to `WalletManager.Vaults` enabling to add custom Vault types.
 * - Storage can be instantiate when initializing enabling custom storage types.
 */
export class WalletManager extends EventEmitter {
  /**
   * Vaults
   *
   * Vaults are responsible to store secret keys and return an `Wallet` instance,
   * to interact with the network.
   *
   * Each vault has access to its own state
   *
   */
  static Vaults = [MnemonicVault, PrivateKeyVault];
  /**
   * Storage
   *
   * Persistent encrypted data. `The default storage works only on memory`.
   */
  readonly storage: StorageAbstract = new MemoryStorage();
  /* Key name passed to the storage */
  readonly STORAGE_KEY: string = 'WalletManager';

  // `This variables are only accessible from inside the class`
  #vaults: VaultsState = [];
  #passphrase = '';
  #isLocked: boolean = true;

  constructor(options?: WalletManagerOptions) {
    super();
    this.storage = options?.storage || this.storage;
  }

  get isLocked(): boolean {
    return this.#isLocked;
  }

  /**
   * Return the vault serialized object containing all the privateKeys,
   * the format of the return depends on the Vault type.
   */
  exportVault<T extends Vault>(vaultId: number): ReturnType<T['serialize']> {
    assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);
    const vaultState = this.#vaults.find((_, idx) => idx === vaultId);
    assert(vaultState, ERROR_MESSAGES.vault_not_found);
    return vaultState.vault.serialize() as ReturnType<T['serialize']>;
  }

  /**
   * List all vaults on the Wallet Manager, this function not return secret's
   */
  getVaults(): Array<{ title?: string; type: string; vaultId: number }> {
    return this.#vaults.map((v, idx) => ({
      title: v.title,
      type: v.type,
      vaultId: idx,
    }));
  }

  /**
   * List all accounts on the Wallet Manager not vault information is revealed
   */
  getAccounts(): Array<Account> {
    // Return all accounts from vaults
    return this.#vaults.flatMap<Account>((vaultState, vaultId) =>
      vaultState.vault.getAccounts().map((account) => ({ ...account, vaultId }))
    );
  }

  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(address: AbstractAddress): WalletUnlocked {
    const vaultState = this.#vaults.find((vs) =>
      vs.vault.getAccounts().find((a) => a.address.equals(address))
    );
    assert(vaultState, ERROR_MESSAGES.address_not_found);

    return vaultState.vault.getWallet(address);
  }

  /**
   * Export specific account privateKey
   */
  exportPrivateKey(address: AbstractAddress) {
    assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);
    const vaultState = this.#vaults.find((vs) =>
      vs.vault.getAccounts().find((a) => a.address.equals(address))
    );
    assert(vaultState, ERROR_MESSAGES.address_not_found);

    return vaultState.vault.exportAccount(address);
  }

  /**
   * Add account to a selected vault or on the first vault as default.
   * If not vaults are adds it will return error
   */
  async addAccount(options?: { vaultId: number }) {
    // Make sure before add new vault state is fully loaded
    await this.loadState();
    // Get vault instance
    const vaultState = this.#vaults[options?.vaultId || 0];
    await assert(vaultState, ERROR_MESSAGES.vault_not_found);
    // Add account on vault
    vaultState.vault.addAccount();
    // Save the accounts state
    await this.saveState();
  }

  /**
   * Remove vault by index, by remove the vault you also remove all accounts
   * created by the vault.
   */
  async removeVault(index: number) {
    this.#vaults.splice(index, 1);
    await this.saveState();
  }

  /**
   * Add Vault, the `vaultConfig.type` will look for the Vaults supported if
   * didn't found it will throw.
   */
  async addVault(vaultConfig: VaultConfig) {
    // Make sure before add new vault state is fully loaded
    await this.loadState();
    // Check if vault is supported
    const Vault = this.getVaultClass(vaultConfig.type);
    // create Vault instance
    const vault = new Vault(vaultConfig);
    // Push vaults to state
    this.#vaults = this.#vaults.concat({
      title: vaultConfig.title,
      type: vaultConfig.type,
      vault,
    });
    // Persist data on storage
    await this.saveState();
  }

  /**
   * Lock wallet. It removes passphrase from class instance, encrypt and hide all address and
   * secrets.
   */
  async lock() {
    this.#isLocked = true;
    // Clean state vaults from state
    this.#vaults = [];
    // Clean password from state
    this.#passphrase = '';
    // Emit event that wallet is locked
    this.emit('lock');
  }

  /**
   * Unlock wallet. It sets passphrase on WalletManger instance load all address from configured vaults.
   * Vaults with secrets are not unlocked or instantiated on this moment.
   */
  async unlock(passphrase: string) {
    // Set password on state
    this.#passphrase = passphrase;
    // Set locked state to true
    this.#isLocked = false;
    // Load state
    await this.loadState();
    // Emit event that wallet is unlocked
    this.emit('unlock');
  }

  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);

    const data = await this.storage.getItem<string>(this.STORAGE_KEY);
    if (data) {
      const state = await decrypt<WalletManagerState>(this.#passphrase, <Keystore>JSON.parse(data));
      this.#vaults = this.#deserializeVaults(state.vaults);
    }
  }

  /**
   * Store encrypted WalletManager state on storage
   */
  private async saveState() {
    await assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);

    const encryptedData = await encrypt(this.#passphrase, {
      vaults: this.#serializeVaults(this.#vaults),
    });
    this.storage.setItem(this.STORAGE_KEY, JSON.stringify(encryptedData));
    this.emit('update');
  }

  /**
   * Serialize all vaults to store
   *
   * `This is only accessible from inside the class`
   */
  #serializeVaults(vaults: VaultsState) {
    return vaults.map(({ title, type, vault }) => ({
      title,
      type,
      data: vault.serialize(),
    }));
  }

  /**
   * Deserialize all vaults to state
   *
   * `This is only accessible from inside the class`
   */
  #deserializeVaults(vaults: VaultsState) {
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
   * Return a instantiable Class reference from `WalletManager.Vaults` supported list.
   */
  private getVaultClass(type: string) {
    const VaultClass = WalletManager.Vaults.find((v) => v.type === type);

    assert(VaultClass, ERROR_MESSAGES.invalid_vault_type);

    return VaultClass;
  }
}
