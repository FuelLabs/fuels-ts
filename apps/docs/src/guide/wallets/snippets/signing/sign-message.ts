// #region signing-1
import { hashMessage, Signer, WalletUnlocked } from 'fuels';

const wallet = WalletUnlocked.generate();

const message: string | Uint8Array = 'my-message';
const signedMessage = await wallet.signMessage(message);
// Example output: 0x277e1461cbb2e6a3250fa8c490221595efb3f4d66d43a4618d1013ca61ca56ba

const hashedMessage = hashMessage(message);
// Example output: 0x3e37d250232a44f20cab6f2cf8c13cb30ea5272328f3570333eaaab8c57a0a82

const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);
// Example output: Address {
//   b256Address: '0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f'
// }
// #endregion signing-1

console.log(
  'Recovered address should equal original wallet address',
  wallet.address.toB256() === recoveredAddress.toB256()
);

console.log(
  'Hashed message should be consistent',
  hashedMessage ===
    '0x3e37d250232a44f20cab6f2cf8c13cb30ea5272328f3570333eaaab8c57a0a82'
);

console.log(
  'Expect the recovered address to be the same as the original wallet address',
  wallet.address.toB256() === recoveredAddress.toB256()
);
