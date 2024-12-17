import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { hash } from '@fuel-ts/hasher';
import { toBytes } from '@fuel-ts/math';
import type { BytesLike } from '@fuel-ts/utils';
import { hexlify, concat, arrayify } from '@fuel-ts/utils';
import { secp256k1 } from '@noble/curves/secp256k1';

export class Signer {
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
    const privateKeyBytes = toBytes(privateKey, 32);

    this.privateKey = hexlify(privateKeyBytes);

    // Slice(1) removes the encoding scheme from the public key
    this.publicKey = hexlify(secp256k1.getPublicKey(privateKeyBytes, false).slice(1));
    this.compressedPublicKey = hexlify(secp256k1.getPublicKey(privateKeyBytes, true));
    this.address = Address.fromPublicKey(this.publicKey);
  }

  /**
   * Sign data using the Signer instance
   *
   * Signature is a 64 byte array of the concatenated r and s values with the compressed recoveryParam byte.
   * @ignore
   * [Read more](FuelLabs/fuel-specs/specs/protocol/cryptographic_primitives.md#public-key-cryptography)
   *
   * @param data - The data to be sign
   * @returns hashed signature
   */
  sign(data: BytesLike) {
    const signature = secp256k1.sign(arrayify(data), arrayify(this.privateKey));

    const r = toBytes(`0x${signature.r.toString(16)}`, 32);
    const s = toBytes(`0x${signature.s.toString(16)}`, 32);

    // add recoveryParam to first s byte
    s[0] |= (signature.recovery || 0) << 7;

    return hexlify(concat([r, s]));
  }

  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(point: BytesLike) {
    const p0 = secp256k1.ProjectivePoint.fromHex(arrayify(this.compressedPublicKey));
    const p1 = secp256k1.ProjectivePoint.fromHex(arrayify(point));
    const result = p0.add(p1);
    return `0x${result.toHex(true)}`;
  }

  /**
   * Recover the public key from a signature performed with [`sign`](#sign).
   *
   * @param data - Data
   * @param signature - hashed signature
   * @returns public key from signature from the
   */
  static recoverPublicKey(data: BytesLike, signature: BytesLike): string {
    const signedMessageBytes = arrayify(signature);
    const r = signedMessageBytes.slice(0, 32);
    const s = signedMessageBytes.slice(32, 64);
    const recoveryParam = (s[0] & 0x80) >> 7;

    // remove recoveryParam from s first byte
    s[0] &= 0x7f;

    const sig = new secp256k1.Signature(BigInt(hexlify(r)), BigInt(hexlify(s))).addRecoveryBit(
      recoveryParam
    );

    const publicKey = sig.recoverPublicKey(arrayify(data)).toRawBytes(false).slice(1);
    return hexlify(publicKey);
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
    const point = secp256k1.ProjectivePoint.fromHex(arrayify(publicKey));
    return hexlify(point.toRawBytes(false).slice(1));
  }
}
