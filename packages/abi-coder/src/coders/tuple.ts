import { ErrorCode } from '@fuel-ts/errors';

import {
  concatWithDynamicData,
  getWordSizePadding,
  isMultipleOfWordSize,
  rightPadToWordSize,
} from '../utilities';

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

  encode(value: InputValueOf<TCoders>): Uint8Array {
    if (this.coders.length !== value.length) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Types/values length mismatch.`);
    }

    return concatWithDynamicData(
      this.coders.map((coder, i) => {
        const encoded = coder.encode(value[i]);
        if (!isMultipleOfWordSize(encoded.length)) {
          return rightPadToWordSize(encoded);
        }
        return encoded;
      })
    );
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;
    const decodedValue = this.coders.map((coder) => {
      let decoded;
      [decoded, newOffset] = coder.decode(data, newOffset);

      if (!isMultipleOfWordSize(newOffset)) {
        newOffset += getWordSizePadding(newOffset);
      }

      return decoded;
    });

    return [decodedValue as DecodedValueOf<TCoders>, newOffset];
  }
}
