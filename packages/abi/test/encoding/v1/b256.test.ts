import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

describe('b256', () => {
  describe('encode', () => {
    it('should encode a b256 [zero]', () => {
      const coder = AbiEncoding.v1.b256;
      const expected = new Uint8Array(32).fill(0);
      const value = '0x0000000000000000000000000000000000000000000000000000000000000000';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a b256 [address]`, () => {
      const coder = AbiEncoding.v1.b256;
      const expected = new Uint8Array([
        213, 87, 156, 70, 223, 204, 127, 24, 32, 112, 19, 230, 91, 68, 228, 203, 78, 44, 34, 152,
        244, 172, 69, 123, 168, 248, 39, 67, 243, 30, 147, 11,
      ]);
      const value = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw an error encoding a b256 [too short]', async () => {
      const coder = AbiEncoding.v1.b256;
      const value = '0xTooShort';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256 value - malformed hex value.', {
          value,
          expectedLength: 32,
        })
      );
    });

    it('should throw an error encoding a b256 [too long]', async () => {
      const coder = AbiEncoding.v1.b256;
      const value = `0x${'a'.repeat(33)}`;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256 value - malformed hex value.', {
          value,
          expectedLength: 32,
        })
      );
    });

    it('should throw an error encoding a b256 [not a hex string]', async () => {
      const coder = AbiEncoding.v1.b256;
      const value = 'not a hex string';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256 value - malformed hex value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode a b256 [zero]', () => {
      const coder = AbiEncoding.v1.b256;
      const expected = '0x0000000000000000000000000000000000000000000000000000000000000000';
      const data = new Uint8Array(32).fill(0);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(32);
    });

    it(`should decode a b256 [address]`, () => {
      const coder = AbiEncoding.v1.b256;
      const expected = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
      const data = new Uint8Array([
        213, 87, 156, 70, 223, 204, 127, 24, 32, 112, 19, 230, 91, 68, 228, 203, 78, 44, 34, 152,
        244, 172, 69, 123, 168, 248, 39, 67, 243, 30, 147, 11,
      ]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(32);
    });

    it('should throw an error decoding a b256 [too short]', async () => {
      const coder = AbiEncoding.v1.b256;
      const data = new Uint8Array(31);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 data - unexpected length.', {
          data,
          expectedLength: 32,
        })
      );
    });

    it('should throw an error decoding a b256 [empty]', async () => {
      const coder = AbiEncoding.v1.b256;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 data - unexpected length.', {
          data,
          expectedLength: 32,
        })
      );
    });

    it('should throw an error decoding a b256 [with offset]', async () => {
      const coder = AbiEncoding.v1.b256;
      const offset = 10;
      const data = new Uint8Array(32);

      await expectToThrowFuelError(
        () => coder.decode(data, offset),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 data - unexpected length.', {
          data: data.slice(offset),
          expectedLength: 32,
        })
      );
    });
  });
});
