import { generateTestWallet } from '@fuel-ts/wallet/test-utils';
import { readFileSync } from 'fs';
import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { getRandomB256, BN, ContractFactory, NativeAssetId, Provider } from 'fuels';
import { join } from 'path';

import contractAbi from '../test-projects/configurable-contract/out/debug/configurable-contract-abi.json';

const contractBytecode = readFileSync(
  join(__dirname, '../test-projects/configurable-contract/out/debug/configurable-contract.bin')
);

const defaultValues = {
  U8: 10,
  U16: 301,
  U32: 799,
  U64: 100000,
  BOOL: true,
  B256: '0x1d6ebd57dd6a8d7e90889c8c7388f22c30d5c3556080a2b6dc4c521092a0b942',
  ENUM: 'red',
  ARRAY: [
    [253, 254],
    [255, 256],
  ],
  STR_4: 'fuel',
  TUPLE: [12, false, 'hi'],
  STRUCT_1: {
    tag: '000',
    age: 21,
    scores: [1, 3, 4],
  },
};

describe('Configurable Contract', () => {
  let wallet: WalletUnlocked;
  let factory: ContractFactory;

  beforeAll(async () => {
    const provider = new Provider('http://127.0.0.1:4000/graphql');

    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: NativeAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);

    factory = new ContractFactory(contractBytecode, contractAbi, wallet);
  });

  it.skip('should assert default values', async () => {
    const contract = await factory.deployContract();

    const { value } = await contract.functions.return_configurables().get();

    expect(value).toStrictEqual(defaultValues);
  });

  it('should set configurable constant before deploy contract (U8)', async () => {
    const configurablesConstants = {
      U8: 99,
    };

    expect(defaultValues.U8).not.toBe(configurablesConstants.U8);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_u8().get();

    expect(value).toBe(configurablesConstants.U8);
  });

  it('should set configurable constant before deploy contract (U16)', async () => {
    const configurablesConstants = {
      U16: 499,
    };

    expect(defaultValues.U16).not.toBe(configurablesConstants.U16);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_u16().get();

    expect(value).toBe(configurablesConstants.U16);
  });

  it('should set configurable constant before deploy contract (U32)', async () => {
    const configurablesConstants = {
      U32: 854,
    };

    expect(defaultValues.U32).not.toBe(configurablesConstants.U32);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_u32().get();

    expect(value).toBe(configurablesConstants.U32);
  });

  it('should set configurable constant before deploy contract (U64)', async () => {
    const configurablesConstants = {
      U64: 999999,
    };

    expect(defaultValues.U64).not.toBe(configurablesConstants.U64);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_u64().get();

    expect(new BN(value).toNumber()).toBe(configurablesConstants.U64);
  });

  it('should set configurable constant before deploy contract (BOOL)', async () => {
    const configurablesConstants = {
      BOOL: false,
    };

    expect(defaultValues.BOOL).not.toBe(configurablesConstants.BOOL);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_bool().get();

    expect(value).toBe(configurablesConstants.BOOL);
  });

  it('should set configurable constant before deploy contract (B256)', async () => {
    const configurablesConstants = {
      B256: getRandomB256(),
    };

    expect(defaultValues.B256).not.toBe(configurablesConstants.B256);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_b256().get();

    expect(value).toBe(configurablesConstants.B256);
  });

  it('should set configurable constant before deploy contract (ENUM)', async () => {
    const configurablesConstants = {
      ENUM: 'blue',
    };

    expect(defaultValues.ENUM).not.toBe(configurablesConstants.ENUM);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_enum().get();

    expect(value).toBe(configurablesConstants.ENUM);
  });

  it('should set configurable constant before deploy contract (ARRAY)', async () => {
    const configurablesConstants = {
      ARRAY: [
        [666, 667],
        [656, 657],
      ],
    };

    expect(defaultValues.ARRAY).not.toStrictEqual(configurablesConstants.ARRAY);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_array().get();

    expect(value).toStrictEqual(configurablesConstants.ARRAY);
  });

  it('should set configurable constant before deploy contract (STR_4)', async () => {
    const configurablesConstants = {
      STR_4: 'leuf',
    };

    expect(defaultValues.STR_4).not.toBe(configurablesConstants.STR_4);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_str4().get();

    expect(value).toBe(configurablesConstants.STR_4);
  });

  it('should set configurable constant before deploy contract (TUPLE)', async () => {
    const configurablesConstants = {
      TUPLE: [99, true, 'by'],
    };

    expect(defaultValues.TUPLE).not.toStrictEqual(configurablesConstants.TUPLE);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_tuple().get();

    expect(value).toStrictEqual(configurablesConstants.TUPLE);
  });

  it('should set configurable constant before deploy contract (STRUCT)', async () => {
    const configurablesConstants = {
      STRUCT_1: {
        tag: '007',
        age: 30,
        scores: [10, 10, 10],
      },
    };

    expect(defaultValues.STRUCT_1).not.toStrictEqual(configurablesConstants.STRUCT_1);

    const contract = await factory.deployContract({ configurablesConstants });

    const { value } = await contract.functions.echo_struct().get();

    expect(value).toStrictEqual(configurablesConstants.STRUCT_1);
  });
});
