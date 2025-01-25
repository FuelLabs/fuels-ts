import { FuelError } from '@fuel-ts/errors';
import { arrayify, hexlify } from '@fuel-ts/utils';
import { sha256 } from '@noble/hashes/sha256';

import type { B256Address, EvmAddress, AssetId, ChecksumAddress, AddressInput } from './types';
import {
  getRandomB256,
  isB256,
  isEvmAddress,
  toB256AddressEvm,
  fromPublicKeyToB256,
  fromDynamicInputToB256,
  normalizeB256,
} from './utils';

/**
 * `Address` provides a type safe wrapper for converting between different address formats
 * ands comparing them for equality.
 */
export class Address {
  // #region address-2
  readonly b256Address: B256Address;
  // #endregion address-2

  /**
   * @param address - A B256 address, public key, EVM address, or Address instance
   */
  constructor(address: AddressInput) {
    const b256Address = fromDynamicInputToB256(address);
    this.b256Address = normalizeB256(b256Address);
  }

  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum(): ChecksumAddress {
    return Address.toChecksum(this.b256Address);
  }

  /**
   * Returns the `b256Address` property
   */
  toAddress(): B256Address {
    return this.b256Address;
  }

  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toB256(): B256Address {
    return this.b256Address;
  }

  /**
   * Returns the B256 hash address as a Uint8Array
   *
   * @returns The B256 address as a Uint8Array
   */
  toBytes(): Uint8Array {
    return arrayify(this.b256Address);
  }

  /**
   * Returns the B256 hash address as a string
   *
   * @returns The B256 address
   */
  toHexString(): B256Address {
    return this.toB256();
  }

  /**
   * returns the address `checksum` as a string
   *
   * @returns The `b256Address` property as a string
   */
  toString(): string {
    return this.toChecksum();
  }

  /**
   * Converts and returns the `b256Address` property as a string
   * @returns The `b256Address` property as a JSON string
   */
  toJSON(): string {
    return this.b256Address;
  }

  /**
   * Converts to an EVM address
   *
   * @returns an {@link EvmAddress | `EvmAddress`} representation of the address
   */
  toEvmAddress(): EvmAddress {
    return {
      bits: toB256AddressEvm(this.b256Address),
    } as EvmAddress;
  }

  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId(): AssetId {
    return {
      bits: this.b256Address,
    } as AssetId;
  }

  /**
   * Wraps the B256 address `checksum` and returns it as a string
   * @returns The B256 address `checksum` as a string
   */
  valueOf(): string {
    return this.toChecksum();
  }

  /**
   * Compares this the `b256Address` property to another for direct equality
   * @param other - Another address to compare against
   * @returns The equality of the comparison
   */
  equals(other: Address): boolean {
    return this.toChecksum() === other.toChecksum();
  }

  /**
   * Takes a Public Key, hashes it, and creates an `Address`
   *
   * @param publicKey - A wallets public key
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromPublicKey(publicKey: string): Address {
    const b256Address = fromPublicKeyToB256(publicKey);
    return new Address(b256Address);
  }

  /**
   * Takes a B256 Address and creates an `Address`
   *
   * @param b256Address - A b256 hash
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromB256(b256Address: string): Address {
    if (!isB256(b256Address)) {
      throw new FuelError(
        FuelError.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${b256Address}.`
      );
    }

    return new Address(b256Address);
  }

  /**
   * Creates an `Address` with a randomized `b256Address` property
   *
   * @returns A new `Address` instance
   */
  static fromRandom(): Address {
    return new Address(getRandomB256());
  }

  /**
   * Takes an ambiguous string and attempts to create an `Address`
   *
   * @param address - An ambiguous string
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromString(address: string): Address {
    return new Address(address);
  }

  /**
   * Takes an ambiguous string or address and creates an `Address`
   *
   * @returns a new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromAddressOrString(address: string | Address): Address {
    return new Address(address);
  }

  /**
   * Takes a dynamic string or `Address` and creates an `Address`
   *
   * @param addressId - A string containing B256, or Public Key
   * @throws Error - Unknown address if the format is not recognised
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromDynamicInput(address: string | Address): Address {
    return new Address(address);
  }

  /**
   * Takes an Evm Address and returns back an `Address`
   *
   * @returns A new `Address` instance
   *
   * @deprecated Use `new Address` instead
   */
  static fromEvmAddress(evmAddress: string): Address {
    if (!isEvmAddress(evmAddress)) {
      throw new FuelError(
        FuelError.CODES.INVALID_EVM_ADDRESS,
        `Invalid Evm Address: ${evmAddress}.`
      );
    }

    return new Address(evmAddress);
  }

  /**
   * Takes an ChecksumAddress and validates if it is a valid checksum address.
   *
   * @returns A `boolean` instance indicating if the address is valid.
   */
  static isChecksumValid(address: ChecksumAddress): boolean {
    let addressParsed = address;

    if (!address.startsWith('0x')) {
      addressParsed = `0x${address}`;
    }
    if (addressParsed.trim().length !== 66) {
      return false;
    }

    return Address.toChecksum(hexlify(addressParsed)) === addressParsed;
  }

  /** @hidden */
  private static toChecksum(address: string) {
    if (!isB256(address)) {
      throw new FuelError(
        FuelError.CODES.INVALID_B256_ADDRESS,
        `Invalid B256 Address: ${address}.`
      );
    }

    const addressHex = hexlify(address).toLowerCase().slice(2);
    const checksum = sha256(addressHex);

    let ret = '0x';
    for (let i = 0; i < 32; ++i) {
      const byte = checksum[i];
      const ha = addressHex.charAt(i * 2);
      const hb = addressHex.charAt(i * 2 + 1);
      ret += (byte & 0xf0) >= 0x80 ? ha.toUpperCase() : ha;
      ret += (byte & 0x0f) >= 0x08 ? hb.toUpperCase() : hb;
    }

    return ret;
  }
}
