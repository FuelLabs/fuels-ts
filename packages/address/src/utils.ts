import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { arrayify, concat, hexlify } from '@fuel-ts/utils';
import { sha256 } from '@noble/hashes/sha256';

import type { Address } from './address';
import type { AddressLike, ContractIdLike, B256Address, B256AddressEvm } from './types';

/**
 * Determines if a given string is B256 format
 *
 * @hidden
 */
export function isB256(address: string): boolean {
  return address.length === 66 && /(0x)[0-9a-f]{64}$/i.test(address);
}

/**
 * Determines if a given string is in Public Key format (512 bits)
 *
 * @hidden
 */
export function isPublicKey(address: string): boolean {
  return address.length === 130 && /(0x)[0-9a-f]{128}$/i.test(address);
}

/**
 * Determines if a given string is in EVM Address format
 *
 * @hidden
 */
export function isEvmAddress(address: string): boolean {
  return address.length === 42 && /(0x)[0-9a-f]{40}$/i.test(address);
}

/**
 * Normalizes a B256 address to lowercase
 *
 * @param address - The B256 address to normalize
 * @returns The normalized B256 address
 *
 * @hidden
 */
export function normalizeB256(address: B256Address): B256Address {
  return address.toLowerCase();
}

/**
 * A simple type guard to check if an object is an Address
 *
 * @hidden
 */
export function isAddress(address: object): address is Address {
  return 'b256Address' in address;
}

/**
 * Takes an indeterminate address type and returns an address
 *
 * @hidden
 */
export const addressify = (addressLike: AddressLike | ContractIdLike): Address => {
  if (isAddress(addressLike)) {
    return addressLike;
  }

  if ('address' in addressLike && isAddress(addressLike.address)) {
    return addressLike.address;
  }

  if ('id' in addressLike && isAddress(addressLike.id)) {
    return addressLike.id;
  }

  throw new FuelError(FuelError.CODES.INVALID_ADDRESS, 'Invalid address');
};

/**
 * @hidden
 */
export const getRandomB256 = () => hexlify(randomBytes(32));

/**
 * Takes a B256 address and clears the first 12 bytes, this is required for an EVM Address
 *
 * @param b256 - the address to clear
 * @returns b256 with first 12 bytes cleared
 *
 * @hidden
 */
export const toB256AddressEvm = (b256: B256Address): B256AddressEvm => {
  try {
    if (!isB256(b256)) {
      throw new FuelError(FuelError.CODES.INVALID_B256_ADDRESS, `Invalid B256 Address: ${b256}.`);
    }

    const evmBytes = arrayify(b256).slice(12);
    const paddedBytes = new Uint8Array(12).fill(0);
    return hexlify(concat([paddedBytes, evmBytes])) as B256AddressEvm;
  } catch (error) {
    throw new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${b256}.`
    );
  }
};

/**
 * Pads the first 12 bytes of an Evm address. This is useful for padding addresses returned from
 * the EVM to interact with the Sway EVM Address Type.
 *
 * @param address - Evm address to be padded
 * @returns Evm address padded to a b256 address
 *
 * @hidden
 */
export const padFirst12BytesOfEvmAddress = (address: string): B256AddressEvm => {
  if (!isEvmAddress(address)) {
    throw new FuelError(FuelError.CODES.INVALID_EVM_ADDRESS, 'Invalid EVM address format.');
  }

  return address.replace('0x', '0x000000000000000000000000') as B256AddressEvm;
};

/**
 * Converts an EVM address to a B256 address
 *
 * @param address - The EVM address to convert
 * @returns The B256 address
 *
 * @hidden
 */
export const fromEvmAddressToB256 = (address: string): B256Address =>
  padFirst12BytesOfEvmAddress(address);

/**
 * Converts a Public Key to a B256 address
 *
 * @param publicKey - The Public Key to convert
 * @returns The B256 address
 *
 * @hidden
 */
export const fromPublicKeyToB256 = (publicKey: string): B256Address => {
  if (!isPublicKey(publicKey)) {
    throw new FuelError(FuelError.CODES.INVALID_PUBLIC_KEY, `Invalid Public Key: ${publicKey}.`);
  }

  return hexlify(sha256(arrayify(publicKey)));
};

/**
 * Converts a dynamic input to a B256 address
 *
 * @param address - The dynamic input to convert
 * @returns The B256 address
 *
 * @hidden
 */
export const fromDynamicInputToB256 = (address: string | Address): B256Address => {
  if (typeof address !== 'string' && 'toB256' in address) {
    return address.toB256();
  }

  if (isB256(address)) {
    return address;
  }

  if (isPublicKey(address)) {
    return fromPublicKeyToB256(address);
  }

  if (isEvmAddress(address)) {
    return fromEvmAddressToB256(address);
  }

  throw new FuelError(
    FuelError.CODES.PARSE_FAILED,
    `Unknown address format: only 'B256', 'Public Key (512)', or 'EVM Address' are supported.`
  );
};
