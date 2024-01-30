import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';

import { WORD_SIZE } from '../../constants';
import { chunkByLength } from '../../utilities';
import type { TypesOfCoder } from '../abstract-coder';
import { Coder } from '../abstract-coder';
import { U64Coder } from '../v0/u64';

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export class VecCoder<TCoder extends Coder> extends Coder<
  InputValueOf<TCoder>,
  DecodedValueOf<TCoder>
> {
  coder: TCoder;

  constructor(coder: TCoder) {
    super('struct', `struct Vec`, coder.encodedLength + WORD_SIZE);
    this.coder = coder;
  }

  encode(_value: InputValueOf<TCoder>): Uint8Array {
    throw new FuelError(ErrorCode.ENCODE_ERROR, `Vec encode unsupported in v1`);
    return new Uint8Array();
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid vec data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new U64Coder().decode(lengthBytes, 0)[0]).toNumber();
    const dataLength = length * this.coder.encodedLength;
    const dataBytes = data.slice(offsetAndLength, offsetAndLength + dataLength);

    return [
      chunkByLength(dataBytes, this.coder.encodedLength).map(
        (chunk) => this.coder.decode(chunk, 0)[0]
      ),
      offset + dataLength,
    ];
  }
}
