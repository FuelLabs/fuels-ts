import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { BN } from '@fuel-ts/math';

import type { Uint8ArrayWithDynamicData } from '../utilities';

import { RawSliceCoder } from './raw-slice';

/**
 * @group node
 * @group browser
 */
describe('RawSliceCoder', () => {
  it('should encode a raw-slice', () => {
    const coder = new RawSliceCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 24,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3]),
    };

    const actual = coder.encode([1, 2, 3]);

    expect(actual).toStrictEqual(expected);
  });

  it('should throw when value to encode is not array', async () => {
    const coder = new RawSliceCoder();
    const nonArrayInput = { ...[1] };
    await expectToThrowFuelError(
      () => coder.encode(nonArrayInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Expected array value.')
    );
  });

  it('should decode a raw-slice', () => {
    const coder = new RawSliceCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
      3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0,
      0, 7, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 9,
    ]);

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual.map((v: BN) => v.toNumber())).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(newOffset).toEqual(80);
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new RawSliceCoder();
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid raw slice data size.')
    );
  });

  it('should throw when decoding invalid data size (too small)', async () => {
    const coder = new RawSliceCoder();
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid raw slice data size.')
    );
  });

  it('should throw when decoding invalid data size (remainder)', async () => {
    const coder = new RawSliceCoder();
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid raw slice data size.')
    );
  });
});
