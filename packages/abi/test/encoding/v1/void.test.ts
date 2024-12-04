import { AbiEncoding } from '../../../src';

describe('void', () => {
  describe('encode', () => {
    it('should encode a void', () => {
      const coder = AbiEncoding.v1.void;
      const value = undefined;
      const expected = new Uint8Array([]);

      const actual = coder.encode(value);

      expect(actual).toEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode a void', () => {
      const coder = AbiEncoding.v1.void;
      const data = new Uint8Array([]);
      const expected = undefined;

      const [actual, offset] = coder.decode(data, 0);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(0);
    });
  });
});
