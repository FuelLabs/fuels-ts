/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BN } from '@fuel-ts/math';

import { U8_MAX } from '../../../test/utils/constants';

import { OptionCoder } from './option';
import { U64Coder } from './u64';

describe('OptionCoder', () => {
  it('should encode a some u64 option ', () => {
    const coder = new OptionCoder('test option', { Some: new U64Coder() });
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]);
    // @ts-expect-error
    const actual = coder.encode(U8_MAX);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a some u64 option', () => {
    const coder = new OptionCoder('test option', { Some: new U64Coder() });
    const expectedValue = U8_MAX;
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255]),
      0
    );

    expect(actualValue).toBeInstanceOf(BN);
    expect((actualValue as unknown as BN).toNumber()).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });

  it('should encode a none u64 option', () => {
    const coder = new OptionCoder('test option', { None: new U64Coder() });
    const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    // @ts-expect-error
    const actual = coder.encode(undefined);

    expect(actual).toStrictEqual(expected);
  });

  it('should decode a none u64 option', () => {
    const coder = new OptionCoder('test option', { None: new U64Coder() });
    const expectedValue = undefined;
    const expectedLength = 16;
    const [actualValue, actualLength] = coder.decode(
      new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      0
    );

    expect(actualValue).toBe(expectedValue);
    expect(actualLength).toBe(expectedLength);
  });
});
