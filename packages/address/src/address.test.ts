import { arrayify } from '@ethersproject/bytes';
import type { AccountAddress } from '@fuel-ts/interfaces';
import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';

import { Bech32 } from './address';

const PUBLIC_KEY = signMessageTest.publicKey;
const PUBLIC_KEY_WORDS = arrayify(signMessageTest.publicKey);
const ADDRESS_B256 = signMessageTest.b256Address;
const ADDRESS_B256_BYTES = arrayify(ADDRESS_B256);
const ADDRESS_BECH32 = signMessageTest.address as AccountAddress;
const ADDRESS_BECH32_BYTES = new TextEncoder().encode(ADDRESS_BECH32);

describe('Address utils', () => {
  test('isB256', async () => {
    expect(Bech32.isB256(ADDRESS_B256)).toBeTruthy();
    expect(Bech32.isB256(ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.isB256(ADDRESS_BECH32)).toBeFalsy();
    expect(Bech32.isB256(ADDRESS_BECH32_BYTES)).toBeFalsy();
    expect(Bech32.isB256(PUBLIC_KEY)).toBeFalsy();
    expect(Bech32.isB256(PUBLIC_KEY_WORDS)).toBeFalsy();
    expect(Bech32.isB256('foo')).toBeFalsy();
  });

  test('isBech32', async () => {
    expect(Bech32.isBech32(ADDRESS_B256)).toBeFalsy();
    expect(Bech32.isBech32(ADDRESS_B256_BYTES)).toBeFalsy();
    expect(Bech32.isBech32(ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.isBech32(ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.isBech32(PUBLIC_KEY)).toBeFalsy();
    expect(Bech32.isBech32(PUBLIC_KEY_WORDS)).toBeFalsy();
    expect(Bech32.isBech32('foo')).toBeFalsy();
  });

  test('isPublicKey', async () => {
    expect(Bech32.isPublicKey(ADDRESS_B256)).toBeFalsy();
    expect(Bech32.isPublicKey(ADDRESS_B256_BYTES)).toBeFalsy();
    expect(Bech32.isPublicKey(ADDRESS_BECH32)).toBeFalsy();
    expect(Bech32.isPublicKey(ADDRESS_BECH32_BYTES)).toBeFalsy();
    expect(Bech32.isPublicKey(PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.isPublicKey(PUBLIC_KEY_WORDS)).toBeTruthy();
    expect(Bech32.isPublicKey('foo')).toBeFalsy();
  });

  test('fromB256', async () => {
    expect(Bech32.fromB256(ADDRESS_B256)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromB256(ADDRESS_B256_BYTES)).toBe(ADDRESS_BECH32);
    expect(() => Bech32.fromB256(ADDRESS_BECH32)).toThrow('Invalid B256 address');
    expect(() => Bech32.fromB256(ADDRESS_BECH32_BYTES)).toThrow('Invalid B256 address');
    expect(() => Bech32.fromB256(PUBLIC_KEY)).toThrow('Invalid B256 address');
    expect(() => Bech32.fromB256(PUBLIC_KEY_WORDS)).toThrow('Invalid B256 address');
    expect(() => Bech32.fromB256('foo')).toThrow('Invalid B256 address');
  });

  test('toB256', async () => {
    expect(() => Bech32.toB256(ADDRESS_B256)).toThrow('Invalid Bech32 address');
    expect(() => Bech32.toB256(ADDRESS_B256_BYTES)).toThrow('Invalid Bech32 address');
    expect(Bech32.toB256(ADDRESS_BECH32)).toBe(ADDRESS_B256);
    expect(Bech32.toB256(ADDRESS_BECH32_BYTES)).toBe(ADDRESS_B256);
    expect(() => Bech32.toB256(PUBLIC_KEY)).toThrow('Invalid Bech32 address');
    expect(() => Bech32.toB256(PUBLIC_KEY_WORDS)).toThrow('Invalid Bech32 address');
    expect(() => Bech32.toB256('foo')).toThrow('Invalid Bech32 address');
  });

  test('fromPublicKey', async () => {
    expect(() => Bech32.fromPublicKey(ADDRESS_B256)).toThrow('Invalid Public Key');
    expect(() => Bech32.fromPublicKey(ADDRESS_B256_BYTES)).toThrow('Invalid Public Key');
    expect(() => Bech32.fromPublicKey(ADDRESS_BECH32)).toThrow('Invalid Public Key');
    expect(() => Bech32.fromPublicKey(ADDRESS_BECH32_BYTES)).toThrow('Invalid Public Key');
    expect(Bech32.fromPublicKey(PUBLIC_KEY)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromPublicKey(PUBLIC_KEY_WORDS)).toBe(ADDRESS_BECH32);
    expect(() => Bech32.fromPublicKey('foo')).toThrow('Invalid Public Key');
  });

  test('fromString', async () => {
    expect(Bech32.fromString(ADDRESS_B256)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromString(ADDRESS_B256_BYTES)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromString(ADDRESS_BECH32)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromString(ADDRESS_BECH32_BYTES)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromString(PUBLIC_KEY)).toBe(ADDRESS_BECH32);
    expect(Bech32.fromString(PUBLIC_KEY_WORDS)).toBe(ADDRESS_BECH32);
    expect(() => Bech32.fromString('foo')).toThrow(/Unknown address format/i);
  });

  test('equals', async () => {
    expect(Bech32.equals(ADDRESS_B256, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(ADDRESS_B256, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(ADDRESS_B256_BYTES, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_B256_BYTES, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(ADDRESS_BECH32, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(ADDRESS_BECH32_BYTES, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(ADDRESS_BECH32_BYTES, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(PUBLIC_KEY, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(Bech32.equals(PUBLIC_KEY_WORDS, ADDRESS_B256)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, ADDRESS_B256_BYTES)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, ADDRESS_BECH32)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, ADDRESS_BECH32_BYTES)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, PUBLIC_KEY)).toBeTruthy();
    expect(Bech32.equals(PUBLIC_KEY_WORDS, PUBLIC_KEY_WORDS)).toBeTruthy();

    expect(() => Bech32.equals('foo', PUBLIC_KEY_WORDS)).toThrow(/Unknown address format/i);
  });
});
