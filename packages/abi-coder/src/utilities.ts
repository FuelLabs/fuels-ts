import type { InputValue } from './coders/abstract-coder';
import type Coder from './coders/abstract-coder';
import VecCoder from './coders/vec';

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
