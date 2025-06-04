import { concat, hexlify, toUtf8Bytes } from '@fuel-ts/utils';

import type { HashableMessage } from '../types';

import { sha256 } from './sha256';

/**
 * The prefix for the message to be hashed
 */
const MESSAGE_PREFIX = '\x19Fuel Signed Message:\n';

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
