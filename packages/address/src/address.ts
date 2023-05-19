import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { Bech32Address, B256Address, EvmAddress } from '@fuel-ts/interfaces';
import { versions } from '@fuel-ts/versions';

import {
  normalizeBech32,
  isBech32,
  toB256,
  getBytesFromBech32,
  toBech32,
  getRandomB256,
  isPublicKey,
  isB256,
  getEvmB256fromB256,
} from './utils';

const logger = new Logger(versions.FUELS);

export default class Address extends AbstractAddress {
  // #region address-2
  readonly bech32Address: Bech32Address;
  // #endregion address-2

  constructor(address: Bech32Address) {
    super();
    logger.checkNew(new.target, Address);
    this.bech32Address = normalizeBech32(address);

    if (!isBech32(this.bech32Address)) {
      logger.throwArgumentError('Invalid Bech32 Address', 'address', address);
    }
  }

  /**
   * @returns This address as a Bech32m string
   */
  toAddress(): Bech32Address {
    return this.bech32Address;
  }

  /**
   * @returns This address as 256 bit hash string
   */
  toB256(): B256Address {
    return toB256(this.bech32Address);
  }

  /**
   * @returns Returns this address as a byte array
   */
  toBytes(): Uint8Array {
    return getBytesFromBech32(this.bech32Address);
  }

  /**
   * @returns This address as hexed 256 bit hash string
   */
  toHexString(): B256Address {
    return this.toB256();
  }

  /**
   * Prints this Address value
   * @returns a string address in Bech32m Format
   */
  toString(): string {
    return this.bech32Address;
  }

  /**
   * Parses this Address value
   * @returns a string address in Bech32m Format
   */
  toJSON(): string {
    return this.toString();
  }

  /**
   * Returns the address value as an EvmAddress
   * @returns the bech32 address as an EvmAddress
   */
  toEvmAddress(): EvmAddress {
    const b256Address = toB256(this.bech32Address);

    return {
      value: getEvmB256fromB256(b256Address),
    } as EvmAddress;
  }

  /**
   * Returns the value of this Address value
   * @returns a string address in Bech32m Format
   */
  valueOf(): string {
    return this.toString();
  }

  /**
   * Compare this Address value to another for direct equality
   * @param other - the other address to compare against
   * @returns true if addresses are equal
   */
  equals(other: Address): boolean {
    return this.bech32Address === other.bech32Address;
  }

  /**
   * Takes a Public Key, hashes it, and creates an Address
   * @param publicKey - the wallets public key
   * @returns a new `Address` instance
   */
  static fromPublicKey(publicKey: string): Address {
    const b256Address = sha256(publicKey);
    return new Address(toBech32(b256Address));
  }

  /**
   * Takes a B256Address and creates an Address
   * @param b256Address - the b256 hash
   * @returns a new `Address` instance
   */
  static fromB256(b256Address: string): Address {
    return new Address(toBech32(b256Address));
  }

  /**
   * Creates a random address within an Address
   * @returns a new `Address` instance
   */
  static fromRandom(): Address {
    return this.fromB256(getRandomB256());
  }

  /**
   * Takes an ambiguous string and attempts to create an Address
   * @returns a new `Address` instance
   */
  static fromString(address: string): Address {
    return isBech32(address) ? new Address(address as Bech32Address) : this.fromB256(address);
  }

  /**
   * Takes an ambiguous string or address and creates an address
   * @returns a new `Address` instance
   */
  static fromAddressOrString(address: string | AbstractAddress): AbstractAddress {
    return typeof address === 'string' ? this.fromString(address) : address;
  }

  /**
   * Takes an optional string and returns back an Address
   *
   * @param addressId - Can be a string containing Bech32, B256, or Public Key
   * @throws Error
   * thrown if the input string is not nilsy and cannot be resolved to a valid address format
   * @returns a new `Address` instance
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

    throw new Error('Unknown address format: only Bech32, B256, or Public Key (512) supported');
  }
}
