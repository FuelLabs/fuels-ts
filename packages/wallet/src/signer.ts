import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { ec as EC } from 'elliptic';

import { hash } from './hasher';

/**
 * Return elliptic instance with curve secp256k1
 */
function getCurve() {
  return new EC('secp256k1');
}

class Signer {
  readonly address: string;

  readonly publicKey: string;

  readonly privateKey: string;

  constructor(privateKey: BytesLike) {
    // A lot of common tools do not prefix private keys with a 0x
    if (typeof privateKey === 'string') {
      if (privateKey.match(/^[0-9a-f]*$/i) && privateKey.length === 64) {
        // eslint-disable-next-line no-param-reassign
        privateKey = `0x${privateKey}`;
      }
    }

    // Convert to byte array, normalize private key input allowing it to be BytesLike
    // like remove 0x prefix and accept array of bytes
    const privateKeyBytes = arrayify(privateKey);
    const keyPair = getCurve().keyFromPrivate(privateKeyBytes, 'hex');

    // @TODO: defineReadOnly these properties
    // Slice(1) removes the encoding scheme from the public key
    this.publicKey = hexlify(keyPair.getPublic(false, 'array').slice(1));
    this.privateKey = hexlify(privateKeyBytes);
    this.address = hash(this.publicKey);
  }

  sign(data: BytesLike) {
    const keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey), 'hex');
    const signature = keyPair.sign(arrayify(data));
    const r = signature.r.toArray();
    const s = signature.s.toArray();

    // add recoveryParam to first s byte
    s[0] |= (signature.recoveryParam || 0) << 7;

    return hexlify(concat([r, s]));
  }

  static recoverPublicKey(data: BytesLike, signature: BytesLike) {
    const signedMessageBytes = arrayify(signature);
    const r = signedMessageBytes.slice(0, 32);
    const s = signedMessageBytes.slice(32, 64);
    const recoveryParam = (s[0] & 0x80) >> 7;

    // remove recoveryParam from s first byte
    s[0] &= 0x7f;

    const publicKey = getCurve()
      .recoverPubKey(arrayify(data), { r, s }, recoveryParam)
      .encode('array', false)
      .slice(1);

    return publicKey;
  }

  static recoverAddress(data: BytesLike, signature: BytesLike) {
    return hash(Signer.recoverPublicKey(data, signature));
  }
}

export default Signer;
