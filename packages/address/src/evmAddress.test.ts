import type { EVMAddress as TEvmAddress } from '@fuel-ts/interfaces';

import Address from './address';
import { EvmAddress } from './evmAddress';

describe('EvmAddress', () => {
  const B256 = '0xd5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
  const B256_CLEARED = '0x0000000000000000000000005b44e4cb4e2c2298f4ac457ba8f82743f31e930b';
  const B256_ZERO = '0x0000000000000000000000000000000000000000000000000000000000000000';

  it('should instantiate an EvmAddress with a valid B256', () => {
    expect(() => {
      const evmAddress = new EvmAddress(B256);
      expect(evmAddress).toBeDefined();
    }).not.toThrow();
  });

  it('should match the EVMAddress Type', () => {
    const evmAddress = new EvmAddress(B256);
    const evmAddressAsType: TEvmAddress = evmAddress;

    expect(evmAddressAsType).toBe(evmAddress);
  });

  it('should set the value to the B256 with the first 12 bytes cleared', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = B256_CLEARED;

    expect(evmAddress.value).toEqual(expected);
  });

  it('should clear the first 12 bytes of a passed B256', () => {
    const expected = B256_CLEARED;
    const actual = EvmAddress.clearFirstTwelveBytesFromB256(B256);

    expect(actual).toBe(expected);
  });

  it('should throw if the passed B256 is invalid', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const evmAddress = new EvmAddress('0x123');
    }).toThrow('Invalid EVM Address');
  });

  it('should throw if the passed B256 cannot have the first 12 bytes cleared', () => {
    expect(() => {
      EvmAddress.clearFirstTwelveBytesFromB256('0x123');
    }).toThrow('Cannot generate EVM address from B256');
  });

  it('should return value as a B256', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = B256_CLEARED;
    const actual = evmAddress.toB256();

    expect(actual).toEqual(expected);
  });

  it('should return value as a hex string', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = B256_CLEARED;
    const actual = evmAddress.toHexString();

    expect(actual).toEqual(expected);
  });

  it('should return value as a Bech32', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = 'fuel1qqqqqqqqqqqqqqqqqqq9k38yed8zcg5c7jky27aglqn58uc7jv9sm2rp5u';
    const actual = evmAddress.toAddress();

    expect(actual).toEqual(expected);
  });

  it('should return value as a Bech32 string', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = 'fuel1qqqqqqqqqqqqqqqqqqq9k38yed8zcg5c7jky27aglqn58uc7jv9sm2rp5u';
    const actual = evmAddress.toString();

    expect(actual).toEqual(expected);
  });

  it('should return value as a Bech32 JSON value', () => {
    const evmAddress = new EvmAddress(B256);
    const expected = 'fuel1qqqqqqqqqqqqqqqqqqq9k38yed8zcg5c7jky27aglqn58uc7jv9sm2rp5u';
    const actual = evmAddress.toJSON();

    expect(actual).toEqual(expected);
  });

  it('should return value as bytes', () => {
    const evmAddress = new EvmAddress(B256_ZERO);
    const expected = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0,
    ]);
    const actual = evmAddress.toBytes();

    expect(actual).toEqual(expected);
  });

  it('should compare against another EVM address', () => {
    const evmAddress = new EvmAddress(B256);
    const evmAddress2 = new EvmAddress(B256);

    expect(evmAddress.equals(evmAddress2)).toBeTruthy();
  });

  it('should create an EVM address from an address', () => {
    const address = EvmAddress.fromAddress(Address.fromRandom());

    expect(address).toBeDefined();
    expect(address).toBeInstanceOf(EvmAddress);
  });
});
