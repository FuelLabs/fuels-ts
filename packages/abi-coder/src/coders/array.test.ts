import { U8_MAX } from '../../test/utils/constants';

import ArrayCoder from './array';
import BooleanCoder from './boolean';
import EnumCoder from './enum';
import NumberCoder from './number';

describe('ArrayCoder', () => {
  it('should encode a number array with zero inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 0);
    const expected = new Uint8Array([]);
    const actual = coder.encode([]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a number array with zero inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 0);
    const expectedValue: number[] = [];
    const expectedLength = 0;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([]), 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode a number array with four inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 4);
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0, 0,
      255,
    ]);
    const actual = coder.encode([0, 13, 37, U8_MAX]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a number array with four inputs', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 4);
    const expectedValue = [0, 13, 37, U8_MAX];
    const expectedLength = 32;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 37, 0, 0, 0, 0, 0, 0,
        0, 255,
      ]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode an enum array with differently typed inputs', () => {
    const coder = new ArrayCoder(
      new EnumCoder('TestEnum', { a: new NumberCoder('u8'), b: new BooleanCoder() }),
      4
    );
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 255,
    ]);
    const actual = coder.encode([{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }]);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode an enum array with differently typed inputs', () => {
    const coder = new ArrayCoder(
      new EnumCoder('TestEnum', { a: new NumberCoder('u8'), b: new BooleanCoder() }),
      4
    );
    const expectedValue = [{ a: 0 }, { b: false }, { b: true }, { a: U8_MAX }];
    const expectedLength = 64;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 255,
      ]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw when value to encode is not array', () => {
    const coder = new ArrayCoder(new NumberCoder('u8'), 1);
    const nonArrayInput = { ...[1] };
    expect(() => {
      coder.encode(nonArrayInput);
    }).toThrow('expected array value');
  });
});
