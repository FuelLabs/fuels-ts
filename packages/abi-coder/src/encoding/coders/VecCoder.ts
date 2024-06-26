import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { bn } from '@fuel-ts/math';
import { concatBytes } from '@fuel-ts/utils';

import { MAX_BYTES, WORD_SIZE } from '../../utils/constants';
import { hasNestedOption, isUint8Array } from '../../utils/utilities';

import { Coder } from './AbstractCoder';
import type { TypesOfCoder } from './AbstractCoder';
import { BigNumberCoder } from './BigNumberCoder';

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']> | Uint8Array;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export class VecCoder<TCoder extends Coder> extends Coder<
  InputValueOf<TCoder>,
  DecodedValueOf<TCoder>
> {
  coder: TCoder;
  #hasNestedOption: boolean;

  constructor(coder: TCoder) {
    super('struct', `struct Vec`, WORD_SIZE);
    this.coder = coder;
    this.#hasNestedOption = hasNestedOption([coder]);
  }

  encode(value: InputValueOf<TCoder>): Uint8Array {
    if (!Array.isArray(value) && !isUint8Array(value)) {
      throw new FuelError(
        ErrorCode.ENCODE_ERROR,
        `Expected array value, or a Uint8Array. You can use arrayify to convert a value to a Uint8Array.`
      );
    }

    const lengthCoder = new BigNumberCoder('u64');

    if (isUint8Array(value)) {
      return new Uint8Array([...lengthCoder.encode(value.length), ...value]);
    }

    const bytes = value.map((v) => this.coder.encode(v));
    const lengthBytes = lengthCoder.encode(value.length);

    return new Uint8Array([...lengthBytes, ...concatBytes(bytes)]);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoder>, number] {
    if ((!this.#hasNestedOption && data.length < this.encodedLength) || data.length > MAX_BYTES) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid vec data size.`);
    }

    const offsetAndLength = offset + WORD_SIZE;
    const lengthBytes = data.slice(offset, offsetAndLength);
    const length = bn(new BigNumberCoder('u64').decode(lengthBytes, 0)[0]).toNumber();
    const dataLength = length * this.coder.encodedLength;
    const dataBytes = data.slice(offsetAndLength, offsetAndLength + dataLength);

    if (!this.#hasNestedOption && dataBytes.length !== dataLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid vec byte data size.`);
    }

    let newOffset = offsetAndLength;
    const chunks = [];
    for (let i = 0; i < length; i++) {
      const [decoded, optionOffset] = this.coder.decode(data, newOffset);
      chunks.push(decoded);
      newOffset = optionOffset;
    }

    return [chunks, newOffset];
  }
}
