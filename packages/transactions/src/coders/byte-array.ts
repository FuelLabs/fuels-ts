import type { Coder } from '@fuel-ts/abi';
import type { BytesLike } from '@fuel-ts/interfaces';
import { concat, hexlify, arrayify } from '@fuel-ts/utils';

export const byteArray = (length: number): Coder<BytesLike, string> => {
  const paddingLength = (8 - (length % 8)) % 8;
  return {
    type: 'byte_array',
    encode: (value: BytesLike) => concat([arrayify(value), new Uint8Array(paddingLength)]),
    decode: (data: Uint8Array, initialOffset: number) => [
      hexlify(data.slice(initialOffset, initialOffset + length)),
      initialOffset + length + paddingLength,
    ],
  };
};
