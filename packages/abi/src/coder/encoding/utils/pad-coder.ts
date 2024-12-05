import type { FixedLengthCoder } from '../encoding-types';

export const pad = <TEncoded, TDecoded>(
  coder: FixedLengthCoder<TEncoded, TDecoded>,
  length: number
): FixedLengthCoder<TEncoded, TDecoded> => ({
  ...coder,
  length,
  encode: (value: TEncoded) => {
    const encoded = coder.encode(value);
    const padding = new Uint8Array(length - coder.length).fill(0);
    return new Uint8Array([...padding, ...encoded]);
  },
  decode: (data: Uint8Array, offset: number = 0): [TDecoded, number] => {
    const [decoded, newOffset] = coder.decode(data, offset + (length - coder.length));
    return [decoded, newOffset];
  },
});
