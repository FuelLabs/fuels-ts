import { Coder } from '@fuel-ts/abi';

import { coders } from './coders';

export type StorageSlot = {
  /** Key (b256) */
  key: string;
  /** Value (b256) */
  value: string;
};

export class StorageSlotCoder extends Coder<StorageSlot, StorageSlot> {
  private coder = coders.struct({
    key: coders.b256,
    value: coders.b256,
  });

  override type = 'StorageSlot';

  encode(value: StorageSlot): Uint8Array {
    return this.coder.encode(value);
  }

  decode(data: Uint8Array, offset: number): [StorageSlot, number] {
    return this.coder.decode(data, offset);
  }
}
