import { concat } from '@fuel-ts/utils';

import type { Coder } from '../../abi-coder-types';

import { u64 } from './fixed';

export const DYNAMIC_WORD_LENGTH = 8;

/**
 * This will be used to encode and decode dynamic length.
 */
export const dynamicLengthCoder: Coder<number> = {
  encodedLength: DYNAMIC_WORD_LENGTH,
  encode: (lengthOfData: number): Uint8Array => u64.encode(lengthOfData),
  decode: (data: Uint8Array): number => u64.decode(data).toNumber(),
};

/**
 * `byte` coder.
 */
export const byteCoder: Coder<Uint8Array> = {
  encodedLength: DYNAMIC_WORD_LENGTH, // TODO REMOVE
  encode: (value: Uint8Array): Uint8Array => {
    const lengthBytes = dynamicLengthCoder.encode(value.length);
    return concat([lengthBytes, value]);
  },
  decode: (data: Uint8Array): Uint8Array => {
    const dataLength = dynamicLengthCoder.decode(data.slice(0, DYNAMIC_WORD_LENGTH));
    const dataBytes = data.slice(DYNAMIC_WORD_LENGTH, DYNAMIC_WORD_LENGTH + dataLength);
    return dataBytes;
  },
};

// export const rawSliceCoder: Coder<number[]> = {
//   encodedLength: WORD_SIZE, // TODO REMOVE
//   encode: (value: number[]): Uint8Array => {
//     const lengthBytes = dynamicLengthCoder.encode(value.length);
//     return new Uint8Array([...lengthBytes, ...value]);
//   },
//   decode: (data: Uint8Array): number[] => {
//     const dataLength = dynamicLengthCoder.decode(data.slice(0, WORD_SIZE));
//     const dataBytes = data.slice(WORD_SIZE, WORD_SIZE + dataLength);
//     return [...dataBytes];
//   },
// };

// export const strSliceCoder: Coder<string> = {
//   encodedLength: WORD_SIZE, // TODO REMOVE
//   encode: (value: string): Uint8Array => {
//     const bytes = toUtf8Bytes(value);
//     const lengthBytes = dynamicLengthCoder.encode(bytes.length);
//     return concat([lengthBytes, bytes]);
//   },
//   decode: (data: Uint8Array): string => {
//     const dataLength = dynamicLengthCoder.decode(data.slice(0, WORD_SIZE));
//     const dataBytes = data.slice(WORD_SIZE, WORD_SIZE + dataLength);
//     return toUtf8String(dataBytes);
//   },
// };

// export const stdStringCoder: Coder<string> = {
//   encodedLength: WORD_SIZE, // TODO REMOVE
//   encode: (value: string): Uint8Array => {
//     const bytes = toUtf8Bytes(value);
//     const lengthBytes = dynamicLengthCoder.encode(bytes.length);
//     return new Uint8Array([...lengthBytes, ...bytes]);
//   },
//   decode: (data: Uint8Array): string => {
//     const dataLength = dynamicLengthCoder.decode(data.slice(0, WORD_SIZE));
//     const dataBytes = data.slice(WORD_SIZE, WORD_SIZE + dataLength);
//     return toUtf8String(dataBytes);
//   },
// };
