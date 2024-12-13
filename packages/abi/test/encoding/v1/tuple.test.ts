import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, CoderFactoryParameters } from '../../../src';
import { encoding } from '../../../src';
import { U64_MAX } from '../../utils/constants';

/**
 * @group node
 * @group browser
 */
describe('tuple', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const swayType = '(u8, bool)';
      const components: AbiTypeComponent[] | undefined = undefined;
      const factory = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.v1.tuple.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided tuple type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid tuple type', () => {
      const components: AbiTypeComponent[] = [{}] as AbiTypeComponent[];
      const factory = vi.fn();

      const coder = encoding.v1.tuple.factory(
        { type: { components } } as CoderFactoryParameters,
        factory
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a tuple [boolean, u64]', () => {
      const coder = encoding.v1.tuple([encoding.v1.bool, encoding.v1.u64]);
      const expected = new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255, 255]);
      const value = [true, U64_MAX];

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding [too few inputs]', async () => {
      const coder = encoding.v1.tuple([encoding.v1.bool, encoding.v1.u64]);
      const value = [true];

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid tuple value - unexpected length.')
      );
    });
  });

  describe('decode', () => {
    it('should decode a tuple [boolean, u64]', () => {
      const coder = encoding.v1.tuple([encoding.v1.bool, encoding.v1.u64]);
      const expected = [true, U64_MAX];
      const data = new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255, 255]);

      const [actual, actualOffset] = coder.decode(data, 0);

      expect(actual).toStrictEqual(expected);
      expect(actualOffset).toEqual(9);
    });

    it('throws when decoding bytes [empty]', async () => {
      const coder = encoding.v1.tuple([encoding.v1.bool, encoding.v1.u64]);
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid tuple data - malformed data.')
      );
    });
  });
});
