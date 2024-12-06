import { WORD_SIZE } from '../..';
import { AbiEncoding } from '../AbiEncoding';

import { pad } from './pad-coder';

/**
 * @group node
 * @group browser
 */
describe('padded', () => {
  describe('encode', () => {
    it('should encode and pad to word size [u8]', () => {
      const coder = pad(AbiEncoding.v1.u8, WORD_SIZE);
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);
      const value = 255;

      const encoded = coder.encode(value);

      expect(encoded).toEqual(expected);
    });

    it('should encode and pad to word size [u16]', () => {
      const coder = pad(AbiEncoding.v1.u16, WORD_SIZE);
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);
      const value = 65535;

      const encoded = coder.encode(value);

      expect(encoded).toEqual(expected);
    });

    it('should encode and pad to word size [u32]', () => {
      const coder = pad(AbiEncoding.v1.u32, WORD_SIZE);
      const expected = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]);
      const value = 4294967295;

      const encoded = coder.encode(value);

      expect(encoded).toEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode and remove padding [u8]', () => {
      const coder = pad(AbiEncoding.v1.u8, WORD_SIZE);
      const expected = 255;
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);

      const [decoded, newOffset] = coder.decode(data, 0);

      expect(decoded).toEqual(expected);
      expect(newOffset).toEqual(WORD_SIZE);
    });

    it('should decode and remove padding [u16]', () => {
      const coder = pad(AbiEncoding.v1.u16, WORD_SIZE);
      const expected = 65535;
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);

      const [decoded, newOffset] = coder.decode(data, 0);

      expect(decoded).toEqual(expected);
      expect(newOffset).toEqual(WORD_SIZE);
    });

    it('should decode and remove padding [u32]', () => {
      const coder = pad(AbiEncoding.v1.u32, WORD_SIZE);
      const expected = 4294967295;
      const data = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]);

      const [decoded, newOffset] = coder.decode(data, 0);

      expect(decoded).toEqual(expected);
      expect(newOffset).toEqual(WORD_SIZE);
    });
  });
});
