// #region signing-1
import { hashMessage, Provider, Signer, WalletUnlocked } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = new Provider(LOCAL_NETWORK_URL);

const wallet = WalletUnlocked.generate({ provider });

const message = 'my-message';
const signedMessage = await wallet.signMessage(message);
// Example output: 0x277e1461cbb2e6a3250fa8c490221595efb3f4d66d43a4618d1013ca61ca56ba

const hashedMessage = hashMessage(message);
// Example output: 0x40436501b686546b7c660bb18791ac2ae35e77fbe2ac977fc061922b9ec83766

const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);
// Example output: Address {
//   bech32Address: 'fuel1za0wl90u09c6v88faqkvczu9r927kewvvr0asejv5xmdwtm98w0st7m2s3'
// }
// #endregion signing-1

console.log(
  'Recovered address should equal original wallet address',
  wallet.address.toB256() === recoveredAddress.toB256()
);
