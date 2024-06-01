import { Mnemonic } from '../mnemonic';

const wordsNFKD =
  'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';
const wordsNFC =
  'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
const wordsNFKC =
  'P\u0159\xed\u0161ern\u011b \u017elu\u0165ou\u010dk\xfd k\u016f\u0148 \xfap\u011bl \u010f\xe1belsk\xe9 \xf3dy z\xe1ke\u0159n\xfd u\u010de\u0148 b\u011b\u017e\xed pod\xe9l z\xf3ny \xfal\u016f';
const wordsNFD =
  'Pr\u030ci\u0301s\u030cerne\u030c z\u030clut\u030couc\u030cky\u0301 ku\u030an\u030c u\u0301pe\u030cl d\u030ca\u0301belske\u0301 o\u0301dy za\u0301ker\u030cny\u0301 uc\u030cen\u030c be\u030cz\u030ci\u0301 pode\u0301l zo\u0301ny u\u0301lu\u030a';
const passphraseNFKD = 'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';
const passphraseNFC = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
const passphraseNFKC = 'Neuv\u011b\u0159iteln\u011b bezpe\u010dn\xe9 hesl\xed\u010dko';
const passphraseNFD = 'Neuve\u030cr\u030citelne\u030c bezpec\u030cne\u0301 hesli\u0301c\u030cko';

export function runMnemonicToSeedTest() {
  Mnemonic.mnemonicToSeed(wordsNFKD, passphraseNFKD);
  Mnemonic.mnemonicToSeed(wordsNFC, passphraseNFC);
  Mnemonic.mnemonicToSeed(wordsNFKC, passphraseNFKC);
  Mnemonic.mnemonicToSeed(wordsNFD, passphraseNFD);
}
