import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { Uint8ArrayWithDynamicData } from '../../utilities';

import { RawSliceCoder } from './raw-slice';

/**
 * @group node
 * @group browser
 */
describe('RawSliceCoder', () => {
  it('should encode a raw-slice', () => {
    const coder = new RawSliceCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 3,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([1, 2, 3]),
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
    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [actual, newOffset] = coder.decode(new Uint8Array(expected), 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toEqual(10);
  });
});
