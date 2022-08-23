import { NativeAssetId } from '@fuel-ts/constants';
import { Provider } from '@fuel-ts/providers';
import { TestUtils } from '@fuel-ts/wallet';
import { readFileSync } from 'fs';
import { join } from 'path';

import type Contract from '../../contracts/contract';
import ContractFactory from '../../contracts/contract-factory';

import abi from './out/debug/coverage-contract-flat-abi.json';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const B256 = '0x000000000000000000000000000000000000000000000000000000000000002a';

const setup = async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  // Create wallet
  const wallet = await TestUtils.generateTestWallet(provider, [[1_000, NativeAssetId]]);

  // Deploy contract
  const bytecode = readFileSync(join(__dirname, './out/debug/coverage-contract.bin'));
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  return contract;
};

let contractInstance: Contract;

beforeAll(async () => {
  contractInstance = await setup();
});

describe('Coverage Contract', () => {
  it('can return outputs', async () => {
    // Call contract methods
    expect((await contractInstance.functions.get_id().call()).value).toEqual(
      '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    );
    expect((await contractInstance.functions.get_small_string().call()).value).toEqual('gggggggg');
    expect((await contractInstance.functions.get_large_string().call()).value).toEqual('ggggggggg');
    expect((await contractInstance.functions.get_u32_struct().call()).value).toStrictEqual({
      foo: 100,
    });
    expect((await contractInstance.functions.get_large_struct().call()).value).toStrictEqual({
      foo: 12,
      bar: 42,
    });
    expect((await contractInstance.functions.get_large_array().call()).value).toStrictEqual([1, 2]);
    expect((await contractInstance.functions.get_empty_enum().call()).value).toStrictEqual({
      Empty: [],
    });
    expect((await contractInstance.functions.get_contract_id().call()).value).toStrictEqual({
      value: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    });
  });

  it('should test u8 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u8(3).call();
    expect(value).toBe(3);
  });

  it('should test u16 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u16(RUST_U8_MAX + 1).call();
    expect(value).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u32(RUST_U16_MAX + 1).call();
    expect(value).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    const INPUT = BigInt(RUST_U32_MAX + 1);
    const { value } = await contractInstance.functions.echo_u64(INPUT).call();
    expect(value).toBe(INPUT);
  });

  it('should test bool variable type', async () => {
    const { value } = await contractInstance.functions.echo_bool(false).call();
    expect(value).toBe(false);
  });

  it('should test b256 variable type', async () => {
    const { value } = await contractInstance.functions.echo_b256(B256).call();
    expect(value).toBe(B256);
  });

  it('should test str[1] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_1('f').call();
    expect(value).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_2('fu').call();
    expect(value).toBe('fu');
  });

  it('should test str[3] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_3('fue').call();
    expect(value).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_8('fuel-sdk').call();
    expect(value).toBe('fuel-sdk');
  });

  it('should test str[9] variable type', async () => {
    const { value } = await contractInstance.functions.echo_str_9('fuel-sdks').call();
    expect(value).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions.echo_tuple_u8([21, 22]).call();
    expect(value).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    const INPUT = [BigInt(RUST_U32_MAX + 1), BigInt(RUST_U32_MAX + 2)];
    const { value } = await contractInstance.functions.echo_tuple_u64(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test tuple mixed variable type', async () => {
    const INPUT = [true, BigInt(RUST_U32_MAX + 1)];
    const { value } = await contractInstance.functions.echo_tuple_mixed(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test array < 8 bytes variable type', async () => {
    const { value } = await contractInstance.functions.echo_array_u8([4, 3]).call();
    expect(value).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    const INPUT: [bigint, bigint, bigint, bigint, bigint] = [
      11n,
      BigInt(RUST_U32_MAX + 2),
      BigInt(RUST_U32_MAX) + 3n,
      BigInt('9009'),
      BigInt('0x1fffffffffffff'),
    ];
    const { value } = await contractInstance.functions.echo_array_u64(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test array bool variable type', async () => {
    const { value } = await contractInstance.functions.echo_array_bool([true, true]).call();
    expect(value).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    const INPUT = { i: 4 };
    const { value } = await contractInstance.functions.echo_struct_u8(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test struct > 8 bytes variable type', async () => {
    const INPUT = { i: B256 };
    const { value } = await contractInstance.functions.echo_struct_b256(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it.only('should test enum < 8 byte variable type', async () => {
    const INPUT = { Empty: [] };
    const { value } = await contractInstance.functions.echo_enum_small(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    const INPUT = { AddressB: B256 };
    const { value } = await contractInstance.functions.echo_enum_big(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });
});
