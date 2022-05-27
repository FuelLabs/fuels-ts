import {TestUtils} from '@fuel-ts/wallet';
import fs from 'fs';
import {ContractFactory, NativeAssetId, Provider} from 'fuels';
import path from 'path';

import type {CoverageContractAbi} from './coverage-contract-types';
import {CoverageContractAbi__factory} from './coverage-contract-types';

const RUST_U8_MAX = 255;
const RUST_U16_MAX = 65535;
const RUST_U32_MAX = 4294967295;
const B256 = '0x000000000000000000000000000000000000000000000000000000000000002a';

let contractInstance: CoverageContractAbi;

beforeAll(async () => {
  const provider = new Provider('http://127.0.0.1:4000/graphql');
  const wallet = await TestUtils.generateTestWallet(provider, [
    [4_000, NativeAssetId]
  ]);

  // Deploy
  const bytecode = fs.readFileSync(path.join(__dirname, '../out/debug/coverage-contract.bin'));
  const factory = new ContractFactory(bytecode, CoverageContractAbi__factory.abi, wallet);
  const contract = await factory.deployContract();
  contractInstance = CoverageContractAbi__factory.connect(contract.id, wallet);
});

describe('CoverageContract', () => {
  it('should test u8 variable type', async () => {
    const result = await contractInstance.functions.echo_u8(3);
    expect(result).toBe(3);
  });

  it('should test u16 variable type', async () => {
    const result = await contractInstance.functions.echo_u16(RUST_U8_MAX + 1);
    expect(result).toBe(RUST_U8_MAX + 1);
  });

  it('should test u32 variable type', async () => {
    const result = await contractInstance.functions.echo_u32(RUST_U16_MAX + 1);
    expect(result).toBe(RUST_U16_MAX + 1);
  });

  it('should test u64 variable type', async () => {
    const INPUT = BigInt(RUST_U32_MAX + 1)
    const result = await contractInstance.functions.echo_u64(INPUT);
    expect(result).toBe(INPUT);
  });

  it('should test bool variable type', async () => {
    const result = await contractInstance.functions.echo_bool(false);
    expect(result).toBe(false);
  });

  it('should test b256 variable type', async () => {
    const result = await contractInstance.functions.echo_b256(B256);
    expect(result).toBe(B256);
  });

  it('should test str[1] variable type', async () => {
    const result = await contractInstance.functions.echo_str_1('f');
    expect(result).toBe('f');
  });

  it('should test str[2] variable type', async () => {
    const result = await contractInstance.functions.echo_str_2('fu');
    expect(result).toBe('fu');
  });

  it.only('should test str[3] variable type', async () => {
    const result = await contractInstance.functions.echo_str_3('fue');
    expect(result).toBe('fue');
  });

  it('should test str[8] variable type', async () => {
    const result = await contractInstance.functions.echo_str_8('fuel-sdk');
    expect(result).toBe('fuel-sdk');
  });

  it('should test str[9] variable type', async () => {
    const result = await contractInstance.functions.echo_str_9('fuel-sdks');
    expect(result).toBe('fuel-sdks');
  });

  it('should test tuple < 8 bytes variable type', async () => {
    const result = await contractInstance.functions.echo_tuple_u8([21, 22]);
    expect(result).toStrictEqual([21, 22]);
  });

  it('should test tuple > 8 bytes variable type', async () => {
    const result = await contractInstance.functions.echo_tuple_u64([
      RUST_U32_MAX + 1,
      RUST_U32_MAX + 2,
    ]);
    expect(result).toStrictEqual([RUST_U32_MAX + 1, RUST_U32_MAX + 2]);
  });

  it('should test tuple mixed variable type', async () => {
    const result = await contractInstance.functions.echo_tuple_mixed([true, RUST_U32_MAX + 1]);
    expect(result).toStrictEqual([true, RUST_U32_MAX + 1]);
  });

  it('should test array < 8 bytes variable type', async () => {
    const result = await contractInstance.functions.echo_array_u8([4, 3]);
    expect(result).toStrictEqual([4, 3]);
  });

  it('should test array > 8 bytes variable type', async () => {
    const INPUT: [bigint, bigint, bigint, bigint, bigint] = [
      11n,
      BigInt(RUST_U32_MAX + 2),
      BigInt(RUST_U32_MAX) + 3n,
      BigInt('9009'),
      BigInt('0x1fffffffffffff'),
    ];
    const result = await contractInstance.functions.echo_array_u64(INPUT);
    expect(result).toStrictEqual(INPUT);
  });

  it('should test array bool variable type', async () => {
    const result = await contractInstance.functions.echo_array_bool([true, true]);
    expect(result).toStrictEqual([true, true]);
  });

  it('should test struct < 8 bytes variable type', async () => {
    const INPUT = {i: 4};
    const result = await contractInstance.functions.echo_struct_small(INPUT);
    expect(result).toStrictEqual(INPUT);
  });

  it('should test struct > 8 bytes variable type', async () => {
    const INPUT = {i: B256};
    const result = await contractInstance.functions.echo_struct_big(INPUT);
    expect(result).toStrictEqual(INPUT);
  });

  it('should test enum < 8 byte variable type', async () => {
    const INPUT = {Empty: null};
    const result = await contractInstance.functions.echo_enum_small(INPUT);
    expect(result).toStrictEqual(INPUT);
  });

  it('should test enum > 8 bytes variable type', async () => {
    const INPUT = {Address: B256};
    const result = await contractInstance.functions.echo_enum_big(INPUT);
    expect(result).toStrictEqual(INPUT);
  });
});
