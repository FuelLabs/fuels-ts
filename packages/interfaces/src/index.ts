/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */

/**
 * @privateRemarks
 *
 * TODO: Consider re-distritubing interfaces near their original packages
 */

// #region bech32-1
/**
 * @deprecated
 * Type `Bech32Address` is now deprecated. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
 */
export type Bech32Address = `fuel${string}`;
// #endregion bech32-1
export type B256Address = string;

export type ChecksumAddress = string;

export type B256AddressEvm = `0x000000000000000000000000${string}`;

export type Bytes = Uint8Array | number[];

export type RawSlice = Uint8Array | number[];

export type BytesLike = Uint8Array | string;

/**
 * @prop bits - A 256 bit hash string with the first 12 bytes cleared
 */
export type EvmAddress = {
  bits: B256AddressEvm;
};

/**
 * @prop bits - A wrapped 256 bit hash string
 */
export type AssetId = {
  bits: B256Address;
};

export type StdString = string;
export type StrSlice = string;

/**
 * @hidden
 */
export abstract class AbstractScriptRequest<T> {
  abstract bytes: Uint8Array;
  abstract encodeScriptData: (data: T) => Uint8Array;
}

// #region address-1
export abstract class AbstractAddress {
  abstract toJSON(): string;
  abstract toString(): string;
  abstract toAddress(): Bech32Address;
  abstract toB256(): B256Address;
  abstract toHexString(): string;
  abstract toBytes(): Uint8Array;
  abstract equals(other: AbstractAddress): boolean;
}
// #endregion address-1

export abstract class AbstractAccount {
  abstract address: AbstractAddress;
  abstract provider: unknown;
  abstract getResourcesToSpend(quantities: any[], options?: any): any;
  abstract sendTransaction(transactionRequest: any, options?: any): any;
  abstract simulateTransaction(transactionRequest: any, options?: any): any;
  abstract getTransactionCost(transactionRequest: any, options?: any): Promise<any>;
  abstract fund(transactionRequest: any, txCost: any): Promise<any>;
}
/**
 * @hidden
 */
export abstract class AbstractProgram {
  abstract account: AbstractAccount | null;
  abstract interface: {
    readonly jsonAbi: any;
  };

  abstract provider: {
    sendTransaction(transactionRequest: any, options?: any): any;
    getTransactionCost(transactionRequest: any, options?: any): Promise<any>;
  } | null;
}

export abstract class AbstractContract extends AbstractProgram {
  abstract id: AbstractAddress;
}

/**
 * @hidden
 */
export abstract class AbstractScript extends AbstractProgram {
  abstract bytes: Uint8Array;
}

/** A simple type alias defined using the `type` keyword. */
export type AddressLike = AbstractAddress | AbstractAccount;

export type ContractIdLike = AbstractAddress | AbstractContract;
