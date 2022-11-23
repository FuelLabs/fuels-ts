import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { Bech32Address, B256Address } from '@fuel-ts/interfaces';
import { versions } from '@fuel-ts/versions';

import {
  normalizeBech32,
  isBech32,
  toB256,
  getBytesFromBech32,
  toBech32,
  getRandomB256,
} from './utils';

const logger = new Logger(versions.FUELS_TS_SDK);

export default class Address extends AbstractAddress {
  readonly bech32Address: Bech32Address;

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
}
