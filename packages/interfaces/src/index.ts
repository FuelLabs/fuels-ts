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

export type ContractIdLike = AbstractAddress | AbstractContract;
