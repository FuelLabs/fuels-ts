import { hashMessage, Signer, WalletUnlocked } from 'fuels';

const wallet = WalletUnlocked.generate();

// #region signing-personal-message
const message: string | Uint8Array = Uint8Array.from([0x01, 0x02, 0x03]);
const signedMessage = await wallet.signMessage({ raw: message });
// Example output: 0x0ca4ca2a01003d076b4044e38a7ca2443640d5fb493c37e28c582e4f2b47ada7

const hashedMessage = hashMessage({ raw: message });
// Example output: 0x862e2d2c46b1b52fd65538c71f7ef209ee32f4647f939283b3dd2434cc5320c5
// #endregion signing-personal-message

const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

console.log(
  'Expect the recovered address to be the same as the original wallet address',
  wallet.address.toB256() === recoveredAddress.toB256()
);

console.log(
  'Hashed message should be consistent',
  hashedMessage ===
    '0x862e2d2c46b1b52fd65538c71f7ef209ee32f4647f939283b3dd2434cc5320c5'
);
