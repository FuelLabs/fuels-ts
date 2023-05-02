import * as mathMod from '@fuel-ts/math';

import BooleanCoder from './boolean';

jest.mock('@fuel-ts/math', () => ({
  __esModule: true,
  ...jest.requireActual('@fuel-ts/math'),
}));

describe('BooleanCoder', () => {
  const TRUE_DECODED = true;
  const TRUE_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
  const FALSE_DECODED = false;
  const FALSE_ENCODED = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

  const coder = new BooleanCoder();

  it('should encode a true boolean', () => {
    const expected = TRUE_ENCODED;
    const actual = coder.encode(TRUE_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a false boolean', () => {
    const expected = FALSE_ENCODED;
    const actual = coder.encode(FALSE_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a true boolean', () => {
    const expectedValue = TRUE_DECODED;
    const expectedLength = TRUE_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(TRUE_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a false boolean', () => {
    const expectedValue = FALSE_DECODED;
    const expectedLength = FALSE_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(FALSE_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding an invalid boolean value', () => {
    const toBytesSpy = jest
      .spyOn(mathMod, 'toBytes')
      .mockReturnValueOnce(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]));

    expect(() => {
      coder.encode(TRUE_DECODED);
    }).toThrow('Invalid bool');
  });

  it('should throw an error when input to encode cannot be converted to bytes', () => {
    const toBytesSpy = jest.spyOn(mathMod, 'toBytes').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(() => {
      coder.encode(TRUE_DECODED);
    }).toThrow('Invalid bool');
  });

  it('should throw an error when decoding an invalid boolean value', () => {
    const invalidInput = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);

    expect(() => {
      coder.decode(invalidInput, 0);
    }).toThrow('Invalid boolean value');
  });
});
