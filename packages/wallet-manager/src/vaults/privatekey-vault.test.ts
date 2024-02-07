import { Address } from '@fuel-ts/address';
import type { WalletUnlocked } from '@fuel-ts/wallet';
import { Wallet } from '@fuel-ts/wallet';

import { PrivateKeyVault } from './privatekey-vault';

/**
 * @group node
 * @group browser
 */
describe('PrivateKeyVault', () => {
  let walletSpec: WalletUnlocked;

  beforeAll(() => {
    walletSpec = Wallet.generate();
  });

  it('should get wallet instance', () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
    });

    vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getWallet(walletSpec.address).publicKey).toBe(walletSpec.publicKey);
  });

  it('should check if accounts have been added correctly', async () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
    });

    await vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
  });

  it('should serialize and recreate vault state', () => {
    const walletSpec2 = Wallet.generate({});
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

  it('should return new account on add account', () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
    });

    const account = vault.addAccount();
    const accounts = vault.getAccounts();

    expect(account.publicKey).toBe(accounts[1].publicKey);
  });

  it('should throw an error when trying to add an account with an invalid private key', () => {
    const vault = new PrivateKeyVault();
    const address = Address.fromRandom();

    expect(() => vault.getWallet(address)).toThrow(
      `No private key found for address '${address.toString()}'.`
    );
  });
});
