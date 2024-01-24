import fs from 'fs';
import { FUEL_NETWORK_URL, Provider, Wallet } from 'fuels';

describe(__filename, () => {
  it('should successfully encrypt wallet', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    // #region encrypting-and-decrypting-json-wallets-1
    // #import { Wallet, fs };

    const wallet = Wallet.generate({
      provider,
    });

    const password = 'my-password';

    const jsonWallet = await wallet.encrypt(password);

    // #context fs.writeFileSync('secure-path/my-wallet.json', jsonWallet);
    // #endregion encrypting-and-decrypting-json-wallets-1

    expect(jsonWallet).toBeDefined();
  });

  it('should successfully decrypt a wallet', async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    const jsonWallet = await Wallet.generate({
      provider,
    }).encrypt('my-password');
    // #region encrypting-and-decrypting-json-wallets-2
    // #import { Wallet, fs };

    // #context const jsonWallet = fs.readFileSync('secure-path/my-wallet.json', 'utf-8');

    const password = 'my-password';

    const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password, provider);

    const myBalance = await decryptedWallet.getBalance();
    // #endregion encrypting-and-decrypting-json-wallets-2

    expect(myBalance).toBeDefined();
  });

  it('should validate that fs was imported on this file', () => {
    /**
     * This test exists only to validate that the fs import is present on this file.
     * This is required because the fs import is being used in code snippets declared
     * on within this file therefore its import will be extracted from this same file.
     */
    expect(fs).toBeDefined();
  });
});
