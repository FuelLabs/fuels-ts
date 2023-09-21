import { setupTestProvider } from '@fuel-ts/providers/test-utils';
import { Wallet } from 'fuels';

describe(__filename, () => {
  it('should successfully encrypt wallet', async () => {
    using provider = await setupTestProvider();
    // #region encrypting-and-decrypting-json-wallets-1
    // #context import fs from 'fs';
    // #context import { Wallet } from 'fuels';

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
    using provider = await setupTestProvider();
    const jsonWallet = await Wallet.generate({
      provider,
    }).encrypt('my-password');
    // #region encrypting-and-decrypting-json-wallets-2
    // #context import fs from 'fs';
    // #context import { Wallet } from 'fuels';

    // #context const jsonWallet = fs.readFileSync('secure-path/my-wallet.json', 'utf-8');

    const password = 'my-password';

    const decryptedWallet = await Wallet.fromEncryptedJson(jsonWallet, password, provider);

    const myBalance = await decryptedWallet.getBalance();
    // #endregion encrypting-and-decrypting-json-wallets-2

    expect(myBalance).toBeDefined();
  });
});
