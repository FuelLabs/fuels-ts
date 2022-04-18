import { concat } from '@ethersproject/bytes';

import type { DecodedValue, Values } from './abstract-coder';
import Coder from './abstract-coder';

export default class TupleCoder extends Coder {
  coders: Coder[];

  constructor(coders: Coder[], localName: string) {
    super('tuple', 'tuple', localName);
    this.coders = coders;
  }

  // TODO: Explict set any to be a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  encode(value: Array<Values> | Record<string, any>): any {
    let arrayValues: Array<Values> = [];

    if (Array.isArray(value)) {
      arrayValues = value;
    } else if (value && typeof value === 'object') {
      const unique: { [name: string]: boolean } = {};
      arrayValues = this.coders.map((coder) => {
        const name = coder.localName;
        if (!name) {
          this.throwError('cannot encode object for signature with missing names', {
            argument: 'values',
            coder,
            value,
          });
        }
        if (unique[name]) {
          this.throwError('cannot encode object for signature with duplicate name', {
            argument: 'values',
            coder,
            value,
          });
        }

        unique[name] = true;

        return value[name];
      });
    } else {
      this.throwError('invalid tuple value', value);
    }

    if (this.coders.length !== arrayValues.length) {
      this.throwError('Types/values length mismatch', { value });
    }

    return concat(this.coders.map((coder, i) => coder.encode(arrayValues[i])));
  }

  decode(data: Uint8Array, offset: number): [DecodedValue[], number] {
    const length = this.coders.length;
    // This is on purpose to assign key-value pairs if tuple
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = [];

    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name = coder.localName;
      if (name) {
        if (!accum[name]) {
          // eslint-disable-next-line no-param-reassign
          accum[name] = 0;
        }
        // eslint-disable-next-line no-param-reassign
        accum[name] += 1;
      }
      return accum;
    }, <{ [name: string]: number }>{});

    let newOffset = offset;
    for (let i = 0; i < length; i += 1) {
      const [value, tempOffset] = this.coders[i].decode(data, newOffset);
      newOffset = tempOffset;
      values.push(value);

      let name = this.coders[i].localName;
      if (name === 'length') {
        name = '_length';
      }

      if (name && uniqueNames[name] === 1 && !values[name]) {
        values[name] = value;
      }
    }

    return [values, newOffset];
  }
}
