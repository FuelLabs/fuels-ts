import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { ByteCoder } from './ByteCoder';

/**
 * @group node
 * @group browser
 */
describe('ByteCoder', () => {
  const coder = new ByteCoder();

  it('should encode a byte', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
    const actual = coder.encode([1, 2, 3]);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a byte [byte array]', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 3, 1, 2, 3]);
    const actual = coder.encode(Uint8Array.from([1, 2, 3]));

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a byte [full word]', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 8, 1, 2, 3, 4, 5, 6, 7, 8]);
    const actual = coder.encode([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a byte', () => {
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const expected = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(18);
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
