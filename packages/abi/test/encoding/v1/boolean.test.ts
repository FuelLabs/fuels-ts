import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { encoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('boolean', () => {
  describe('encode', () => {
    it('should encode a boolean [true]', () => {
      const coder = encoding.v1.bool;
      const value = true;
      const expected = new Uint8Array([1]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode a boolean [false]', () => {
      const coder = encoding.v1.bool;
      const value = false;
      const expected = new Uint8Array([0]);

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding an invalid boolean value [undefined]', async () => {
      const coder = encoding.v1.bool;
      const value = undefined;

      await expectToThrowFuelError(
        // @ts-expect-error or expects a boolean value
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.', {
          value: undefined,
        })
      );
    });

    it('should throw when encoding an invalid boolean value [string value]', async () => {
      const coder = encoding.v1.bool;
      const value = 'true';

      await expectToThrowFuelError(
        // @ts-expect-error or expects a boolean value
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid boolean value.', { value: 'true' })
      );
    });
  });

  describe('decode', () => {
    it('should decode a boolean [1 = true]', () => {
      const coder = encoding.v1.bool;
      const value = new Uint8Array([1]);
      const expected = true;

      const [actual, offset] = coder.decode(value);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(value.length);
    });

    it('should decode a boolean [0 = false]', () => {
      const coder = encoding.v1.bool;
      const value = new Uint8Array([0]);
      const expected = false;

      const [actual, offset] = coder.decode(value);

      expect(actual).toStrictEqual(expected);
      expect(offset).toStrictEqual(value.length);
    });

    it('should throw when decoding an invalid boolean value [empty]', async () => {
      const coder = encoding.v1.bool;
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool data - not enough data.', {
          data,
          expectedLength: 1,
        })
      );
    });

    it('should throw when decoding an invalid boolean value [2]', async () => {
      const coder = encoding.v1.bool;
      const data = new Uint8Array([2]);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool value - invalid boolean value.', {
          data,
          type: 'bool',
          value: 2,
        })
      );
    });
  });
});
