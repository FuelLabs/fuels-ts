import { concatBytes } from '@fuel-ts/utils';

import type { AbiTypeComponent } from '../../../parser';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../../abi-coder-types';

/**
 * Tuple coder
 */
type TupleEncodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
type TupleDecodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export const tupleCoder = <TCoders extends Coder[] = Coder[]>({
  coders,
}: {
  coders: TCoders;
}): Coder<TupleEncodeValue<TCoders>, TupleDecodeValue<TCoders>> => ({
  encodedLength: coders.reduce((acc, coder) => acc + coder.encodedLength, 0),
  encode: (value: TupleEncodeValue<TCoders>): Uint8Array => {
    const result = concatBytes(coders.map((coder, i) => coder.encode(value[i])));
    return result;
  },
  decode: (_data: Uint8Array): TupleDecodeValue<TCoders> => {
    throw new Error('Not implemented');
    // let newOffset = offset;
    // const decodedValue = coders.map((coder) => {
    //   let decoded;
    //   [decoded, newOffset] = coder.decode(data, newOffset);
    //   return decoded;
    // });
    // return [decodedValue as TupleValue<TCoders>, newOffset];
  },
});

tupleCoder.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Tuple type is missing an item of 'components'.`);
  }

  const coders = components.map((component: AbiTypeComponent) => getCoder(component));
  return tupleCoder({ coders });
};
