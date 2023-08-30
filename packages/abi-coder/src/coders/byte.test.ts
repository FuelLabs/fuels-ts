import type { Uint8ArrayWithDynamicData } from '../utilities';

import { ByteCoder } from './byte';

describe('ByteCoder', () => {
  it('should encode a byte', () => {
    const coder = new ByteCoder();
    const expected: Uint8ArrayWithDynamicData = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3,
    ]);
    expected.dynamicData = {
      0: new Uint8Array([1, 2, 3]),
    };

    const actual = coder.encode([1, 2, 3]);

    expect(actual).toStrictEqual(expected);
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
});
