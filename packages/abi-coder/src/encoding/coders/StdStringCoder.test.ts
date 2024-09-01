import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { StdStringCoder } from './StdStringCoder';

/**
 * @group node
 * @group browser
 */
describe('StdStringCoder', () => {
  const coder = new StdStringCoder();
  it('should encode an empty string', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.encode('');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [hello world]', () => {
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 11, 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100,
    ]);

    const actual = coder.encode('hello world');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [H3llo W0rld]', () => {
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 11, 72, 51, 108, 108, 111, 32, 87, 48, 114, 108, 100,
    ]);

    const actual = coder.encode('H3llo W0rld');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [abcdefghijklmnopqrstuvwxyz1234567890]', () => {
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 36, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
      111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 48,
    ]);

    const actual = coder.encode('abcdefghijklmnopqrstuvwxyz1234567890');
    expect(actual).toStrictEqual(expected);
  });

  it('decodes a string', () => {
    const input = [0, 0, 0, 0, 0, 0, 0, 4, 102, 117, 101, 108];
    const expected = 'fuel';
    const [actual, newOffset] = coder.decode(new Uint8Array(input), 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toEqual(12);
  });

  it('throws when decoding a string with empty bytes', async () => {
    const input = new Uint8Array([0, 0]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid std string data size.')
    );
  });

  it('throws when decoding a string with empty byte data', async () => {
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid std string byte data size.')
    );
  });
});
