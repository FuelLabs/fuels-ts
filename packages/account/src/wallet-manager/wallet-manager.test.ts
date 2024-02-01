import { Address } from '@fuel-ts/address';
import { hashMessage } from '@fuel-ts/hasher';

import WalletManagerSpec from '../../test/fixtures/wallet-manager-spec';
import { FUEL_NETWORK_URL } from '../configs';
import { Provider } from '../providers';
import { Signer } from '../signer';
import { Wallet } from '../wallet';

import MemoryStorage from './storages/memory-storage';
import type { VaultConfig } from './types';
import { WalletManager } from './wallet-manager';

/**
 * @group node
 */
describe('Wallet Manager', () => {
  let provider: Provider;

  beforeEach(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
  });

  const setupWallet = async (config: VaultConfig) => {
    // #region wallet-manager-mnemonic
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);

    // Add a vault of type mnemonic
    await walletManager.addVault(config);

    // #endregion wallet-manager-mnemonic

    return {
      walletManager,
      password,
    };
  };

  it('Test lock and unlock wallet', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    await walletManager.lock();

    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.getAccounts()).toEqual([]);

    await walletManager.unlock(password);
    expect(walletManager.isLocked).toBeFalsy();
    expect(walletManager.getAccounts().length).toEqual(1);

    await walletManager.lock();
    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.getAccounts()).toEqual([]);

    await walletManager.unlock(password);
    expect(walletManager.getAccounts().length).toEqual(1);
  });

  it('Create accounts from mnemonic', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    // Add account m/44'/1179993420'/0'/0/1
    await walletManager.addAccount();
    // Add account m/44'/1179993420'/0'/0/2
    await walletManager.addAccount();
    // Add account m/44'/1179993420'/0'/0/3
    await walletManager.addAccount();
    // Add account m/44'/1179993420'/0'/0/4
    await walletManager.addAccount();
    // Add account m/44'/1179993420'/0'/0/5
    await walletManager.addAccount();

    const accounts = walletManager.getAccounts();
    // Match account m/44'/1179993420'/0'/0/0
    expect(accounts[0].publicKey).toBe(WalletManagerSpec.account_0.publicKey);
    // Match account m/44'/1179993420'/0'/0/5
    expect(accounts[5].publicKey).toBe(WalletManagerSpec.account_5.publicKey);
    expect(accounts.length).toBe(6);

    // Make sure data is loaded from storage correctly
    await walletManager.lock();
    await walletManager.unlock(password);
    expect(accounts[0].publicKey).toBe(WalletManagerSpec.account_0.publicKey);
    expect(accounts[5].publicKey).toBe(WalletManagerSpec.account_5.publicKey);
    expect(accounts.length).toBe(6);
  });

  it('Create account with privateKey', async () => {
    const wallet = Wallet.generate({
      provider,
    });
    const { walletManager } = await setupWallet({
      type: 'privateKey',
      secret: wallet.privateKey,
      provider,
    });

    const accounts = walletManager.getAccounts();
    expect(accounts[0].publicKey).toBe(wallet.publicKey);
    expect(accounts.length).toBe(1);
  });

  it('Test shared storage storage', async () => {
    const storage = new MemoryStorage();
    const walletManager = new WalletManager({
      storage,
    });
    const walletManager2 = new WalletManager({
      storage,
    });
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);
    await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    const accounts = walletManager.getAccounts();

    await walletManager2.unlock(password);
    const accounts2 = walletManager2.getAccounts();

    expect(accounts[0].publicKey).toBe(accounts2[0].publicKey);
    expect(accounts.length).toBe(accounts2.length);
  });

  it('Export privateKey from address from a privateKey vault', async () => {
    // #region wallet-manager-create
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const wallet = Wallet.generate({
      provider,
    });

    await walletManager.unlock(password);
    // #endregion wallet-manager-create

    // Add a vault of type privateKey
    await walletManager.addVault({
      type: 'privateKey',
      secret: wallet.privateKey,
      provider,
    });

    const privateKeyReturned = walletManager.exportPrivateKey(wallet.address);

    expect(privateKeyReturned).toBe(wallet.privateKey);
  });

  it('Return account when adding account to vault', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);

    await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    const account = await walletManager.addAccount();
    const accounts = await walletManager.getAccounts();

    expect(account.publicKey).toBe(accounts[1].publicKey);
  });

  it('Export privateKey from address from a mnemonic vault', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    const accounts = walletManager.getAccounts();

    const privateKeyReturned = walletManager.exportPrivateKey(accounts[0].address);

    expect(privateKeyReturned).toBe(WalletManagerSpec.account_0.privateKey);
  });

  it('Export privateKey from address from a mnemonic vault', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    await walletManager.removeVault(0);
    const vaults = walletManager.getVaults();
    const accounts = walletManager.getAccounts();

    expect(vaults.length).toBe(0);
    expect(accounts.length).toBe(0);
  });

  it('Test wallet multiple vaults', async () => {
    const wallet = Wallet.generate({
      provider,
    });
    // Setup wallet with MnemonicVault
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    // Add PrivateKeyVault to the Wallet
    await walletManager.addVault({
      type: 'privateKey',
      secret: wallet.privateKey,
      provider,
    });
    // Accounts
    const accounts = walletManager.getAccounts();

    await walletManager.addAccount({
      vaultId: 0,
    });
    await walletManager.addAccount({
      vaultId: 1,
    });

    expect(accounts[0].publicKey).toBe(WalletManagerSpec.account_0.publicKey);
    expect(accounts[0].vaultId).toBe(0);
    expect(accounts[1].publicKey).toBe(wallet.publicKey);
    expect(accounts[1].vaultId).toBe(1);
  });

  it('Test asserts on method calls', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    const addMnemonic = async () => {
      await walletManager.addVault({
        type: 'mnemonic',
        secret: WalletManagerSpec.mnemonic,
        provider,
      });
    };

    // Test if methods only work if wallet is unlocked
    const lockedErrMsg = 'The wallet is currently locked.';
    await expect(addMnemonic()).rejects.toThrow(lockedErrMsg);
    await expect(walletManager.loadState()).rejects.toThrow(lockedErrMsg);
    expect(() => walletManager.exportPrivateKey(Address.fromRandom())).toThrow(lockedErrMsg);
    // Unlock wallet and add a vault
    await walletManager.unlock(password);
    await addMnemonic();
    // Test methods that should not find an address
    const address = Address.fromRandom();
    const addressErrMsg = 'No private key found for address the specified wallet address.';

    expect(() => walletManager.getWallet(address)).toThrow(addressErrMsg);
    expect(() => walletManager.exportPrivateKey(address)).toThrow(addressErrMsg);
    // Test methods that should throw id not found vault or vaultType
    await expect(
      walletManager.addVault({
        type: 'foobar',
        provider,
      })
    ).rejects.toThrow('The provided Vault type is invalid.');
    await expect(
      walletManager.addAccount({
        vaultId: 1,
      })
    ).rejects.toThrow('The specified vault was not found.');
  });

  it('Test if vault secret can be leaked', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    expect(JSON.stringify(walletManager)).not.toContain(WalletManagerSpec.mnemonic);
    expect(JSON.stringify(walletManager.getVaults())).not.toContain(WalletManagerSpec.mnemonic);
  });

  it('Create vault with custom name', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      title: 'My Custom Vault Name',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });

    const vaults = walletManager.getVaults();

    expect(vaults[0]).toEqual({
      title: 'My Custom Vault Name',
      type: 'mnemonic',
      vaultId: 0,
    });
    expect(vaults.length).toBe(1);
  });

  it('Get Wallet instance from address', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    const accounts = walletManager.getAccounts();
    // Get Wallet instance
    const wallet = walletManager.getWallet(accounts[0].address);
    // Sign message
    const signedMessage = await wallet.signMessage('hello');
    // Verify signedMessage is the same from account 0
    const address = Signer.recoverAddress(hashMessage('hello'), signedMessage);
    expect(address).toEqual(accounts[0].address);
  });

  it('Test WalletManager events', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    // Create object with methods to be able to
    // use vi.spyOn
    const listeners = {
      onLock: () => {},
      onUnlock: () => {},
      onUpdate: () => {},
    };

    const apyLock = vi.spyOn(listeners, 'onLock');
    const spyUnlock = vi.spyOn(listeners, 'onUnlock');
    const spyUpdate = vi.spyOn(listeners, 'onUpdate');

    walletManager.on('update', listeners.onUpdate);
    walletManager.on('lock', listeners.onLock);
    await walletManager.lock();
    expect(apyLock).toHaveBeenCalled();

    walletManager.on('unlock', listeners.onUnlock);
    await walletManager.unlock(password);
    expect(spyUnlock).toHaveBeenCalled();

    await walletManager.addAccount();
    await walletManager.removeVault(1);
    expect(spyUpdate.mock.calls.length).toEqual(2);
  });

  it('Export mnemonic from vault', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    await walletManager.unlock(password);

    const mnemonic = walletManager.exportVault(0).secret;
    expect(mnemonic).toEqual(WalletManagerSpec.mnemonic);

    expect(() => {
      walletManager.exportVault(1);
    }).toThrow();
  });

  it('Update manager passphrase', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    const newPassword = 'newpass';

    await walletManager.unlock(password);
    const mnemonic = walletManager.exportVault(0).secret;
    expect(mnemonic).toEqual(WalletManagerSpec.mnemonic);
    await walletManager.updatePassphrase(password, newPassword);
    await walletManager.unlock(newPassword);
    const mnemonicPass2 = walletManager.exportVault(0).secret;
    expect(mnemonicPass2).toEqual(WalletManagerSpec.mnemonic);
  });

  it('Update manager passphrase locked wallet', async () => {
    const { walletManager, password } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    const newPassword = 'newpass';

    await walletManager.lock();
    expect(walletManager.isLocked).toBeTruthy();
    await walletManager.updatePassphrase(password, newPassword);
    expect(walletManager.isLocked).toBeTruthy();
    await walletManager.unlock(newPassword);
    expect(walletManager.isLocked).toBeFalsy();
  });

  it('Wrong password should keep wallet state locked', async () => {
    const { walletManager } = await setupWallet({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
      provider,
    });
    await walletManager.lock();
    await expect(walletManager.unlock('wrongpass')).rejects.toThrowError('Invalid credentials');
    expect(walletManager.isLocked).toBeTruthy();
  });
});
