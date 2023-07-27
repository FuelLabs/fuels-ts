import type { BytesLike } from '@ethersproject/bytes';
import { arrayify, hexlify } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { randomBytes } from '@fuel-ts/crypto';
import { AbstractContract, AbstractAccount } from '@fuel-ts/interfaces';
import type {
  Bech32Address,
  B256Address,
  AddressLike,
  ContractIdLike,
  AbstractAddress,
  B256AddressEvm,
} from '@fuel-ts/interfaces';
import { versions } from '@fuel-ts/versions';
import type { Decoded } from 'bech32';
import { bech32m } from 'bech32';

const logger = new Logger(versions.FUELS);

/**
 * Fuel Network HRP (human-readable part) for bech32 encoding
 *
 * @hidden
 */
export const FUEL_BECH32_HRP_PREFIX = 'fuel';

/**
 * Decodes a Bech32 address string into Decoded
 *
 * @hidden
 */
export function fromBech32(address: Bech32Address): Decoded {
  return bech32m.decode(address);
}

/**
 * Converts a B256 address string into Bech32
 *
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
 *
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
  return (address.length === 66 || address.length === 64) && /(0x)?[0-9a-f]{64}$/i.test(address);
}

/**
 * Determines if a given string is in Public Key format (512 bits)
 *
 * @hidden
 */
export function isPublicKey(address: string): boolean {
  return (address.length === 130 || address.length === 128) && /(0x)?[0-9a-f]{128}$/i.test(address);
}

/**
 * Takes a Bech32 address and returns the byte data
 *
 * @hidden
 */
export function getBytesFromBech32(address: Bech32Address): Uint8Array {
  return new Uint8Array(bech32m.fromWords(fromBech32(address).words));
}

/**
 * Converts a Bech32 address string into B256
 *
 * @hidden
 */
export function toB256(address: Bech32Address): B256Address {
  if (!isBech32(address)) {
    logger.throwArgumentError('Invalid Bech32 Address', 'address', address);
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
export const clearFirst12BytesFromB256 = (b256: B256Address): B256AddressEvm => {
  let bytes;

  try {
    if (!isB256(b256)) {
      throw new Error();
    }

    bytes = getBytesFromBech32(toBech32(b256));
    bytes = hexlify(bytes.fill(0, 0, 12)) as B256AddressEvm;
  } catch (error) {
    throw new Error(`Cannot generate EVM Address B256 from B256: ${b256}`);
  }

  return bytes;
};
