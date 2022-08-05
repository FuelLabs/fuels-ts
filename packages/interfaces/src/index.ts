/* eslint-disable max-classes-per-file */
import type { Bytes } from '@ethersproject/bytes';

export type Bech32Address = string;
export type B256Address = string;

export abstract class AbstractScript<T> {
  abstract bytes: Uint8Array;
  abstract encodeScriptData: (data: T) => Uint8Array;
}

export abstract class AbstractAddress {
  abstract get address(): Bech32Address;
  abstract get b256Address(): B256Address;
  abstract get byteAddress(): Bytes;
}

export abstract class AbstractContract {
  abstract id: AbstractAddress;
}

export abstract class AbstractWallet {
  abstract address: AbstractAddress;
}

export type AddressLike = AbstractAddress | AbstractWallet;

export const addressify = (addressLike: AddressLike): AbstractAddress => {
  if (addressLike instanceof AbstractWallet) {
    return addressLike.address;
  }

  return addressLike;
};

export type ContractIdLike = AbstractAddress | AbstractContract;

export const contractIdify = (contractIdLike: ContractIdLike): AbstractAddress => {
  if (contractIdLike instanceof AbstractContract) {
    return contractIdLike.id;
  }

  return contractIdLike;
};
