import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { ByteCoder } from './ByteCoder';

/**
 * @group node
 * @group browser
 */
describe('ByteCoder', () => {
  const coder = new ByteCoder();

  it('throws when encoding a byte', async () => {
    await expectToThrowFuelError(
      () => coder.encode([1, 2, 3, 4, 5, 6, 7, 8]),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Bytes encode unsupported in v1')
    );
  });

  it('decodes a byte', () => {
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const expected = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(10);
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid byte data size.')
    );
  });

  it('throws when decoding empty byte data', async () => {
    const input = new Uint8Array([
      0, 0, 0, 0, 3, 255, 255, 225, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 255,
    ]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid bytes byte data size.')
    );
  });
});
