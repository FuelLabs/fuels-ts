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

export const tuple = <TCoders extends Coder[] = Coder[]>({
  coders,
}: {
  coders: TCoders;
}): Coder<TupleEncodeValue<TCoders>, TupleDecodeValue<TCoders>> => ({
  type: 'tuple',
  encodedLength: (data: Uint8Array) =>
    coders.reduce((acc, coder) => acc + coder.encodedLength(data), 0),
  encode: (value: TupleEncodeValue<TCoders>): Uint8Array =>
    concatBytes(coders.map((coder, i) => coder.encode(value[i]))),
  decode: (data: Uint8Array): TupleDecodeValue<TCoders> => {
    let newOffset = 0;
    const decodedValue = coders.map((coder) => {
      const encodedLength = coder.encodedLength(data);
      const dataSlice = data.slice(newOffset, (newOffset += encodedLength));
      return coder.decode(dataSlice);
    });
    return decodedValue as TupleDecodeValue<TCoders>;
  },
});

tuple.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Tuple type is missing an item of 'components'.`);
  }

  const coders = components.map((component: AbiTypeComponent) => getCoder(component));
  return tuple({ coders });
};
