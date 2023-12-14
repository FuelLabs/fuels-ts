import { hashMessage, hash } from './hasher';

describe('Hasher', () => {
  it('Hash message', () => {
    const message = 'my message';
    const hashedMessage = '0xea38e30f75767d7e6c21eba85b14016646a3b60ade426ca966dac940a5db1bab';
    expect(hashMessage(message)).toEqual(hashedMessage);
  });

  it('Hash "20"', () => {
    expect(hash(Buffer.from('20'))).toEqual(
      '0xf5ca38f748a1d6eaf726b8a42fb575c3c71f1864a8143301782de13da2d9202b'
    );
  });
});
