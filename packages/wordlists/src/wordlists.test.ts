import { createHash } from 'crypto';

import { english } from './words/english';

const checksum = (wordlists: string[]) =>
  createHash('sha256')
    .update(Buffer.from(`${wordlists.join('\n')}\n`))
    .digest('hex');

/**
 * @group node
 */
describe('Checksum word lists', () => {
  test('Checksum english list', () => {
    expect(checksum(english)).toBe(
      '2f5eed53a4727b4bf8880d8f3f199efc90e58503646d9ff8eff3a2ed3b24dbda'
    );
  });
});
