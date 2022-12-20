export { default as Mnemonic } from './mnemonic';
export type { MnemonicPhrase } from './utils';
import { readFileSync } from 'fs';
const words = readFileSync('./wordlist.txt', 'utf-8');
const wordslist = words.split(' '); 
export {wordslist};