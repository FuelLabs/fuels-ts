import { hexlify } from '@ethersproject/bytes';
import type { StorageSlot } from '@fuel-ts/transactions';

export type TransactionRequestStorageSlot = {
  /** Key */
  key: string;
  /** Value */
  value: string;
};

export const storageSlotify = (value: TransactionRequestStorageSlot): StorageSlot => ({
  key: hexlify(value.key),
  value: hexlify(value.value),
});
