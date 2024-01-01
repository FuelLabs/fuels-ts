import { Address } from '@fuel-ts/address';
import { randomBytes } from '@fuel-ts/crypto';
import { hash } from '@fuel-ts/hasher';
import { toBytes } from '@fuel-ts/math';
import { secp256k1 } from '@noble/curves/secp256k1';
// import { etc, sign, getPublicKey } from '@noble/secp256k1';
import * as elliptic from 'elliptic';
import type { BytesLike } from 'ethers';
import { hexlify, concat, getBytesCopy } from 'ethers';

// polyfill
// etc.hmacSha256Sync = (k, ...m) => hmac(sha256, k, etc.concatBytes(...m));

/* Importing `ec` like this to avoid the 'Requested module is a CommonJS module,
 * which may not support all module.exports as named exports' error
 * @see https://github.com/FuelLabs/fuels-ts/issues/841
 */
const { ec: EC } = elliptic;

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
    const privateKeyBytes = toBytes(privateKey, 32);
    const publicKey = secp256k1.getPublicKey(privateKeyBytes, false);
    const compressedPublicKey = secp256k1.getPublicKey(privateKeyBytes, true);

    // Slice(1) removes the encoding scheme from the public key
    this.compressedPublicKey = hexlify(compressedPublicKey);
    //  hexlify(Uint8Array.from(keyPair.getPublic(true, 'array')));
    this.publicKey = hexlify(publicKey.slice(1));
    //  hexlify(Uint8Array.from(keyPair.getPublic(false, 'array').slice(1)));
    this.privateKey = hexlify(privateKeyBytes);
    this.address = Address.fromPublicKey(this.publicKey);
  }

  private static bigintToBytes(num: bigint) {
    return Uint8Array.from(
      num
        .toString(2)
        .split('')
        .map((x) => parseInt(x, 10))
    );
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
    const signature = secp256k1.sign(getBytesCopy(data), getBytesCopy(this.privateKey));

    const r = toBytes(`0x${signature.r.toString(16)}`, 32);
    const s = toBytes(`0x${signature.s.toString(16)}`, 32);

    // add recoveryParam to first s byte
    s[0] |= (signature.recovery || 0) << 7;

    return concat([r, s]);
  }

  /**
   * Add point on the current elliptic curve
   *
   * @param point - Point to add on the curve
   * @returns compressed point on the curve
   */
  addPoint(point: BytesLike) {
    const p0 = secp256k1.ProjectivePoint.fromHex(getBytesCopy(this.compressedPublicKey));
    const p1 = secp256k1.ProjectivePoint.fromHex(getBytesCopy(point));
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
    const signedMessageBytes = getBytesCopy(signature);
    const r = signedMessageBytes.slice(0, 32);
    const s = signedMessageBytes.slice(32, 64);
    const recoveryParam = (s[0] & 0x80) >> 7;

    // remove recoveryParam from s first byte
    s[0] &= 0x7f;

    const sig = new secp256k1.Signature(BigInt(hexlify(r)), BigInt(hexlify(s))).addRecoveryBit(
      recoveryParam
    );

    const publicKey = sig.recoverPublicKey(getBytesCopy(data)).toRawBytes(false).slice(1);
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
    return entropy ? hash(concat([randomBytes(32), getBytesCopy(entropy)])) : randomBytes(32);
  }

  /**
   * Extended publicKey from a compact publicKey
   *
   * @param publicKey - Compact publicKey
   * @returns extended publicKey
   */
  static extendPublicKey(publicKey: BytesLike) {
    const point = secp256k1.ProjectivePoint.fromHex(getBytesCopy(publicKey));
    return point.toHex(false);
  }
}

export default Signer;
