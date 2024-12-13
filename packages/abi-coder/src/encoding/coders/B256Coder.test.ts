import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { B256Coder } from './B256Coder';

/**
 * @group node
 * @group browser
 */
describe('B256Coder', () => {
  const B256_DECODED = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
  const B256_ENCODED = new Uint8Array([
    213, 87, 156, 70, 223, 204, 127, 24, 32, 112, 19, 230, 91, 68, 228, 203, 78, 44, 34, 152, 244,
    172, 69, 123, 168, 248, 39, 67, 243, 30, 147, 11,
  ]);
  const B256_ZERO_DECODED = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const B256_ZERO_ENCODED = new Uint8Array(32);

  const coder = new B256Coder();

  it('should encode [zero] as a 256 bit hash string', () => {
    const expected = B256_ZERO_ENCODED;
    const actual = coder.encode(B256_ZERO_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a 256 bit hash string', () => {
    const expected = B256_ENCODED;
    const actual = coder.encode(B256_DECODED);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode zero as a 256 bit hash string', () => {
    const expectedValue = B256_ZERO_DECODED;
    const expectedLength = B256_ZERO_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B256_ZERO_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should decode a 256 bit hash string', () => {
    const expectedValue = B256_DECODED;
    const expectedLength = B256_ENCODED.length;
    const [actualValue, actualLength] = coder.decode(B256_ENCODED, 0);

    expect(actualValue).toStrictEqual(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should throw an error when encoding a 256 bit hash string that is too short', async () => {
    const invalidInput = B256_DECODED.slice(0, B256_DECODED.length - 1);

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });

  it('should throw an error when decoding an encoded 256 bit hash string that is too short', async () => {
    const invalidInput = B256_ENCODED.slice(0, B256_ENCODED.length - 1);

    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 data size.')
    );
  });

  it('should throw an error when encoding a 256 bit hash string that is too long', async () => {
    const invalidInput = `${B256_DECODED}0`;

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });

  it('should throw an error when encoding a 512 bit hash string', async () => {
    const B512 =
      '0x8e9dda6f7793745ac5aacf9e907cae30b2a01fdf0d23b7750a85c6a44fca0c29f0906f9d1f1e92e6a1fb3c3dcef3cc3b3cdbaae27e47b9d9a4c6a4fce4cf16b2';

    await expectToThrowFuelError(
      () => coder.encode(B512),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });

  it('should throw an error when encoding a 256 bit hash string that is not a hex string', async () => {
    const invalidInput = 'not a hex string';

    await expectToThrowFuelError(
      () => coder.encode(invalidInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Invalid b256.')
    );
  });

  it('throws when decoding empty bytes', async () => {
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 data size.')
    );
  });

  it('should throw an error when decoding an encoded b256 bit hash string that is too long', async () => {
    const invalidInput = new Uint8Array(Array.from(Array(65).keys()));

    await expectToThrowFuelError(
      () => coder.decode(invalidInput, 62),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid b256 byte data size.')
    );
  });
});
