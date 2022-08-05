import signMessageTest from '@fuel-ts/testcases/src/signMessage.json';

import Address, { fromPublicKey } from './address';
import * as utils from './utils';

const ADDRESS_B256 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_BECH32 = 'fuel1a7r2l2tfdncdccu9utzq0fhptxs3q080kl32up3klvea8je2ne9qrqnt6n';
const ADDRESS_WORDS = [
  29, 30, 3, 10, 31, 10, 11, 9, 13, 19, 24, 13, 24, 24, 28, 5, 28, 11, 2, 0, 15, 9, 23, 1, 11, 6,
  16, 17, 0, 15, 7, 15, 22, 31, 17, 10, 28, 1, 17, 22, 31, 12, 25, 29, 7, 18, 25, 10, 19, 25, 5, 0,
];
const ADDRESS_BYTES = [
  239, 134, 175, 169, 105, 108, 240, 220, 99, 133, 226, 196, 7, 166, 225, 89, 161, 16, 60, 239, 183,
  226, 174, 6, 54, 251, 51, 211, 203, 42, 158, 74,
];

describe('Address utils', () => {
  test('fromBech32 (bech32 to decoded bech32)', async () => {
    const result = utils.fromBech32(ADDRESS_BECH32);

    expect(result).toEqual({
      prefix: utils.FUEL_BECH32_HRP_PREFIX,
      words: ADDRESS_WORDS,
    });
  });

  test('normalizeBech32 (bech32 to lowercase bech32)', async () => {
    const result = utils.normalizeBech32(ADDRESS_BECH32.toUpperCase());

    expect(result).toEqual(ADDRESS_BECH32);
  });

  test('isBech32 (bech32)', async () => {
    const result = utils.isBech32(ADDRESS_BECH32);

    expect(result).toBeTruthy();
  });

  test('isBech32 (b256)', async () => {
    const result = utils.isBech32(ADDRESS_B256);

    expect(result).toBeFalsy();
  });

  test('isBech32 (bytes)', async () => {
    const result = utils.isBech32(new Uint8Array(ADDRESS_BYTES));

    expect(result).toBeFalsy();
  });

  test('getBytesFromBech32 (bech32 to Uint8Array)', async () => {
    const result = utils.getBytesFromBech32(ADDRESS_BECH32);

    expect(result).toEqual(new Uint8Array(ADDRESS_BYTES));
  });

  test('toBech32 (b256 to bech32)', () => {
    const result = utils.toBech32(ADDRESS_B256);

    expect(result).toEqual(ADDRESS_BECH32);
  });

  test('toB256 (bech32 to b256)', () => {
    const result = utils.toB256(ADDRESS_BECH32);

    expect(result).toEqual(ADDRESS_B256);
  });

  test('toB256 (b256 to b256)', () => {
    expect(() => utils.toB256(ADDRESS_B256)).toThrow();
  });

  test('toBech32=>toB256', async () => {
    const ADDRESS = '0x000000000000000000000000000000000000000000000000000000000000002a';
    const result = utils.toBech32(ADDRESS);
    const finalResult = utils.toB256(result);

    expect(finalResult).toEqual(ADDRESS);
  });
});

describe('Address class', () => {
  test('instantiate an Address class', async () => {
    const result = new Address(ADDRESS_BECH32.toUpperCase());

    expect(result.address).toEqual(ADDRESS_BECH32);
    expect(result.toString()).toEqual(ADDRESS_BECH32);
    expect(`cast as string${result}`).toEqual(`cast as string${ADDRESS_BECH32}`);
    expect(result.b256Address).toEqual(ADDRESS_B256);
    expect(result.byteAddress).toEqual(new Uint8Array(ADDRESS_BYTES));
  });

  test('instance equality', async () => {
    const resultA = new Address(ADDRESS_BECH32);
    const resultB = new Address(ADDRESS_BECH32.toUpperCase());

    expect(resultA).toEqual(resultB);
  });

  test('create an Address class using public key', async () => {
    const result = fromPublicKey(signMessageTest.publicKey);
    expect(result.address).toEqual(signMessageTest.address);
    expect(result.b256Address).toEqual(signMessageTest.b256Address);
  });
});
