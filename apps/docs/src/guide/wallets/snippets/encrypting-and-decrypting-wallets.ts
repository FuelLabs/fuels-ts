// #region encrypting-and-decrypting-json-wallets-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.generate({ provider });

// Encrypt the wallet
const password = 'my-password';
const jsonWallet = await wallet.encrypt(password);

// Save the encrypted wallet to a file
// e.g. const jsonWallet = fs.writeFileSync('secure-path/my-wallet.json', jsonWallet);
// #endregion encrypting-and-decrypting-json-wallets-1

console.log('jsonWallet', jsonWallet);

/**
 * @group node
 */
