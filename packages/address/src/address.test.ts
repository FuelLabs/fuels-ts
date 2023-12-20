import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { AssetId, B256AddressEvm, Bech32Address, EvmAddress } from '@fuel-ts/interfaces';

import Address from './address';
import * as utils from './utils';

const PUBLIC_KEY =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const ADDRESS_B256 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_B256_EVM_PADDED: B256AddressEvm =
  '0x00000000000000000000000007a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_EVM = '0x07a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_BECH32: Bech32Address =
  'fuel1a7r2l2tfdncdccu9utzq0fhptxs3q080kl32up3klvea8je2ne9qrqnt6n';
const ADDRESS_WORDS = [
  29, 30, 3, 10, 31, 10, 11, 9, 13, 19, 24, 13, 24, 24, 28, 5, 28, 11, 2, 0, 15, 9, 23, 1, 11, 6,
  16, 17, 0, 15, 7, 15, 22, 31, 17, 10, 28, 1, 17, 22, 31, 12, 25, 29, 7, 18, 25, 10, 19, 25, 5, 0,
];
const ADDRESS_BYTES = [
  239, 134, 175, 169, 105, 108, 240, 220, 99, 133, 226, 196, 7, 166, 225, 89, 161, 16, 60, 239, 183,
  226, 174, 6, 54, 251, 51, 211, 203, 42, 158, 74,
];

const expectedAddress = 'fuel1785jcs4epy625cmjuv9u269rymmwv6s6q2y9jhnw877nj2j08ehqce3rxf';
const expectedB256Address = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

describe('Address utils', () => {
  test('fromBech32 (bech32 to decoded bech32)', () => {
    const result = utils.fromBech32(ADDRESS_BECH32);

    expect(result).toEqual({
      prefix: utils.FUEL_BECH32_HRP_PREFIX,
      words: ADDRESS_WORDS,
    });
  });

  test('normalizeBech32 (bech32 to lowercase bech32)', () => {
    const result = utils.normalizeBech32(ADDRESS_BECH32.toUpperCase() as Bech32Address);

    expect(result).toEqual(ADDRESS_BECH32);
  });

  test('isBech32 (bech32)', () => {
    const result = utils.isBech32(ADDRESS_BECH32);

    expect(result).toBeTruthy();
  });

  test('isBech32 (b256)', () => {
    const result = utils.isBech32(ADDRESS_B256);

    expect(result).toBeFalsy();
  });

  test('isBech32 (bytes)', () => {
    const result = utils.isBech32(new Uint8Array(ADDRESS_BYTES));

    expect(result).toBeFalsy();
  });

  test('isB256 (b256)', () => {
    const result = utils.isB256(ADDRESS_B256);

    expect(result).toBeTruthy();
  });

  test('isB256 (bech32)', () => {
    const result = utils.isB256(ADDRESS_BECH32);

    expect(result).toBeFalsy();
  });

  test('isB256 (invalid chars)', () => {
    const result = utils.isB256(`${ADDRESS_B256}/?`);

    expect(result).toBeFalsy();
  });

  test('isB256 (too long)', () => {
    const result = utils.isB256(`${ADDRESS_B256}abc12345`);

    expect(result).toBeFalsy();
  });

  test('isB256 (too short)', () => {
    const result = utils.isB256('0xef86afa9696cf0dc6385e2c407a63d3cb2a9e4a');

    expect(result).toBeFalsy();
  });

  test('isB256 (no hex prefix)', () => {
    const result = utils.isB256(ADDRESS_B256.slice(2));

    expect(result).toBeFalsy();
  });

  test('isB256 (using toB256)', () => {
    const result = utils.isB256(utils.toB256(ADDRESS_BECH32));

    expect(result).toBeTruthy();
  });

  test('isPublicKey (publicKey)', () => {
    const result = utils.isPublicKey(PUBLIC_KEY);

    expect(result).toBeTruthy();
  });

  test('isPublicKey (invalid chars)', () => {
    const result = utils.isPublicKey(`${PUBLIC_KEY}/?`);

    expect(result).toBeFalsy();
  });

  test('isPublicKey (too long)', () => {
    const result = utils.isPublicKey(`${PUBLIC_KEY}abc12345`);

    expect(result).toBeFalsy();
  });

  test('isPublicKey (too short)', () => {
    const result = utils.isPublicKey('0xef86afa9696cf0dc6385e2c407a63d3cb2a9e4a');

    expect(result).toBeFalsy();
  });

  test('isPublicKey (no hex prefix)', () => {
    const result = utils.isPublicKey(PUBLIC_KEY.slice(2));

    expect(result).toBeFalsy();
  });

  test('isEvmAddress (EvmAddress)', () => {
    const result = utils.isEvmAddress(ADDRESS_EVM);

    expect(result).toBeTruthy();
  });

  test('isEvmAddress (invalid chars)', () => {
    const result = utils.isEvmAddress(`${ADDRESS_EVM}/?`);

    expect(result).toBeFalsy();
  });

  test('isEvmAddress (too long)', () => {
    const result = utils.isEvmAddress(`${ADDRESS_EVM}abc12345`);

    expect(result).toBeFalsy();
  });

  test('isEvmAddress (too short)', () => {
    const result = utils.isEvmAddress('0x123');

    expect(result).toBeFalsy();
  });

  test('isEvmAddress (no hex prefix)', () => {
    const result = utils.isEvmAddress(ADDRESS_EVM.slice(2));

    expect(result).toBeFalsy();
  });

  test('getBytesFromBech32 (bech32 to Uint8Array)', () => {
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

  test('toB256 (b256 to b256)', async () => {
    const address = ADDRESS_B256 as Bech32Address;
    const expectedError = new FuelError(
      FuelError.CODES.INVALID_BECH32_ADDRESS,
      `Invalid Bech32 Address: ${address}.`
    );
    await expectToThrowFuelError(() => utils.toB256(address), expectedError);
  });

  test('toBech32=>toB256', () => {
    const ADDRESS = '0x000000000000000000000000000000000000000000000000000000000000002a';
    const result = utils.toBech32(ADDRESS);
    const finalResult = utils.toB256(result);

    expect(finalResult).toEqual(ADDRESS);
  });

  test('clearFirst12BytesFromB256 (b256 to evm b256)', () => {
    const result = utils.clearFirst12BytesFromB256(ADDRESS_B256);

    expect(result).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('clearFirst12BytesFromB256 (invalid B256)', async () => {
    const invalidB256 = '0x123';
    const expectedError = new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${invalidB256}.`
    );
    await expectToThrowFuelError(() => utils.clearFirst12BytesFromB256(invalidB256), expectedError);
  });

  test('padFirst12BytesOfEvmAddress (evm Address to b256)', () => {
    const result = utils.padFirst12BytesOfEvmAddress(ADDRESS_EVM);

    expect(result).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('padFirst12BytesOfEvmAddress (invalid EVM Address)', async () => {
    const invalidEvmAddress = '0x123';
    const expectedError = new FuelError(
      FuelError.CODES.INVALID_EVM_ADDRESS,
      'Invalid EVM address format.'
    );
    await expectToThrowFuelError(
      () => utils.padFirst12BytesOfEvmAddress(invalidEvmAddress),
      expectedError
    );
  });
});

describe('Address class', () => {
  test('instantiate an Address class', () => {
    const result = new Address(ADDRESS_BECH32.toUpperCase() as Bech32Address);

    expect(result.toAddress()).toEqual(ADDRESS_BECH32);
    expect(result.toString()).toEqual(ADDRESS_BECH32);
    expect(`cast as string${result}`).toEqual(`cast as string${ADDRESS_BECH32}`);
    expect(result.toB256()).toEqual(ADDRESS_B256);
    expect(result.toBytes()).toEqual(new Uint8Array(ADDRESS_BYTES));
  });

  test('instance equality', () => {
    const resultA = new Address(ADDRESS_BECH32);
    const resultB = new Address(ADDRESS_BECH32.toUpperCase() as Bech32Address);

    expect(resultA).toEqual(resultB);
    expect(resultA.equals(resultB)).toBeTruthy();
    expect(resultB.equals(resultA)).toBeTruthy();
  });

  test('create an Address class using public key', () => {
    const address = Address.fromPublicKey(PUBLIC_KEY);

    expect(address.toAddress()).toEqual(expectedAddress);
    expect(address.toB256()).toEqual(expectedB256Address);
  });

  test('create an Address class using invalid public key (no hex prefix)', async () => {
    const address = PUBLIC_KEY.slice(2);

    const expectedError = new FuelError(
      FuelError.CODES.INVALID_PUBLIC_KEY,
      `Invalid Public Key: ${address}.`
    );
    await expectToThrowFuelError(() => Address.fromPublicKey(address), expectedError);
  });

  test('create an Address class using b256Address', () => {
    const address = Address.fromB256(ADDRESS_B256);

    expect(address.toAddress()).toEqual(ADDRESS_BECH32);
    expect(address.toB256()).toEqual(ADDRESS_B256);
  });

  test('create an Address class using invalid b256Address (no hex prefix)', async () => {
    const address = ADDRESS_B256.slice(2);

    const expectedError = new FuelError(
      FuelError.CODES.INVALID_B256_ADDRESS,
      `Invalid B256 Address: ${address}.`
    );
    await expectToThrowFuelError(() => Address.fromB256(address), expectedError);
  });

  test('when parsing to JSON it should show the bech32 address', () => {
    const result = Address.fromB256(expectedB256Address);
    expect(JSON.stringify(result)).toEqual(`"${expectedAddress}"`);
  });

  test('valueOf matches toString', () => {
    const address = new Address(ADDRESS_BECH32);

    expect(address.toString()).toEqual(address.valueOf());
  });

  test('create an Address class fromDynamicInput [public key]', () => {
    const address = Address.fromDynamicInput(PUBLIC_KEY);

    expect(address.toAddress()).toEqual(expectedAddress);
    expect(address.toB256()).toEqual(expectedB256Address);
  });

  test('create an Address class fromDynamicInput [b256Address]', () => {
    const address = Address.fromDynamicInput(expectedB256Address);

    expect(address.toAddress()).toEqual(expectedAddress);
  });

  test('create an Address class fromDynamicInput [bech32Address]', () => {
    const address = Address.fromDynamicInput(expectedAddress);

    expect(address.toB256()).toEqual(expectedB256Address);
  });

  test('create an Address class fromDynamicInput [evmAddress]', () => {
    const address = Address.fromDynamicInput(ADDRESS_EVM);

    expect(address.toB256()).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('create an Address class fromDynamicInput [bad input]', async () => {
    const expectedError = new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Unknown address format: only 'Bech32', 'B256', or 'Public Key (512)' are supported.`
    );
    await expectToThrowFuelError(() => Address.fromDynamicInput('badinput'), expectedError);
  });

  test('create an Address class fromDynamicInput [Address]', () => {
    const address = Address.fromRandom();
    const newAddress = Address.fromDynamicInput(address);

    expect(newAddress.toB256()).toEqual(address.toB256());
    expect(address).toBe(address);
    expect(newAddress).not.toBe(address);
  });

  test('create an EvmAddress from B256', () => {
    const address = Address.fromB256(ADDRESS_B256);
    const evmAddress: EvmAddress = address.toEvmAddress();

    expect(evmAddress).toBeDefined();
    expect(evmAddress.value).toBe(ADDRESS_B256_EVM_PADDED);
  });

  test('create an AssetId from B256', () => {
    const address = Address.fromB256(ADDRESS_B256);
    const assetId: AssetId = address.toAssetId();

    expect(assetId).toBeDefined();
    expect(assetId.value).toBe(ADDRESS_B256);
  });

  test('create an Address from an Evm Address', () => {
    const address = Address.fromEvmAddress(ADDRESS_EVM);

    const evmAddressWrapped: EvmAddress = {
      value: ADDRESS_B256_EVM_PADDED,
    };

    expect(address.toEvmAddress()).toMatchObject(evmAddressWrapped);
    expect(address.toB256()).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('create an Address class using invalid Evm Address (no hex prefix)', async () => {
    const address = ADDRESS_EVM.slice(2);

    const expectedError = new FuelError(
      FuelError.CODES.INVALID_EVM_ADDRESS,
      `Invalid Evm Address: ${address}.`
    );
    await expectToThrowFuelError(() => Address.fromEvmAddress(address), expectedError);
  });
});
