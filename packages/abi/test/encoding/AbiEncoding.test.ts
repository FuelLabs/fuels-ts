import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { GetCoderParams } from '../../src/coder/encoding';
import { AbiEncoding } from '../../src/coder/encoding';
import { v1 } from '../../src/coder/encoding/v1';

/**
 * @group node
 * @group browser
 */
describe('AbiEncoding', () => {
  describe('from', () => {
    it('should create a AbiEncoding instance just fine', () => {
      const encoding = AbiEncoding.from('1');

      expect(encoding).toBeDefined();
      expect(encoding.coders).toBeDefined();
      expect(encoding.coders.array).toEqual(v1.array);
      expect(encoding.coders.enum).toEqual(v1.enum);
      expect(encoding.coders.option).toEqual(v1.option);
      expect(encoding.coders.vector).toEqual(v1.vector);
      expect(encoding.coders.u8).toEqual(v1.u8);
      expect(encoding.coders.u16).toEqual(v1.u16);
      expect(encoding.coders.u32).toEqual(v1.u32);
      expect(encoding.coders.u64).toEqual(v1.u64);
      expect(encoding.coders.u256).toEqual(v1.u256);
      expect(encoding.coders.b256).toEqual(v1.b256);
      expect(encoding.coders.b512).toEqual(v1.b512);
      expect(encoding.coders.bool).toEqual(v1.bool);
      expect(encoding.coders.void).toEqual(v1.void);
      expect(encoding.coders.byte).toEqual(v1.byte);
      expect(encoding.coders.rawSlice).toEqual(v1.rawSlice);
      expect(encoding.coders.str).toEqual(v1.str);
      expect(encoding.coders.stdString).toEqual(v1.stdString);
      expect(encoding.coders.string).toEqual(v1.string);
      expect(encoding.coders.vector).toEqual(v1.vector);
      expect(encoding.coders.array).toEqual(v1.array);
      expect(encoding.coders.tuple).toEqual(v1.tuple);
      expect(encoding.coders.struct).toEqual(v1.struct);
      expect(encoding.coders.enum).toEqual(v1.enum);
      expect(encoding.coders.option).toEqual(v1.option);
    });

    it('should throw an error if the version is not supported', async () => {
      await expectToThrowFuelError(
        () => AbiEncoding.from('0'),
        new FuelError(
          FuelError.CODES.UNSUPPORTED_ENCODING_VERSION,
          'Unsupported encoding version "0"'
        )
      );
    });
  });

  describe('getCoder', () => {
    it('should get a coder for a given type and name [u8]', () => {
      const encoding = AbiEncoding.from('1');
      const params: GetCoderParams = {
        name: 'test',
        type: { swayType: 'u8', concreteTypeId: '0x1' },
      };

      const coder = encoding.getCoder(params);

      expect(coder).toBeDefined();
    });

    it('should get a coder for a given type and name [string]', () => {
      const encoding = AbiEncoding.from('1');
      const params: GetCoderParams = {
        name: 'test',
        type: { swayType: 'str[4]', concreteTypeId: '0x1' },
      };

      const coder = encoding.getCoder(params);

      expect(coder).toBeDefined();
    });

    it('should throw an error if the coder is not supported', async () => {
      const encoding = AbiEncoding.from('1');
      const params: GetCoderParams = {
        name: 'test',
        type: { swayType: 'unknown', concreteTypeId: '0x1' },
      };

      await expectToThrowFuelError(
        () => encoding.getCoder(params),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'Unsupported coder type "unknown" for element "test"'
        )
      );
    });

    it('should throw an error if a generic coder is used [should not happen]', async () => {
      const encoding = AbiEncoding.from('1');
      const params: GetCoderParams = {
        name: 'test',
        type: { swayType: 'generic', concreteTypeId: '0x1' },
      };

      await expectToThrowFuelError(
        () => encoding.getCoder(params),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'Unsupported coder type "generic" for element "test"'
        )
      );
    });
  });
});
