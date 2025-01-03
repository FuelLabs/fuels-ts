import { sha256 } from '@fuel-ts/hasher';
import { arrayify } from '@fuel-ts/utils';

import { Signer } from './signer';

/**
 * @group node
 * @group browser
 */
describe('Signer', () => {
  const expectedPrivateKey = '0x5f70feeff1f229e4a95e1056e8b4d80d0b24b565674860cc213bdb07127ce1b1';
  const expectedPublicKey =
    '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
  const expectedAddress = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
  const expectedMessage = 'my message';
  const expectedB256Address = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';
  const expectedSignedMessage =
    '0x8eeb238db1adea4152644f1cd827b552dfa9ab3f4939718bb45ca476d167c6512a656f4d4c7356bfb9561b14448c230c6e7e4bd781df5ee9e5999faa6495163d';

  it('Initialize publicKey and address for new signer instance', () => {
    const signer = new Signer(expectedPrivateKey);

    expect(signer.privateKey).toEqual(expectedPrivateKey);
    expect(signer.publicKey).toEqual(expectedPublicKey);
    expect(signer.address.toAddress()).toEqual(expectedAddress);
    expect(signer.address.toB256()).toEqual(expectedB256Address);
  });

  it('Initialize publicKey and address for new signer instance with byte array', () => {
    const signer = new Signer(arrayify(expectedPrivateKey));

    expect(signer.privateKey).toEqual(expectedPrivateKey);
    expect(signer.publicKey).toEqual(expectedPublicKey);
    expect(signer.address.toAddress()).toEqual(expectedAddress);
    expect(signer.address.toB256()).toEqual(expectedB256Address);
  });

  it('Sign message', () => {
    const signer = new Signer(expectedPrivateKey);
    const signedMessage = signer.sign(sha256(Buffer.from(expectedMessage)));

    expect(signedMessage).toEqual(expectedSignedMessage);
  });

  it('Recover publicKey and address from signed message', () => {
    const signer = new Signer(expectedPrivateKey);
    const hashedMessage = sha256(Buffer.from(expectedMessage));
    const signedMessage = signer.sign(hashedMessage);

    const recoveredAddress = Signer.recoverAddress(hashedMessage, signedMessage);

    expect(recoveredAddress.toAddress()).toEqual(expectedAddress);
    expect(recoveredAddress.toB256()).toEqual(expectedB256Address);
  });

  it('Extend publicKey from compact publicKey', () => {
    const signer = new Signer(expectedPrivateKey);

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });

  it('Always generate a 64 bytes long signature even when r has just 31 bytes', () => {
    const signer = new Signer('0x28d82fea8f28106676d3fd1644e5a7994db48ab2a00258384379d12e281ced1f');
    signer.sign('0x50aa2e9f2c104d71a73cab8aa670ac0faf0630c07217a0823b691ec2eddfce74');

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });

  it('Always generate a 64 bytes long signature even when s has just 31 bytes', () => {
    const signer = new Signer('0x28d82fea8f28106676d3fd1644e5a7994db48ab2a00258384379d12e281ced1f');
    signer.sign('0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298');

    expect(signer.publicKey).toEqual(Signer.extendPublicKey(signer.compressedPublicKey));
  });
});
