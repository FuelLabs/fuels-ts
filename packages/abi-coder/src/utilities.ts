import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import { concat, concatBytes, arrayify } from '@fuel-ts/utils';

import { U64Coder } from './coders/u64';
import { BYTES_CODER_TYPE, VEC_CODER_TYPE, STD_STRING_CODER_TYPE, WORD_SIZE } from './constants';

export type DynamicData = {
  [pointerIndex: number]: Uint8ArrayWithDynamicData;
};

export type Uint8ArrayWithDynamicData = Uint8Array & {
  dynamicData?: DynamicData;
};

const VEC_PROPERTY_SPACE = 3; // ptr + cap + length
export const BASE_VECTOR_OFFSET = VEC_PROPERTY_SPACE * WORD_SIZE;

const RAW_SLICE_PROPERTY_SPACE = 2; // ptr + length
export const BASE_RAW_SLICE_OFFSET = RAW_SLICE_PROPERTY_SPACE * WORD_SIZE;

// this is a fork of @ethersproject/bytes:concat
// this collects individual dynamicData data and relocates it to top level
export function concatWithDynamicData(items: ReadonlyArray<BytesLike>): Uint8ArrayWithDynamicData {
  const topLevelData: DynamicData = {};

  let totalIndex = 0;
  const objects = items.map((item) => {
    const dynamicData = (item as Uint8ArrayWithDynamicData).dynamicData;
    if (dynamicData) {
      Object.entries(dynamicData).forEach(([pointerIndex, vData]) => {
        topLevelData[parseInt(pointerIndex, 10) + totalIndex] = vData;
      });
    }

    const byteArray = arrayify(item);
    totalIndex += byteArray.byteLength / WORD_SIZE;

    return byteArray;
  });

  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result: Uint8ArrayWithDynamicData = new Uint8Array(length);

  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);

  // store vector data and pointer indices, but only if data exist
  if (Object.keys(topLevelData).length) {
    result.dynamicData = topLevelData;
  }

  return result;
}

export function unpackDynamicData(
  results: Uint8ArrayWithDynamicData,
  baseOffset: number,
  dataOffset: number
): Uint8Array {
  if (!results.dynamicData) {
    return concat([results]);
  }

  let cumulativeDynamicByteLength = 0;
  let updatedResults = results;
  Object.entries(results.dynamicData).forEach(([pointerIndex, vData]) => {
    // update value of pointer
    const pointerOffset = parseInt(pointerIndex, 10) * WORD_SIZE;
    const adjustedValue = new U64Coder().encode(
      dataOffset + baseOffset + cumulativeDynamicByteLength
    );
    updatedResults.set(adjustedValue, pointerOffset);

    // append dynamic data at the end
    const dataToAppend = vData.dynamicData
      ? // unpack child dynamic data
        unpackDynamicData(
          vData,
          baseOffset,
          dataOffset + vData.byteLength + cumulativeDynamicByteLength
        )
      : vData;
    updatedResults = concat([updatedResults, dataToAppend]);

    cumulativeDynamicByteLength += dataToAppend.byteLength;
  });

  return updatedResults;
}

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

/**
 * Checks if a given type is a pointer type
 * See: https://github.com/FuelLabs/sway/issues/1368
 */
export const isPointerType = (type: string) => {
  switch (type) {
    case 'u8':
    case 'u16':
    case 'u32':
    case 'u64':
    case 'bool': {
      return false;
    }
    default: {
      return true;
    }
  }
};

export const isHeapType = (type: string) =>
  type === VEC_CODER_TYPE || type === BYTES_CODER_TYPE || type === STD_STRING_CODER_TYPE;

export function findOrThrow<T>(
  arr: readonly T[],
  predicate: (val: T) => boolean,
  throwFn: () => never = () => {
    throw new FuelError(ErrorCode.ELEMENT_NOT_FOUND, 'Element not found in the array.');
  }
): T {
  const found = arr.find(predicate);
  if (found === undefined) {
    throwFn();
  }

  return found;
}

/**
 * Because some properties can be single-bytes, we need to pad them
 * with zeros until they are aligned to a word-sized increment.
 * This is the case for `tuple` and `struct` properties.
 * Please refer to packages/abi-coder/src/coders/abstract-coder.ts for more details
 */
export const isMultipleOfWordSize = (length: number) => length % WORD_SIZE === 0;

export const getWordSizePadding = (length: number) => WORD_SIZE - (length % WORD_SIZE);

export const rightPadToWordSize = (encoded: Uint8Array) => {
  if (isMultipleOfWordSize(encoded.length)) {
    return encoded;
  }
  const padding = new Uint8Array(WORD_SIZE - (encoded.length % WORD_SIZE));
  return concatBytes([encoded, padding]);
};
