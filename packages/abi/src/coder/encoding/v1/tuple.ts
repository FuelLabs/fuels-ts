import { concatBytes } from '@fuel-ts/utils';

import type { AbiType } from '../../../parser';
import type { Coder } from '../encoding.types';

type ValueOf<TCoders extends Coder[] = Coder[]> = {
  [P in keyof TCoders]: TCoders[P] extends Coder<infer T> ? T : never;
};

export const tuple = <TCoders extends Coder[] = Coder[]>(
  coders: TCoders
): Coder<ValueOf<TCoders>> => ({
  length: coders.reduce((acc, coder) => acc + coder.length, 0),
  encode: (value: ValueOf<TCoders>): Uint8Array =>
    concatBytes(coders.map((coder, i) => coder.encode(value[i]))),
  decode: (value: Uint8Array): ValueOf<TCoders> => {
    const offset = 0;
    const decodedValue = coders.map((coder) => {
      const newOffset = offset + coder.length;
      const data = value.slice(offset, newOffset);
      return coder.decode(data);
    });
    return decodedValue as ValueOf<TCoders>;
  },
});
