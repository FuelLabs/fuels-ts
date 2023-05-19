import { BN, bn } from '@fuel-ts/math';

import { U8_MAX, U16_MAX, U32_MAX, U64_MAX } from '../../test/utils/constants';

import U64Coder from './u64';

describe('U64Coder', () => {
  const coder = new U64Coder();

  it('should encode a u64 number', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a u64 number', () => {
    const expectedValue = 0;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u8 max number', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u8 max number', () => {
    const expectedValue = U8_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]), 0);

    expect(actualValue).toBeInstanceOf(BN);
    expect(actualValue.toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode u16 max number', () => {
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);
    const actual = coder.encode(U16_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u16 max number', () => {
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
    const expected = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]);
    const actual = coder.encode(U32_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u32 max number', () => {
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
    const expected = new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]);
    const actual = coder.encode(U64_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode u64 max number', () => {
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

  it('should throw an error when encoding an invalid u64', () => {
    expect(() => {
      coder.encode(bn(U64_MAX).add(1));
    }).toThrow('Invalid u64');
  });
});
