import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { CoderFactoryParameters } from '../../src/coder/encoding';
import { encoding } from '../../src/coder/encoding';
import { v1 } from '../../src/coder/encoding/v1';

/**
 * @group node
 * @group browser
 */
describe('encoding', () => {
  describe('from', () => {
    it('should create a encoding instance just fine', () => {
      expect(encoding).toBeDefined();

      // Current version (v1)
      expect(encoding.array).toEqual(v1.array);
      expect(encoding.enum).toEqual(v1.enum);
      expect(encoding.option).toEqual(v1.option);
      expect(encoding.vector).toEqual(v1.vector);
      expect(encoding.u8).toEqual(v1.u8);
      expect(encoding.u16).toEqual(v1.u16);
      expect(encoding.u32).toEqual(v1.u32);
      expect(encoding.u64).toEqual(v1.u64);
      expect(encoding.u256).toEqual(v1.u256);
      expect(encoding.b256).toEqual(v1.b256);
      expect(encoding.b512).toEqual(v1.b512);
      expect(encoding.bool).toEqual(v1.bool);
      expect(encoding.void).toEqual(v1.void);
      expect(encoding.bytes).toEqual(v1.bytes);
      expect(encoding.rawSlice).toEqual(v1.rawSlice);
      expect(encoding.str).toEqual(v1.str);
      expect(encoding.stdString).toEqual(v1.stdString);
      expect(encoding.string).toEqual(v1.string);
      expect(encoding.vector).toEqual(v1.vector);
      expect(encoding.array).toEqual(v1.array);
      expect(encoding.tuple).toEqual(v1.tuple);
      expect(encoding.struct).toEqual(v1.struct);
      expect(encoding.enum).toEqual(v1.enum);
      expect(encoding.option).toEqual(v1.option);

      // V1
      expect(encoding.v1.array).toEqual(v1.array);
      expect(encoding.v1.enum).toEqual(v1.enum);
      expect(encoding.v1.option).toEqual(v1.option);
      expect(encoding.v1.vector).toEqual(v1.vector);
      expect(encoding.v1.u8).toEqual(v1.u8);
      expect(encoding.v1.u16).toEqual(v1.u16);
      expect(encoding.v1.u32).toEqual(v1.u32);
      expect(encoding.v1.u64).toEqual(v1.u64);
      expect(encoding.v1.u256).toEqual(v1.u256);
      expect(encoding.v1.b256).toEqual(v1.b256);
      expect(encoding.v1.b512).toEqual(v1.b512);
      expect(encoding.v1.bool).toEqual(v1.bool);
      expect(encoding.v1.void).toEqual(v1.void);
      expect(encoding.v1.bytes).toEqual(v1.bytes);
      expect(encoding.v1.rawSlice).toEqual(v1.rawSlice);
      expect(encoding.v1.str).toEqual(v1.str);
      expect(encoding.v1.stdString).toEqual(v1.stdString);
      expect(encoding.v1.string).toEqual(v1.string);
      expect(encoding.v1.vector).toEqual(v1.vector);
      expect(encoding.v1.array).toEqual(v1.array);
      expect(encoding.v1.tuple).toEqual(v1.tuple);
      expect(encoding.v1.struct).toEqual(v1.struct);
      expect(encoding.v1.enum).toEqual(v1.enum);
      expect(encoding.v1.option).toEqual(v1.option);
    });

    it('should throw an error if the version is not supported', async () => {
      await expectToThrowFuelError(
        () => encoding.fromVersion('0'),
        new FuelError(
          FuelError.CODES.UNSUPPORTED_ENCODING_VERSION,
          'Unsupported encoding version "0"'
        )
      );
    });
  });

  describe('getCoder', () => {
    const encodingV1 = encoding.fromVersion('1');

    it('should get a coder for a given type and name [u8]', () => {
      const params: CoderFactoryParameters = {
        name: 'test',
        type: { swayType: 'u8', concreteTypeId: '0x1' },
      };

      const coder = encodingV1.getCoder(params);

      expect(coder).toBeDefined();
    });

    it('should get a coder for a given type and name [string]', () => {
      const params: CoderFactoryParameters = {
        name: 'test',
        type: { swayType: 'str[4]', concreteTypeId: '0x1' },
      };

      const coder = encodingV1.getCoder(params);

      expect(coder).toBeDefined();
    });

    it('should throw an error if the coder is not supported', async () => {
      const params: CoderFactoryParameters = {
        name: 'test',
        type: { swayType: 'unknown', concreteTypeId: '0x1' },
      };

      await expectToThrowFuelError(
        () => encodingV1.getCoder(params),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'Unsupported coder type "unknown" for element "test"'
        )
      );
    });

    it('should throw an error if a generic coder is used [should not happen]', async () => {
      const params: CoderFactoryParameters = {
        name: 'test',
        type: { swayType: 'generic', concreteTypeId: '0x1' },
      };

      await expectToThrowFuelError(
        () => encodingV1.getCoder(params),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'Unsupported coder type "generic" for element "test"'
        )
      );
    });
  });
});
