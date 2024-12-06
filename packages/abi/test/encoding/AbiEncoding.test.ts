import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { GetCoderParams } from '../../src/coder/encoding';
import { AbiEncoding } from '../../src/coder/encoding';

/**
 * @group node
 * @group browser
 */
describe('AbiEncoding', () => {
  describe('from', () => {
    it('should create an from a valid versions', () => {
      const encoding = AbiEncoding.from('1');

      expect(encoding).toBeDefined();
      expect(encoding.coders).toBeDefined();
      expect(encoding.coders.array).toBeDefined();
      expect(encoding.coders.enum).toBeDefined();
      expect(encoding.coders.option).toBeDefined();
      expect(encoding.coders.vector).toBeDefined();
      expect(encoding.coders.u8).toBeDefined();
      expect(encoding.coders.u16).toBeDefined();
      expect(encoding.coders.u32).toBeDefined();
      expect(encoding.coders.u64).toBeDefined();
      expect(encoding.coders.u256).toBeDefined();
      expect(encoding.coders.b256).toBeDefined();
      expect(encoding.coders.b512).toBeDefined();
      expect(encoding.coders.bool).toBeDefined();
      expect(encoding.coders.void).toBeDefined();
      expect(encoding.coders.byte).toBeDefined();
      expect(encoding.coders.rawSlice).toBeDefined();
      expect(encoding.coders.str).toBeDefined();
      expect(encoding.coders.stdString).toBeDefined();
      expect(encoding.coders.string).toBeDefined();
      expect(encoding.coders.vector).toBeDefined();
      expect(encoding.coders.array).toBeDefined();
      expect(encoding.coders.tuple).toBeDefined();
      expect(encoding.coders.struct).toBeDefined();
      expect(encoding.coders.enum).toBeDefined();
      expect(encoding.coders.option).toBeDefined();
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
