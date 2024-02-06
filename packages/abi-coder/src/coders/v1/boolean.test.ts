import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { BooleanCoder } from './boolean';

/**
 * @group node
 */
describe('BooleanCoder', () => {
  const TRUE_DECODED = true;
  const TRUE_ENCODED = new Uint8Array([1]);
  const FALSE_DECODED = false;
  const FALSE_ENCODED = new Uint8Array([0]);

  const coder = new BooleanCoder();

  it('encodes a true boolean', () => {
    const expected = TRUE_ENCODED;
    const actual = coder.encode(TRUE_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('encodes a false boolean', () => {
    const expected = FALSE_ENCODED;
    const actual = coder.encode(FALSE_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a true boolean', () => {
    const expectedValue = TRUE_DECODED;
    const expectedLength = TRUE_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(TRUE_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('decodes a false boolean', () => {
    const expectedValue = FALSE_DECODED;
    const expectedLength = FALSE_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(FALSE_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it.each([undefined, null, 0, {}, [], '', 'a', Symbol('asd')])(
    'should throw an error when encoding an invalid boolean value',
    (val) => {
      expect(() => {
        // @ts-expect-error val isn't boolean due to nature of test
        coder.encode(val);
      }).toThrow('Invalid bool');
    }
  );

  it('throws an error when decoding an invalid boolean value', async () => {
    const invalidInput = new Uint8Array([2]);
    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid boolean value.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid boolean data size.')
    );
  });
});
