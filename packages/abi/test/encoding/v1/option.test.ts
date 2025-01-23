import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, CoderFactoryParameters } from '../../../src';
import { encoding } from '../../../src';

/**
 * @group node
 * @group browser
 */
describe('option', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const swayType = 'enum std::option::Option<struct MyStruct>';
      const components: AbiTypeComponent[] | undefined = undefined;
      const factory = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.v1.option.factory(
            { type: { swayType, components } } as CoderFactoryParameters,
            factory
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided option type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid option type', () => {
      const components: AbiTypeComponent[] = [
        { name: 'None', type: '()' } as unknown as AbiTypeComponent,
        { name: 'Some', type: 'u64' } as unknown as AbiTypeComponent,
      ];
      const factory = vi.fn();
      factory.mockReturnValue(encoding.v1.void);
      factory.mockReturnValue(encoding.v1.u64);

      const coder = encoding.v1.option.factory(
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
    it('should encode a value [Some]', () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const value = 100;

      const actual = coder.encode(value);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1, 100]);
      expect(actual).toEqual(expected);
    });

    it('should encode a value [None]', () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const value = undefined;

      const actual = coder.encode(value);

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      expect(actual).toEqual(expected);
    });

    it('should encode a value [None - optional]', () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });

      // @ts-expect-error optional value
      const actual = coder.encode();

      const expected = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      expect(actual).toEqual(expected);
    });

    it('should throw when encoding [malformed value]', async () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const value = 'malformed value';

      await expectToThrowFuelError(
        // @ts-expect-error invalid option value
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, `Invalid option value - malformed value.`, {
          value: { Some: value },
        })
      );
    });
  });

  describe('decode', () => {
    it('should decode a value [Some]', () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 1, 100]);
      const expected = 100;

      const [decoded, length] = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
      expect(length).toEqual(9);
    });

    it('should decode a value [None]', () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const input = Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]);
      const expected = undefined;

      const [decoded, length] = coder.decode(input, 0);

      expect(decoded).toEqual(expected);
      expect(length).toEqual(8);
    });

    it('should throw when decoding [malformed value]', async () => {
      const coder = encoding.v1.option({ None: encoding.v1.void, Some: encoding.v1.u8 });
      const data = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, `Invalid option data - malformed bytes.`, {
          data: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]),
        })
      );
    });
  });
});
