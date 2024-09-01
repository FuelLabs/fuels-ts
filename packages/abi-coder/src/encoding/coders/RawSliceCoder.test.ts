import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { RawSliceCoder } from './RawSliceCoder';

/**
 * @group node
 * @group browser
 */
describe('RawSliceCoder', () => {
  const coder = new RawSliceCoder();

  it('should encode a raw-slice', () => {
    const expected: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
    const actual = coder.encode([1, 2, 3]);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a raw-slice [full word]', () => {
    const expected: Uint8Array = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
    const actual = coder.encode([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a raw-slice', () => {
    const input = [0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3];
    const expected = [1, 2, 3];
    const [actual, newOffset] = coder.decode(new Uint8Array(input), 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toEqual(11);
  });

  it('throws when decoding empty raw slice data', async () => {
    await expectToThrowFuelError(
      () => coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1]), 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid raw slice byte data size.')
    );
  });

  it('throws when decoding empty raw slice data', async () => {
    await expectToThrowFuelError(
      () => coder.decode(new Uint8Array([0, 0]), 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid raw slice data size.')
    );
  });
});
