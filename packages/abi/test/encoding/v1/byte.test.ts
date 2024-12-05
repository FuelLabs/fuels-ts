import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

describe('byte', () => {
  describe('encode', () => {
    it('should encode an array of numbers [1, 2, 3]', () => {
      const coder = AbiEncoding.v1.byte;
      const value = [1, 2, 3];
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode a Uint8Array [1, 2, 3]', () => {
      const coder = AbiEncoding.v1.byte;
      const value = new Uint8Array([1, 2, 3]);
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode a full word size [1, 2, 3, 4, 5, 6, 7, 8]', () => {
      const coder = AbiEncoding.v1.byte;
      const value = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8, 1, 2, 3, 4, 5, 6, 7, 8]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('decode', () => {
    it('should decode a byte array [1, 2, 3]', () => {
      const coder = AbiEncoding.v1.byte;
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
      const expected = new Uint8Array([1, 2, 3]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toEqual(11);
    });

    it('should throw when decoding an empty byte array', async () => {
      const coder = AbiEncoding.v1.byte;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid byte data - malformed bytes.', {
          data,
        })
      );
    });

    it('should throw when decoding a byte array with not enough data', async () => {
      const coder = AbiEncoding.v1.byte;
      const data = new Uint8Array([
        // Length = 0
        0, 0, 0, 0, 0, 0, 0, 3,
        // Data = [1, 2]
        1, 2,
      ]);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid byte data - malformed bytes.', {
          data,
        })
      );
    });
  });
});
