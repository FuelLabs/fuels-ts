import { Wallet } from '@fuel-ts/wallet';

import { PrivateKeyVault } from './privatekey-vault';

describe('PrivateKeyVault', () => {
  const walletSpec = Wallet.generate();

  it('Get wallet instance', async () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
    });

    vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getWallet(walletSpec.address).publicKey).toBe(walletSpec.publicKey);
  });

  it('Check if accounts are been added correctly', async () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
    });

    await vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
  });

  it('Serialize and recreate vault state', async () => {
    const walletSpec2 = Wallet.generate();
    // Initialize with privateKeys to check if it will create correctly
    const vault = new PrivateKeyVault({
      accounts: [walletSpec.privateKey, walletSpec2.privateKey],
    });

    const state = vault.serialize();
    const vaultFromState = new PrivateKeyVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(walletSpec2.publicKey);
  });
});
