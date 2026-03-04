import { FuelError, ErrorCode } from '@fuel-ts/errors';

import { arrayify } from './arrayify';
import type { BytesLike } from './arrayify';

/**
 * @group node
 * @group browser
 */
describe('arrayify', () => {
  it('returns Uint8Array from Uint8Array', () => {
    expect(arrayify(new Uint8Array([0, 1, 2, 3]))).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from hex string', () => {
    expect(arrayify('0x00010203')).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it('returns Uint8Array from Buffer', () => {
    expect(arrayify(Buffer.from('20'))).toEqual(new Uint8Array([50, 48]));
  });

  it('throws for invalid string', () => {
    expect(() => arrayify('nope')).toThrow();
  });

  it('should return a Uint8Array from a valid hex string', () => {
    const hexString = '0x0102030405';
    const result = arrayify(hexString);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toEqual(new Uint8Array([1, 2, 3, 4, 5]));
  });

  it('should return a copied Uint8Array when copy is true', () => {
    const originalArray = new Uint8Array([1, 2, 3, 4, 5]);
    const result = arrayify(originalArray, 'original array', true);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).not.toBe(originalArray);
    expect(result).toEqual(originalArray);
  });

  test('should return the original Uint8Array when copy is false', () => {
    const originalArray = new Uint8Array([1, 2, 3, 4, 5]);
    const result = arrayify(originalArray, 'original array', false);
    expect(result).toBeInstanceOf(Uint8Array);
    expect(result).toBe(originalArray);
  });

  test('should throw a FuelError for an invalid hex string', () => {
    const invalidHexString = '0xgg0102030405';
    expect(() => arrayify(invalidHexString)).toThrowError(
      new FuelError(
        ErrorCode.INVALID_DATA,
        'invalid data: 0xgg0102030405\nIf you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.'
      )
    );
  });

  test('should throw a FuelError for an invalid input', () => {
    const invalidInput = 123 as unknown as BytesLike;
    expect(() => arrayify(invalidInput, 'invalid input')).toThrowError(
      new FuelError(
        ErrorCode.INVALID_DATA,
        'invalid data: invalid input - 123\nIf you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.'
      )
    );
  });

  test('should throw for integer hex value', () => {
    const invalidHexString = 0xd5579c46 as unknown as BytesLike;
    expect(() => arrayify(invalidHexString, 'hex')).toThrowError(
      new FuelError(
        ErrorCode.INVALID_DATA,
        'invalid data: hex - 3579288646\nIf you are attempting to transform a hex value, please make sure it is being passed as a string and wrapped in quotes.'
      )
    );
  });
});
