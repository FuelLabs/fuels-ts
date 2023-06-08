import type { BytesLike } from '@ethersproject/bytes';
import { arrayify } from '@ethersproject/bytes';

import type { InputValue } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import VecCoder from './coders/vec';
import { OPTION_CODER_TYPE } from './constants';
import type { ParamType } from './fragments/param-type';

export function filterEmptyParams<T>(types: T): T;
export function filterEmptyParams(types: ReadonlyArray<string | ParamType>) {
  return types.filter((t) => (t as Readonly<ParamType>)?.type !== '()' && t !== '()');
}

export function hasOptionTypes<T>(types: T): T;
export function hasOptionTypes(types: ReadonlyArray<string | ParamType>) {
  return types.some((t) => (t as Readonly<ParamType>)?.type === OPTION_CODER_TYPE);
}

type VectorData = {
  [pointerIndex: number]: Uint8Array;
};

export type Uint8ArrayWithVectorData = Uint8Array & {
  vectorData?: VectorData;
};

// this is a fork of @ethersproject/bytes:concat
// this collects individual vectorData data and relocates it to top level
export function concatWithVectorData(items: ReadonlyArray<BytesLike>): Uint8ArrayWithVectorData {
  const topLevelData: VectorData = {};

  const objects = items.map((item, index) => {
    const vectorData = (item as Uint8ArrayWithVectorData).vectorData;
    if (vectorData) {
      Object.entries(vectorData).forEach(([pointerIndex, vData]) => {
        topLevelData[~~pointerIndex + index] = vData;
      });
    }

    return arrayify(item);
  });

  const length = objects.reduce((accum, item) => accum + item.length, 0);
  const result: Uint8ArrayWithVectorData = new Uint8Array(length);

  objects.reduce((offset, object) => {
    result.set(object, offset);
    return offset + object.length;
  }, 0);

  // store vector data and pointer indices
  if (Object.keys(topLevelData).length) {
    result.vectorData = topLevelData;
  }

  return result;
}

type ByteInfo = { vecByteLength: number } | { byteLength: number };
export function getVectorAdjustments(
  coders: Coder<unknown, unknown>[],
  values: InputValue[],
  offset = 0
) {
  const vectorData: Uint8Array[] = [];
  const byteMap: ByteInfo[] = coders.map((encoder, i) => {
    if (!(encoder instanceof VecCoder)) {
      return { byteLength: encoder.encodedLength };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = encoder.getEncodedVectorData(values[i] as any);
    vectorData.push(data);
    return { vecByteLength: data.byteLength };
  });

  if (!vectorData.length) {
    return vectorData;
  }

  const baseVectorOffset = vectorData.length * VecCoder.getBaseOffset() + offset;
  const offsetMap = coders.map((encoder, paramIndex) => {
    if (!(encoder instanceof VecCoder)) {
      return 0;
    }

    return byteMap.reduce((sum, byteInfo, byteIndex) => {
      // non-vector data
      if ('byteLength' in byteInfo) {
        return sum + byteInfo.byteLength;
      }

      // account for preceding vector data earlier in input list
      if (byteIndex < paramIndex) {
        return sum + byteInfo.vecByteLength;
      }

      return sum;
    }, baseVectorOffset);
  });

  coders.forEach((code, i) => code.setOffset(offsetMap[i]));
  return vectorData;
}
