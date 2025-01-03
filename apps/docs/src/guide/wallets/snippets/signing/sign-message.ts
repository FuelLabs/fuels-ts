// #region signing-1
import { hashMessage, Provider, Signer, WalletUnlocked } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../../env';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = WalletUnlocked.generate({ provider });

const message = 'my-message';
const signedMessage = await wallet.signMessage(message);
// Example output: 0x277e1461cbb2e6a3250fa8c490221595efb3f4d66d43a4618d1013ca61ca56ba

const hashedMessage = hashMessage(message);
// Example output: 0x40436501b686546b7c660bb18791ac2ae35e77fbe2ac977fc061922b9ec83766

const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);
// Example output: Address {
//   b256Address: '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
// }
// #endregion signing-1

console.log(
  'Recovered address should equal original wallet address',
  wallet.address.toB256() === recoveredAddress.toB256()
);
