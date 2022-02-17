import { Base58 } from '@ethersproject/basex';
import type { BytesLike } from '@ethersproject/bytes';
import { hexDataSlice, concat, hexlify, arrayify } from '@ethersproject/bytes';
import { pbkdf2 } from '@ethersproject/pbkdf2';
import { computeHmac, sha256, SupportedAlgorithm } from '@ethersproject/sha2';
import { english } from '@fuel-ts/wordlists/words/english';
import { randomBytes } from 'crypto';

import type { MnemonicPhrase } from './utils';
import {
  entropyToMnemonicIndices,
  getWords,
  getPhrase,
  mnemonicWordsToEntropy,
  toUtf8Bytes,
} from './utils';

//
// Constants
//
// "Bitcoin seed"
const MasterSecret = toUtf8Bytes('Bitcoin seed');
// 4 byte: version bytes (mainnet: 0x0488B21E public, 0x0488ADE4 private; testnet: 0x043587CF public, 0x04358394 private)
const MainnetPRV = 0x0488ade4;
const TestnetPRV = 0x04358394;

function assertWordList(wordlist: Array<string>) {
  if (wordlist.length !== 2048) {
    throw new Error('Invalid word list length');
  }
}

function assertEntropy(entropy: BytesLike) {
  if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
    throw new Error('invalid entropy');
  }
}

function assertMnemonic(words: Array<string>) {
  if (![12, 15, 18, 21, 24].includes(words.length)) {
    throw new Error('invalid mnemonic size');
  }
}

class Mnemonic {
  wordlist: Array<string>;

  /**
   *
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase, the default value is the english list.
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
   * @param entropy - Random unit 8 bites array to source to mnemonic generation
   * @returns Mnemonic phrase
   */
  entropyToMnemonic(entropy: BytesLike) {
    return Mnemonic.entropyToMnemonic(entropy, this.wordlist);
  }

  /**
   *
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param wordlist - Provide a wordlist with the list of words used to generate the mnemonic phrase, the default value is the english list.
   * @returns Mnemonic phrase
   */
  static mnemonicToEntropy(phrase: MnemonicPhrase, wordlist: Array<string> = english): string {
    const words = getWords(phrase);

    assertMnemonic(words);

    return hexlify(mnemonicWordsToEntropy(words, wordlist));
  }

  /**
   * @param entropy - Random byte array to create to mnemonic generation
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64 byte array contain privateKey and chainCode as describe on BIP39
   */
  static entropyToMnemonic(entropy: BytesLike, wordlist: Array<string> = english): string {
    const entropyBytes = arrayify(entropy, {
      allowMissingPrefix: true,
    });

    assertWordList(wordlist);
    assertEntropy(entropyBytes);

    return entropyToMnemonicIndices(entropyBytes)
      .map((i) => wordlist[i])
      .join(' ');
  }

  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security factor to protecting the generate seed with memorized passphrase. `Note: if the passphrase is forgotten all funds will be lost forever.`
   * @returns 64 byte array contain privateKey and chainCode as describe on BIP39
   */
  static mnemonicToSeed(phrase: MnemonicPhrase, passphrase: BytesLike = '') {
    assertMnemonic(getWords(phrase));

    const phraseBytes = toUtf8Bytes(getPhrase(phrase));
    const salt = toUtf8Bytes(`mnemonic${passphrase}`);

    return pbkdf2(phraseBytes, salt, 2048, 64, 'sha512');
  }

  /**
   * @param phrase - Mnemonic phrase composed by words from the provided wordlist
   * @param passphrase - Add additional security factor to protecting the generate seed with memorized passphrase. `Note: if the passphrase is forgotten all funds will be lost forever.`
   * @returns 64 byte array contain privateKey and chainCode as describe on BIP39
   */
  static mnemonicToMasterKeys(phrase: MnemonicPhrase, passphrase: BytesLike = '') {
    const seed = Mnemonic.mnemonicToSeed(phrase, passphrase);
    return Mnemonic.masterKeysFromSeed(seed);
  }

  /**
   * @param seed - BIP39 Seed
   * @param testnet - Inform if should use testnet or mainnet prefix, default value is true (`mainnet`).
   * @returns 64 byte array contain privateKey and chainCode as describe on BIP39
   */
  static masterKeysFromSeed(seed: string): Uint8Array {
    const seedArray = arrayify(seed);

    if (seedArray.length !== 64) {
      throw new Error('invalid seed');
    }

    return arrayify(computeHmac(SupportedAlgorithm.sha512, MasterSecret, seedArray));
  }

  /**
   * Get the extendKey as defined on BIP-32 from the provided seed
   *
   * @param seed - BIP39 Seed
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
    const checksum = hexDataSlice(sha256(sha256(extendedKey)), 0, 4);

    return Base58.encode(concat([extendedKey, checksum]));
  }

  /**
   *  Create a new mnemonic using a random generated number as entropy.
   *  As defined in BIP39, the entropy must be a multiple of 32 bits, and its size must be between 128 and 256 bits.
   *  Therefore the possible values for `strength` are 128, 160, 192, 224 and 256.
   *  If not provided, the default entropy length will be set to 128 bits.
   *  The return is a list of words that encodes the generated entropy.
   *
   *
   * @param extraEntropy - Optional extra entropy to increase randomness
   * @param size - Number of bytes used as entropy
   * @returns A randomly generated mnemonic
   */
  static generate(extraEntropy: BytesLike = '', size: number = 32) {
    return Mnemonic.entropyToMnemonic(concat([arrayify(extraEntropy), randomBytes(size)]));
  }
}

export default Mnemonic;
