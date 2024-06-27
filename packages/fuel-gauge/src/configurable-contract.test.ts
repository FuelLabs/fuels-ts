import type { CoinQuantityLike, WalletUnlocked } from 'fuels';
import { BN, ContractFactory, Provider, getRandomB256, FUEL_NETWORK_URL } from 'fuels';
import { generateTestWallet } from 'fuels/test-utils';

import { FuelGaugeProjectsEnum, getFuelGaugeForcProject } from '../test/fixtures';

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

/**
 * @group node
 */
describe('Configurable Contract', () => {
  let wallet: WalletUnlocked;
  let factory: ContractFactory;
  let baseAssetId: string;
  beforeAll(async () => {
    const provider = await Provider.create(FUEL_NETWORK_URL);
    baseAssetId = provider.getBaseAssetId();
    const quantities: CoinQuantityLike[] = [
      {
        amount: 1_000_000,
        assetId: baseAssetId,
      },
    ];

    wallet = await generateTestWallet(provider, quantities);

    const { binHexlified, abiContents } = getFuelGaugeForcProject(
      FuelGaugeProjectsEnum.CONFIGURABLE_CONTRACT
    );

    factory = new ContractFactory(binHexlified, abiContents, wallet);
  });

  it('should assert default values', async () => {
    const contract = await factory.deployContract();

    const { value } = await contract.functions.echo_configurables().simulate();

    expect(value[0]).toEqual(defaultValues.U8);
    expect(value[1]).toEqual(defaultValues.U16);
    expect(value[2]).toEqual(defaultValues.U32);
    expect(new BN(value[3]).toNumber()).toStrictEqual(defaultValues.U64);
    expect(value[4]).toEqual(defaultValues.BOOL);
    expect(value[5]).toEqual(defaultValues.B256);
    expect(value[6]).toEqual(defaultValues.ENUM);
    expect(value[7]).toStrictEqual(defaultValues.ARRAY);
    expect(value[8]).toEqual(defaultValues.STR_4);
    expect(value[9]).toStrictEqual(defaultValues.TUPLE);
    expect(value[10]).toStrictEqual(defaultValues.STRUCT_1);
  });

  it('should set configurable constant before deploy contract (U8)', async () => {
    const configurableConstants = {
      U8: 99,
    };

    expect(defaultValues.U8).not.toBe(configurableConstants.U8);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_u8().simulate();

    expect(value).toBe(configurableConstants.U8);
  });

  it('should set configurable constant before deploy contract (U16)', async () => {
    const configurableConstants = {
      U16: 499,
    };

    expect(defaultValues.U16).not.toBe(configurableConstants.U16);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_u16().simulate();

    expect(value).toBe(configurableConstants.U16);
  });

  it('should set configurable constant before deploy contract (U32)', async () => {
    const configurableConstants = {
      U32: 854,
    };

    expect(defaultValues.U32).not.toBe(configurableConstants.U32);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_u32().simulate();

    expect(value).toBe(configurableConstants.U32);
  });

  it('should set configurable constant before deploy contract (U64)', async () => {
    const configurableConstants = {
      U64: 999999,
    };

    expect(defaultValues.U64).not.toBe(configurableConstants.U64);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_u64().simulate();

    expect(new BN(value).toNumber()).toBe(configurableConstants.U64);
  });

  it('should set configurable constant before deploy contract (BOOL)', async () => {
    const configurableConstants = {
      BOOL: false,
    };

    expect(defaultValues.BOOL).not.toBe(configurableConstants.BOOL);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_bool().simulate();

    expect(value).toBe(configurableConstants.BOOL);
  });

  it('should set configurable constant before deploy contract (B256)', async () => {
    const configurableConstants = {
      B256: getRandomB256(),
    };

    expect(defaultValues.B256).not.toBe(configurableConstants.B256);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_b256().simulate();

    expect(value).toBe(configurableConstants.B256);
  });

  it('should set configurable constant before deploy contract (ENUM)', async () => {
    const configurableConstants = {
      ENUM: 'blue',
    };

    expect(defaultValues.ENUM).not.toBe(configurableConstants.ENUM);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_enum().simulate();

    expect(value).toBe(configurableConstants.ENUM);
  });

  it('should set configurable constant before deploy contract (ARRAY)', async () => {
    const configurableConstants = {
      ARRAY: [
        [666, 667],
        [656, 657],
      ],
    };

    expect(defaultValues.ARRAY).not.toStrictEqual(configurableConstants.ARRAY);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_array().simulate();

    expect(value).toStrictEqual(configurableConstants.ARRAY);
  });

  it('should set configurable constant before deploy contract (STR_4)', async () => {
    const configurableConstants = {
      STR_4: 'leuf',
    };

    expect(defaultValues.STR_4).not.toBe(configurableConstants.STR_4);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_str4().simulate();

    expect(value).toBe(configurableConstants.STR_4);
  });

  it('should set configurable constant before deploy contract (TUPLE)', async () => {
    const configurableConstants = {
      TUPLE: [99, true, 'by'],
    };

    expect(defaultValues.TUPLE).not.toStrictEqual(configurableConstants.TUPLE);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_tuple().simulate();

    expect(value).toStrictEqual(configurableConstants.TUPLE);
  });

  it('should set configurable constant before deploy contract (STRUCT)', async () => {
    const configurableConstants = {
      STRUCT_1: {
        tag: '007',
        age: 30,
        scores: [10, 10, 10],
      },
    };

    expect(defaultValues.STRUCT_1).not.toStrictEqual(configurableConstants.STRUCT_1);

    const contract = await factory.deployContract({ configurableConstants });

    const { value } = await contract.functions.echo_struct().simulate();

    expect(value).toStrictEqual(configurableConstants.STRUCT_1);
  });
});
