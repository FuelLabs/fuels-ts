import { concat } from '@fuel-ts/utils';

import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

import { DYNAMIC_WORD_LENGTH, dynamicLengthCoder } from './dynamic';

/**
 * `vec` coder
 */
type VecValue<TCoder extends Coder = Coder> = ReturnType<TCoder['decode']>[];

export const vecCoder = <TCoder extends Coder>(opts: {
  coder: TCoder;
}): Coder<VecValue<TCoder>> => ({
  encodedLength: DYNAMIC_WORD_LENGTH, // TODO REMOVE
  encode: (value: VecValue<TCoder>): Uint8Array => {
    const lengthBytes = dynamicLengthCoder.encode(value.length);
    const encodedBytes = value.map((v) => opts.coder.encode(v));
    return concat([lengthBytes, ...encodedBytes]);
  },
  decode: (data: Uint8Array): VecValue<TCoder> => {
    const dataLength = dynamicLengthCoder.decode(data.slice(0, DYNAMIC_WORD_LENGTH));
    const dataOffset = DYNAMIC_WORD_LENGTH + dataLength;

    const decodedValue = Array(dataLength)
      .fill(0)
      .map(() =>
        // const decodedValue = Array(dataLength)
        //   .fill(0)
        //   .map(() => {
        //     let value;
        //     [value, newOffset] = coder.decode(data);
        //     return value;
        //   });
        opts.coder.decode(data)
      );

    return decodedValue as VecValue<TCoder>;
  },
});

vecCoder.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Vec type is missing an item of 'components'.`);
  }

  const bufferComponent = components.find((component) => component.name === 'buf');
  if (!bufferComponent) {
    throw new Error(`The Vec type provided is missing or has a malformed 'buf' component.`);
  }

  const vecElementCoder = getCoder(bufferComponent);
  return vecCoder({ coder: vecElementCoder });
};
