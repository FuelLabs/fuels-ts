import { createHash } from 'crypto';

import { english } from './words/english';

const checksum = (wordLists: string[]) =>
  createHash('sha256')
    .update(Buffer.from(`${wordLists.join('\n')}\n`))
    .digest('hex');

describe('Checksum word lists', () => {
  test('Checksum english list', () => {
    expect(checksum(english)).toBe(
      '2f5eed53a4727b4bf8880d8f3f199efc90e58503646d9ff8eff3a2ed3b24dbda'
    );
  });
});
