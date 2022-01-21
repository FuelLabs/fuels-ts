import { hashMessage, hash } from './hasher';
import testJSON from './wallet.test.json';

describe('Hasher', () => {
  it('Hash message', async () => {
    expect(hashMessage(testJSON.message)).toEqual(testJSON.hashedMessage);
  });

  it('Hash "20"', async () => {
    expect(hash(Buffer.from('20'))).toEqual(
      '0xf5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b'
    );
  });
});
