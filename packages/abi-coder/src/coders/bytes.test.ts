import { ByteCoder } from './byte';

describe('ByteCoder', () => {
  it('should encode a byte', () => {
    const coder = new ByteCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 41, 16, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
      8, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7,
    ]);
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 41, 16, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
      8, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7,
    ]);

    const actual = coder.encode(input);

    expect(actual).toEqual(expected);
  });

  it('should decode a byte', () => {
    const coder = new ByteCoder();
    const input = new Uint8Array([
      0, 0, 0, 0, 0, 0, 41, 16, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0,
      8, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 7,
    ]);
    const expected = [8, 6, 7];

    const [actual, newOffset] = coder.decode(input, 0);

    expect(actual).toEqual(expected);
    expect(newOffset).toEqual(24);
  });
});
