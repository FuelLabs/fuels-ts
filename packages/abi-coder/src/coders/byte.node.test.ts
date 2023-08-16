import { U8_MAX } from '../../test/utils/constants';

import { ByteCoder } from './byte';

describe('ByteCoder', () => {
  const BYTE_MIN_DECODED = 0;
  const BYTE_MIN_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
  const BYTE_MAX_DECODED = U8_MAX;
  const BYTE_MAX_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);

  const coder = new ByteCoder();

  it('should encode a byte with a minimum number input', () => {
    const expected = BYTE_MIN_ENCODED;
    const actual = coder.encode(BYTE_MIN_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a byte with a maximum number input', () => {
    const expected = BYTE_MAX_ENCODED;
    const actual = coder.encode(BYTE_MAX_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a byte with a minimum number input', () => {
    const expectedValue = BYTE_MIN_DECODED;
    const expectedLength = BYTE_MIN_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(BYTE_MIN_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a byte with a maximum number input', () => {
    const expectedValue = BYTE_MAX_DECODED;
    const expectedLength = BYTE_MAX_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(BYTE_MAX_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw when encoding a byte that is too small', () => {
    const invalidInput = -1;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid Byte');
  });

  it('should throw when encoding a byte that is too big', () => {
    const invalidInput = U8_MAX + 1;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid Byte');
  });

  it('should throw when decoding an invalid byte', () => {
    const invalidInput = new Uint8Array(Array.from(Array(4).keys()));

    expect(() => {
      coder.decode(invalidInput, 1);
    }).toThrow('Invalid Byte');
  });
});
