import type { Coder } from '@fuel-ts/abi';

export const pad = <TEncoded, TDecoded>(
  coder: Coder<TEncoded, TDecoded>,
  length: number,
  paddedLength: number
): Coder<TEncoded, TDecoded> => ({
  type: coder.type,
  encode: (value: TEncoded) => {
    const encoded = coder.encode(value);
    const padding = new Uint8Array(paddedLength - length).fill(0);
    return new Uint8Array([...padding, ...encoded]);
  },
  decode: (data: Uint8Array, offset: number = 0): [TDecoded, number] => {
    const [decoded, newOffset] = coder.decode(data, offset + (paddedLength - length));
    return [decoded, newOffset];
  },
});
