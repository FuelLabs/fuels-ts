/* eslint-disable max-classes-per-file */
import { hexlify } from '@ethersproject/bytes';
import type { BytesLike } from '@ethersproject/bytes';

export type Address = string;
export type ContractId = string;

export abstract class AbstractContract {
  abstract id: ContractId;
}

export abstract class AbstractWallet {
  abstract address: string;
}

export type AddressLike = Address | BytesLike | AbstractWallet;

export const addressify = (addressLike: AddressLike): Address => {
  if (addressLike instanceof AbstractWallet) {
    return addressLike.address;
  }
  return hexlify(addressLike);
};

export type ContractIdLike = ContractId | BytesLike | AbstractContract;

export const contractIdify = (contractIdLike: ContractIdLike): ContractId => {
  if (contractIdLike instanceof AbstractContract) {
    return contractIdLike.id;
  }
  return hexlify(contractIdLike);
};

export abstract class StorageAbstract {
  abstract setItem<T>(key: string, value: T): Promise<unknown>;
  abstract getItem<T>(key: string): Promise<T | null>;
  abstract removeItem(key: string): Promise<void>;
  abstract clear(): Promise<void>;
}
