import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { BN, bn } from '@fuel-ts/math';

import { U256_MAX } from '../../../../test/utils/constants';

import { U256Coder } from './U256Coder';

const generateArray = (length: number, value: number): Uint8Array =>
  new Uint8Array(length).fill(value);

const generateZeroes = (length: number): Uint8Array => generateArray(length, 0);

/**
 * @group browser
 * @group node
 */
describe('U256Coder', () => {
  const coder = new U256Coder();

  it('should encode a u256 number', () => {
    const expected = new Uint8Array(generateZeroes(32));
    const actual = coder.encode(0);
    expect(actual).toStrictEqual(expected);
  });

  it('should decode a u256 number', () => {
    const expectedValue = 0;
    const expectedLength = 32;
    const [actualValue, actualLength] = coder.decode(generateZeroes(32), 0);
    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u256 max number', () => {
    const expected = new Uint8Array(generateArray(32, 255));
    const actual = coder.encode(U256_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u256 max number', () => {
    const expectedValue = U256_MAX;
    const expectedLength = 32;
    const [actualValue, actualLength] = coder.decode(generateArray(32, 255), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(JSON.stringify(expectedValue)).toBe(JSON.stringify(actualValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding an invalid u256', async () => {
    await expectToThrowFuelError(
      () => coder.encode(bn(U256_MAX).add(1)),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u256.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u256 data size.')
    );
  });

  it('throws when decoding invalid byte data', async () => {
    const input = new Uint8Array([
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31,
    ]);

    await expectToThrowFuelError(
      () => coder.decode(input, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u256 byte data size.')
    );
  });
});
