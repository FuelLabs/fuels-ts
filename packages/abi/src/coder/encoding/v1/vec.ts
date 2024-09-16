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
  type: `vec`,
  encode: (value: VecValue<TCoder>): Uint8Array => {
    const lengthBytes = dynamicLengthCoder.encode(value.length);
    const encodedBytes = value.map((v) => opts.coder.encode(v));
    return concat([lengthBytes, ...encodedBytes]);
  },
  /**
   * The total length of the entire encoded data ([length, ...data]).
   */
  encodedLength: (data: Uint8Array) => {
    const encodedElementLength = dynamicLengthCoder.decode(data);
    return DYNAMIC_WORD_LENGTH + encodedElementLength;
  },
  decode: (data: Uint8Array): VecValue<TCoder> => {
    const dataLength = dynamicLengthCoder.decode(data);

    const dataBytes = data.slice(DYNAMIC_WORD_LENGTH);
    const dataElementOffset = dataBytes.length / dataLength;

    let offset = 0;
    const decodedValue = Array(dataLength)
      .fill(0)
      .map(() => {
        const elementBytes = dataBytes.slice(offset, (offset += dataElementOffset));
        return opts.coder.decode(elementBytes);
      });

    return decodedValue as VecValue<TCoder>;
  },
});

vecCoder.fromAbi = ({ name, type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
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
