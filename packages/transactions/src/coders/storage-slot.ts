import { concat } from '@ethersproject/bytes';
import { Coder, B256Coder } from '@fuel-ts/abi-coder';

export type StorageSlot = {
  /** Key (b256) */
  key: string;
  /** Value (b256) */
  value: string;
};

export class StorageSlotCoder extends Coder {
  constructor(localName: string) {
    super('StorageSlot', 'StorageSlot', localName);
  }

  encode(value: StorageSlot): Uint8Array {
    const parts: Uint8Array[] = [];

    parts.push(new B256Coder('key', 'b256').encode(value.key));
    parts.push(new B256Coder('value', 'b256').encode(value.value));

    return concat(parts);
  }

  decode(data: Uint8Array, offset: number): [StorageSlot, number] {
    let decoded;
    let o = offset;

    [decoded, o] = new B256Coder('key', 'b256').decode(data, o);
    const key = decoded;
    [decoded, o] = new B256Coder('value', 'b256').decode(data, o);
    const value = decoded;

    return [
      {
        key,
        value,
      },
      o,
    ];
  }
}
