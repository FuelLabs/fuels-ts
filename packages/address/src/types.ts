import type { Address } from './address';

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

export interface WithAddress {
  address: Address;
}

export interface WithContractId {
  id: Address;
}

/** A simple type alias defined using the `type` keyword. */
export type AddressLike = Address | WithAddress;

export type ContractIdLike = Address | WithContractId;
