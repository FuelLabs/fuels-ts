import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { encoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('u64', () => {
  describe('encode', () => {
    it('should encode a u64 [min = 0]', () => {
      const coder = encoding.v1.u64;
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
      const value = 0;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a u64 [max = 18446744073709551615]`, () => {
      const coder = encoding.v1.u64;
      const expected = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);
      const value = '18446744073709551615';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should fail to encode value [boolean]', async () => {
      const coder = encoding.v1.u64;
      const value = true;

      await expectToThrowFuelError(
        // @ts-expect-error: a boolean value boolean
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value - expected a BNInput.', {
          value,
        })
      );
    });

    it('should fail to encode value [not a BNInput]', async () => {
      const coder = encoding.v1.u64;
      const value = 'not a BNInput';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value - expected a BNInput.', {
          value,
        })
      );
    });

    it('should fail to encode value [min - 1 = -1]', async () => {
      const coder = encoding.v1.u64;
      const value = -1;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid u64 value - value is less than zero.',
          {
            value: '-1',
            type: 'u64',
          }
        )
      );
    });

    it(`should fail to encode value [max + 1 = 18446744073709551616]`, async () => {
      const coder = encoding.v1.u64;
      const value = '18446744073709551616';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value - value exceeds maximum.', {
          value: '18446744073709551616',
          type: 'u64',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a u64 [min]', () => {
      const coder = encoding.v1.u64;
      const expected = expect.toEqualBn(0);
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(8);
    });

    it(`should decode a u64 [max = 18446744073709551615]`, () => {
      const coder = encoding.v1.u64;
      const expected = expect.toEqualBn('18446744073709551615');
      const data = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(8);
    });

    it('should throw when decoding invalid u64 data [empty]', async () => {
      const coder = encoding.v1.u64;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u64 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u64',
          expectedLength: 8,
        })
      );
    });

    it('should throw when decoding invalid u64 data [empty with offset]', async () => {
      const coder = encoding.v1.u64;
      const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

      await expectToThrowFuelError(
        () => coder.decode(data, 8),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u64 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u64',
          expectedLength: 8,
        })
      );
    });
  });
});
