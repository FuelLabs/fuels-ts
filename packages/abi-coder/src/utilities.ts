import type { BytesLike } from '@ethersproject/bytes';
import { concat, arrayify } from '@ethersproject/bytes';

import U64Coder from './coders/u64';
import { OPTION_CODER_TYPE, WORD_SIZE } from './constants';
import type { ParamType } from './fragments/param-type';

export function filterEmptyParams<T>(types: T): T;
export function filterEmptyParams(types: ReadonlyArray<string | ParamType>) {
  return types.filter((t) => (t as Readonly<ParamType>)?.type !== '()' && t !== '()');
}

export function hasOptionTypes<T>(types: T): T;
export function hasOptionTypes(types: ReadonlyArray<string | ParamType>) {
  return types.some((t) => (t as Readonly<ParamType>)?.type === OPTION_CODER_TYPE);
}

export type VectorData = {
  [pointerIndex: number]: Uint8ArrayWithVectorData;
};

export type Uint8ArrayWithVectorData = Uint8Array & {
  vectorData?: VectorData;
};

const VEC_PROPERTY_SPACE = 3; // ptr + cap + length
export const BASE_VECTOR_OFFSET = VEC_PROPERTY_SPACE * WORD_SIZE;

// this is a fork of @ethersproject/bytes:concat
// this collects individual vectorData data and relocates it to top level
export function concatWithVectorData(items: ReadonlyArray<BytesLike>): Uint8ArrayWithVectorData {
  const topLevelData: VectorData = {};

  let totalIndex = 0;
  const objects = items.map((item) => {
    const vectorData = (item as Uint8ArrayWithVectorData).vectorData;
    if (vectorData) {
      Object.entries(vectorData).forEach(([pointerIndex, vData]) => {
        topLevelData[~~pointerIndex + totalIndex] = vData;
      });
    }

    const byteArray = arrayify(item);
    totalIndex += byteArray.byteLength / WORD_SIZE;

    return byteArray;
  });

  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result: Uint8ArrayWithVectorData = new Uint8Array(length);

  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);

  // store vector data and pointer indices, but only if data exist
  if (Object.keys(topLevelData).length) {
    result.vectorData = topLevelData;
  }

  return result;
}

export function unpackVectorData(
  results: Uint8Array,
  vectorData: VectorData,
  baseOffset: number,
  dataOffset: number
): Uint8Array {
  let cumulativeVectorByteLength = 0;
  let updatedResults = results;
  Object.entries(vectorData).forEach(([pointerIndex, vData]) => {
    // update value of pointer
    const pointerOffset = ~~pointerIndex * WORD_SIZE;
    const adjustedValue = new U64Coder().encode(
      dataOffset + baseOffset + cumulativeVectorByteLength
    );
    updatedResults.set(adjustedValue, pointerOffset);

    // append vector data at the end
    const dataToAppend = vData.vectorData
      ? // unpack child vector data
        unpackVectorData(
          vData,
          vData.vectorData,
          baseOffset,
          dataOffset +
            cumulativeVectorByteLength +
            Object.keys(vData.vectorData).length * BASE_VECTOR_OFFSET
        )
      : vData;
    updatedResults = concat([updatedResults, dataToAppend]);

    cumulativeVectorByteLength += dataToAppend.byteLength;
  });

  return updatedResults;
}

/** useful for debugging
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
export const chunkByWord = (data: Uint8Array): Uint8Array[] => {
  const chunks = [];
  let offset = 0;
  let chunk = data.slice(offset, offset + WORD_SIZE);
  while (chunk.length) {
    chunks.push(chunk);
    offset += WORD_SIZE;
    chunk = data.slice(offset, offset + WORD_SIZE);
  }

  return chunks;
};
