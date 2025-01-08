import { Address } from '@fuel-ts/address';
import type { Keystore } from '@fuel-ts/crypto';
import { encrypt, decrypt } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { EventEmitter } from 'events';

import type { WalletUnlocked } from '../wallet';

import { MemoryStorage } from './storages/memory-storage';
import type {
  StorageAbstract,
  WalletManagerAccount,
  VaultConfig,
  VaultsState,
  WalletManagerOptions,
  WalletManagerState,
  Vault,
} from './types';
import { MnemonicVault } from './vaults/mnemonic-vault';
import { PrivateKeyVault } from './vaults/privatekey-vault';

const ERROR_MESSAGES = {
  invalid_vault_type: 'The provided Vault type is invalid.',
  address_not_found: 'No private key found for address the specified wallet address.',
  vault_not_found: 'The specified vault was not found.',
  wallet_not_unlocked: 'The wallet is currently locked.',
  passphrase_not_match: 'The provided passphrase did not match the expected value.',
};

/**
 * Generic assert function to avoid undesirable errors
 */
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new FuelError(ErrorCode.WALLET_MANAGER_ERROR, message);
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
  getAccounts(): Array<WalletManagerAccount> {
    // Return all WalletManagerAccounts from vaults
    return this.#vaults.flatMap<WalletManagerAccount>((vaultState, vaultId) =>
      vaultState.vault.getAccounts().map((account) => ({ ...account, vaultId }))
    );
  }

  /**
   * Create a Wallet instance for the specific account
   */
  getWallet(address: string | Address): WalletUnlocked {
    const ownerAddress = Address.fromAddressOrString(address);
    const vaultState = this.#vaults.find((vs) =>
      vs.vault.getAccounts().find((a) => a.address.equals(ownerAddress))
    );
    assert(vaultState, ERROR_MESSAGES.address_not_found);

    return vaultState.vault.getWallet(ownerAddress);
  }

  /**
   * Export specific account privateKey
   */
  exportPrivateKey(address: string | Address) {
    const ownerAddress = Address.fromAddressOrString(address);
    assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);
    const vaultState = this.#vaults.find((vs) =>
      vs.vault.getAccounts().find((a) => a.address.equals(ownerAddress))
    );
    assert(vaultState, ERROR_MESSAGES.address_not_found);

    return vaultState.vault.exportAccount(ownerAddress);
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
    const account = vaultState.vault.addAccount();
    // Save the accounts state
    await this.saveState();
    // Return account
    return account;
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
  lock() {
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
    // Set locked state to false
    this.#isLocked = false;
    // Try to load state with passphrase
    try {
      // Load state with passphrase
      await this.loadState();
      // Emit event that wallet is unlocked
      this.emit('unlock');
    } catch (err) {
      // If passphrase is wrong lock wallet
      await this.lock();
      // Forward error
      throw err;
    }
  }

  /**
   * Update WalletManager encryption passphrase
   */
  async updatePassphrase(oldpass: string, newpass: string) {
    const isLocked = this.#isLocked;
    // Unlock wallet to decrypt data
    await this.unlock(oldpass);
    // Set new password on state
    this.#passphrase = newpass;
    // Persist data on storage
    await this.saveState();
    // Load state with new password
    await this.loadState();
    // If wallet was locked, lock the wallet again
    if (isLocked) {
      await this.lock();
    }
  }

  /**
   * Retrieve and decrypt WalletManager state from storage
   */
  async loadState() {
    await assert(!this.#isLocked, ERROR_MESSAGES.wallet_not_unlocked);

    const data = await this.storage.getItem(this.STORAGE_KEY);
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
    await this.storage.setItem(this.STORAGE_KEY, JSON.stringify(encryptedData));
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
