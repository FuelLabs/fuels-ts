import type { Uint8ArrayWithDynamicData } from '../utilities';
import { concatWithDynamicData, BASE_VECTOR_OFFSET } from '../utilities';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';
import U64Coder from './u64';

type InputValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Input']>;
type DecodedValueOf<TCoder extends Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;

export default class VecCoder<TCoder extends Coder> extends Coder<
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
      this.throwError('expected array value', value);
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

  decode(_data: Uint8Array, _offset: number): [DecodedValueOf<TCoder>, number] {
    this.throwError('unexpected Vec decode', 'not implemented');
  }
}
