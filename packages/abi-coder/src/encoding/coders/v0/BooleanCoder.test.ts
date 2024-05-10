import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { BooleanCoder } from './BooleanCoder';

/**
 * @group node
 */
describe('BooleanCoder', () => {
  const trueDecoded = true;
  const trueEncoded = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
  const falseDecoded = false;
  const falseEncoded = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);

  const coder = new BooleanCoder();

  it('should encode a true boolean', () => {
    const expected = trueEncoded;
    const actual = coder.encode(trueDecoded);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a false boolean', () => {
    const expected = falseEncoded;
    const actual = coder.encode(falseDecoded);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a true boolean', () => {
    const expectedValue = trueDecoded;
    const expectedLength = trueEncoded.length;
    const [actualValue, actualLength] = coder.decode(trueEncoded, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a false boolean', () => {
    const expectedValue = falseDecoded;
    const expectedLength = falseEncoded.length;
    const [actualValue, actualLength] = coder.decode(falseEncoded, 0);

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
    },
  );
  it('should throw an error when decoding an invalid boolean value', async () => {
    const invalidInput = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2]);
    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid boolean value.'),
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid boolean data size.'),
    );
  });
});
