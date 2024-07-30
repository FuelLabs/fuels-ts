import { VOID_TYPE } from '../../utils/constants';

import { Coder } from './AbstractCoder';

export class VoidCoder extends Coder<undefined, undefined> {
  constructor() {
    super('void', VOID_TYPE, 0);
  }

  encode(_value: undefined): Uint8Array {
    return new Uint8Array([]);
  }

  decode(_data: Uint8Array, offset: number): [undefined, number] {
    return [undefined, offset];
  }
}
