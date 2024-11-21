import { FuelError } from '@fuel-ts/errors';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type {
  Bech32Address,
  B256Address,
  EvmAddress,
  AssetId,
  ChecksumAddress,
} from '@fuel-ts/interfaces';
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
   * Type `Bech32Address` is now deprecated, as is this property. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
   */
  readonly bech32Address: Bech32Address;
  // #endregion address-2

  /**
   * @param address - A Bech32 address
   */
  constructor(address: Bech32Address | B256Address) {
    super();

    if (isBech32(address)) {
      this.bech32Address = normalizeBech32(address as Bech32Address);
    } else if (isB256(address)) {
      this.bech32Address = toBech32(address);
    } else {
      throw new FuelError(
        FuelError.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${address}.`
      );
    }
  }

  /**
   * Takes an B256 Address and returns back an checksum address.
   * The implementation follows the ERC-55 https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md.
   *
   * @returns A new `ChecksumAddress` instance
   */
  toChecksum(): ChecksumAddress {
    return Address.toChecksum(this.toB256());
  }

  /**
   * Returns the `bech32Address` property
   * @deprecated
   * Type `Bech32Address` is now deprecated, as is this method. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
   * @returns The `bech32Address` property
   */
  toAddress(): Bech32Address {
    return this.bech32Address;
  }

  /**
   * Converts and returns the `bech32Address` property to a 256 bit hash string
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toB256(): B256Address {
    return toB256(this.bech32Address);
  }

  /**
   * Converts and returns the `bech32Address` property to a byte array
   * @returns The `bech32Address` property as a byte array
   */
  toBytes(): Uint8Array {
    return getBytesFromBech32(this.bech32Address);
  }

  /**
   * Converts the `bech32Address` property to a 256 bit hash string
   * @returns The `bech32Address` property as a 256 bit hash string
   */
  toHexString(): B256Address {
    return this.toB256();
  }

  /**
   * returns the address `checksum` as a string
   *
   * @returns The `bech32Address` property as a string
   */
  toString(): string {
    return this.toChecksum();
  }

  /**
   * Converts and returns the `bech32Address` property as a string
   * @returns The `bech32Address` property as a JSON string
   */
  toJSON(): string {
    return this.bech32Address;
  }

  /**
   * Clears the first 12 bytes of the `bech32Address` property and returns it as a `EvmAddress`
   * @returns The `bech32Address` property as an {@link EvmAddress | `EvmAddress`}
   */
  toEvmAddress(): EvmAddress {
    const b256Address = toB256(this.bech32Address);

    return {
      bits: clearFirst12BytesFromB256(b256Address),
    } as EvmAddress;
  }

  /**
   * Wraps the B256 property and returns as an `AssetId`.
   * @returns The B256 property as an {@link AssetId | `AssetId`}
   */
  toAssetId(): AssetId {
    return {
      bits: this.toB256(),
    } as AssetId;
  }

  /**
   * Returns the value of the `bech32Address` property
   * @returns The value of `bech32Address` property
   */
  override valueOf(): string {
    return this.toChecksum();
  }

  /**
   * Compares this the `bech32Address` property to another for direct equality
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
