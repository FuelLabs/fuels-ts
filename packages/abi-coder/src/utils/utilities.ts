import type { Coder } from '../encoding/coders/AbstractCoder';

import { OPTION_CODER_TYPE, WORD_SIZE } from './constants';

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

export type TCoders = Record<string, Coder>;

/**
 * Finds a deeply nested option in a coders object.
 *
 * @param coders - the coders object to search.
 * @returns - whether the coder has been found.
 */
export const hasNestedOption = (coders: Record<string, Coder> | Coder[]): boolean => {
  const array = Array.isArray(coders) ? coders : Object.values(coders);

  for (const node of array) {
    if (node.type === OPTION_CODER_TYPE) {
      return true;
    }

    if ('coder' in node && (node.coder as Coder).type === OPTION_CODER_TYPE) {
      return true;
    }

    if ('coders' in node) {
      const child = hasNestedOption(node.coders as TCoders);
      if (child) {
        return true;
      }
    }
  }

  return false;
};
