import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { BN, bn } from '@fuel-ts/math';

import { U16_MAX, U256_MAX, U32_MAX, U64_MAX, U8_MAX } from '../../../test/utils/constants';

import { BigNumberCoder } from './BigNumberCoder';

const generateArray = (length: number, value: number): Uint8Array =>
  new Uint8Array(length).fill(value);

const generateZeroes = (length: number): Uint8Array => generateArray(length, 0);

/**
 * @group browser
 * @group node
 */
describe('BigNumberCoder', () => {
  it('should encode a u64 number', () => {
    const coder = new BigNumberCoder('u64');
    const expected = new Uint8Array(generateZeroes(8));
    const actual = coder.encode(0);
    expect(actual).toStrictEqual(expected);
  });

  it('should encode a u64 [max safe integer]', () => {
    const coder = new BigNumberCoder('u64');
    const value: number = Number.MAX_SAFE_INTEGER;
    const expected = new Uint8Array([0, 31, 255, 255, 255, 255, 255, 255]);

    const data = coder.encode(value);

    expect(data).toEqual(expected);
  });

  it('should encode a u64 [very big number - as string]', () => {
    const coder = new BigNumberCoder('u64');
    const value: string = (Number.MAX_SAFE_INTEGER + 1).toString();
    const expected = new Uint8Array([0, 32, 0, 0, 0, 0, 0, 0]);

    const data = coder.encode(value);

    expect(data).toEqual(expected);
  });

  it('should throw an error when encoding [number more than max safe integer]', () => {
    const coder = new BigNumberCoder('u64');
    const value: number = Number.MAX_SAFE_INTEGER + 1;

    expect(() => coder.encode(value)).toThrow(
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u64 type - number value is too large.')
    );
  });

  it('should decode a u64 number', () => {
    const coder = new BigNumberCoder('u64');
    const expectedValue = 0;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(generateZeroes(8), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a u64 [very big number]', () => {
    const coder = new BigNumberCoder('u64');
    const data = new Uint8Array([1, 15, 174, 231, 121, 200, 89, 80]);
    const expectedValue = bn('76472027892439376');

    const [actualValue, actualLength] = coder.decode(data, 0);

    expect(actualValue).toEqualBn(expectedValue);
    expect(actualLength).toEqual(8);
  });

  it('should encode u8 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u8 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expectedValue = U8_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u16 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);
    const actual = coder.encode(U16_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u16 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expectedValue = U16_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]),
      0
    );

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u32 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expected = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]);
    const actual = coder.encode(U32_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u32 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expectedValue = U32_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]),
      0
    );

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u64 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expected = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);
    const actual = coder.encode(U64_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u64 max number', () => {
    const coder = new BigNumberCoder('u64');
    const expectedValue = U64_MAX;
    const expectedLength = 8;

    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]),
      0
    );

    expect(actualValue).toBeInstanceOf(BN);
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding an invalid u64', async () => {
    const coder = new BigNumberCoder('u64');
    await expectToThrowFuelError(
      () => coder.encode(bn(U64_MAX).add(1)),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u64.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new BigNumberCoder('u64');
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u64 data size.')
    );
  });

  it('throws when decoding empty byte data', async () => {
    const coder = new BigNumberCoder('u64');
    const input = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

    await expectToThrowFuelError(
      () => coder.decode(input, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u64 byte data size.')
    );
  });

  it('should encode a u256 number', () => {
    const coder = new BigNumberCoder('u256');
    const expected = new Uint8Array(generateZeroes(32));
    const actual = coder.encode(0);
    expect(actual).toStrictEqual(expected);
  });

  it('should decode a u256 number', () => {
    const coder = new BigNumberCoder('u256');
    const expectedValue = 0;
    const expectedLength = 32;
    const [actualValue, actualLength] = coder.decode(generateZeroes(32), 0);
    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u256 max number', () => {
    const coder = new BigNumberCoder('u256');
    const expected = new Uint8Array(generateArray(32, 255));
    const actual = coder.encode(U256_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u256 max number', () => {
    const coder = new BigNumberCoder('u256');
    const expectedValue = U256_MAX;
    const expectedLength = 32;
    const [actualValue, actualLength] = coder.decode(generateArray(32, 255), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(JSON.stringify(expectedValue)).toBe(JSON.stringify(actualValue));
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding an invalid u256', async () => {
    const coder = new BigNumberCoder('u256');
    await expectToThrowFuelError(
      () => coder.encode(bn(U256_MAX).add(1)),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u256.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new BigNumberCoder('u256');
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid u256 data size.')
    );
  });

  it('throws when decoding invalid byte data', async () => {
    const coder = new BigNumberCoder('u256');
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
