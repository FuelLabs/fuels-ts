import { concatBytes } from '@fuel-ts/utils';

import type { AbiType } from '../../../parser';
import type { Coder } from '../encoding.types';

type ValueOf<TCoders extends Coder[] = Coder[]> = {
  [P in keyof TCoders]: TCoders[P] extends Coder<infer T> ? T : never;
};

const tupleCoder = <TCoders extends Coder[] = Coder[]>(
  coders: TCoders
): Coder<ValueOf<TCoders>> => ({
  encodedLength: coders.reduce((acc, coder) => acc + coder.encodedLength, 0),
  encode: (value: ValueOf<TCoders>): Uint8Array =>
    concatBytes(coders.map((coder, i) => coder.encode(value[i]))),
  decode: (value: Uint8Array): ValueOf<TCoders> => {
    const offset = 0;
    const decodedValue = coders.map((coder) => {
      const newOffset = offset + coder.encodedLength;
      const data = value.slice(offset, newOffset);
      return coder.decode(data);
    });
    return decodedValue as ValueOf<TCoders>;
  },
});

type CoderFactory = (opts: { name?: string; type: AbiType }, make: CoderFactory) => Coder;

export const tuple: CoderFactory = (
  opts: { name?: string; type: AbiType },
  makeCoder: CoderFactory
): Coder => {
  const components = opts.type.components ?? [];
  const coders = components.map((component) => makeCoder(component, makeCoder));
  return tupleCoder(coders) as Coder;
};
