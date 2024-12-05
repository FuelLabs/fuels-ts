import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('b512', () => {
  describe('encode', () => {
    it('should encode a b512 [zero]', () => {
      const coder = AbiEncoding.v1.b512;
      const expected = new Uint8Array(64).fill(0);
      const value =
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a b512 [address]`, () => {
      const coder = AbiEncoding.v1.b512;
      const expected = new Uint8Array([
        142, 157, 218, 111, 119, 147, 116, 90, 197, 170, 207, 158, 144, 124, 174, 48, 178, 160, 31,
        223, 13, 35, 183, 117, 10, 133, 198, 164, 79, 202, 12, 41, 240, 144, 111, 157, 31, 30, 146,
        230, 161, 251, 60, 61, 206, 243, 204, 59, 60, 219, 170, 226, 126, 71, 185, 217, 164, 198,
        164, 252, 228, 207, 22, 178,
      ]);
      const value =
        '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw an error encoding a b512 [too short]', async () => {
      const coder = AbiEncoding.v1.b512;
      const value = '0xTooShort';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b512 value - malformed hex value.', {
          value,
          expectedLength: 64,
        })
      );
    });

    it('should throw an error encoding a b512 [too long]', async () => {
      const coder = AbiEncoding.v1.b512;
      const value = `0x${'a'.repeat(33)}`;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b512 value - malformed hex value.', {
          value,
          expectedLength: 64,
        })
      );
    });

    it('should throw an error encoding a b512 [not a hex string]', async () => {
      const coder = AbiEncoding.v1.b512;
      const value = 'not a hex string';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b512 value - malformed hex value.')
      );
    });
  });

  describe('decode', () => {
    it('should decode a b512 [zero]', () => {
      const coder = AbiEncoding.v1.b512;
      const expected =
        '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
      const data = new Uint8Array(64).fill(0);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(64);
    });

    it(`should decode a b512 [address]`, () => {
      const coder = AbiEncoding.v1.b512;
      const expected =
        '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';
      const data = new Uint8Array([
        142, 157, 218, 111, 119, 147, 116, 90, 197, 170, 207, 158, 144, 124, 174, 48, 178, 160, 31,
        223, 13, 35, 183, 117, 10, 133, 198, 164, 79, 202, 12, 41, 240, 144, 111, 157, 31, 30, 146,
        230, 161, 251, 60, 61, 206, 243, 204, 59, 60, 219, 170, 226, 126, 71, 185, 217, 164, 198,
        164, 252, 228, 207, 22, 178,
      ]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(64);
    });

    it('should throw an error decoding a b512 [too short]', async () => {
      const coder = AbiEncoding.v1.b512;
      const data = new Uint8Array(31);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 data - unexpected length.', {
          data,
          expectedLength: 64,
        })
      );
    });

    it('should throw an error decoding a b512 [empty]', async () => {
      const coder = AbiEncoding.v1.b512;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 data - unexpected length.', {
          data,
          expectedLength: 64,
        })
      );
    });

    it('should throw an error decoding a b512 [with offset]', async () => {
      const coder = AbiEncoding.v1.b512;
      const offset = 10;
      const data = new Uint8Array(64);

      await expectToThrowFuelError(
        () => coder.decode(data, offset),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b512 data - unexpected length.', {
          data: data.slice(offset),
          expectedLength: 64,
        })
      );
    });
  });
});
