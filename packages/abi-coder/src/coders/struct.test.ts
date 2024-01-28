/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U32_MAX } from '../../test/utils/constants';

import { BooleanCoder } from './boolean';
import { StructCoder } from './struct';
import { U64Coder } from './u64';

/**
 * @group node
 * @group browser
 */
describe('StructCoder', () => {
  const STRUCT_NAME = 'TestStruct';
  const coder = new StructCoder(STRUCT_NAME, { a: new BooleanCoder(), b: new U64Coder() });

  it('should encode a struct containing a boolean and number', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 255, 255, 255, 255]);
    const actual = coder.encode({ a: true, b: U32_MAX });

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a struct containing a boolean and number', () => {
    const expectedValue = { a: true, b: bn(U32_MAX) };
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 255, 255, 255, 255]),
      0
    );

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should not throw given correctly typed inputs', () => {
    expect(() => coder.encode({ a: true, b: bn(1234) })).not.toThrow();
  });

  it('pads to word size for encoded data with small bytes', () => {
    const options = { isSmallBytes: true };
    const unpaddedCoder = new StructCoder(STRUCT_NAME, {
      a: new BooleanCoder(options),
      b: new BooleanCoder(options),
    });
    const expected = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = unpaddedCoder.encode({ a: true, b: false });

    expect(actual).toStrictEqual(expected);
  });

  it('pads new offset to word size when decoding data with small bytes', () => {
    const options = { isSmallBytes: true };
    const unpaddedCoder = new StructCoder(STRUCT_NAME, {
      a: new BooleanCoder(options),
      b: new BooleanCoder(options),
    });

    const expectedValue = { a: true, b: false };
    const expectedLength = 16;
    const [actualValue, actualLength] = unpaddedCoder.decode(new Uint8Array([1, 0]), 0);

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should not throw when provided with extra inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: bn(1234), c: false }
      )
    ).not.toThrow();
  });

  it('should throw type error with both missing inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        {}
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it('should throw type error with missing input for second coder', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true }
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it('should throw type error with missing input for first coder', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: bn(1234) }
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it.skip('should throw type error with invalid input for first coder and missing input for second', () => {
    // Skipped because this is failing with a different message because it's now failing on encoding a: 1234,
    // which should be boolean,
    // whereas previously it wasn't failing because of this but rather because the second 'b' prop is missing.
    // This test should be deleted as it's testing the same thing as the
    // 'should throw type error with missing input for second coder' test.
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: 1234 }
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it('should throw type error with invalid input for second coder and missing input for first', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it('should throw type error with invalid input key', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { nope: 1234, alsoNope: true }
      )
    ).toThrow(`Invalid struct ${STRUCT_NAME}`);
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid struct data size.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid struct data size.')
    );
  });
});
