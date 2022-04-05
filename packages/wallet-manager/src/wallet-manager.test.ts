import { hexlify } from '@ethersproject/bytes';
import { randomBytes } from '@ethersproject/random';
import { Wallet } from '@fuel-ts/wallet';

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
    expect(walletManager.state).toBe(WalletManager.initialState);
    expect(walletManager.passphrase).toBeFalsy();

    await walletManager.unlock(password);
    expect(walletManager.isLocked).toBeFalsy();
    expect(walletManager.passphrase).toBe(password);
    expect(walletManager.state).toBe(WalletManager.initialState);
  });

  it('Create accounts from mnemonic', async () => {
    const walletManager = new WalletManager();
    const password = '0b540281-f87b-49ca-be37-2264c7f260f7';

    await walletManager.unlock(password);

    const vaultId = await walletManager.addVault({
      type: 'mnemonic',
      secret: WalletManagerSpec.mnemonic,
    });

    walletManager.addAccount(vaultId);
    walletManager.addAccount(vaultId);
    walletManager.addAccount(vaultId);
    walletManager.addAccount(vaultId);
    walletManager.addAccount(vaultId);
    walletManager.addAccount(vaultId);

    const accounts = walletManager.getAccounts();
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
    walletManager.addAccount(vaultId);

    const accounts = walletManager.getAccounts();
    expect(accounts[0].publicKey).toBe(wallet.publicKey);
    expect(accounts.length).toBe(1);
  });
});
