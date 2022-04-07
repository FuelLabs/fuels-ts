import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import { Wallet } from '@fuel-ts/wallet';

import MemoryStorage from './storages/memory-storage';
import { WalletManager } from './wallet-manager';
import WalletManagerSpec from './wallet-manager-spec';

describe('Wallet Manager', () => {
  it('Initiate lock', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.state.accounts).toEqual([]);

    await walletManager.unlock(password);
    expect(walletManager.isLocked).toBeFalsy();
    expect(walletManager.state.accounts).toEqual([]);

    await walletManager.lock();
    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.state.accounts).toEqual([]);

    await walletManager.unlock(password);
    expect(walletManager.state.accounts).toEqual([]);
  });

  it('Create accounts from mnemonic', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);

    // Add a vault of type mnemonic
    await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
    });

    // Add account m/44'/60'/0'/0/1
    await walletManager.addAccount();
    // Add account m/44'/60'/0'/0/2
    await walletManager.addAccount();
    // Add account m/44'/60'/0'/0/3
    await walletManager.addAccount();
    // Add account m/44'/60'/0'/0/4
    await walletManager.addAccount();
    // Add account m/44'/60'/0'/0/5
    await walletManager.addAccount();

    const accounts = walletManager.getAccounts();

    expect(accounts[0].publicKey).toBe(WalletManagerSpec.account_0.publicKey);
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
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const privateKey = hexlify(randomBytes(32));
    const wallet = new Wallet(privateKey);

    await walletManager.unlock(password);

    // Add a vault of type privateKey
    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
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
    });

    const accounts = walletManager.getAccounts();

    await walletManager2.unlock(password);
    const accounts2 = walletManager2.getAccounts();

    expect(accounts[0].publicKey).toBe(accounts2[0].publicKey);
    expect(accounts.length).toBe(accounts2.length);
  });

  it('Export privateKey from address from a privateKey vault', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';
    const privateKey = hexlify(randomBytes(32));
    const wallet = new Wallet(privateKey);

    await walletManager.unlock(password);

    // Add a vault of type privateKey
    await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
    });

    const privateKeyReturned = walletManager.exportPrivateKey(wallet.address);

    expect(privateKeyReturned).toBe(privateKey);
  });

  it('Export privateKey from address from a mnemonic vault', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);
    await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
    });
    const accounts = walletManager.getAccounts();

    const privateKeyReturned = walletManager.exportPrivateKey(accounts[0].address);

    expect(privateKeyReturned).toBe(WalletManagerSpec.account_0.privateKey);
  });
});
