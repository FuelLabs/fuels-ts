import { getWords } from './utils';

/**
 * @group node
 */
describe('mnemonic utils', () => {
  const words = ['a', 'b', 'c'];

  test('should get words from mnemonic string', () => {
    expect(getWords('a b c')).toStrictEqual(words);
  });

  test('should get words from mnemonic string (w/ multiple sequential blank spaces)', () => {
    expect(getWords('a   b     c')).toStrictEqual(words);
  });

  test('should get words from mnemonic array', () => {
    expect(getWords(words)).toStrictEqual(words);
  });
});
