import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { StrSliceCoder } from './StrSliceCoder';

/**
 * @group node
 * @group browser
 */
describe('StrSliceCoder', () => {
  const coder = new StrSliceCoder();

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

  it('should encode a multi-byte string using its utf-8 byte length', () => {
    // 'é' is a single JS character but two UTF-8 bytes (0xC3 0xA9),
    // so the u64 length prefix must be 2, not the JS string length of 1.
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 195, 169]);

    const actual = coder.encode('é');
    expect(actual).toStrictEqual(expected);
  });

  it('round-trips a multi-byte string', () => {
    const value = 'Héllo, wörld! 👋';
    const encoded = coder.encode(value);
    const [decoded, newOffset] = coder.decode(encoded, 0);

    expect(decoded).toEqual(value);
    expect(newOffset).toEqual(encoded.length);
  });

  it('decodes a string slice', () => {
    const input = [0, 0, 0, 0, 0, 0, 0, 4, 102, 117, 101, 108];
    const expected = 'fuel';
    const [actual, newOffset] = coder.decode(new Uint8Array(input), 0);

    expect(actual).toStrictEqual(expected);
    expect(newOffset).toEqual(12);
  });

  it('throws when decoding a string slice with empty bytes', async () => {
    const input = new Uint8Array([0, 0]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string slice data size.')
    );
  });

  it('throws when decoding a string slice with empty byte data', async () => {
    const input = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255, 1]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string slice byte data size.')
    );
  });
});
