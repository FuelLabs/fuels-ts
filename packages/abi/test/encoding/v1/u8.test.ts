import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

describe('u8', () => {
  describe('encode', () => {
    it('should encode a u8 [min = 0]', () => {
      const coder = AbiEncoding.v1.u8;
      const expected = new Uint8Array([0]);
      const value = 0;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode a u8 [max = 255]', () => {
      const coder = AbiEncoding.v1.u8;
      const expected = new Uint8Array([255]);
      const value = 255;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should fail to encode value [-1]', async () => {
      const coder = AbiEncoding.v1.u8;
      const value = -1;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value - value is less than zero.', {
          value: '-1',
          type: 'u8',
        })
      );
    });

    it('should fail to encode value [256]', async () => {
      const coder = AbiEncoding.v1.u8;
      const value = 256;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value - value exceeds maximum.', {
          value: '256',
          type: 'u8',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a u8 [min]', () => {
      const coder = AbiEncoding.v1.u8;
      const expected = 0;
      const data = new Uint8Array([0]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(1);
    });

    it('should decode a u8 [max]', () => {
      const coder = AbiEncoding.v1.u8;
      const expected = 255;
      const data = new Uint8Array([255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(1);
    });

    it('should throw when decoding invalid u8 data [empty]', async () => {
      const coder = AbiEncoding.v1.u8;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u8 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u8',
          expectedLength: 1,
        })
      );
    });

    it('should throw when decoding invalid u8 data [empty with offset]', async () => {
      const coder = AbiEncoding.v1.u8;
      const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

      await expectToThrowFuelError(
        () => coder.decode(data, 8),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u8 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u8',
          expectedLength: 1,
        })
      );
    });
  });
});
