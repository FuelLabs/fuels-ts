import { randomBytes } from '@fuel-ts/crypto';
import { FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/utils';
import { arrayify, hexlify } from '@fuel-ts/utils';
import type { Decoded } from 'bech32';
import { bech32m } from 'bech32';

import type { Address } from './address';
import type {
  AddressLike,
  ContractIdLike,
  B256Address,
  B256AddressEvm,
  Bech32Address,
} from './types';

/**
 * Fuel Network HRP (human-readable part) for bech32 encoding
 *
 * @hidden
 */
export const FUEL_BECH32_HRP_PREFIX = 'fuel';

/**
 * Decodes a Bech32 address string into Decoded
 * @deprecated
 * Type `Bech32Address` is now deprecated, as is this function. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
 * @hidden
 */
export function fromBech32(address: Bech32Address): Decoded {
  return bech32m.decode(address);
}

/**
 * Converts a B256 address string into Bech32
 * @deprecated
 * Type `Bech32Address` is now deprecated, as is this function. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
 * @hidden
 */
export function toBech32(address: B256Address): Bech32Address {
  return bech32m.encode(
    FUEL_BECH32_HRP_PREFIX,
    bech32m.toWords(arrayify(hexlify(address)))
  ) as Bech32Address;
}

/**
 * Determines if a given string is Bech32 format
 * @deprecated
 * Type `Bech32Address` is now deprecated, as is this function. Use `B256` addresses instead. ([help](https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256))
 * @hidden
 */
export function isBech32(address: BytesLike): boolean {
  return (
    typeof address === 'string' &&
    address.indexOf(FUEL_BECH32_HRP_PREFIX + 1) === 0 &&
    fromBech32(address as Bech32Address).prefix === FUEL_BECH32_HRP_PREFIX
  );
}

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
 * Takes a Bech32 address and returns the byte data
 * @deprecated
 * The `bech32Address` is now deprecated. Please migrate to B256 format (see https://docs.fuel.network/docs/specs/abi/argument-encoding/#b256 for more details) as this will be the standard going forward.
 * @hidden
 */
export function getBytesFromBech32(address: Bech32Address): Uint8Array {
  return new Uint8Array(bech32m.fromWords(fromBech32(address).words));
}

/**
 * Converts a Bech32 address string into B256
 * @hidden
 */
export function toB256(address: Bech32Address): B256Address {
  if (!isBech32(address)) {
    throw new FuelError(
      FuelError.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${address}.`
    );
  }

  return hexlify(getBytesFromBech32(address));
}

/**
 * Takes a Bech32 address and returns a normalized (i.e. lower case) representation of it.
 *
 * The input is validated along the way, which makes this significantly safer than
 * using `address.toLowerCase()`.
 *
 * @hidden
 */
export function normalizeBech32(address: Bech32Address): Bech32Address {
  const { words } = fromBech32(address);
  return bech32m.encode(FUEL_BECH32_HRP_PREFIX, words) as Bech32Address;
}

/**
 * A simple type guard to check if an object is an Address
 *
 * @hidden
 */
export function isAddress(address: object): address is Address {
  return 'bech32Address' in address;
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

  // TODO: add error code
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
export const clearFirst12BytesFromB256 = (b256: B256Address): B256AddressEvm => {
  let bytes;

  try {
    if (!isB256(b256)) {
      throw new FuelError(
        FuelError.CODES.INVALID_BECH32_ADDRESS,
        `Invalid Bech32 Address: ${b256}.`
      );
    }

    bytes = getBytesFromBech32(toBech32(b256));
    bytes = hexlify(bytes.fill(0, 0, 12)) as B256AddressEvm;
  } catch (error) {
    throw new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${b256}.`
    );
  }

  return bytes;
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
