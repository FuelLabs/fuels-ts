import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, CoderFactoryParameters } from '../../../src';
import { encoding, MAX_BYTES } from '../../../src';
import { U8_MAX } from '../../utils/constants';

const isBrowser = typeof window !== 'undefined';

/**
 * @group node
 * @group browser
 */
describe('v1/array', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const swayType = 'enum MyEnum';
      const components: AbiTypeComponent[] = [];
      const factory = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.v1.array.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided array type is missing ABI components.',
          { swayType }
        )
      );
    });

    it('should throw when a component is not provided', async () => {
      const swayType = '[u8; 4]';
      const components: AbiTypeComponent[] = [];
      const factory = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.v1.array.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided array type is missing a ABI component.'
        )
      );
    });

    it('should get the coder for a valid array type', () => {
      const swayType = '[u8; 4]';
      const components: AbiTypeComponent[] = [{} as AbiTypeComponent];
      const factory = vi.fn();

      const coder = encoding.v1.array.factory(
        { type: { swayType, components } } as CoderFactoryParameters,
        factory
      );

      expect(factory).toHaveBeenCalledWith(components[0], factory);
      expect(factory).toHaveBeenCalledTimes(1);
      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode an array [u8, length = 0]', () => {
      const coder = encoding.v1.array(encoding.v1.u8, 0);
      const input: number[] = [];
      const expected = new Uint8Array([]);

      const actual = coder.encode(input);

      expect(actual).toEqual(expected);
    });

    it('should encode an array [u8, length = 4]', () => {
      const coder = encoding.v1.array(encoding.v1.u8, 4);
      const input = [0, 13, 37, 255];
      const expected = new Uint8Array(input);

      const actual = coder.encode(input);

      expect(actual).toEqual(expected);
    });

    it('should encode an array of enums [enum, length = 4]', () => {
      const coder = encoding.v1.array(
        encoding.v1.enum({ a: encoding.v1.u8, b: encoding.v1.bool }),
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
      const coder = encoding.v1.array(encoding.v1.u8, 1);
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
      const coder = encoding.v1.array(encoding.v1.u8, 1);
      const input = [1, 2, 3];

      await expectToThrowFuelError(
        () => coder.encode(input),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid array value - unexpected length.', {
          value: input,
          expectedLength: 1,
        })
      );
    });

    it('should throw when value to encode is invalid [u8, length = 1]', async () => {
      const coder = encoding.v1.array(encoding.v1.u8, 1);
      const input = [256];

      await expectToThrowFuelError(
        () => coder.encode(input),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u8 value - value exceeds maximum.', {
          type: 'u8',
          value: '256',
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode an array [u8, length = 0]', () => {
      const coder = encoding.v1.array(encoding.v1.u8, 0);
      const input = new Uint8Array([]);
      const expected: number[] = [];

      const [actual, offset] = coder.decode(input);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(0);
    });

    it('should decode an array [u8, length = 4]', () => {
      const coder = encoding.v1.array(encoding.v1.u8, 4);
      const input = new Uint8Array([0, 13, 37, 255]);
      const expected = [0, 13, 37, 255];

      const [actual, offset] = coder.decode(input);

      expect(actual).toEqual(expected);
      expect(offset).toEqual(4);
    });

    it('should decode an array of enums [enum, length = 4]', () => {
      const coder = encoding.v1.array(
        encoding.v1.enum({ a: encoding.v1.u8, b: encoding.v1.bool }),
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

    /**
     * TODO: this test is failing on browser, need to investigate why.
     *
     * RangeError: Array buffer allocation failed
     */
    it.skipIf(isBrowser)('should throw when decoding too many bytes [u8, length = 1]', async () => {
      const coder = encoding.v1.array(encoding.v1.u8, 1);
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
      const coder = encoding.v1.array(encoding.v1.u8, 1);
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u8 data - unexpected length.', {
          data,
        })
      );
    });

    it('should throw when decoding too few bytes [u8, length = 1]', async () => {
      const coder = encoding.v1.array(encoding.v1.u8, 1);
      const data = new Uint8Array([]);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u8 data - unexpected length.', {
          data,
        })
      );
    });
  });
});
