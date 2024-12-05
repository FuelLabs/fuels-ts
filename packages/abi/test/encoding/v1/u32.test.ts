import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('u32', () => {
  describe('encode', () => {
    it('should encode a u32 [min = 0]', () => {
      const coder = AbiEncoding.v1.u32;
      const expected = new Uint8Array([0, 0, 0, 0]);
      const value = 0;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a u32 [max = 4294967295]`, () => {
      const coder = AbiEncoding.v1.u32;
      const expected = new Uint8Array([255, 255, 255, 255]);
      const value = 4294967295;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should fail to encode value [min - 1 = -1]', async () => {
      const coder = AbiEncoding.v1.u32;
      const value = -1;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid u32 value - value is less than zero.',
          {
            value: '-1',
            type: 'u32',
          }
        )
      );
    });

    it(`should fail to encode value [max + 1 = 4294967296]`, async () => {
      const coder = AbiEncoding.v1.u32;
      const value = 4294967296;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u32 value - value exceeds maximum.', {
          value: '4294967296',
          type: 'u32',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a u32 [min]', () => {
      const coder = AbiEncoding.v1.u32;
      const expected = 0;
      const data = new Uint8Array([0, 0, 0, 0]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(4);
    });

    it(`should decode a u32 [max = 4294967295]`, () => {
      const coder = AbiEncoding.v1.u32;
      const expected = 4294967295;
      const data = new Uint8Array([255, 255, 255, 255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(4);
    });

    it('should throw when decoding invalid u32 data [empty]', async () => {
      const coder = AbiEncoding.v1.u32;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u32 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u32',
          expectedLength: 4,
        })
      );
    });

    it('should throw when decoding invalid u32 data [empty with offset]', async () => {
      const coder = AbiEncoding.v1.u32;
      const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

      await expectToThrowFuelError(
        () => coder.decode(data, 8),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u32 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u32',
          expectedLength: 4,
        })
      );
    });
  });
});
