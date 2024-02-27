/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { bn } from '@fuel-ts/math';

import { U64_MAX } from '../../../../test/utils/constants';

import { BooleanCoder } from './BooleanCoder';
import { TupleCoder } from './TupleCoder';
import { U64Coder } from './U64Coder';

/**
 * @group node
 * @group browser
 */
describe('Tuple Coder', () => {
  const coder = new TupleCoder<[BooleanCoder, U64Coder]>([new BooleanCoder(), new U64Coder()]);

  it('should encode a tuple containing a boolean and u64', () => {
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255,
    ]);
    const actual = coder.encode([true, U64_MAX]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a tuple containing a boolean and u64', () => {
    const expectedValue = [true, bn(U64_MAX)];
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 255, 255, 255, 255]),
      0
    );

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('pads to word size for encoded data with small bytes', () => {
    const options = { isSmallBytes: true };
    const unpaddedCoder = new TupleCoder<[BooleanCoder, BooleanCoder]>([
      new BooleanCoder(options),
      new BooleanCoder(options),
    ]);
    const expected = new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = unpaddedCoder.encode([true, false]);
    expect(actual).toStrictEqual(expected);
  });

  it('pads new offset to word size when decoding data with small bytes', () => {
    const options = { isSmallBytes: true };
    const unpaddedCoder = new TupleCoder<[BooleanCoder, BooleanCoder]>([
      new BooleanCoder(options),
      new BooleanCoder(options),
    ]);

    const expectedValue = [true, false];
    const expectedLength = 16;
    const [actualValue, actualLength] = unpaddedCoder.decode(new Uint8Array([1, 0]), 0);

    expect(JSON.stringify(actualValue)).toStrictEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should not throw given correctly typed inputs', () => {
    expect(() => coder.encode([true, bn(1234)])).not.toThrow();
  });

  it('should throw when provided with extra inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true, bn(1337), false]
      )
    ).toThrow('Types/values length mismatch');
  });

  it('should throw type error with both missing inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        []
      )
    ).toThrow('Types/values length mismatch');
  });

  it('should throw type error with a missing input', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [true]
      )
    ).toThrow('Types/values length mismatch');
  });

  it('should throw type error with invalid inputs', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        [bn(1234), true]
      )
    ).toThrow();
  });

  it('should throw when input is an object', () => {
    expect(() =>
      coder.encode(
        // @ts-expect-error
        { nope: 42 }
      )
    ).toThrow();
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid tuple data size.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid tuple data size.')
    );
  });
});
