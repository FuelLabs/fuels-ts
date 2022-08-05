import type { Bytes } from '@ethersproject/bytes';
import { Logger } from '@ethersproject/logger';
import { sha256 } from '@ethersproject/sha2';
import { AbstractAddress } from '@fuel-ts/interfaces';
import type { Bech32Address, B256Address } from '@fuel-ts/interfaces';

import {
  normalizeBech32,
  isBech32,
  toB256,
  getBytesFromBech32,
  toBech32,
  getRandomB256,
} from './utils';

const logger = new Logger(process.env.BUILD_VERSION || '~');

export default class Address extends AbstractAddress {
  bech32Address: Bech32Address;

  constructor(address: string) {
    super();
    logger.checkNew(new.target, Address);
    this.bech32Address = normalizeBech32(address);

    if (!isBech32(this.bech32Address)) {
      logger.throwArgumentError('Invalid Bech32 Address', 'address', address);
    }
  }

  get address(): Bech32Address {
    return this.bech32Address;
  }

  get b256Address(): B256Address {
    return toB256(this.bech32Address);
  }

  get byteAddress(): Bytes {
    return getBytesFromBech32(this.bech32Address);
  }

  toString(): string {
    return this.bech32Address;
  }
}

/**
 * Takes a Public Key, hashes it, and creates an Address wrapper
 */
export function fromPublicKey(publicKey: string): Address {
  const b256Address = sha256(publicKey);
  return new Address(toBech32(b256Address));
}

/**
 * Takes a B256Address and creates an Address wrapper
 */
export function fromB256(b256Address: string): Address {
  return new Address(toBech32(b256Address));
}

/**
 * Takes creates an Address wrapper on a random address
 */
export function fromRandom(): Address {
  return fromB256(getRandomB256());
}
