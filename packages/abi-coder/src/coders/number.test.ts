import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { U8_MAX, U16_MAX, U32_MAX } from '../../test/utils/constants';

import { NumberCoder } from './number';

/**
 * @group node
 */
describe('NumberCoder', () => {
  it('should encode min u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a min u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expectedValue = 0;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode max u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]);
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a max u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expectedValue = U8_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 255]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode min u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a min u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expectedValue = 0;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode max u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]);
    const actual = coder.encode(U16_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a max u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expectedValue = U16_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 255, 255]),
      0
    );

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode min u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a min u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expectedValue = 0;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode max u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expected = new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]);
    const actual = coder.encode(U32_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a max u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expectedValue = U32_MAX;
    const expectedLength = 8;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 255, 255, 255, 255]),
      0
    );

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw if a negative number is encoded', () => {
    const coder = new NumberCoder('u8');
    const invalidInput = -1;

    expect(() => {
      coder.encode(invalidInput);
    }).toThrow('Invalid u8');
  });

  it('should throw if coder is too small for number size', async () => {
    const coder = new NumberCoder('u8');
    const invalidInput = U32_MAX;

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, `Invalid u8, too many bytes.`)
    );
  });
});
