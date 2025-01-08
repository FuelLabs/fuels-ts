import { arrayify } from './arrayify';
import type { BytesLike } from './arrayify';

/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array.
 *
 * @param arrays - The arrays to concatenate.
 * @returns - The concatenated array.
 */
export const concatBytes = (
  arrays: ReadonlyArray<Uint8Array> | ReadonlyArray<number[]>
): Uint8Array => {
  const byteArrays = arrays.map((array) => {
    if (array instanceof Uint8Array) {
      return array;
    }
    return Uint8Array.from(array);
  });

  const totalSize = byteArrays.reduce((accum, item) => accum + item.length, 0);
  const concatenated = new Uint8Array(totalSize);

  byteArrays.reduce((offset, object) => {
    concatenated.set(object, offset);
    return offset + object.length;
  }, 0);

  return concatenated;
};

/**
 * Concatenates multiple BytesLike into a single Uint8Array.
 *
 * @param arrays - The arrays to concatenate.
 * @returns - The concatenated array.
 */
export const concat = (arrays: ReadonlyArray<BytesLike>): Uint8Array => {
  const bytes = arrays.map((v) => arrayify(v));

  return concatBytes(bytes);
};
