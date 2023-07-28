/**
 * Function to take a byte array and split into chunks of a given size
 *
 * @param bytes - The byte array to chunk
 * @param chunkSize - The size of each chunk
 * @returns An array of byte arrays of a specified size
 */
export const chunkAndPadBytes = (bytes: Uint8Array, chunkSize: number): Uint8Array[] => {
  const chunks: Uint8Array[] = [];

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const chunk = new Uint8Array(chunkSize);
    chunk.set(bytes.slice(offset, offset + chunkSize));
    chunks.push(chunk);
  }

  const lastChunk = chunks[chunks.length - 1];
  const remainingBytes = bytes.length % chunkSize;
  const paddedChunkLength = remainingBytes + ((8 - (remainingBytes % 8)) % 8);
  const newChunk = lastChunk.slice(0, paddedChunkLength);
  chunks[chunks.length - 1] = newChunk;

  return chunks;
};
