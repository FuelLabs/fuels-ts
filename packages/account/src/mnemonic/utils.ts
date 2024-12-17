import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { sha256 } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify } from '@fuel-ts/utils';

/* Mnemonic phrase composed by words from the provided wordlist it can be a text or a array of words */
export type MnemonicPhrase = string | Array<string>;

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
  const checksum = arrayify(sha256(entropy))[0] & getUpperMask(checksumBits);

  // Shift the checksum into the word indices
  indices[indices.length - 1] <<= checksumBits;
  indices[indices.length - 1] |= checksum >> (8 - checksumBits);

  return indices;
}

export function mnemonicWordsToEntropy(words: Array<string>, wordlist: Array<string>): BytesLike {
  const size = Math.ceil((11 * words.length) / 8);
  const entropy = arrayify(new Uint8Array(size));

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
  const checksum = arrayify(sha256(entropy.slice(0, entropyBits / 8)))[0] & checksumMask;

  if (checksum !== (entropy[entropy.length - 1] & checksumMask)) {
    throw new FuelError(
      ErrorCode.INVALID_CHECKSUM,
      'Checksum validation failed for the provided mnemonic.'
    );
  }

  return entropy.slice(0, entropyBits / 8);
}
