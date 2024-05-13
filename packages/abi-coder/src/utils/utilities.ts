import { WORD_SIZE } from './constants';

/**
 * Turns:
  Uint8Array(24) [
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 24
  ]

  Into:
  Array [
    Uint8Array(8) [
      0, 0, 0, 0, 0, 0, 0, 1
    ],
    Uint8Array(8) [
      0, 0, 0, 0, 0, 0, 0, 2
    ],
    Uint8Array(8) [
      0, 0, 0, 0, 0, 0, 0, 24
    ]
  ]
 *
 */
export const chunkByLength = (data: Uint8Array, length = WORD_SIZE): Uint8Array[] => {
  const chunks = [];
  let offset = 0;
  let chunk = data.slice(offset, offset + length);
  while (chunk.length) {
    chunks.push(chunk);
    offset += length;
    chunk = data.slice(offset, offset + length);
  }

  return chunks;
};

export const isUint8Array = (value: unknown): value is Uint8Array => value instanceof Uint8Array;
