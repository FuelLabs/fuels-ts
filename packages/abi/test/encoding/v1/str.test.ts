import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('str', () => {
  describe('encode', () => {
    it('should encode an empty string [""]', () => {
      const coder = AbiEncoding.v1.str;
      const value = '';
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an empty string [hello world]', () => {
      const coder = AbiEncoding.v1.str;
      const value = 'hello world';
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 11, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
      ]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an empty string [H3llo W0rld]', () => {
      const coder = AbiEncoding.v1.str;
      const value = 'H3llo W0rld';
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 11, 72, 51, 108, 108, 111, 32, 87, 48, 114, 108, 100,
      ]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an empty string [abcdefghijklmnopqrstuvwxyz1234567890]', () => {
      const coder = AbiEncoding.v1.str;
      const value = 'abcdefghijklmnopqrstuvwxyz1234567890';
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 36, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
        111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 49, 50, 51, 52, 53, 54, 55, 56,
        57, 48,
      ]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode a rawSlice array [1, 2, 3]', () => {
      const coder = AbiEncoding.v1.str;
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 4, 102, 117, 101, 108]);
      const expected = 'fuel';

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toEqual(12);
    });

    it('throws when decoding a string with empty bytes', async () => {
      const coder = AbiEncoding.v1.str;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid str data - malformed bytes.')
      );
    });

    it('throws when decoding a string with empty byte data', async () => {
      const coder = AbiEncoding.v1.str;
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255, 1]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid str data - malformed bytes.')
      );
    });
  });
});
