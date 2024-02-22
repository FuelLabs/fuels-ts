import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { U32_MAX, U8_MAX } from '../../../../test/utils/constants';
import type { EncodingOptions } from '../../../types/EncodingOptions';

import { ArrayCoder } from './ArrayCoder';
import { BooleanCoder } from './BooleanCoder';
import { EnumCoder } from './EnumCoder';
import { NumberCoder } from './NumberCoder';

/**
 * @group node
 */
describe('ArrayCoder', () => {
  const options: EncodingOptions = {
    isSmallBytes: true,
  };

  it('should encode a number array with zero inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 0);
    const expected = new Uint8Array([]);
    const actual = coder.encode([]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a number array with zero inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 0);
    const expectedValue: number[] = [];
    const expectedLength = 0;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([]), 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode a number array with four inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 4);
    const array = [0, 13, 37, U8_MAX];
    const expected = new Uint8Array(array);
    const actual = coder.encode(array);
    expect(actual).toStrictEqual(expected);
  });

  it('should decode a number array with four inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 4);
    const expectedValue = [0, 13, 37, U8_MAX];
    const expectedLength = expectedValue.length;
    const [actualValue, actualLength] = coder.decode(new Uint8Array(expectedValue), 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode an enum array with differently typed inputs', () => {
    const coder = new ArrayCoder(
      new EnumCoder('TestEnum', {
        a: new NumberCoder('u8', options),
        b: new BooleanCoder(options),
      }),
      4
    );
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 255,
    ]);
    const actual = coder.encode([{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an enum array with differently typed inputs', () => {
    const coder = new ArrayCoder(
      new EnumCoder('TestEnum', {
        a: new NumberCoder('u8', options),
        b: new BooleanCoder(options),
      }),
      4
    );
    const expectedValue = [{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }];
    const expectedLength = 36;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
        0, 0, 0, 0, 255,
      ]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw when value to encode is not array', async () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 1);
    const nonArrayInput = { ...[1] };
    await expectToThrowFuelError(
      () => coder.encode(nonArrayInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Expected array value.')
    );
  });

  it('should throw when coder length is not match inputted array length', async () => {
    const coder = new ArrayCoder(new NumberCoder('u8', options), 1);
    await expectToThrowFuelError(
      () => coder.encode([1, 2]),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Types/values length mismatch.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 1);
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid array data size.')
    );
  });

  it('throws when decoding invalid bytes (too small)', async () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 8);
    const input = new Uint8Array([0]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid array data size.')
    );
  });

  it('throws when decoding vec larger than max size', async () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 8);
    const input = new Uint8Array(U32_MAX + 1);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid array data size.')
    );
  });
});
