import { Address } from '@fuel-ts/address';
import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import { Wallet } from '@fuel-ts/wallet';

import { PrivateKeyVault } from './privatekey-vault';

describe('PrivateKeyVault', () => {
  it('should get wallet instance', async () => {
    using provider = await setupTestProvider();
    const walletSpec = Wallet.generate({
      provider,
    });

    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getWallet(walletSpec.address).publicKey).toBe(walletSpec.publicKey);
  });

  it('should check if accounts have been added correctly', async () => {
    using provider = await setupTestProvider();
    const walletSpec = Wallet.generate({
      provider,
    });
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
  });

  it('should serialize and recreate vault state', async () => {
    using provider = await setupTestProvider();
    const walletSpec = Wallet.generate({
      provider,
    });
    const walletSpec2 = Wallet.generate({
      provider,
    });
    // Initialize with privateKeys to check if it will create correctly
    const vault = new PrivateKeyVault({
      accounts: [walletSpec.privateKey, walletSpec2.privateKey],
      provider,
    });

    const state = vault.serialize();
    const vaultFromState = new PrivateKeyVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(walletSpec2.publicKey);
  });

  it('should return new account on add account', async () => {
    using provider = await setupTestProvider();
    const walletSpec = Wallet.generate({
      provider,
    });
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    const account = vault.addAccount();
    const accounts = vault.getAccounts();

    expect(account.publicKey).toBe(accounts[1].publicKey);
  });

  it('should throw an error when trying to add an account with an invalid private key', async () => {
    using provider = await setupTestProvider();
    const vault = new PrivateKeyVault({
      provider,
    });
    const address = Address.fromRandom();

    expect(() => vault.getWallet(address)).toThrow(
      `No private key found for address '${address.toString()}'.`
    );
  });
});
