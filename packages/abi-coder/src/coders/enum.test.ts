/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U64_MAX } from '../../test/utils/constants';

import { BooleanCoder } from './boolean';
import { EnumCoder } from './enum';
import { U64Coder } from './u64';

/**
 * @group node
 * @group browser
 */
describe('EnumCoder', () => {
  const coder = new EnumCoder('TestEnum', { a: new BooleanCoder(), b: new U64Coder() });

  it('should encode an enum containing a boolean', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    const actual = coder.encode({ a: true });

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an enum containing a boolean', () => {
    const expectedValue = { a: true };
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode an enum containing a u64', () => {
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255,
    ]);
    const actual = coder.encode({ b: bn(U64_MAX) });

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an enum containing a u64', () => {
    const expectedValue = { b: bn(U64_MAX) };
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding if no enum key is provided', () => {
    const invalidCoder = new EnumCoder('TestEnum', {});

    expect(() => invalidCoder.encode({} as never)).toThrow('A field for the case must be provided');
  });

  it('should throw an error when decoded value accesses an invalid index', () => {
    const input = new Uint8Array(Array.from(Array(8).keys()));
    expect(() => {
      coder.decode(input, 0);
    }).toThrow('Invalid caseIndex');
  });

  it('should not throw given correctly typed inputs', () => {
    expect(() => coder.encode({ a: true })).not.toThrow();
    expect(() => coder.encode({ b: bn(1234) })).not.toThrow();
  });

  it('should throw when provided with extra inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { a: true, b: bn(1234), c: false }
      )
    ).toThrow('Only one field must be provided');
  });

  it('should throw type error with invalid input for coder', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { b: true }
      )
    ).toThrow('Invalid u64');
  });

  it('should throw type error with invalid input key', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { nope: 42 }
      )
    ).toThrow();
  });

  it('throws when decoding empty bytes', async () => {
    await expectToThrowFuelError(
      () => coder.decode(new Uint8Array(), 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid enum data size.')
    );
  });
});
