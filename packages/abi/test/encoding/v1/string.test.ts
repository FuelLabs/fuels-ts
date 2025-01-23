import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { CoderFactoryParameters } from '../../../src';
import { encoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('string', () => {
  describe('fromAbi', () => {
    it('should throw when the array type is not valid', async () => {
      const factory = vi.fn();
      const swayType = 'invalid[123]';

      await expectToThrowFuelError(
        () => encoding.v1.string.factory({ type: { swayType } } as CoderFactoryParameters, factory),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'Unable to find string coder for the provided type "invalid[123]".',
          { swayType }
        )
      );
    });

    it('should get the coder for a valid array type', () => {
      const factory = vi.fn();
      const swayType = 'str[1]';

      const coder = encoding.v1.string.factory(
        { type: { swayType } } as CoderFactoryParameters,
        factory
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a string', () => {
      const coder = encoding.v1.string(4);
      const value = 'fuel';
      const expected = new Uint8Array([102, 117, 101, 108]);

      const actual = coder.encode(value);

      expect(actual).toEqual(expected);
    });

    it('should throw when encoding a string [mismatch length]', async () => {
      const coder = encoding.v1.string(2);
      const value = 'fuel';

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid string value - unexpected length.')
      );
    });
  });

  describe('decode', () => {
    it('should decode a string', () => {
      const coder = encoding.v1.string(4);
      const data = new Uint8Array([102, 117, 101, 108]);
      const expected = 'fuel';

      const [actual, offset] = coder.decode(data, 0);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(4);
    });

    it('should throw when decoding a string [too few bytes]', async () => {
      const coder = encoding.v1.string(4);
      const data = new Uint8Array([0, 0]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid string data - unexpected length.')
      );
    });

    it('should throw when decoding a string [too few bytes w/ offset]', async () => {
      const coder = encoding.v1.string(4);
      const offset = 10;
      const data = new Uint8Array([0, 0, 0, 0]);

      await expectToThrowFuelError(
        () => coder.decode(data, offset),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid string data - unexpected length.')
      );
    });
  });
});
