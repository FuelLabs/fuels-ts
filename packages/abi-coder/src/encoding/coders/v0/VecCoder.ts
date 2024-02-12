import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';

import { MAX_BYTES } from '../../../utils/constants';
import type { Uint8ArrayWithDynamicData } from '../../../utils/utilities';
import { concatWithDynamicData, BASE_VECTOR_OFFSET, chunkByLength } from '../../../utils/utilities';
import type { TypesOfCoder } from '../AbstractCoder';
import { Coder } from '../AbstractCoder';

import { U64Coder } from './U64Coder';

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export class VecCoder<TCoder extends Coder> extends Coder<
  InputValueOf<TCoder>,
  DecodedValueOf<TCoder>
> {
  coder: TCoder;

  constructor(coder: TCoder) {
    super('struct', `struct Vec`, coder.encodedLength + BASE_VECTOR_OFFSET);
    this.coder = coder;
  }

  encode(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value)) {
      throw new FuelError(ErrorCode.ENCODE_ERROR, `Expected array value.`);
    }

    const parts: Uint8Array[] = [];

    // pointer (ptr)
    const pointer: Uint8ArrayWithDynamicData = new U64Coder().encode(BASE_VECTOR_OFFSET);
    // pointer dynamicData, encode the vector now and attach to its pointer
    pointer.dynamicData = {
      0: concatWithDynamicData(Array.from(value).map((v) => this.coder.encode(v))),
    };

    parts.push(pointer);

    // capacity (cap)
    parts.push(new U64Coder().encode(value.length));

    // length (len)
    parts.push(new U64Coder().encode(value.length));

    return concatWithDynamicData(parts);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    if (data.length < BASE_VECTOR_OFFSET || data.length > MAX_BYTES) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid vec data size.`);
    }

    const len = data.slice(16, 24);
    const encodedLength = bn(new U64Coder().decode(len, 0)[0]).toNumber();
    const vectorRawDataLength = encodedLength * this.coder.encodedLength;
    const vectorRawData = data.slice(BASE_VECTOR_OFFSET, BASE_VECTOR_OFFSET + vectorRawDataLength);

    if (vectorRawData.length !== vectorRawDataLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid vec byte data size.`);
    }

    return [
      chunkByLength(vectorRawData, this.coder.encodedLength).map(
        (chunk) => this.coder.decode(chunk, 0)[0]
      ),
      offset + BASE_VECTOR_OFFSET,
    ];
  }
}
