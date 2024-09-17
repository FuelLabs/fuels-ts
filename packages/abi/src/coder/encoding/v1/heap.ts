import { concat, toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

import { u64 } from './fixed';

export const DYNAMIC_WORD_LENGTH = 8;

interface HeapCoder<T> extends Omit<Coder<T>, 'encodedLength' | 'decode'> {
  decode(data: Uint8Array, length: number): T;
}

const createHeapType = <T extends { length: number }>(opts: HeapCoder<T>): Coder<T> => ({
  type: opts.type,
  encodedLength: (data: Uint8Array) => {
    const encodedLength = data.slice(0, DYNAMIC_WORD_LENGTH);
    return u64.decode(encodedLength).toNumber();
  },
  encode: (value: T) => {
    const encodedLength = u64.encode(value.length);
    return concat([encodedLength, opts.encode(value)]);
  },
  decode: (data: Uint8Array): T => {
    const encodedLength = data.slice(0, DYNAMIC_WORD_LENGTH);
    const length = u64.decode(encodedLength).toNumber();
    const payload = data.slice(DYNAMIC_WORD_LENGTH, DYNAMIC_WORD_LENGTH + length);
    return opts.decode(payload, length);
  },
});

/**
 * Byte
 */
export const byte = createHeapType<Uint8Array>({
  type: 'byte',
  encode: (value: Uint8Array) => value,
  decode: (data: Uint8Array) => data,
});

/**
 * Raw slice
 */
export const rawSlice = createHeapType<number[]>({
  type: 'raw_slice',
  encode: (value: number[]) => new Uint8Array(value),
  decode: (data: Uint8Array) => [...data],
});

/**
 * String slice
 */
export const strSlice = createHeapType<string>({
  type: 'str_slice',
  encode: (value: string) => toUtf8Bytes(value),
  decode: (data: Uint8Array) => toUtf8String(data),
});

/**
 * Std string
 *
 * This is the same as `strSlice`
 */
export const stdString = createHeapType<string>({
  type: 'std_string',
  encode: (value: string) => toUtf8Bytes(value),
  decode: (data: Uint8Array) => toUtf8String(data),
});

/**
 * Vec
 */
type VecValue<TCoder extends Coder = Coder> = ReturnType<TCoder['decode']>[];

export const vector = <TCoder extends Coder>(opts: { coder: TCoder }): Coder<VecValue<TCoder>> =>
  createHeapType({
    type: 'vector',
    encode: (value: VecValue<TCoder>) => {
      const encodedBytes = value.map((v) => opts.coder.encode(v));
      return concat(encodedBytes);
    },
    decode: (data: Uint8Array, length: number) => {
      const elementByteLength = data.length / length;

      let offset = 0;
      const decodedValue = Array(length)
        .fill(0)
        .map(() => {
          const elementData = data.slice(offset, (offset += elementByteLength));
          return opts.coder.decode(elementData);
        });

      return decodedValue as VecValue<TCoder>;
    },
  });

vector.fromAbi = ({ name, type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Vec type is missing an item of 'components'.`);
  }

  const bufferComponent = components.find((component) => component.name === 'buf');
  if (!bufferComponent) {
    throw new Error(`The Vec type provided is missing or has a malformed 'buf' component.`);
  }

  const vecElementCoder = getCoder(bufferComponent);
  return vector({ coder: vecElementCoder });
};
