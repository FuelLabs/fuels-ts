import { bufferFromString } from '@fuel-ts/crypto';

import { hashMessage, hash, uint64ToBytesBE, sha256 } from './hasher';

/**
 * @group node
 * @group browser
 */
describe('Hasher', () => {
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

  it('Convert uint64 to bytes in big-endian order', () => {
    const value = 1234567890;
    const expectedBytes = new Uint8Array([0, 0, 0, 0, 73, 150, 2, 210]);
    expect(uint64ToBytesBE(value)).toEqual(expectedBytes);
  });

  describe('hashMessage', () => {
    it('should hash a message', () => {
      const message: string = 'my message';
      const hashedMessage = '0x62dc5b013ddc95260779961cf8325430e3be1caa62a75d999c14a7d807d68b3a';
      expect(hashMessage(message)).toEqual(hashedMessage);
    });

    it('should hash arbitrary data', () => {
      const data: Uint8Array = new TextEncoder().encode('my message');
      const hashedMessage = '0x62dc5b013ddc95260779961cf8325430e3be1caa62a75d999c14a7d807d68b3a';
      expect(hashMessage(data)).toEqual(hashedMessage);
    });
  });
});
