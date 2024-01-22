import { ErrorCode } from '@fuel-ts/errors';

import { concatWithDynamicData } from '../../utilities';

import type { TypesOfCoder } from '../abstract-coder';
import { Coder } from '../abstract-coder';

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export class ArrayCoder<TCoder extends Coder> extends Coder<
  InputValueOf<TCoder>,
  DecodedValueOf<TCoder>
> {
  coder: TCoder;
  length: number;

  constructor(coder: TCoder, length: number) {
    super('array', `[${coder.type}; ${length}]`, length * coder.encodedLength);
    this.coder = coder;
    this.length = length;
  }

  encode(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value)) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    if (this.length !== value.length) {
      this.throwError(ErrorCode.ENCODE_ERROR, `Types/values length mismatch.`);
    }

    return concatWithDynamicData(Array.from(value).map((v) => this.coder.encode(v)));
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    let newOffset = offset;
    const decodedValue = Array(this.length)
      .fill(0)
      .map(() => {
        let decoded;
        [decoded, newOffset] = this.coder.decode(data, newOffset);
        return decoded;
      });

    return [decodedValue as DecodedValueOf<TCoder>, newOffset];
  }
}
