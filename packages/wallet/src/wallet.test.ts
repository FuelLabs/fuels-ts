import { hashMessage } from './hasher';
import Signer from './signer';
import Wallet from './wallet';
import testJSON from './wallet.test.json';

describe('Wallet', () => {
  it('Instantiate a new wallet', async () => {
    const wallet = new Wallet(testJSON.privateKey);

    expect(wallet.publicKey).toEqual(testJSON.publicKey);
    expect(wallet.address).toEqual(testJSON.address);
  });

  it('Sign a message using wallet instance', async () => {
    const wallet = new Wallet(testJSON.privateKey);
    const signedMessage = wallet.signMessage(testJSON.message);
    const verifiedAddress = Signer.recoverAddress(hashMessage(testJSON.message), signedMessage);

    expect(verifiedAddress).toEqual(wallet.address);
    expect(signedMessage).toEqual(testJSON.signedTransaction);
  });
});
