/* eslint-disable @typescript-eslint/no-explicit-any */
import { concat } from '@ethersproject/bytes';

import type { TypesOfCoder } from './abstract-coder';
import Coder from './abstract-coder';

type InputValueOf<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
type DecodedValueOf<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export default class StructCoder<TCoders extends Record<string, Coder>> extends Coder<
  InputValueOf<TCoders>,
  DecodedValueOf<TCoders>
> {
  name: string;
  coders: TCoders;

  constructor(name: string, coders: TCoders) {
    super('struct', `struct ${name}`);
    this.name = name;
    this.coders = coders;
  }

  encode(value: InputValueOf<TCoders>): any {
    const encodedFields = Object.keys(this.coders).map((fieldName) => {
      const fieldCoder = this.coders[fieldName];
      const fieldValue = value[fieldName];
      const encoded = fieldCoder.encode(fieldValue);
      return encoded;
    });
    return concat(encodedFields);
  }

  decode(data: Uint8Array, offset: number): [DecodedValueOf<TCoders>, number] {
    let newOffset = offset;
    const decodedValue = Object.keys(this.coders).reduce((obj, fieldName) => {
      const fieldCoder = this.coders[fieldName];
      let decoded;
      [decoded, newOffset] = fieldCoder.decode(data, newOffset);
      // eslint-disable-next-line no-param-reassign
      obj[fieldName as keyof DecodedValueOf<TCoders>] = decoded;
      return obj;
    }, {} as DecodedValueOf<TCoders>);

    return [decodedValue, newOffset];
  }
}
