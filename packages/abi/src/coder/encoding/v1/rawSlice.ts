import { bn } from '@fuel-ts/math';

import type { Coder, LengthAwareCoder } from '../encoding.types';

import { u64 } from './number';

const WORD_SIZE = 8;

const validate = {
  encode: (value: number[]): void => {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }
  },
  decode: (data: Uint8Array): void => {
    if (data.length < WORD_SIZE) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid byte data size.`);
    }
  },
  decodeLength: (data: Uint8Array): void => {
    const lengthOffset = WORD_SIZE;
    const lengthBytes = data.slice(0, lengthOffset);
    const dataLength = bn(u64.decode(lengthBytes)[0]).toNumber();
  },
};

const dynamicLengthCoder: Coder<number> = {
  encodedLength: WORD_SIZE,
  encode: (lengthOfData: number): Uint8Array => u64.encode(lengthOfData),
  decode: (data: Uint8Array): number => {
    const lengthBytes = data.slice(0, dynamicLengthCoder.encodedLength);
    return bn(u64.decode(lengthBytes)).toNumber();
  },
};

const rawSliceCoder = (): Coder<number[]> => ({
  encodedLength: 1,
  encode: (value: number[]): Uint8Array => {
    const lengthBytes = dynamicLengthCoder.encode(value.length);
    return new Uint8Array([...lengthBytes, ...value]);
  },
  decode: (data: Uint8Array): number[] => {
    const lengthOffset = WORD_SIZE;
    const lengthBytes = data.slice(0, lengthOffset);
    const dataLength = bn(u64.decode(lengthBytes)).toNumber();

    const dataOffset = lengthOffset + dataLength;
    const dataBytes = data.slice(lengthOffset, dataOffset);
    return [...dataBytes];
  },
});

const withLengthAwareCoder = (coder: Coder) => ({});
