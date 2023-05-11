import { hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { Bech32Address, B256Address, EVMAddress as IEvmAddress } from '@fuel-ts/interfaces';
import { versions } from '@fuel-ts/versions';

import type Address from './address';
import { toBech32, isB256, getBytesFromBech32 } from './utils';

const logger = new Logger(versions.FUELS);

export class EvmAddress extends AbstractAddress implements IEvmAddress {
  value: B256Address;

  constructor(value: B256Address) {
    super();
    logger.checkNew(new.target, EvmAddress);

    if (!isB256(value)) {
      logger.throwArgumentError('Invalid EVM Address', 'value', value);
    }

    // Note: An EVM address is only 20 bytes, so the first 12 bytes of the inner value are set to zero
    this.value = EvmAddress.clearFirstTwelveBytesFromB256(value);
  }

  /**
   * Returns the value address as 256 bit hash string
   *
   * @returns B256Address
   */
  toB256(): B256Address {
    return this.value;
  }

  /**
   * Returns the value address as hexed 256 bit hash string
   *
   * @returns B256Address
   */
  toHexString(): B256Address {
    return this.value;
  }

  /**
   * Returns the value address in Bech32m format
   *
   * @returns Bech32Address
   */
  toAddress(): Bech32Address {
    return toBech32(this.value);
  }

  /**
   * Returns the value address in string Bech32m format
   *
   * @returns Bech32Address
   */
  toString(): Bech32Address {
    return toBech32(this.value);
  }

  /**
   * Returns the value address in string Bech 32m format
   *
   * @returns string
   */
  toJSON(): string {
    return toBech32(this.value);
  }

  /**
   * Evaluates the equality of this EvmAddress to another
   *
   * @param other - the evm address to compare
   * @returns bool
   */
  equals(other: EvmAddress): boolean {
    return this.value === other.value;
  }

  /**
   * Returns the value address as a byte array
   *
   * @returns Uint8Array
   */
  toBytes(): Uint8Array {
    return getBytesFromBech32(toBech32(this.value));
  }

  /**
   * Takes an Address and creates an EVMAddress
   *
   * @param address - the address to transform
   * @returns EvmAddress
   */
  static fromAddress(address: Address): EvmAddress {
    return new EvmAddress(address.toB256());
  }

  /**
   * Takes a Public Key, hashes it, and creates an EvmAddress
   *
   * @param publicKey - the wallets public key
   * @returns a new `Address` instance
   */
  static fromPublicKey(publicKey: string): EvmAddress {
    const b256Address = sha256(publicKey);
    return new EvmAddress(b256Address);
  }

  /**
   * Takes a B256Address and clears the first 12 bytes
   *
   * @param value - the B256Address to clear
   * @returns B256Address
   */
  static clearFirstTwelveBytesFromB256(value: B256Address): B256Address {
    let bytes;

    try {
      if (!isB256(value)) {
        throw new Error();
      }

      bytes = getBytesFromBech32(toBech32(value));
      bytes = hexlify(bytes.fill(0, 0, 12));
    } catch (error) {
      return logger.throwArgumentError('Cannot generate EVM address from B256', 'value', value);
    }

    return bytes;
  }
}
