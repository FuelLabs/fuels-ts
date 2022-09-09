import { NativeAssetId } from '@fuel-ts/constants';
import { Provider, LogReader } from '@fuel-ts/providers';
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
    expect((await contractInstance.functions.get_some_option_u8().call()).value).toEqual(113);
    expect((await contractInstance.functions.get_none_option_u8().call()).value).toEqual(undefined);
  });

  it('should test u8 variable type', async () => {
    const { value } = await contractInstance.functions.echo_u8(3).call();
    expect(value).toBe(3);
  });

  it('should test u8 variable type multiple params', async () => {
    const { value } = await contractInstance.functions.echo_u8_addition(3, 4, 3).call();
    expect(value).toBe(10);
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

  it('should test enum < 8 byte variable type', async () => {
    const INPUT = { Empty: [] };
    const { value } = await contractInstance.functions.echo_enum_small(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    const INPUT = { AddressB: B256 };
    const { value } = await contractInstance.functions.echo_enum_big(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u8> type', async () => {
    const INPUT = 187;
    const { value } = await contractInstance.functions.echo_option_u8(INPUT).call();
    expect(value).toStrictEqual(INPUT);
  });

  it('should test Option<u32> extraction [Some]', async () => {
    const INPUT_SOME = 123;
    const { value: Some } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_SOME)
      .call();
    expect(Some).toStrictEqual(INPUT_SOME);
  });

  it('should test Option<u32> extraction [None]', async () => {
    const INPUT_NONE = undefined;
    const { value: None } = await contractInstance.functions
      .echo_option_extract_u32(INPUT_NONE)
      .call();
    expect(None).toStrictEqual(500);

    const { value: NoneVoid } = await contractInstance.functions.echo_option_extract_u32().call();
    expect(NoneVoid).toStrictEqual(500);
  });

  it('should test multiple Option<u32> params [Some]', async () => {
    const INPUT_A = 1;
    const INPUT_B = 4;
    const INPUT_C = 5;
    const { value: Some } = await contractInstance.functions
      .echo_option_three_u8(INPUT_A, INPUT_B, INPUT_C)
      .call();
    expect(Some).toStrictEqual(10);
  });

  it('should test multiple Option<u32> params [None]', async () => {
    const INPUT = 1;
    const { value: Some } = await contractInstance.functions.echo_option_three_u8(INPUT).call();
    expect(Some).toStrictEqual(1);
  });

  it('should test u8 empty vector input', async () => {
    const { value } = await contractInstance.functions.check_u8_vector([]).call();
    expect(value).toBeFalsy();
  });

  it('should test u8 vector input', async () => {
    const { value, transactionResult } = await contractInstance.functions
      .check_u8_vector([1, 2, 3, 4, 5])
      .call();
    expect(value).toBeTruthy();
    const logReader = new LogReader(transactionResult.receipts);
    expect(logReader.toArray()).toStrictEqual([
      'vector.buf.ptr',
      '14464',
      'vector.buf.cap',
      '5',
      'vector.len',
      '5',
      'addr_of vector',
      '14440',
    ]);
  });

  it('should echo u8 vector input', async () => {
    const { value } = await contractInstance.functions
      .echo_u8_vector_first([23, 6, 1, 51, 2])
      .call();

    expect(value).toBe(23);
  });

  it('should echo an optional u8 vector input', async () => {
    const { value, transactionResult } = await contractInstance.functions
      .echo_option_u8_vector_first([24])
      .call();
    LogReader.debug(transactionResult.receipts);
    expect(value).toBe(24);
  });

  it('should echo a vector of optional u8 input', async () => {
    const { value } = await contractInstance.functions.echo_u8_option_vector_first([28]).call();

    expect(value).toBe(28);
  });

  it('should echo u64 vector input', async () => {
    const { value } = await contractInstance.functions
      .echo_u64_vector_last([200, 100, 24, 51, 23, 54])
      .call();
    expect(value).toBe(54n);
  });

  it('should echo u32 vector addition of mixed params', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition_other_type([100, 2], 47)
      .call();
    expect(value).toBe(147);
  });

  it('should echo u32 vector addition', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo u32 vector addition [variable lengths]', async () => {
    const { value } = await contractInstance.functions
      .echo_u32_vector_addition([100, 2, 1, 2, 3], [24, 54])
      .call();
    expect(value).toBe(124);
  });

  it('should echo struct vector input', async () => {
    const first = {
      foo: 1,
      bar: 10,
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_first([
        first,
        {
          foo: 2,
          bar: 20,
        },
        {
          foo: 3,
          bar: 30,
        },
      ])
      .call();
    expect(value).toStrictEqual(first);
  });

  it('should echo complex struct vector input', async () => {
    const last = {
      foo: 3,
      bar: 31337n,
      baz: 'abcdefghi',
    };
    const { value } = await contractInstance.functions
      .echo_struct_vector_last([
        {
          foo: 1,
          bar: 11337n,
          baz: '123456789',
        },
        {
          foo: 2,
          bar: 21337n,
          baz: 'alphabet!',
        },
        last,
      ])
      .call();
    expect(value).toStrictEqual(last);
  });
});
