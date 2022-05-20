import { concat } from '@ethersproject/bytes';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';

type InputValueOf<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
type DecodedValueOf<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export default class TupleCoder<TCoders extends Coder[]> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  coders: TCoders;

  constructor(coders: TCoders) {
    super('tuple', `(${coders.map((coder) => coder.type).join(', ')})`);
    this.coders = coders;
  }

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (this.coders.length !== value.length) {
      this.throwError('Types/values length mismatch', { value });
    }

    return concat(this.coders.map((coder, i) => coder.encode(value[i])));
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;
    const decodedValue = this.coders.map((coder) => {
      let decoded;
      [decoded, newOffset] = coder.decode(data, newOffset);
      return decoded;
    });

    return [decodedValue as DecodedValueOf<TCoders>, newOffset];
  }
}
