import { U8_MAX } from '../../test/utils/constants';

import StringCoder from './string';

describe('StringCoder', () => {
  const STRING_MIN_DECODED = '';
  const STRING_MIN_ENCODED = new Uint8Array();
  const STRING_MAX_DECODED = 'a'.repeat(U8_MAX);
  const STRING_MAX_ENCODED = new Uint8Array([...Array.from(Array(U8_MAX + 1).fill(97, 0, U8_MAX))]);

  it('should encode an empty string', () => {
    const coder = new StringCoder(0);
    const expected = STRING_MIN_ENCODED;
    const actual = coder.encode(STRING_MIN_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a max len string', () => {
    const coder = new StringCoder(U8_MAX);
    const expected = STRING_MAX_ENCODED;
    const actual = coder.encode(STRING_MAX_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an empty string', () => {
    const coder = new StringCoder(0);
    const expectedValue = STRING_MIN_DECODED;
    const expectedLength = STRING_MIN_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(STRING_MIN_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a max len string', () => {
    const coder = new StringCoder(U8_MAX);
    const expectedValue = STRING_MAX_DECODED;
    const expectedLength = STRING_MAX_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(STRING_MAX_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should not completely encode a string that is too big for the coder', () => {
    const coderLength = 0;
    const coder = new StringCoder(coderLength);
    const invalidInput = STRING_MAX_DECODED;
    const actual = coder.encode(invalidInput);

    expect(actual).not.toStrictEqual(STRING_MAX_ENCODED);
  });

  it('should not completely encode a string that is too small for the coder', () => {
    const coder = new StringCoder(1);
    const invalidInput = STRING_MIN_DECODED;
    const actual = coder.encode(invalidInput);

    expect(actual).not.toStrictEqual(STRING_MIN_ENCODED);
  });

  it('should not completely decode a string that is too big for the coder', () => {
    const coder = new StringCoder(1);
    const invalidInput = STRING_MAX_ENCODED;
    const [actualValue, actualLength] = coder.decode(invalidInput, 0);

    expect(actualValue).not.toBe(STRING_MAX_DECODED);
    expect(actualLength).toBe(8);
  });
});
