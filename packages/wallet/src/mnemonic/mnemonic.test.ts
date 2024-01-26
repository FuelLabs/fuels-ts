import { randomBytes } from '@fuel-ts/crypto';

import Mnemonic from './mnemonic';
import MnemonicSpec from './mnemonic-specs';

/**
 * @group node
 * @group browser
 */
describe('Mnemonic', () => {
  const mnemonic = new Mnemonic();

  test('Word list invalid should throw', () => {
    expect(() => new Mnemonic([])).toThrowError('Expected word list length of 2048, but got 0.');
  });

  test('Entropy invalid should throw', () => {
    const bytes5 = randomBytes(5);
    const bytes34 = randomBytes(34);
    expect(() => mnemonic.entropyToMnemonic(randomBytes(5))).toThrowError(
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${bytes5.length} bytes.`
    );
    expect(() => mnemonic.entropyToMnemonic(randomBytes(34))).toThrowError(
      `Entropy should be between 16 and 32 bytes and a multiple of 4, but got ${bytes34.length} bytes.`
    );
  });

  test('The same sentence in various UTF-8 forms', () => {
    // # The same sentence in various UTF-8 forms
    // Copy from https://github.com/trezor/python-mnemonic/blob/6b7ebdb3624bbcae1a7b3c5485427a5587795120/tests/test_mnemonic.py#L64
    const wordsNFKD =
      'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';
    const wordsNFC =
      'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
    const wordsNFKC =
      'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
    const wordsNFD =
      'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';
    const passphraseNFKD =
      'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';
    const passphraseNFC = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
    const passphraseNFKC = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
    const passphraseNFD =
      'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';

    const seedNFKD = Mnemonic.mnemonicToSeed(wordsNFKD, passphraseNFKD);
    const seedNFC = Mnemonic.mnemonicToSeed(wordsNFC, passphraseNFC);
    const seedNFKC = Mnemonic.mnemonicToSeed(wordsNFKC, passphraseNFKC);
    const seedNFD = Mnemonic.mnemonicToSeed(wordsNFD, passphraseNFD);

    expect(seedNFKD).toBe(seedNFC);
    expect(seedNFKD).toBe(seedNFKC);
    expect(seedNFKD).toBe(seedNFD);
  });

  test('Mnemonic invalid should throw', () => {
    const phrase = 'aaaaa bbbbb ccccc ddddd eeeee fffff ggggg hhhhh jjjjj kkkkk ooooo nnnnn';
    const [firstWord] = phrase.split(/\s/);
    expect(() =>
      mnemonic.mnemonicToEntropy(
        'aaaaa bbbbb ccccc ddddd eeeee fffff ggggg hhhhh jjjjj kkkkk ooooo nnnnn'
      )
    ).toThrowError(
      `Invalid mnemonic: the word '${firstWord}' is not found in the provided wordlist.`
    );
    expect(() =>
      mnemonic.mnemonicToEntropy(
        'letter advice cage absurd amount doctor acoustic avoid letter advice cage cage'
      )
    ).toThrowError('Checksum validation failed for the provided mnemonic.');
  });

  MnemonicSpec.forEach((spec) => {
    test(`Entropy to mnemonic: ${spec.entropy}`, () => {
      expect(mnemonic.entropyToMnemonic(spec.entropy)).toBe(spec.mnemonic);
    });
    test(`Mnemonic to entropy: ${spec.entropy}`, () => {
      expect(mnemonic.mnemonicToEntropy(spec.mnemonic)).toBe(spec.entropy);
    });
    test(`Mnemonic to seed with pass: ${spec.entropy}`, () => {
      expect(Mnemonic.mnemonicToSeed(spec.mnemonic, spec.passphrase)).toBe(spec.seed);
    });
    test(`Mnemonic to seed with pass: ${spec.entropy}`, () => {
      expect(Mnemonic.mnemonicToMasterKeys(spec.mnemonic, spec.passphrase));
    });
    test(`Extended key from seed: ${spec.entropy}`, () => {
      expect(Mnemonic.seedToExtendedKey(spec.seed)).toBe(spec.bip32_xprv);
    });
  });

  test('Generate mnemonic with 12, 15, 18, 21, 24 words', () => {
    [
      [16, 12],
      [20, 15],
      [24, 18],
      [28, 21],
      [32, 24],
    ].forEach(([entropySize, wordsLength]) => {
      const phrase = Mnemonic.generate(entropySize);
      expect(phrase.split(' ').length).toBe(wordsLength);
    });
  });

  test('Generate mnemonic default should return 24 words', () => {
    const phrase = Mnemonic.generate();
    expect(phrase.split(' ').length).toBe(24);
  });

  test('Generate mnemonic with extraEntropy', () => {
    const phrase = Mnemonic.generate(32, randomBytes(16));
    expect(phrase.split(' ').length).toBe(24);
  });

  test('Validate a 12 complete Mnemonic phrase', () => {
    const mnemonicphrase =
      'aware fringe excess tank asset quick suffer second cloth deliver file above';
    const validation = Mnemonic.isMnemonicValid(mnemonicphrase);
    expect(validation).toEqual(true);
  });
  test('Validate a 15 complete Mnemonic phrase', () => {
    const mnemonicphrase =
      'lucky buzz drink topic lunar proud warfare pass silver police chef liberty soap about process';
    const validation = Mnemonic.isMnemonicValid(mnemonicphrase);
    expect(validation).toEqual(true);
  });

  test('Validate a 18 complete Mnemonic phrase', () => {
    const mnemonicphrase =
      'aware fringe excess tank asset quick suffer second cloth deliver file above';
    const validation = Mnemonic.isMnemonicValid(mnemonicphrase);
    expect(validation).toEqual(true);
  });

  test('Validate a 21 complete Mnemonic phrase', () => {
    const mnemonicphrase =
      'movie fold other broccoli deliver bleak rookie record walnut coin decline blossom wheat thing silk group library absorb';
    const validation = Mnemonic.isMnemonicValid(mnemonicphrase);
    expect(validation).toEqual(true);
  });

  test('Validate a 24 complete Mnemonic phrase', () => {
    const mnemonicphrase =
      'trick modify monster anger volcano thrive jealous lens warm program milk flavor bike torch fish eye aspect cable loan little bachelor town office sound';
    const validation = Mnemonic.isMnemonicValid(mnemonicphrase);
    expect(validation).toEqual(true);
  });

  test('Validate incomplete phrase', () => {
    expect(Mnemonic.isMnemonicValid('Fuel Fuel')).toEqual(false);
  });
  test('Validate wrong words', () => {
    expect(
      Mnemonic.isMnemonicValid('Fuel Fuel Fuel Fuel Fuel Fuel Fuel Fuel Fuel Fuel Fuel Fuel')
    ).toEqual(false);
  });
});
