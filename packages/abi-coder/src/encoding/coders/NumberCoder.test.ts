import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { U8_MAX, U16_MAX, U32_MAX } from '../../../test/utils/constants';

import { NumberCoder } from './NumberCoder';

/**
 * @group node
 * @group browser
 */
describe('NumberCoder', () => {
  it('encodes min u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expected = new Uint8Array([0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a min u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expectedValue = 0;
    const expectedLength = 1;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes amax u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expected = new Uint8Array([255]);
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a max u8 number as a u8 coder', () => {
    const coder = new NumberCoder('u8');
    const expectedValue = U8_MAX;
    const expectedLength = 1;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([255]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes min u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expected = new Uint8Array([0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a min u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expectedValue = 0;
    const expectedLength = 2;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes max u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expected = new Uint8Array([255, 255]);
    const actual = coder.encode(U16_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a max u16 number as a u16 coder', () => {
    const coder = new NumberCoder('u16');
    const expectedValue = U16_MAX;
    const expectedLength = 2;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([255, 255]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes min u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expected = new Uint8Array([0, 0, 0, 0]);
    const actual = coder.encode(0);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a min u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expectedValue = 0;
    const expectedLength = 4;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([0, 0, 0, 0]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes max u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expected = new Uint8Array([255, 255, 255, 255]);
    const actual = coder.encode(U32_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a max u32 number as a u32 coder', () => {
    const coder = new NumberCoder('u32');
    const expectedValue = U32_MAX;
    const expectedLength = 4;
    const [actualValue, actualLength] = coder.decode(new Uint8Array([255, 255, 255, 255]), 0);

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('throws if a negative number is encoded', async () => {
    const coder = new NumberCoder('u8');
    const invalidInput = -1;

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid u8.')
    );
  });

  it('throws if coder is too small for number size', async () => {
    const coder = new NumberCoder('u8');
    const invalidInput = U32_MAX;

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, `Invalid u8, too many bytes.`)
    );
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new NumberCoder('u32');
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid number data size.')
    );
  });

  it('throws when decoding empty byte data', async () => {
    const coder = new NumberCoder('u32');
    const input = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7]);

    await expectToThrowFuelError(
      () => coder.decode(input, 8),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid number byte data size.')
    );
  });

  it('throws for unsupported numbers', async () => {
    const invalidNumber = 'u64';

    await expectToThrowFuelError(
      // @ts-expect-error Expected to throw error
      () => new NumberCoder(invalidNumber),
      new FuelError(ErrorCode.TYPE_NOT_SUPPORTED, `Invalid number type: ${invalidNumber}`)
    );
  });

  it('encodes a u8 number [padded]', () => {
    const coder = new NumberCoder('u8', { padToWordSize: true });
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]);
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a u8 number [padded]', () => {
    const coder = new NumberCoder('u8', { padToWordSize: true });
    const expectedValue = U8_MAX;
    const expectedLength = 8;

    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, U8_MAX]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes a u16 number [padded]', () => {
    const coder = new NumberCoder('u16', { padToWordSize: true });
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, U8_MAX, U8_MAX]);
    const actual = coder.encode(U16_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a u16 number [padded]', () => {
    const coder = new NumberCoder('u16', { padToWordSize: true });
    const expectedValue = U16_MAX;
    const expectedLength = 8;

    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, U8_MAX, U8_MAX]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('encodes a u32 number [padded]', () => {
    const coder = new NumberCoder('u32', { padToWordSize: true });
    const expected = new Uint8Array([0, 0, 0, 0, U8_MAX, U8_MAX, U8_MAX, U8_MAX]);
    const actual = coder.encode(U32_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('decodes a u32 number [padded]', () => {
    const coder = new NumberCoder('u32', { padToWordSize: true });
    const expectedValue = U32_MAX;
    const expectedLength = 8;

    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, U8_MAX, U8_MAX, U8_MAX, U8_MAX]),
      0
    );

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });
});
