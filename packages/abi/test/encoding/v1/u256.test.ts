import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { AbiEncoding } from '../../../src';
import { toEqualBn } from '../../utils/vitest.matcher';

expect.extend({ toEqualBn });

/**
 * @group node
 * @group browser
 */
describe('u256', () => {
  describe('encode', () => {
    it('should encode a u256 [min = 0]', () => {
      const coder = AbiEncoding.v1.u256;
      const expected = new Uint8Array(32).fill(0);
      const value = 0;

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it(`should encode a u256 [max = 115792089237316195423570985008687907853269984665640564039457584007913129639935]`, () => {
      const coder = AbiEncoding.v1.u256;
      const expected = new Uint8Array(32).fill(255);
      const value =
        '115792089237316195423570985008687907853269984665640564039457584007913129639935';

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should fail to encode value [boolean]', async () => {
      const coder = AbiEncoding.v1.u256;
      const value = true;

      await expectToThrowFuelError(
        // @ts-expect-error: a boolean value boolean
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256 value - expected a BNInput.', {
          value,
        })
      );
    });

    it('should fail to encode value [not a BNInput]', async () => {
      const coder = AbiEncoding.v1.u256;
      const value = 'not a BNInput';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256 value - expected a BNInput.', {
          value,
        })
      );
    });

    it('should fail to encode value [min - 1 = -1]', async () => {
      const coder = AbiEncoding.v1.u256;
      const value = -1;

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid u256 value - value is less than zero.',
          {
            value: '-1',
            type: 'u256',
          }
        )
      );
    });

    it(`should fail to encode value [max + 1 = 115792089237316195423570985008687907853269984665640564039457584007913129639936]`, async () => {
      const coder = AbiEncoding.v1.u256;
      const value =
        '115792089237316195423570985008687907853269984665640564039457584007913129639936';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u256 value - value exceeds maximum.', {
          value: '115792089237316195423570985008687907853269984665640564039457584007913129639936',
          type: 'u256',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a u256 [min]', () => {
      const coder = AbiEncoding.v1.u256;
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = expect.toEqualBn(0);
      const data = new Uint8Array(32).fill(0);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(32);
    });

    it(`should decode a u256 [max = 115792089237316195423570985008687907853269984665640564039457584007913129639935]`, () => {
      const coder = AbiEncoding.v1.u256;
      // @ts-expect-error: Custom matcher 'toEqualBn'
      const expected = expect.toEqualBn(
        '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      );
      const data = new Uint8Array(32).fill(255);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(32);
    });

    it('should throw when decoding invalid u256 data [empty]', async () => {
      const coder = AbiEncoding.v1.u256;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u256 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u256',
          expectedLength: 32,
        })
      );
    });

    it('should throw when decoding invalid u256 data [empty with offset]', async () => {
      const coder = AbiEncoding.v1.u256;
      const data = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

      await expectToThrowFuelError(
        () => coder.decode(data, 8),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u256 data - unexpected length.', {
          data: new Uint8Array([]),
          type: 'u256',
          expectedLength: 32,
        })
      );
    });
  });
});
