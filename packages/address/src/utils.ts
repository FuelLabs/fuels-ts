import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import { AbstractContract, AbstractAccount } from '@fuel-ts/interfaces';
import type {
  B256Address,
  AddressLike,
  ContractIdLike,
  AbstractAddress,
  B256AddressEvm,
} from '@fuel-ts/interfaces';
import { arrayify, concat, hexlify } from '@fuel-ts/utils';

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

export function normalizeB256(address: B256Address): B256Address {
  return address.toLowerCase();
}

/**
 * Takes an indeterminate address type and returns an address
 *
 * @hidden
 */
export const addressify = (addressLike: AddressLike | ContractIdLike): AbstractAddress => {
  if (addressLike instanceof AbstractAccount) {
    return addressLike.address;
  }

  if (addressLike instanceof AbstractContract) {
    return addressLike.id;
  }

  return addressLike;
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
