/* eslint-disable max-classes-per-file */
// #region typedoc:Bech32-HRP
export type Bech32Address = `fuel${string}`;
// #endregion
export type B256Address = string;

export abstract class AbstractScript<T> {
  abstract bytes: Uint8Array;
  abstract encodeScriptData: (data: T) => Uint8Array;
}

// #region typedoc:AbstractAddress
export abstract class AbstractAddress {
  abstract toJSON(): string;
  abstract toString(): string;
  abstract toAddress(): Bech32Address;
  abstract toB256(): B256Address;
  abstract toHexString(): string;
  abstract toBytes(): Uint8Array;
  abstract equals(other: AbstractAddress): boolean;
}
// #endregion

export abstract class AbstractContract {
  abstract id: AbstractAddress;
}

export abstract class AbstractWallet {
  abstract address: AbstractAddress;
}

export type AddressLike = AbstractAddress | AbstractWallet;

export type ContractIdLike = AbstractAddress | AbstractContract;

export abstract class AbstractPredicate {
  abstract bytes: Uint8Array;
  abstract address: AbstractAddress;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract types?: ReadonlyArray<any>;
}
