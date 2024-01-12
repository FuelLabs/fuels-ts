import { arrayify } from './arrayify';

import { concat, concatBytes } from './concat';

/**
 * @group node
 */
describe('concat', () => {
  it('should concatenate multiple BytesLike into a single Uint8Array', () => {
    const byteslike1 = '0xff61ba809b36351b';
    const byteslike2 = new Uint8Array([23, 168, 113, 122, 53, 97, 62, 111]);
    const byteslike3 = new Uint8Array([139, 90, 68, 118, 86, 63, 133, 37]);

    const input = [byteslike1, byteslike2, byteslike3];

    const output = concat(input);

    expect(output).toBeInstanceOf(Uint8Array);
    expect(output).toStrictEqual(
      new Uint8Array([...arrayify(byteslike1), ...byteslike2, ...byteslike3])
    );
  });
});

describe('Concat Bytes', () => {
  it('can concatenate multiple Uint8Arrays', () => {
    const actual = concatBytes([
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6]),
      new Uint8Array([7, 8, 9]),
    ]);
    const expected = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(actual).toEqual(expected);
  });

  it('can concatenate multiple num arrays', () => {
    const actual = concatBytes([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const expected = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    expect(actual).toEqual(expected);
  });
});
