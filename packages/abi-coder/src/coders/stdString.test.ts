import type { Uint8ArrayWithDynamicData } from '../utilities';

import { StdStringCoder } from './stdString';

/**
 * @group node
 */
describe('StdStringCoder', () => {
  it('should encode an empty string', () => {
    const coder = new StdStringCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([]),
    };

    const actual = coder.encode('');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [hello world]', () => {
    const coder = new StdStringCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 11,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100, 0, 0, 0, 0, 0]),
    };

    const actual = coder.encode('hello world');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [H3llo W0rld]', () => {
    const coder = new StdStringCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 11,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([72, 51, 108, 108, 111, 32, 87, 48, 114, 108, 100, 0, 0, 0, 0, 0]),
    };

    const actual = coder.encode('H3llo W0rld');
    expect(actual).toStrictEqual(expected);
  });

  it('should encode [abcdefghijklmnopqrstuvwxyz1234567890]', () => {
    const coder = new StdStringCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 36,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([
        97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,
        116, 117, 118, 119, 120, 121, 122, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 0, 0, 0, 0,
      ]),
    };

    const actual = coder.encode('abcdefghijklmnopqrstuvwxyz1234567890');
    expect(actual).toStrictEqual(expected);
  });

  it('should decode a string', () => {
    const coder = new StdStringCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 49, 120, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 72, 101, 108,
      108, 111, 32, 87, 111, 114, 108, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const expected = 'Hello World';

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });

  it('should decode a string [with offset]', () => {
    const coder = new StdStringCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 49, 120, 0, 0, 0, 0, 0, 0, 0, 11, 0, 0, 0, 0, 0, 0, 0, 11, 72, 101, 108,
      108, 111, 32, 87, 111, 114, 108, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const expected = 'Hello World';

    const [actual, newOffset] = coder.decode(input, 16);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(40);
  });
});
