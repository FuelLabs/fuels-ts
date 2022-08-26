import type { BytesLike } from '@ethersproject/bytes';
import { concat, hexlify, arrayify } from '@ethersproject/bytes';
import { Address } from '@fuel-ts/address';
import { hash } from '@fuel-ts/hasher';
import { randomBytes } from '@fuel-ts/keystore';
import { toArray } from '@fuel-ts/math';
import { ec as EC } from 'elliptic';

/**
 * Return elliptic instance with curve secp256k1
 */
export function getCurve() {
  return new EC('secp256k1');
}

class Signer {
  readonly address: Address;

  readonly publicKey: string;

  readonly compressedPublicKey: string;

  readonly privateKey: string;

  /**
   * Create a Signer instance from a given private key
   *
   * @param privateKey - The private key to use for signing
   * @returns A new Signer instance
   */
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

    // Slice(1) removes the encoding scheme from the public key
    this.compressedPublicKey = hexlify(keyPair.getPublic(true, 'array'));
    this.publicKey = hexlify(keyPair.getPublic(false, 'array').slice(1));
    this.privateKey = hexlify(privateKeyBytes);
    this.address = Address.fromPublicKey(this.publicKey);
  }

  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte. [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(data: BytesLike) {
    const keyPair = getCurve().keyFromPrivate(arrayify(this.privateKey), 'hex');
    const signature = keyPair.sign(arrayify(data), {
      canonical: true,
    });
    const r = toArray(signature.r, 16);
    const s = toArray(signature.s, 16);

    // add recoveryParam to first s byte
    s[0] |= (signature.recoveryParam || 0) << 7;

    return hexlify(concat([r, s]));
  }

  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(point: BytesLike) {
    const p0 = getCurve().keyFromPublic(arrayify(this.compressedPublicKey));
    const p1 = getCurve().keyFromPublic(arrayify(point));
    const result = p0.getPublic().add(p1.getPublic());

    return hexlify(result.encode('array', true));
  }

  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
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

  /**
   * Recover the address from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - Signature
   * @returns Address from signature
   */
  static recoverAddress(data: BytesLike, signature: BytesLike): Address {
    return Address.fromPublicKey(Signer.recoverPublicKey(data, signature));
  }

  /**
   * Generate a random privateKey
   *
   * @param entropy - Adds extra entropy to generate the privateKey
   * @returns random 32-byte hashed
   */
  static generatePrivateKey(entropy?: BytesLike) {
    return entropy ? hash(concat([randomBytes(32), arrayify(entropy)])) : randomBytes(32);
  }

  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(publicKey: BytesLike) {
    const keyPair = getCurve().keyFromPublic(arrayify(publicKey));
    return hexlify(keyPair.getPublic(false, 'array').slice(1));
  }
}

export default Signer;
