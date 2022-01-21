import { arrayify } from '@ethersproject/bytes';

import { hashMessage } from './hasher';
import Signer from './signer';
import testJSON from './wallet.test.json';

describe('Signer', () => {
  it('Initialize publicKey and address for new signer instance', async () => {
    const signer = new Signer(testJSON.privateKey);

    expect(signer.privateKey).toEqual(testJSON.privateKey);
    expect(signer.publicKey).toEqual(testJSON.publicKey);
    expect(signer.address).toEqual(testJSON.address);
  });

  it('Initialize publicKey and address for new signer instance with byte array', async () => {
    const signer = new Signer(arrayify(testJSON.privateKey));

    expect(signer.privateKey).toEqual(testJSON.privateKey);
    expect(signer.publicKey).toEqual(testJSON.publicKey);
    expect(signer.address).toEqual(testJSON.address);
  });

  it('Sign message', async () => {
    const signer = new Signer(testJSON.privateKey);
    const signedTransaction = signer.sign(hashMessage(testJSON.message));

    expect(signedTransaction).toEqual(testJSON.signedTransaction);
  });

  it('Recover publicKey and address from signed message', async () => {
    const signer = new Signer(testJSON.privateKey);
    const hashedMessage = hashMessage(testJSON.message);
    const signedTransaction = signer.sign(hashedMessage);

    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedTransaction);

    expect(recoveredAddress).toEqual(testJSON.address);
  });
});
