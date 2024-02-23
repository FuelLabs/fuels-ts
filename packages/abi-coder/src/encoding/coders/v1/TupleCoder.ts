import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { concatBytes } from '@fuel-ts/utils';

import type { TypesOfCoder } from '../AbstractCoder';
import { Coder } from '../AbstractCoder';

type InputValueOf<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
type DecodedValueOf<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export class TupleCoder<TCoders extends Coder[]> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  coders: TCoders;

  constructor(coders: TCoders) {
    const encodedLength = coders.reduce((acc, coder) => acc + coder.encodedLength, 0);
    super('tuple', `(${coders.map((coder) => coder.type).join(', ')})`, encodedLength);
    this.coders = coders;
  }

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (this.coders.length !== value.length) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Types/values length mismatch.`);
    }

    return concatBytes(this.coders.map((coder, i) => coder.encode(value[i])));
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid tuple data size.`);
    }

    let newOffset = offset;
    const decodedValue = this.coders.map((coder) => {
      let decoded;
      [decoded, newOffset] = coder.decode(data, newOffset);

      return decoded;
    });

    return [decodedValue as DecodedValueOf<TCoders>, newOffset];
  }
}
