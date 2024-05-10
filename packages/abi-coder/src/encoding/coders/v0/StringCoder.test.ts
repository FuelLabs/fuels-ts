import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { U8_MAX } from '../../../../test/utils/constants';

import { StringCoder } from './StringCoder';

/**
 * @group node
 * @group browser
 */
describe('StringCoder', () => {
  const stringMinDecoded = '';
  const stringMinEncoded = new Uint8Array();
  const stringMaxDecoded = 'a'.repeat(U8_MAX);
  const stringMaxEncoded = new Uint8Array([
    ...Array.from(Array(U8_MAX + 1).fill(97, 0, U8_MAX)),
  ]);

  it('should encode an empty string', () => {
    const coder = new StringCoder(0);
    const expected = stringMinEncoded;
    const actual = coder.encode(stringMinDecoded);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a max len string', () => {
    const coder = new StringCoder(U8_MAX);
    const expected = stringMaxEncoded;
    const actual = coder.encode(stringMaxDecoded);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an empty string', () => {
    const coder = new StringCoder(0);
    const expectedValue = stringMinDecoded;
    const expectedLength = stringMinEncoded.length;
    const [actualValue, actualLength] = coder.decode(stringMinEncoded, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a max len string', () => {
    const coder = new StringCoder(U8_MAX);
    const expectedValue = stringMaxDecoded;
    const expectedLength = stringMaxEncoded.length;
    const [actualValue, actualLength] = coder.decode(stringMaxEncoded, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw when encoding a string that is too big', async () => {
    const coder = new StringCoder(0);
    const invalidInput = stringMaxDecoded;

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(
        ErrorCode.ENCODE_ERROR,
        'Value length mismatch during encode.',
      ),
    );
  });

  it('should throw when encoding a string that is too small', async () => {
    const coder = new StringCoder(1);
    const invalidInput = stringMinDecoded;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow();

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(
        ErrorCode.ENCODE_ERROR,
        'Value length mismatch during encode.',
      ),
    );
  });

  it('should not completely decode a string that is too big for the coder', () => {
    const coder = new StringCoder(1);
    const invalidInput = stringMaxEncoded;
    const [actualValue, actualLength] = coder.decode(invalidInput, 0);

    expect(actualValue).not.toBe(stringMaxDecoded);
    expect(actualLength).toBe(8);
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new StringCoder(1);
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string data size.'),
    );
  });

  it('throws when decoding empty byte data', async () => {
    const coder = new StringCoder(1);
    const input = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

    await expectToThrowFuelError(
      () => coder.decode(input, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid string byte data size.'),
    );
  });
});
