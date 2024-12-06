import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { AbiTypeComponent, GetCoderParams } from '../../../src';
import { AbiEncoding } from '../../../src';
import { U32_MAX, U64_MAX } from '../../utils/constants';
import { toEqualBn } from '../../utils/vitest.matcher';

expect.extend({ toEqualBn });

/**
 * @group node
 * @group browser
 */
describe('struct', () => {
  describe('fromAbi', () => {
    it('should throw when a component is not provided', async () => {
      const encoding = AbiEncoding.from('1');
      const swayType = 'struct MyStruct';
      const components: AbiTypeComponent[] | undefined = undefined;
      const getCoder = vi.fn();

      await expectToThrowFuelError(
        () =>
          encoding.coders.struct.fromAbi(
            { type: { swayType, components } } as GetCoderParams,
            getCoder
          ),
        new FuelError(
          FuelError.CODES.CODER_NOT_FOUND,
          'The provided struct type is missing ABI components.',
          { swayType, components }
        )
      );
    });

    it('should get the coder for a valid struct type', () => {
      const encoding = AbiEncoding.from('1');
      const components: AbiTypeComponent[] = [{}] as AbiTypeComponent[];
      const getCoder = vi.fn();

      const coder = encoding.coders.struct.fromAbi(
        { type: { components } } as GetCoderParams,
        getCoder
      );

      expect(coder).toBeDefined();
    });
  });

  describe('encode', () => {
    it('should encode a struct [{ a: boolean, b: u64 }]', () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
      });
      const expected = new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]);
      const value = { a: true, b: U32_MAX };

      const actual = coder.encode(value);

      expect(actual).toStrictEqual(expected);
    });

    it('should throw when encoding [missing element]', async () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
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

    it('should throw when encoding [extra element]', async () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
      });
      const value = { a: true, b: U32_MAX, c: 1 };

      await expectToThrowFuelError(
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct value - malformed object.', {
          value,
          paths: [{ path: 'c', error: 'Field not expected.' }],
        })
      );
    });

    it('should throw when encoding [missing and extra elements]', async () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
      });
      const value = { a: true, c: 1 };

      await expectToThrowFuelError(
        // @ts-expect-error - expected missing field
        () => coder.encode(value),
        new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid struct value - malformed object.', {
          value,
          paths: [
            { path: 'b', error: 'Field not present.' },
            { path: 'c', error: 'Field not expected.' },
          ],
        })
      );
    });

    it('should throw when encoding [invalid element]', async () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
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
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
      });
      // @ts-expect-error toEqualBn is not a function
      const expected = { a: true, b: expect.toEqualBn(U32_MAX) };
      const data = new Uint8Array([1, 0, 0, 0, 0, 255, 255, 255, 255]);

      const [actual, offset] = coder.decode(data);

      expect(actual).toStrictEqual(expected);
      expect(offset).toEqual(9);
    });

    it('should throw when decoding empty bytes', async () => {
      const coder = AbiEncoding.v1.struct({
        a: AbiEncoding.v1.bool,
        b: AbiEncoding.v1.u64,
      });
      const data = new Uint8Array(0);

      await expectToThrowFuelError(
        () => coder.decode(data),
        new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid boolean data - not enough data.', {
          data,
        })
      );
    });
  });
});
