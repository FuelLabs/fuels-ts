import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { getBytesCopy, sha256 } from 'ethers';
import type { BytesLike } from 'ethers';

/* Mnemonic phrase composed by words from the provided wordlist it can be a text or a array of words */
export type MnemonicPhrase = string | Array<string>;

/**
 * @throws {FuelError} {@link ErrorCode.INVALID_INPUT_PARAMETERS}
 * When the provided string is not a valid UTF-8 string.
 */
export function toUtf8Bytes(stri: string): Uint8Array {
  const str = stri.normalize('NFKD');

  const result = [];
  for (let i = 0; i < str.length; i += 1) {
    const c = str.charCodeAt(i);

    if (c < 0x80) {
      result.push(c);
    } else if (c < 0x800) {
      result.push((c >> 6) | 0xc0);
      result.push((c & 0x3f) | 0x80);
    } else if ((c & 0xfc00) === 0xd800) {
      i += 1;
      const c2 = str.charCodeAt(i);

      if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
        throw new FuelError(
          ErrorCode.INVALID_INPUT_PARAMETERS,
          'Invalid UTF-8 in the input string.'
        );
      }

      // Surrogate Pair
      const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
      result.push((pair >> 18) | 0xf0);
      result.push(((pair >> 12) & 0x3f) | 0x80);
      result.push(((pair >> 6) & 0x3f) | 0x80);
      result.push((pair & 0x3f) | 0x80);
    } else {
      result.push((c >> 12) | 0xe0);
      result.push(((c >> 6) & 0x3f) | 0x80);
      result.push((c & 0x3f) | 0x80);
    }
  }

  return Uint8Array.from(result);
}

// Returns a byte with the LSB bits set
function getLowerMask(bits: number): number {
  return (1 << bits) - 1;
}

// Returns a byte with the MSB bits set
function getUpperMask(bits: number): number {
  return ((1 << bits) - 1) << (8 - bits);
}

export function getWords(mnemonic: MnemonicPhrase): Array<string> {
  if (!Array.isArray(mnemonic)) {
    return mnemonic.split(/\s+/);
  }
  return mnemonic;
}

export function getPhrase(mnemonic: MnemonicPhrase): string {
  if (Array.isArray(mnemonic)) {
    return mnemonic.join(' ');
  }
  return mnemonic;
}

export function entropyToMnemonicIndices(entropy: Uint8Array): Array<number> {
  const indices: Array<number> = [0];

  let remainingBits = 11;
  for (let i = 0; i < entropy.length; i += 1) {
    if (remainingBits > 8) {
      indices[indices.length - 1] <<= 8;
      indices[indices.length - 1] |= entropy[i];

      remainingBits -= 8;
      // This byte will complete an 11-bit index
    } else {
      indices[indices.length - 1] <<= remainingBits;
      indices[indices.length - 1] |= entropy[i] >> (8 - remainingBits);

      // Start the next word
      indices.push(entropy[i] & getLowerMask(8 - remainingBits));

      remainingBits += 3;
    }
  }

  // Compute the checksum bits
  const checksumBits = entropy.length / 4;
  const checksum = getBytesCopy(sha256(entropy))[0] & getUpperMask(checksumBits);

  // Shift the checksum into the word indices
  indices[indices.length - 1] <<= checksumBits;
  indices[indices.length - 1] |= checksum >> (8 - checksumBits);

  return indices;
}

/**
 * @throws {FuelError} {@link ErrorCode.INVALID_CHECKSUM}
 * Checksum validation failed for the provided mnemonic.
 */
export function mnemonicWordsToEntropy(words: Array<string>, wordlist: Array<string>): BytesLike {
  const size = Math.ceil((11 * words.length) / 8);
  const entropy = getBytesCopy(new Uint8Array(size));

  let offset = 0;
  for (let i = 0; i < words.length; i += 1) {
    const index = wordlist.indexOf(words[i].normalize('NFKD'));
    if (index === -1) {
      throw new FuelError(
        ErrorCode.INVALID_MNEMONIC,
        `Invalid mnemonic: the word '${words[i]}' is not found in the provided wordlist.`
      );
    }

    for (let bit = 0; bit < 11; bit += 1) {
      if (index & (1 << (10 - bit))) {
        entropy[offset >> 3] |= 1 << (7 - (offset % 8));
      }
      offset += 1;
    }
  }
  const entropyBits = (32 * words.length) / 3;
  const checksumBits = words.length / 3;
  const checksumMask = getUpperMask(checksumBits);
  const checksum = getBytesCopy(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;

  if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
    throw new FuelError(
      ErrorCode.INVALID_CHECKSUM,
      'Checksum validation failed for the provided mnemonic.'
    );
  }

  return entropy.slice(0, entropyBits / 8);
}
