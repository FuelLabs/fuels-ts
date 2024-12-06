import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, GetCoderParams } from '../../../src';
import { AbiEncoding } from '../../../src';
import { U64_MAX } from '../../utils/constants';

/**
 * @group node
 * @group browser
 */
describe('tuple', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const encoding = AbiEncoding.from('1');
      const swayType = '(u8, bool)';
      const components: AbiTypeComponent[] | undefined = undefined;
      const getCoder = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.coders.tuple.fromAbi(
            { type: { swayType, components } } as GetCoderParams,
            getCoder
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided tuple type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid tuple type', () => {
      const encoding = AbiEncoding.from('1');
      const components: AbiTypeComponent[] = [{}] as AbiTypeComponent[];
      const getCoder = vi.fn();

      const coder = encoding.coders.tuple.fromAbi(
        { type: { components } } as GetCoderParams,
        getCoder
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a tuple [boolean, u64]', () => {
      const coder = AbiEncoding.v1.tuple([AbiEncoding.v1.bool, AbiEncoding.v1.u64]);
      const expected = new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255, 255]);
      const value = [true, U64_MAX];

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding [mismatched inputs]', async () => {
      const coder = AbiEncoding.v1.tuple([AbiEncoding.v1.bool, AbiEncoding.v1.u64]);
      const value = [true];

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid tuple value - mismatched inputs.')
      );
    });
  });

  describe('decode', () => {
    it('should decode a tuple [boolean, u64]', () => {
      const coder = AbiEncoding.v1.tuple([AbiEncoding.v1.bool, AbiEncoding.v1.u64]);
      const expected = [true, U64_MAX];
      const data = new Uint8Array([1, 255, 255, 255, 255, 255, 255, 255, 255]);

      const [actual, actualOffset] = coder.decode(data, 0);

      expect(actual).toStrictEqual(expected);
      expect(actualOffset).toEqual(9);
    });

    it('throws when decoding bytes [empty]', async () => {
      const coder = AbiEncoding.v1.tuple([AbiEncoding.v1.bool, AbiEncoding.v1.u64]);
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data, 0),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid tuple data - malformed data.')
      );
    });
  });
});
