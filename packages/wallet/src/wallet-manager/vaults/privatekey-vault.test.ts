import { Address } from '@fuel-ts/address';
import { Provider } from '@fuel-ts/providers';

import { FUEL_NETWORK_URL } from '../../configs';
import { Wallet } from '../../wallet';
import type { WalletUnlocked } from '../../wallets';

import { PrivateKeyVault } from './privatekey-vault';

/**
 * @group node
 * @group browser
 */
describe('PrivateKeyVault', () => {
  let provider: Provider;
  let walletSpec: WalletUnlocked;

  beforeAll(async () => {
    provider = await Provider.create(FUEL_NETWORK_URL);
    walletSpec = Wallet.generate({
      provider,
    });
  });

  it('should get wallet instance', () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getWallet(walletSpec.address).publicKey).toBe(walletSpec.publicKey);
  });

  it('should check if accounts have been added correctly', async () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    await vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletSpec.publicKey);
  });

  it('should serialize and recreate vault state', () => {
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

  it('should return new account on add account', () => {
    const vault = new PrivateKeyVault({
      secret: walletSpec.privateKey,
      provider,
    });

    const account = vault.addAccount();
    const accounts = vault.getAccounts();

    expect(account.publicKey).toBe(accounts[1].publicKey);
  });

  it('should throw an error when trying to add an account with an invalid private key', () => {
    const vault = new PrivateKeyVault({
      provider,
    });
    const address = Address.fromRandom();

    expect(() => vault.getWallet(address)).toThrow(
      `No private key found for address '${address.toString()}'.`
    );
  });
});
