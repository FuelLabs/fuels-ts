import { ErrorCode, FuelError } from '@fuel-ts/errors';

import {
  concatWithDynamicData,
  getWordSizePadding,
  isMultipleOfWordSize,
  rightPadToWordSize,
} from '../utilities';

import type { TypesOfCoder } from './abstract-coder';
import { Coder } from './abstract-coder';
import { OptionCoder } from './option';

type InputValueOf<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
type DecodedValueOf<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export class StructCoder<TCoders extends Record<string, Coder>> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  name: string;
  coders: TCoders;

  constructor(name: string, coders: TCoders) {
    const encodedLength = Object.values(coders).reduce(
      (acc, coder) => acc + coder.encodedLength,
      0
    );
    super('struct', `struct ${name}`, encodedLength);
    this.name = name;
    this.coders = coders;
  }

  encode(value: InputValueOf<TCoders>) {
    const encodedFields = Object.keys(this.coders).map((fieldName) => {
      const fieldCoder = this.coders[fieldName];
      const fieldValue = value[fieldName];

      if (!(fieldCoder instanceof OptionCoder) && fieldValue == null) {
        throw new FuelError(
          ErrorCode.ENCODE_ERROR,
          `Invalid ${this.type}. Field "${fieldName}" not present.`
        );
      }

      const encoded = fieldCoder.encode(fieldValue);

      if (!isMultipleOfWordSize(encoded.length)) {
        return rightPadToWordSize(encoded);
      }

      return encoded;
    });

    return concatWithDynamicData([concatWithDynamicData(encodedFields)]);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    if (data.length < this.encodedLength) {
      throw new FuelError(ErrorCode.DECODE_ERROR, `Invalid struct data size.`);
    }

    let newOffset = offset;
    const decodedValue = Object.keys(this.coders).reduce((obj, fieldName) => {
      const fieldCoder = this.coders[fieldName];
      let decoded;
      [decoded, newOffset] = fieldCoder.decode(data, newOffset);

      if (!isMultipleOfWordSize(newOffset)) {
        newOffset += getWordSizePadding(newOffset);
      }

      obj[fieldName as keyof DecodedValueOf<TCoders>] = decoded;
      return obj;
    }, {} as DecodedValueOf<TCoders>);

    return [decodedValue, newOffset];
  }
}
