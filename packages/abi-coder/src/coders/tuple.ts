import { ErrorCode } from '@fuel-ts/errors';
import { concatBytes } from '@fuel-ts/utils';

import { concatWithDynamicData } from '../utilities';

import type { TypesOfCoder } from './abstract-coder';
import { Coder } from './abstract-coder';

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

  /**
   * Properties of structs need to be word-aligned.
   * Because some properties can be small bytes,
   * we need to pad them with zeros until they are aligned to a word-sized increment.
   */
  private static rightPadToSwayWordSize(encoded: Uint8Array) {
    return encoded.length % 8 === 0
      ? encoded
      : concatBytes([encoded, new Uint8Array(8 - (encoded.length % 8))]);
  }

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (this.coders.length !== value.length) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Types/values length mismatch.`);
    }

    return concatWithDynamicData(
      this.coders.map((coder, i) => {
        const encoded = coder.encode(value[i]);
        return TupleCoder.rightPadToSwayWordSize(encoded);
      })
    );
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;
    const decodedValue = this.coders.map((coder) => {
      let decoded;
      [decoded, newOffset] = coder.decode(data, newOffset);

      // see TupleCoder.rightPadToSwayWordSize method for explanation
      const offsetIsSwayWordIncrement = newOffset % 8 === 0;

      if (!offsetIsSwayWordIncrement) {
        newOffset += 8 - (newOffset % 8);
      }
      return decoded;
    });

    return [decodedValue as DecodedValueOf<TCoders>, newOffset];
  }
}
