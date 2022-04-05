import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import { Wallet } from '@fuel-ts/wallet';

import FSStorage from './storages/fs-storage';
import MemoryStorage from './storages/memory-storage';
import { WalletManager } from './wallet-manager';
import WalletManagerSpec from './wallet-manager-spec';

describe('Wallet Manager', () => {
  it('Initiate lock', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);
    await walletManager.lock();

    expect(walletManager).toBeTruthy();
    expect(walletManager.isLocked).toBeTruthy();
    expect(walletManager.accounts).toEqual([]);
    expect(walletManager.passphrase).toBeFalsy();

    await walletManager.unlock(password);
    expect(walletManager.isLocked).toBeFalsy();
    expect(walletManager.passphrase).toBe(password);
    expect(walletManager.accounts).toEqual([]);
  });

  it('Create accounts from mnemonic', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);

    const vaultId = await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
    });

    await walletManager.addAccount(vaultId);
    await walletManager.addAccount(vaultId);
    await walletManager.addAccount(vaultId);
    await walletManager.addAccount(vaultId);
    await walletManager.addAccount(vaultId);
    await walletManager.addAccount(vaultId);

    const accounts = await walletManager.getAccounts();
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
    const vaultId = await walletManager.addVault({
      type: 'privateKey',
      secret: privateKey,
    });

    // Should create only a single account for this vault
    await walletManager.addAccount(vaultId);

    const accounts = await walletManager.getAccounts();
    expect(accounts[0].publicKey).toBe(wallet.publicKey);
    expect(accounts.length).toBe(1);
  });

  it('Test fs storage', async () => {
    const storage = new MemoryStorage();
    const walletManager = new WalletManager({
      storage,
    });
    const walletManagerFS = new WalletManager({
      storage,
    });
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);
    await walletManagerFS.unlock(password);

    const vaultId = await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
    });

    // Should create only a single account for this vault
    await walletManager.addAccount(vaultId);

    const accounts = await walletManager.getAccounts();
    const accountsFS = await walletManagerFS.getAccounts();

    expect(accounts[0].publicKey).toBe(accountsFS[0].publicKey);
    expect(accounts.length).toBe(accountsFS.length);
  });
});
