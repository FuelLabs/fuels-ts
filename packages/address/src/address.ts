import { FuelError } from '@fuel-ts/errors';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { Bech32Address, B256Address, EvmAddress, AssetId } from '@fuel-ts/interfaces';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { sha256 } from '@noble/hashes/sha256';

import {
  normalizeBech32,
  isBech32,
  toB256,
  getBytesFromBech32,
  toBech32,
  getRandomB256,
  isPublicKey,
  isB256,
  clearFirst12BytesFromB256,
  isEvmAddress,
  padFirst12BytesOfEvmAddress,
} from './utils';

/**
 * `Address` provides a type safe wrapper for converting between different address formats
 * ands comparing them for equality.
 */
export default class Address extends AbstractAddress {
  // #region address-2
  /**
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   */
  readonly bech32Address: Bech32Address;
  // #endregion address-2

  /**
   * @param address - A Bech32 address
   */
  constructor(address: Bech32Address) {
    super();
    this.bech32Address = normalizeBech32(address);

    if (!isBech32(this.bech32Address)) {
      throw new FuelError(
        FuelError.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${address}.`
      );
    }
  }

  /**
   * Returns the `bech32Address` property
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property
   */
  toAddress(): Bech32Address {
    return this.bech32Address;
  }

  /**
   * Converts and returns the `bech32Address` property to a 256 bit hash string
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toB256(): B256Address {
    return toB256(this.bech32Address);
  }

  /**
   * Converts and returns the `bech32Address` property to a byte array
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as a byte array
   */
  toBytes(): Uint8Array {
    return getBytesFromBech32(this.bech32Address);
  }

  /**
   * Converts
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toHexString(): B256Address {
    return this.toB256();
  }

  /**
   * Converts and returns the `bech32Address` property as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toString(): string {
    return this.bech32Address;
  }

  /**
   * Converts and returns the `bech32Address` property as a string
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as a string
   */
  toJSON(): string {
    return this.bech32Address;
  }

  /**
   * Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as an {@link EvmAddress | `EvmAddress`}
   */
  toEvmAddress(): EvmAddress {
    const b256Address = toB256(this.bech32Address);

    return {
      bits: clearFirst12BytesFromB256(b256Address),
    } as EvmAddress;
  }

  /**
   * Wraps the `bech32Address` property and returns as an `AssetId`.
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The `bech32Address` property as an {@link AssetId | `AssetId`}
   */
  toAssetId(): AssetId {
    return {
      bits: this.toB256(),
    } as AssetId;
  }

  /**
   * Returns the value of the `bech32Address` property
   *@deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @returns The value of `bech32Address` property
   */
  valueOf(): string {
    return this.bech32Address;
  }

  /**
   * Compares this the `bech32Address` property to another for direct equality
   * @deprecated
   * The `bech32Address` is now deprecated. Please migrate to `toB256` as this will be the standard going forward.
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(other: Address): boolean {
    return this.bech32Address === other.bech32Address;
  }

  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   */
  static fromPublicKey(publicKey: string): Address {
    if (!isPublicKey(publicKey)) {
      throw new FuelError(FuelError.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${publicKey}.`);
    }

    const b256Address = hexlify(sha256(arrayify(publicKey)));
    return new Address(toBech32(b256Address));
  }

  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   */
  static fromB256(b256Address: string): Address {
    if (!isB256(b256Address)) {
      throw new FuelError(
        FuelError.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${b256Address}.`
      );
    }

    return new Address(toBech32(b256Address));
  }

  /**
   * Creates an `Address` with a randomized `bech32Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom(): Address {
    return this.fromB256(getRandomB256());
  }

  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   */
  static fromString(address: string): Address {
    return isBech32(address) ? new Address(address as Bech32Address) : this.fromB256(address);
  }

  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   */
  static fromAddressOrString(address: string | AbstractAddress): AbstractAddress {
    return typeof address === 'string' ? this.fromString(address) : address;
  }

  /**
   * Takes a dynamic string or `AbstractAddress` and creates an `Address`
   *
   * @param addressId - A string containing Bech32, B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   */
  static fromDynamicInput(address: string | AbstractAddress): Address {
    // If address is a object than we assume it's a AbstractAddress
    // we don't check by instanceof because it's possible to
    // the host app to have a different reference to this same class type
    if (typeof address !== 'string' && 'toB256' in address) {
      return Address.fromB256(address.toB256());
    }
    if (isPublicKey(address)) {
      return Address.fromPublicKey(address);
    }

    if (isBech32(address)) {
      return new Address(address as Bech32Address);
    }

    if (isB256(address)) {
      return Address.fromB256(address);
    }

    if (isEvmAddress(address)) {
      return Address.fromEvmAddress(address);
    }

    throw new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported.`
    );
  }

  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   */
  static fromEvmAddress(evmAddress: string): Address {
    if (!isEvmAddress(evmAddress)) {
      throw new FuelError(
        FuelError.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${evmAddress}.`
      );
    }

    const paddedAddress = padFirst12BytesOfEvmAddress(evmAddress);

    return new Address(toBech32(paddedAddress));
  }
}
