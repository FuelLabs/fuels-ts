import { FuelError, ErrorCode } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import type { Uint8ArrayWithDynamicData } from '../utilities';

import { ByteCoder } from './byte';

/**
 * @group node
 */
describe('ByteCoder', () => {
  it('should encode a byte', () => {
    const coder = new ByteCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 3,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([1, 2, 3, 0, 0, 0, 0, 0]),
    };

    const actual = coder.encode([1, 2, 3]);

    expect(actual).toStrictEqual(expected);
  });

  it('should encode a byte [full word]', () => {
    const coder = new ByteCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 8,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
    };

    const actual = coder.encode([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(actual).toStrictEqual(expected);
  });

  it('should throw when value to encode is not array', async () => {
    const coder = new ByteCoder();
    const nonArrayInput = { ...[1] };
    await expectToThrowFuelError(
      () => coder.encode(nonArrayInput),
      new FuelError(ErrorCode.ENCODE_ERROR, 'Expected array value.')
    );
  });

  it('should decode a byte', () => {
    const coder = new ByteCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 3, 255, 255, 225, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 10, 0, 1, 2, 3, 4,
      5, 6, 7, 8, 9,
    ]);
    const expected = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });

  it('should decode a byte [with padding]', () => {
    const coder = new ByteCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 3, 255, 255, 225, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 11, 0, 1, 2, 3, 4,
      5, 6, 7, 8, 9, 10, 0, 0, 0, 0, 0,
    ]);
    const expected = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });

  it('throws when decoding empty bytes', async () => {
    const coder = new ByteCoder();
    const input = new Uint8Array(0);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid byte data size.')
    );
  });

  it('throws when decoding empty byte data', async () => {
    const coder = new ByteCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 3, 255, 255, 225, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 255,
    ]);

    await expectToThrowFuelError(
      () => coder.decode(input, 0),
      new FuelError(ErrorCode.DECODE_ERROR, 'Invalid bytes byte data size.')
    );
  });
});
