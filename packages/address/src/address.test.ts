import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import type { AssetId, B256Address, B256AddressEvm, EvmAddress } from '@fuel-ts/interfaces';

import Address from './address';
import * as utils from './utils';

const PUBLIC_KEY =
  '0x2f34bc0df4db0ec391792cedb05768832b49b1aa3a2dd8c30054d1af00f67d00b74b7acbbf3087c8e0b1a4c343db50aa471d21f278ff5ce09f07795d541fb47e';
const ADDRESS_B256 = '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_B256_EVM_PADDED: B256AddressEvm =
  '0x00000000000000000000000007a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_EVM = '0x07a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const ADDRESS_CHECKSUM = '0xEf86Afa9696cF0Dc6385E2c407a6E159A1103CEfb7e2Ae0636fb33D3cb2A9e4a';
const ADDRESS_BYTES = [
  239, 134, 175, 169, 105, 108, 240, 220, 99, 133, 226, 196, 7, 166, 225, 89, 161, 16, 60, 239, 183,
  226, 174, 6, 54, 251, 51, 211, 203, 42, 158, 74,
];

const expectedB256Address = '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e';

/**
 * @group node
 * @group browser
 */
describe('Address utils', () => {
  test('isB256 (b256)', () => {
    const result = utils.isB256(ADDRESS_B256);

    expect(result).toBeTruthy();
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

  test('clearFirst12BytesFromB256 (b256 to evm b256)', () => {
    const result = utils.toB256AddressEvm(ADDRESS_B256);

    expect(result).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('clearFirst12BytesFromB256 (invalid B256)', async () => {
    const invalidB256 = '0x123';
    const expectedError = new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Cannot generate EVM Address B256 from: ${invalidB256}.`
    );
    await expectToThrowFuelError(() => utils.toB256AddressEvm(invalidB256), expectedError);
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
    const result = new Address(ADDRESS_B256.toUpperCase() as B256Address);

    expect(result.toAddress()).toEqual(ADDRESS_B256);
    expect(result.toString()).toEqual(ADDRESS_CHECKSUM);
    expect(`cast as string${result}`).toEqual(`cast as string${ADDRESS_CHECKSUM}`);
    expect(result.toB256()).toEqual(ADDRESS_B256);
    expect(result.toBytes()).toEqual(new Uint8Array(ADDRESS_BYTES));
  });

  test('instance equality', () => {
    const resultA = new Address(ADDRESS_B256);
    const resultB = new Address(ADDRESS_B256.toUpperCase() as B256Address);

    expect(resultA).toEqual(resultB);
    expect(resultA.equals(resultB)).toBeTruthy();
    expect(resultB.equals(resultA)).toBeTruthy();
  });

  test('create an Address class using public key', () => {
    const address = Address.fromPublicKey(PUBLIC_KEY);

    expect(address.toAddress()).toEqual(expectedB256Address);
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

    expect(address.toAddress()).toEqual(ADDRESS_B256);
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

  test('when parsing to JSON it should show the b256 address', () => {
    const result = Address.fromB256(expectedB256Address);
    expect(JSON.stringify(result)).toEqual(`"${expectedB256Address}"`);
  });

  test('valueOf matches toString', () => {
    const address = new Address(ADDRESS_B256);

    expect(address.toString()).toEqual(address.valueOf());
  });

  test('create an Address class fromDynamicInput [public key]', () => {
    const address = Address.fromDynamicInput(PUBLIC_KEY);

    expect(address.toAddress()).toEqual(expectedB256Address);
    expect(address.toB256()).toEqual(expectedB256Address);
  });

  test('create an Address class fromDynamicInput [b256Address]', () => {
    const address = Address.fromDynamicInput(expectedB256Address);

    expect(address.toAddress()).toEqual(expectedB256Address);
  });

  test('create an Address class fromDynamicInput [b256Address]', () => {
    const address = Address.fromDynamicInput(expectedB256Address);

    expect(address.toB256()).toEqual(expectedB256Address);
  });

  test('create an Address class fromDynamicInput [evmAddress]', () => {
    const address = Address.fromDynamicInput(ADDRESS_EVM);

    expect(address.toB256()).toEqual(ADDRESS_B256_EVM_PADDED);
  });

  test('create an Address class fromDynamicInput [bad input]', async () => {
    const expectedError = new FuelError(
      FuelError.CODES.PARSE_FAILED,
      `Unknown address format: only 'B256', or 'Public Key (512)' are supported.`
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
    expect(evmAddress.bits).toBe(ADDRESS_B256_EVM_PADDED);
  });

  test('create an AssetId from B256', () => {
    const address = Address.fromB256(ADDRESS_B256);
    const assetId: AssetId = address.toAssetId();

    expect(assetId).toBeDefined();
    expect(assetId.bits).toBe(ADDRESS_B256);
  });

  test('create an Address from an Evm Address', () => {
    const address = Address.fromEvmAddress(ADDRESS_EVM);

    const evmAddressWrapped: EvmAddress = {
      bits: ADDRESS_B256_EVM_PADDED,
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

  test('validate checksum address', () => {
    const address = Address.fromRandom();
    const addressMock = '0x9cfB2CAd509D417ec40b70ebE1DD72a3624D46fdD1Ea5420dBD755CE7f4Dc897';
    expect(Address.isChecksumValid(address.toChecksum())).toBeTruthy();
    expect(Address.fromB256(addressMock).toChecksum()).toBe(addressMock);
    expect(Address.isChecksumValid(addressMock)).toBeTruthy();
    expect(Address.isChecksumValid(addressMock.slice(2))).toBeTruthy();
  });

  test('validate checksum address for invalid types', () => {
    const address = Address.fromRandom();
    expect(Address.isChecksumValid(address.toB256().toLowerCase())).toBeFalsy();
    expect(
      Address.isChecksumValid('0x9cfB2CAd509D417ec40b70ebE1DD72a3624D46fdD1Ea5420dBD755CE7f4dc897')
    ).toBeFalsy();
    expect(
      Address.isChecksumValid('9cFB2Cad509d417eC40B70eBe1DD72a3624d46fDD1EA5420DbD755Ce7f4dc897')
    ).toBeFalsy();
    expect(Address.isChecksumValid('9cFB2Cad509d417eC40B70eBe1DD72')).toBeFalsy();
  });
});
