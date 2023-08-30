import { ByteCoder } from './byte';

describe('ByteCoder', () => {
  it('should encode a byte', () => {
    const coder = new ByteCoder();
    const input = 10;
    const expected = new Uint8Array([
      0, 0, 0, 0, 3, 255, 255, 225, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 10, 0, 1, 2, 3, 4,
      5, 6, 7, 8, 9,
    ]);

    const actual = coder.encode(input);

    expect(actual).toEqual(expected);
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
