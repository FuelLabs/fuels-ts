import { B256Coder, StructCoder } from '@fuel-ts/abi-coder';

export type StorageSlot = {
  /** Key (b256) */
  key: string;
  /** Value (b256) */
  value: string;
};

export class StorageSlotCoder extends StructCoder<{
  key: B256Coder;
  value: B256Coder;
}> {
  constructor() {
    super('StorageSlot', {
      key: new B256Coder(),
      value: new B256Coder(),
    });
  }
}
