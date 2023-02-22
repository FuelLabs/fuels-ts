import type { BytesLike } from '@ethersproject/bytes';
import { isHexString, isBytes, arrayify, hexlify } from '@ethersproject/bytes';
import { sha256 } from '@ethersproject/sha2';
import type { AccountAddress } from '@fuel-ts/interfaces';
import { randomBytes } from '@fuel-ts/keystore';
import { bech32m } from 'bech32';

// Fuel Network HRP (human-readable part) for bech32 encoding
export const FUEL_BECH32_HRP_PREFIX = 'fuel';

function toText(text: BytesLike): string {
  if (isBytes(text)) {
    return new TextDecoder('ascii').decode(Uint8Array.from(text));
  }
  return text;
}

export class Bech32 {
  static isB256(address: BytesLike): boolean {
    const a = isBytes(address) ? hexlify(address) : address;
    return isHexString(a, 32);
  }

  static isPublicKey(address: BytesLike): boolean {
    const a = isBytes(address) ? hexlify(address) : address;
    return isHexString(a, 64);
  }

  static isBech32(address: BytesLike): boolean {
    if (Bech32.isB256(address)) return false;
    if (Bech32.isPublicKey(address)) return false;
    try {
      const bech32 = toText(address);
      if (bech32.length > 90) return false;
      const { prefix } = bech32m.decode(bech32);
      return prefix === FUEL_BECH32_HRP_PREFIX;
    } catch {
      return false;
    }
  }

  static fromB256(address: BytesLike): AccountAddress {
    if (!Bech32.isB256(address)) {
      throw new Error('Invalid B256 address');
    }
    return bech32m.encode(
      FUEL_BECH32_HRP_PREFIX,
      bech32m.toWords(arrayify(address))
    ) as AccountAddress;
  }

  static toB256(address: BytesLike): string {
    if (!Bech32.isBech32(address)) {
      throw new Error('Invalid Bech32 address');
    }
    const bech32 = toText(address);
    const bytes = new Uint8Array(bech32m.fromWords(bech32m.decode(bech32).words));
    return hexlify(bytes);
  }

  static fromPublicKey(address: BytesLike): AccountAddress {
    if (!Bech32.isPublicKey(address)) {
      throw new Error('Invalid Public Key');
    }
    return Bech32.fromB256(sha256(address));
  }

  static fromString(address: BytesLike): AccountAddress {
    if (Bech32.isPublicKey(address)) {
      return Bech32.fromPublicKey(address);
    }
    if (Bech32.isB256(address)) {
      return Bech32.fromB256(address);
    }
    if (Bech32.isBech32(address)) {
      return toText(address) as AccountAddress;
    }
    throw new Error('Unknown address format: only Bech32, B256, or Public Key (512) supported');
  }

  static toB256FromString(address: BytesLike): string {
    const bech32 = Bech32.fromString(address);
    return Bech32.toB256(bech32);
  }

  static equals(a: BytesLike, b: BytesLike): boolean {
    return Bech32.fromString(a) === Bech32.fromString(b);
  }

  static generate() {
    return Bech32.fromB256(randomBytes(32));
  }

  static assert(address: BytesLike) {
    if (!Bech32.isBech32(address)) {
      throw new Error('Invalid Bech32 address');
    }
  }
}
