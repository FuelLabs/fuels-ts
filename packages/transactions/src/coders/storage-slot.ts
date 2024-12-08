import { coders, createCoder } from './coders';

export type StorageSlot = {
  /** Key (b256) */
  key: string;
  /** Value (b256) */
  value: string;
};

export const storageSlotCoder = createCoder('StorageSlot', {
  key: coders.b256,
  value: coders.b256,
});
