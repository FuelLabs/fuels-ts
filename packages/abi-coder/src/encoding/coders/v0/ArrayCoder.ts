import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { MAX_BYTES } from '../../../utils/constants';
import { concatWithDynamicData } from '../../../utils/utilities';
import type { TypesOfCoder } from '../AbstractCoder';
import { Coder } from '../AbstractCoder';

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

  /**
   * @throws {@link ErrorCode#ENCODE_ERROR}
   * When the value is not an array.
   *
   * @throws {@link ErrorCode#ENCODE_ERROR}
   * When the length of the value does not match the length of the coder.
   */
  encode(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    if (this.length !== value.length) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Types/values length mismatch.`);
    }

    return concatWithDynamicData(Array.from(value).map((v) => this.coder.encode(v)));
  }

  /**
   * @throws {@link ErrorCode#DECODE_ERROR}
   * When the data size is less than the encoded length or greater than the maximum bytes.
   */
  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    if (data.length < this.encodedLength || data.length > MAX_BYTES) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid array data size.`);
    }

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
