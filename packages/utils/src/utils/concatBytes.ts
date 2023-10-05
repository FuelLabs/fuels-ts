/**
 * Concatenates multiple Uint8Arrays into a single Uint8Array.
 *
 * @param arrays - The arrays to concatenate.
 * @returns - The concatenated array.
 */
export const concatBytes = (arrays: ReadonlyArray<Uint8Array>): Uint8Array => {
  const totalSize = arrays.reduce((accum, item) => accum + item.length, 0);
  const concatenated = new Uint8Array(totalSize);

  arrays.reduce((offset, object) => {
    concatenated.set(object, offset);
    return offset + object.length;
  }, 0);

  return concatenated;
};
