import { concat } from '@ethersproject/bytes';
import { Coder } from './abstract-coder';

export default class TupleCoder extends Coder {
  coders: Coder[];

  constructor(coders: Coder[], localName: string) {
    super('tuple', 'tuple', localName);
    this.coders = coders;
  }

  encode(value: Array<any> | { [name: string]: any }): any {
    let arrayValues: Array<any> = [];

    if (Array.isArray(value)) {
      arrayValues = value;
    } else if (value && typeof value === 'object') {
      const unique: { [name: string]: boolean } = {};
      arrayValues = this.coders.map((coder) => {
        const name = coder.localName;
        if (!name) {
          this.throwError('cannot encode object for signature with missing names', {
            argument: 'values',
            coder: coder,
            value,
          });
        }
        if (unique[name]) {
          this.throwError('cannot encode object for signature with duplicate name', {
            argument: 'values',
            coder: coder,
            value,
          });
        }
        return value[name];
      });
    } else {
      this.throwError('invalid tuple value', value);
    }

    if (this.coders.length !== arrayValues.length) {
      this.throwError('types/value length mismatch', { value });
    }

    return concat(this.coders.map((coder, i) => coder.encode(arrayValues[i])));
  }

  decode(data: Uint8Array, offset: number): any {
    const length = this.coders.length;
    let values: any = [];

    const uniqueNames = this.coders.reduce((accum, coder) => {
      const name = coder.localName;
      if (name) {
        if (!accum[name]) {
          accum[name] = 0;
        }
        accum[name]++;
      }
      return accum;
    }, <{ [name: string]: number }>{});

    for (let i = 0; i < length; i += 1) {
      const [value, newOffset] = this.coders[i].decode(data, offset);
      offset = newOffset;
      values.push(value);

      let name = this.coders[i].localName;
      if (name === 'length') {
        name = '_length';
      }

      if (name && uniqueNames[name] === 1 && !values[name]) {
        values[name] = value;
      }
    }

    return [values, offset];
  }
}
