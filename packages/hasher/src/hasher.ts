import { keccak256 } from '@fuel-ts/crypto';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, concat, hexlify, toUtf8Bytes } from '@fuel-ts/utils';
import { sha256 as sha256AsBytes } from '@noble/hashes/sha256';

/**
 * The prefix for the message to be hashed
 */
const MESSAGE_PREFIX = '\x19Fuel Signed Message:\n';

/**
 * @param data - The data to be hashed
 * @returns A sha256 hash of the data in hex format
 */
export function sha256(data: BytesLike): string {
  return hexlify(sha256AsBytes(arrayify(data)));
}

/**
 * wrap sha256
 *
 * @param data - The data to be hash
 * @returns A sha256 hash of the data
 */
export function hash(data: BytesLike): string {
  return sha256(data);
}

/**
 * Convert a uint64 number to a big-endian byte array
 */
export function uint64ToBytesBE(value: number): Uint8Array {
  const bigIntValue = BigInt(value);
  const buffer = new ArrayBuffer(8);
  const dataView = new DataView(buffer);
  dataView.setBigUint64(0, bigIntValue, false); // write the uint64 value in big-endian order
  return new Uint8Array(dataView.buffer);
}

/**
 * Hashes a message using keccak256, based upon the [EIP-191](https://eips.ethereum.org/EIPS/eip-191) standard but for Fuel.
 *
 * The message is hashed using the following format:
 * ```console
 * 0x19 <0x46 (F)> <uel Signed Message:\n" + len(message)> <message>
 * ```
 *
 * @param message - The string message to be hashed
 * @returns A sha256 hash of the message
 */
export function hashMessage(message: BytesLike) {
  const messageBytes: Uint8Array = typeof message === 'string' ? toUtf8Bytes(message) : message;
  const payload = concat([
    toUtf8Bytes(MESSAGE_PREFIX),
    toUtf8Bytes(String(messageBytes.length)),
    messageBytes,
  ]);
  return hexlify(keccak256(payload));
}
