import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding, MAX_BYTES } from '../../../src';
import { U8_MAX } from '../../utils/constants';

describe('v1/array', () => {
  describe('encode', () => {
    it('should encode an array [u8, length = 0]', () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 0);
      const input: number[] = [];
      const expected = new Uint8Array([]);

      const actual = coder.encode(input);

      expect(actual).toEqual(expected);
    });

    it('should encode an array [u8, length = 4]', () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 4);
      const input = [0, 13, 37, 255];
      const expected = new Uint8Array(input);

      const actual = coder.encode(input);

      expect(actual).toEqual(expected);
    });

    it('should encode an array of enums [enum, length = 4]', () => {
      const coder = AbiEncoding.v1.array(
        AbiEncoding.v1.enum({ a: AbiEncoding.v1.u8, b: AbiEncoding.v1.bool }),
        4
      );
      const input = [{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }];
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 255,
      ]);

      const actual = coder.encode(input);

      expect(actual).toEqual(expected);
    });

    it('should throw when value to encode is not an array [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const input = { object: true };

      await expectToThrowFuelError(
        // @ts-expect-error - testing a non-array value
        () => coder.encode(input),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid array value - expected array value.', {
          value: input,
        })
      );
    });

    it('should throw when value to encode is not an array of the expected length [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const input = [1, 2, 3];

      await expectToThrowFuelError(
        () => coder.encode(input),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid array value - expected array of length 1.',
          { value: input, expectedLength: 1 }
        )
      );
    });

    it('should throw when value to encode is invalid [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const input = [256];

      await expectToThrowFuelError(
        () => coder.encode(input),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid array value - failed to encode field.',
          {
            value: input,
            paths: [
              {
                path: '[0]',
                type: 'u8',
                value: '256',
                error: 'Invalid u8 value - value exceeds maximum.',
              },
            ],
          }
        )
      );
    });
  });

  describe('decode', () => {
    it('should decode an array [u8, length = 0]', () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 0);
      const input = new Uint8Array([]);
      const expected: number[] = [];

      const [actual, offset] = coder.decode(input);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(0);
    });

    it('should decode an array [u8, length = 4]', () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 4);
      const input = new Uint8Array([0, 13, 37, 255]);
      const expected = [0, 13, 37, 255];

      const [actual, offset] = coder.decode(input);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(4);
    });

    it('should decode an array of enums [enum, length = 4]', () => {
      const coder = AbiEncoding.v1.array(
        AbiEncoding.v1.enum({ a: AbiEncoding.v1.u8, b: AbiEncoding.v1.bool }),
        4
      );
      const expected = [{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }];
      const data = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 255,
      ]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(36);
    });

    it('should throw when decoding too many bytes [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const data = new Uint8Array(MAX_BYTES + 1);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid array data - exceeds maximum bytes.', {
          data,
          length: data.length,
          maxLength: MAX_BYTES,
        })
      );
    });

    it('should throw when decoding empty bytes [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid array data - malformed data.', {
          data,
        })
      );
    });

    it('should throw when decoding too few bytes [u8, length = 1]', async () => {
      const coder = AbiEncoding.v1.array(AbiEncoding.v1.u8, 1);
      const data = new Uint8Array([]);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid array data - malformed data.', {
          data,
        })
      );
    });
  });
});
