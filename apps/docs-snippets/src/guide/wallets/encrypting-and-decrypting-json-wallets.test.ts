import fs from 'fs';
import { Wallet } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

/**
 * @group node
 */
describe('Encrypting and decrypting JSON wallets', () => {
  it('should successfully encrypt wallet', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    // #region encrypting-and-decrypting-json-wallets-1
    // #import { Wallet, fs };

    const wallet = Wallet.generate({ provider });

    // Encrypt the wallet
    const password = 'my-password';
    const jsonWallet = await wallet.encrypt(password);

    // Save the encrypted wallet to a file
    // #context fs.writeFileSync('secure-path/my-wallet.json', jsonWallet);
    // #endregion encrypting-and-decrypting-json-wallets-1

    expect(jsonWallet).toBeDefined();
  });

  it('should successfully decrypt a wallet', async () => {
    using launched = await launchTestNode();
    const { provider } = launched;

    const jsonWallet = await Wallet.generate({
      provider,
    }).encrypt('my-password');
    // #region encrypting-and-decrypting-json-wallets-2
    // #import { Wallet, fs };

    // Load the encrypted wallet from a file
    // #context const jsonWallet = fs.readFileSync('secure-path/my-wallet.json', 'utf-8');

    // Decrypt the wallet
    const password = 'my-password';
    const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password, provider);

    // Use the decrypted wallet
    const myBalance = await decryptedWallet.getBalance();
    // #endregion encrypting-and-decrypting-json-wallets-2

    expect(myBalance).toBeDefined();
  }, 10000);

  it('should validate that fs was imported on this file', () => {
    /**
     * This test exists only to validate that the fs import is present on this file.
     * This is required because the fs import is being used in code snippets declared
     * on within this file therefore its import will be extracted from this same file.
     */
    expect(fs).toBeDefined();
  });
});
