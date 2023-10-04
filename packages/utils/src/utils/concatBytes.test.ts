import { concatBytes } from './concatBytes';

describe('concatBytes', () => {
  it('can concatenate multiple Uint8Arrays', () => {
    const actual = concatBytes([
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6]),
      new Uint8Array([7, 8, 9]),
    ]);
    const expected = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(actual).toEqual(expected);
  });
});
