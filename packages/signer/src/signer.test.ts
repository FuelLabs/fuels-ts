import { arrayify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import { Bech32 } from '@fuel-ts/bech32';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';

import Signer from './signer';

describe('Signer', () => {
  it('Initialize publicKey and address for new signer instance', async () => {
    const signer = new Signer(signMessageTest.privateKey);

    expect(signer.privateKey).toEqual(signMessageTest.privateKey);
    expect(signer.publicKey).toEqual(signMessageTest.publicKey);
    expect(signer.address).toEqual(signMessageTest.address);
    expect(Bech32.toB256(signer.address)).toEqual(signMessageTest.b256Address);
  });

  it('Initialize publicKey and address for new signer instance with byte array', async () => {
    const signer = new Signer(arrayify(signMessageTest.privateKey));

    expect(signer.privateKey).toEqual(signMessageTest.privateKey);
    expect(signer.publicKey).toEqual(signMessageTest.publicKey);
    expect(signer.address).toEqual(signMessageTest.address);
    expect(Bech32.toB256(signer.address)).toEqual(signMessageTest.b256Address);
  });

  it('Sign message', async () => {
    const signer = new Signer(signMessageTest.privateKey);
    const signedMessage = signer.sign(sha256(Buffer.from(signMessageTest.message)));

    expect(signedMessage).toEqual(signMessageTest.signedMessage);
  });

  it('Recover publicKey and address from signed message', async () => {
    const signer = new Signer(signMessageTest.privateKey);
    const hashedMessage = sha256(Buffer.from(signMessageTest.message));
    const signedMessage = signer.sign(hashedMessage);

    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(recoveredAddress).toEqual(signMessageTest.address);
    expect(Bech32.toB256(recoveredAddress)).toEqual(signMessageTest.b256Address);
  });

  it('Extend publicKey from compact publicKey', async () => {
    const signer = new Signer(signMessageTest.privateKey);

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });

  it('Always generate a 64 bytes long signature even when r has just 31 bytes', async () => {
    const signer = new Signer('0x28d82fea8f28106676d3fd1644e5a7994db48ab2a00258384379d12e281ced1f');
    signer.sign('0x50aa2e9f2c104d71a73cab8aa670ac0faf0630c07217a0823b691ec2eddfce74');

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });

  it('Always generate a 64 bytes long signature even when s has just 31 bytes', async () => {
    const signer = new Signer('0x28d82fea8f28106676d3fd1644e5a7994db48ab2a00258384379d12e281ced1f');
    signer.sign('0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298');

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });
});
