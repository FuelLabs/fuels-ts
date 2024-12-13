import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, CoderFactoryParameters } from '../../../src';
import { encoding } from '../../../src';
import { U32_MAX, U64_MAX } from '../../utils/constants';

/**
 * @group node
 * @group browser
 */
describe('struct', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const swayType = 'struct MyStruct';
      const components: AbiTypeComponent[] | undefined = undefined;
      const factory = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.v1.struct.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided struct type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid struct type', () => {
      const components: AbiTypeComponent[] = [{}] as AbiTypeComponent[];
      const factory = vi.fn();

      const coder = encoding.v1.struct.factory(
        { type: { components } } as CoderFactoryParameters,
        factory
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a struct [{ a: boolean, b: u64 }]', () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const expected = new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]);
      const value = { a: true, b: U32_MAX };

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding [missing element]', async () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const value = { a: true };

      await expectToThrowFuelError(
        // @ts-expect-error - expected missing field
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct value - malformed object.', {
          value,
          paths: [{ path: 'b', error: 'Field not present.' }],
        })
      );
    });

    it('should throw when encoding [missing and extra elements]', async () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const value = { a: true, c: 1 };

      await expectToThrowFuelError(
        // @ts-expect-error - expected missing field
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct value - malformed object.', {
          value,
          paths: [{ path: 'b', error: 'Field not present.' }],
        })
      );
    });

    it('should throw when encoding [invalid element]', async () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const value = { a: true, b: U64_MAX.add(1) };

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value - value exceeds maximum.', {
          type: 'u64',
          value: U64_MAX.add(1).toString(),
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a struct [{ a: boolean, b: u64 }]', () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const expected = { a: true, b: expect.toEqualBn(U32_MAX) };
      const data = new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toEqual(9);
    });

    it('should throw when decoding empty bytes', async () => {
      const coder = encoding.v1.struct({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
      });
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid bool data - not enough data.', {
          data,
        })
      );
    });
  });
});
