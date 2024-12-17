import { randomBytes, pbkdf2, computeHmac } from '@fuel-ts/crypto';
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { sha256 } from '@fuel-ts/hasher';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify, concat, dataSlice, encodeBase58, toUtf8Bytes } from '@fuel-ts/utils';

import { english } from '../wordlists';

import type { MnemonicPhrase } from './utils';
import { entropyToMnemonicIndices, getWords, getPhrase, mnemonicWordsToEntropy } from './utils';

//
// Constants
//
// "Bitcoin seed"
const MasterSecret = toUtf8Bytes('Bitcoin seed');
// 4 byte: version bytes (mainnet: 0x0488B21E public, 0x0488ADE4 private; testnet: 0x043587CF public, 0x04358394 private)
const MainnetPRV = '0x0488ade4';
const TestnetPRV = '0x04358394';
export const MNEMONIC_SIZES = [12, 15, 18, 21, 24];

function assertWordList(wordlist: Array<string>) {
  if (wordlist.length !== 2048) {
    throw new FuelError(
      ErrorCode.INVALID_WORD_LIST,
      `Expected word list length of 2048, but got ${wordlist.length}.`
    );
  }
}

function assertEntropy(entropy: BytesLike) {
  if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
    throw new FuelError(
      ErrorCode.INVALID_ENTROPY,
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${entropy.length} bytes.`
    );
  }
}

function assertMnemonic(words: Array<string>) {
  if (!MNEMONIC_SIZES.includes(words.length)) {
    const errorMsg = `Invalid mnemonic size. Expected one of [${MNEMONIC_SIZES.join(
      ', '
    )}] words, but got ${words.length}.`;

    throw new FuelError(ErrorCode.INVALID_MNEMONIC, errorMsg);
  }
}

class Mnemonic {
  wordlist: Array<string>;

  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic instance
   */
  constructor(wordlist: Array<string> = english) {
    this.wordlist = wordlist;

    assertWordList(this.wordlist);
  }

  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns Entropy hash
   */
  mnemonicToEntropy(phrase: MnemonicPhrase) {
    return Mnemonic.mnemonicToEntropy(phrase, this.wordlist);
  }

  /**
   *
   * @param entropy - Entropy source to the mnemonic phrase.
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(entropy: BytesLike) {
    return Mnemonic.entropyToMnemonic(entropy, this.wordlist);
  }

  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase. The default value is the English list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(phrase: MnemonicPhrase, wordlist: Array<string> = english): string {
    const words = getWords(phrase);

    assertMnemonic(words);

    return hexlify(mnemonicWordsToEntropy(words, wordlist));
  }

  /**
   * @param entropy - Entropy source to the mnemonic phrase.
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static entropyToMnemonic(entropy: BytesLike, wordlist: Array<string> = english): string {
    const entropyBytes = arrayify(entropy);

    assertWordList(wordlist);
    assertEntropy(entropyBytes);

    return entropyToMnemonicIndices(entropyBytes)
      .map((i) => wordlist[i])
      .join(' ');
  }

  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToSeed(phrase: MnemonicPhrase, passphrase: BytesLike = '') {
    assertMnemonic(getWords(phrase));

    const phraseBytes = toUtf8Bytes(getPhrase(phrase));
    const salt = toUtf8Bytes(`mnemonic${passphrase}`);

    return pbkdf2(phraseBytes, salt, 2048, 64, 'sha512');
  }

  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security to protect the generated seed with a memorized passphrase. `Note: if the owner forgot the passphrase, all wallets and accounts derive from the phrase will be lost.`
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static mnemonicToMasterKeys(phrase: MnemonicPhrase, passphrase: BytesLike = '') {
    const seed = Mnemonic.mnemonicToSeed(phrase, passphrase);
    return Mnemonic.masterKeysFromSeed(seed);
  }

  /**
   * Validates if given mnemonic is  valid
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @returns true if phrase is a valid mnemonic
   */
  static isMnemonicValid(phrase: string) {
    const words = getWords(phrase);

    let i: number = 0;

    try {
      assertMnemonic(words);
    } catch {
      return false;
    }

    while (i < words.length) {
      if (Mnemonic.binarySearch(words[i]) === false) {
        return false;
      }
      i += 1;
    }

    return true;
  }

  static binarySearch(target: string): boolean {
    const words = english;
    let left: number = 0;
    let right: number = words.length - 1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);

      if (words[mid] === target) {
        return true;
      }
      if (target < words[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return false;
  }

  /**
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, the default value is true (`mainnet`).
   * @returns 64-byte array contains privateKey and chainCode as described on BIP39
   */
  static masterKeysFromSeed(seed: string): Uint8Array {
    const seedArray = arrayify(seed);

    if (seedArray.length < 16 || seedArray.length > 64) {
      throw new FuelError(
        ErrorCode.INVALID_SEED,
        `Seed length should be between 16 and 64 bytes, but received ${seedArray.length} bytes.`
      );
    }

    return arrayify(computeHmac('sha512', MasterSecret, seedArray));
  }

  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns BIP-32 extended private key
   */
  static seedToExtendedKey(seed: string, testnet: boolean = false): string {
    const masterKey = Mnemonic.masterKeysFromSeed(seed);
    const prefix = arrayify(testnet ? TestnetPRV : MainnetPRV);
    const depth = '0x00';
    const fingerprint = '0x00000000';
    const index = '0x00000000';
    // last 32 bites from the key
    const chainCode = masterKey.slice(32);
    // first 32 bites from the key
    const privateKey = masterKey.slice(0, 32);
    const extendedKey = concat([
      prefix,
      depth,
      fingerprint,
      index,
      chainCode,
      concat(['0x00', privateKey]),
    ]);
    const checksum = dataSlice(sha256(sha256(extendedKey)), 0, 4);

    return encodeBase58(concat([extendedKey, checksum]));
  }

  /**
   *  Create a new mnemonic using a randomly generated number as entropy.
   *  As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
   *  Therefore, the possible values for `strength` are 128, 160, 192, 224, and 256.
   *  If not provided, the default entropy length will be set to 256 bits.
   *  The return is a list of words that encodes the generated entropy.
   *
   *
   * @param size - Number of bytes used as an entropy
   * @param extraEntropy - Optional extra entropy to increase randomness
   * @returns A randomly generated mnemonic
   */
  static generate(size: number = 32, extraEntropy: BytesLike = '') {
    const entropy = extraEntropy
      ? sha256(concat([randomBytes(size), arrayify(extraEntropy)]))
      : randomBytes(size);
    return Mnemonic.entropyToMnemonic(entropy);
  }
}

export default Mnemonic;
