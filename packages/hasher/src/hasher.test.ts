import { hashMessage, hash, uint64ToBytesBE, sha256 } from './hasher';

/**
 * @group node
 * @group browser
 */
describe('Hasher', () => {
  it('Hash "hello world"', () => {
    expect(sha256('hello world')).toEqual(
      '0xb94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9'
    );
  });

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

  it('Convert uint64 to bytes in big-endian order', () => {
    const value = 1234567890;
    const expectedBytes = new Uint8Array([0, 0, 0, 0, 73, 150, 2, 210]);
    expect(uint64ToBytesBE(value)).toEqual(expectedBytes);
  });
});
