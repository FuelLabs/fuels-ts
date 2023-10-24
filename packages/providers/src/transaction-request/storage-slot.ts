import type { StorageSlot } from '@fuel-ts/transactions';
import { getBytesCopy, hexlify } from 'ethers';
import type { BytesLike } from 'ethers';

export type TransactionRequestStorageSlot =
  | {
      /** Key */
      key: BytesLike;
      /** Value */
      value: BytesLike;
    }
  | [key: BytesLike, value: BytesLike];

// Make sure all values have 32 bytes
const getStorageValue = (value: BytesLike): Uint8Array => {
  const v = new Uint8Array(32);
  v.set(getBytesCopy(value));
  return v;
};

export const storageSlotify = (storageSlot: TransactionRequestStorageSlot): StorageSlot => {
  let key;
  let value;

  if (Array.isArray(storageSlot)) {
    key = storageSlot[0];
    value = storageSlot[1];
  } else {
    key = storageSlot.key;
    value = storageSlot.value;
  }

  return {
    key: hexlify(key),
    value: hexlify(getStorageValue(value)),
  };
};
