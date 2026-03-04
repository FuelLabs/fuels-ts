import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, concat, hexlify, toUtf8Bytes } from '@fuel-ts/utils';
import { sha256 as sha256AsBytes } from '@noble/hashes/sha256';

/**
 * The prefix for the message to be hashed
 */
const MESSAGE_PREFIX = '\x19Fuel Signed Message:\n';

/**
 * - When a string is provided, we hash as a UTF-8 string using SHA-256.
 *
 * - When an object with `personalSign` property is provided, we hash using SHA-256 of the following format:
 * ```console
 * 0x19 <0x46 (F)> <uel Signed Message:\n" + len(message)> <message>
 * ```
 *
 * Following a similar approach to that of [EIP-191](https://eips.ethereum.org/EIPS/eip-191).
 */
export type HashableMessage = string | { personalSign: BytesLike };

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
 * Hashes a message using SHA256.
 *
 * - When a `message` string is provided, we hash as a UTF-8 string using SHA-256.
 *
 * - When a `message` object with `personalSign` property is provided, we hash using SHA-256 of the following format:
 * ```console
 * 0x19 <0x46 (F)> <uel Signed Message:\n" + len(message)> <message>
 * ```
 *
 * Following a similar approach to that of [EIP-191](https://eips.ethereum.org/EIPS/eip-191).
 *
 * @param message - The message to be hashed @see {@link HashableMessage}
 * @returns A sha256 hash of the message
 */
export function hashMessage(message: HashableMessage) {
  if (typeof message === 'string') {
    return sha256(toUtf8Bytes(message));
  }

  const { personalSign } = message;
  const messageBytes: Uint8Array =
    typeof personalSign === 'string' ? toUtf8Bytes(personalSign) : personalSign;
  const payload = concat([
    toUtf8Bytes(MESSAGE_PREFIX),
    toUtf8Bytes(String(messageBytes.length)),
    messageBytes,
  ]);
  return hexlify(sha256(payload));
}
