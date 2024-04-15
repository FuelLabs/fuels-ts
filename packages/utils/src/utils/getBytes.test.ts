import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';

import { getBytes } from './getBytes';

/**
 * @group node
 * @group browser
 */
describe('getBytes', () => {
  test('should return a Uint8Array from a valid hex string', () => {
    const hexString = '0x0102030405';
    const result = getBytes(hexString);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  test('should return a copied Uint8Array when copy is true', () => {
    const originalArray = new Uint8Array([1, 2, 3, 4, 5]);
    const result = getBytes(originalArray, 'original array', true);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).not.toBe(originalArray);
    expect(result).toEqual(originalArray);
  });

  test('should return the original Uint8Array when copy is false', () => {
    const originalArray = new Uint8Array([1, 2, 3, 4, 5]);
    const result = getBytes(originalArray, 'original array', false);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toBe(originalArray);
  });

  test('should throw a FuelError for an invalid hex string', () => {
    const invalidHexString = '0xgg0102030405';
    expect(() => getBytes(invalidHexString)).toThrowError(
      new FuelError(ErrorCode.INVALID_DATA, 'invalid data - ')
    );
  });

  test('should throw a FuelError for an invalid input', () => {
    const invalidInput = 123 as unknown as BytesLike;
    expect(() => getBytes(invalidInput, 'invalid input')).toThrowError(
      new FuelError(ErrorCode.INVALID_DATA, 'invalid data - invalid input')
    );
  });
});
