import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U64_MAX } from '../../../test/utils/constants';

import { BigNumberCoder } from './BigNumberCoder';
import { BooleanCoder } from './BooleanCoder';
import { EnumCoder } from './EnumCoder';
import { VoidCoder } from './VoidCoder';

/**
 * @group node
 * @group browser
 */
describe('EnumCoder', () => {
  const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new BigNumberCoder('u64') });

  describe('encode', () => {
    it('should encode an enum containing a boolean', () => {
      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);
      const actual = coder.encode({ a: true });

      expect(actual).toStrictEqual(expected);
    });

    it('should encode an enum containing a u64', () => {
      const expected = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255,
      ]);
      const actual = coder.encode({ b: bn(U64_MAX) });

      expect(actual).toStrictEqual(expected);
    });

    it('encodes a native enum', () => {
      const nativeCoder = new EnumCoder('Native', {
        One: new BooleanCoder(),
        Two: new BigNumberCoder('u64'),
        Three: new VoidCoder(),
      });

      const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);
      // @ts-expect-error native
      const actual = nativeCoder.encode('Three');
      expect(actual).toStrictEqual(expected);
    });

    it('should throw an error when encoding if no enum key is provided', async () => {
      await expectToThrowFuelError(
        () => coder.encode({} as never),
        new FuelError(ErrorCode.INVALID_DECODE_VALUE, 'A field for the case must be provided.')
      );
    });

    it('should throw an error when enum case key is incorrect', async () => {
      await expectToThrowFuelError(
        () => coder.encode({ c: 'test' } as never),
        new FuelError(ErrorCode.INVALID_DECODE_VALUE, `Invalid case 'c'. Valid cases: 'a', 'b'.`)
      );
    });

    it('should throw an error when multiple fields are provided', async () => {
      await expectToThrowFuelError(
        () => coder.encode({ a: 'test', b: 'test' } as never),
        new FuelError(ErrorCode.INVALID_DECODE_VALUE, 'Only one field must be provided.')
      );
    });
  });

  describe('decode', () => {
    it('decodes an enum containing a boolean', () => {
      const expectedValue = { a: true };
      const expectedLength = 9;
      const [actualValue, actualLength] = coder.decode(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]),
        0
      );

      expect(actualValue).toStrictEqual(expectedValue);
      expect(actualLength).toBe(expectedLength);
    });

    it('decodes an enum containing a u64', () => {
      const expectedValue = { b: bn(U64_MAX) };
      const expectedLength = 16;
      const [actualValue, actualLength] = coder.decode(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255]),
        0
      );

      expect(actualValue).toStrictEqual(expectedValue);
      expect(actualLength).toBe(expectedLength);
    });

    it('decodes a native enum', () => {
      const nativeCoder = new EnumCoder('TestEnum', {
        a: new BooleanCoder(),
        b: new BigNumberCoder('u64'),
        c: new VoidCoder(),
      });

      const expectedValue = 'c';
      const expectedLength = 8;
      const [actualValue, actualLength] = nativeCoder.decode(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]),
        0
      );

      expect(actualValue).toStrictEqual(expectedValue);
      expect(actualLength).toBe(expectedLength);
    });

    it('should throw an error when decoded value accesses an invalid index', async () => {
      const input = new Uint8Array(Array.from(Array(8).keys()));

      await expectToThrowFuelError(
        () => coder.decode(input, 0),
        new FuelError(
          ErrorCode.INVALID_DECODE_VALUE,
          'Invalid caseIndex "283686952306183". Valid cases: a,b.'
        )
      );
    });

    it('throws when decoding empty bytes', async () => {
      await expectToThrowFuelError(
        () => coder.decode(new Uint8Array(), 0),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid enum data size.')
      );
    });

    it('throws when decoding data that is too short', async () => {
      const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

      await expectToThrowFuelError(
        () => coder.decode(input, 0),
        new FuelError(ErrorCode.DECODE_ERROR, 'Invalid enum data size.')
      );
    });
  });
});
