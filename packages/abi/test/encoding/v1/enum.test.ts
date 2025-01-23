import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import type { AbiTypeComponent, CoderFactoryParameters } from '../../../src';
import { encoding } from '../../../src';
import { U64_MAX } from '../../utils/constants';

/**
 * @group node
 * @group browser
 */
describe('enum', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const factory = vi.fn();
      const swayType = 'enum MyEnum';
      const components: AbiTypeComponent[] | undefined = undefined;

      await expectToThrowFuelError(
        () =>
          encoding.v1.enum.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided enum type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid enum type', () => {
      const components: AbiTypeComponent[] = [
        { name: 'a', type: 'bool' } as unknown as AbiTypeComponent,
        { name: 'b', type: 'u64' } as unknown as AbiTypeComponent,
      ];
      const factory = vi.fn();
      factory.mockReturnValue(encoding.v1.bool);
      factory.mockReturnValue(encoding.v1.u64);

      const coder = encoding.v1.enum.factory(
        { type: { components } } as CoderFactoryParameters,
        factory
      );

      expect(factory).toHaveBeenCalledWith(components[0], factory);
      expect(factory).toHaveBeenCalledWith(components[1], factory);
      expect(factory).toHaveBeenCalledTimes(2);
      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode an enum [boolean]', () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const value = { a: true };

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an enum [u64]', () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255,
      ]);
      const value = { b: bn(U64_MAX) };

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an enum [non-native]', () => {
      const coder = encoding.v1.enum({
        nonNative: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const value = { nonNative: true };

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an enum [native]', () => {
      const coder = encoding.v1.enum({
        nonNative: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);
      const value = 'native';

      // @ts-expect-error native
      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding [no enum key]', async () => {
      const coder = encoding.v1.enum({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const value = {};
      await expectToThrowFuelError(
        // @ts-expect-error no enum key
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid enum value - a valid case key must be provided.',
          { value, validKeys: ['a', 'b', 'native'] }
        )
      );
    });

    it('should throw when encoding [non-existent enum key]', async () => {
      const coder = encoding.v1.enum({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const value = { nonExistentKey: true };

      await expectToThrowFuelError(
        // @ts-expect-error non-existent enum key
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid enum value - invalid case key "nonExistentKey".',
          { value, validKeys: ['a', 'b', 'native'] }
        )
      );
    });

    it('should throw when encoding [multiple fields]', async () => {
      const coder = encoding.v1.enum({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const value = { a: true, b: bn(1) };

      await expectToThrowFuelError(
        // @ts-expect-error multiple fields
        () => coder.encode(value),
        new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid enum value - only one field must be provided.',
          { value, validKeys: ['a', 'b', 'native'] }
        )
      );
    });

    it('should throw when encoding [invalid case value]', async () => {
      const coder = encoding.v1.enum({
        a: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const value = { b: true };

      await expectToThrowFuelError(
        // @ts-expect-error invalid case value
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid u64 value - expected a BNInput.', {
          value: true,
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode an enum [boolean]', () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const expected = { a: true };

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toBe(9);
    });

    it('should decode an enum [u64]', () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255]);
      const expected = { b: bn(U64_MAX) };

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toBe(16);
    });

    it('should decode an enum [non-native]', () => {
      const coder = encoding.v1.enum({
        nonNative: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const expected = { nonNative: true };

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toBe(9);
    });

    it('should decode an enum [native]', () => {
      const coder = encoding.v1.enum({
        nonNative: encoding.v1.bool,
        b: encoding.v1.u64,
        native: encoding.v1.void,
      });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);
      const expected = 'native';

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toBe(8);
    });

    it('should throw an error [invalid case key]', async () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid enum data - invalid case key.', {
          validKeys: ['a', 'b'],
        })
      );
    });

    it('should throw an error [empty bytes]', async () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid enum data - invalid case key.', {
          validKeys: ['a', 'b'],
        })
      );
    });

    it('should throw an error [empty case element]', async () => {
      const coder = encoding.v1.enum({ a: encoding.v1.bool, b: encoding.v1.u64 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid u64 data - unexpected length.', {
          data: new Uint8Array([]),
          expectedLength: 8,
          type: 'u64',
        })
      );
    });
  });
});
