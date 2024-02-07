import { Wallet } from '@fuel-ts/wallet';

import walletManagerSpec from '../wallet-manager-spec';

import { MnemonicVault } from './mnemonic-vault';

/**
 * @group node
 * @group browser
 */
describe('MnemonicVault', () => {
  it('Get wallet instance', () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });
    const wallet = Wallet.fromPrivateKey(walletManagerSpec.account_0.privateKey);

    vault.addAccount();

    expect(vault.getWallet(wallet.address.toString()).publicKey).toBe(
      walletManagerSpec.account_0.publicKey
    );
  });

  it('Check if accounts are been added correctly', async () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });

    await vault.addAccount();

    expect(vault.getAccounts().length).toBe(2);
    expect(vault.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_0.publicKey);
    expect(vault.getAccounts()[1].publicKey).toBe(walletManagerSpec.account_1.publicKey);
  });

  it('Serialize and recreate vault state', () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
    });
    // Add one account to check if it will reload correctly
    vault.addAccount();

    const state = vault.serialize();
    const vaultFromState = new MnemonicVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_0.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(walletManagerSpec.account_1.publicKey);
  });

  it('Derive custom path template', () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
      rootPath: `m/44'/1179993420'/2'/{}/0`,
    });

    // Add one account to check if it will reload correctly
    vault.addAccount();

    const state = vault.serialize();
    const vaultFromState = new MnemonicVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_2.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(
      walletManagerSpec.account_2_1_0.publicKey
    );
  });

  it('Derive child if rootPath is not a template', () => {
    const vault = new MnemonicVault({
      secret: walletManagerSpec.mnemonic,
      rootPath: `m/44'/1179993420'/2'/0`,
    });

    // Add one account to check if it will reload correctly
    vault.addAccount();

    const state = vault.serialize();
    const vaultFromState = new MnemonicVault(state);

    expect(vaultFromState.getAccounts().length).toBe(2);
    expect(vaultFromState.getAccounts()[0].publicKey).toBe(walletManagerSpec.account_2.publicKey);
    expect(vaultFromState.getAccounts()[1].publicKey).toBe(
      walletManagerSpec.account_2_0_1.publicKey
    );
  });
});
