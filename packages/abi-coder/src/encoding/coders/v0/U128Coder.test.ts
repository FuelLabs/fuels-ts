import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { BN, bn } from '@fuel-ts/math';

import { U128_MAX } from '../../../../test/utils/constants';

import { U128Coder } from './U128Coder';

const generateArray = (length: number, value: number): Uint8Array =>
  new Uint8Array(length).fill(value);

const generateZeroes = (length: number): Uint8Array => generateArray(length, 0);

/**
 * @group browser
 * @group node
 */
describe('U128Coder', () => {
  const coder = new U128Coder();

  it('should encode a u128 number', () => {
    const expected = new Uint8Array(generateZeroes(16));
    const actual = coder.encode(0);
    expect(actual).toStrictEqual(expected);
  });

  it('should decode a u128 number', () => {
    const expectedValue = 0;
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(generateZeroes(16), 0);
    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u128 max number', () => {
    const expected = new Uint8Array(generateArray(16, 255));
    const actual = coder.encode(U128_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u128 max number', () => {
    const expectedValue = U128_MAX;
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(generateArray(16, 255), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(JSON.stringify(expectedValue)).toBe(JSON.stringify(actualValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding an invalid u128', async () => {
    await expectToThrowFuelError(
      () => coder.encode(bn(U128_MAX).add(1)),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u128.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u128 data size.')
    );
  });

  it('throws when decoding invalid byte data', async () => {
    const input = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

    await expectToThrowFuelError(
      () => coder.decode(input, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u128 byte data size.')
    );
  });
});
