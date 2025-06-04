import { bufferFromString } from '..';

import { sha256, hash } from './sha256';

/**
 * @group node
 * @group browser
 */
describe('sha256', () => {
  it('Hash "hello world"', () => {
    const bytes = bufferFromString('hello world', 'utf-8');
    expect(sha256(bytes)).toEqual(
      '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
    );
  });

  it('Hash "20"', () => {
    expect(hash(Buffer.from('20'))).toEqual(
      '0xf5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b'
    );
  });
});
