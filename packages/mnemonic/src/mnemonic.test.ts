import { randomBytes } from '@ethersproject/random';

import Mnemonic from './mnemonic';
import MnemonicSpec from './mnemonic.spec';

describe('Mnemonic', () => {
  const mnemonic = new Mnemonic();

  test('Word list invalid should throw', () => {
    expect(() => new Mnemonic([])).toThrowError('Invalid word list length');
  });

  test('Entropy invalid should throw', () => {
    expect(() => mnemonic.entropyToMnemonic(randomBytes(5))).toThrowError('invalid entropy');
    expect(() => mnemonic.entropyToMnemonic(randomBytes(34))).toThrowError('invalid entropy');
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
    expect(() =>
      mnemonic.mnemonicToEntropy(
        'aaaaa bbbbb ccccc ddddd eeeee fffff ggggg hhhhh jjjjj kkkkk ooooo nnnnn'
      )
    ).toThrowError('invalid mnemonic');
    expect(() =>
      mnemonic.mnemonicToEntropy(
        'letter advice cage absurd amount doctor acoustic avoid letter advice cage cage'
      )
    ).toThrowError('invalid checksum');
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
});
