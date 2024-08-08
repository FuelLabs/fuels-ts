import { BN, getRandomB256 } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { ConfigurableContractFactory } from '../test/typegen/contracts';

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

function setupContract(configurableConstants?: { [name: string]: unknown }) {
  return launchTestNode({
    contractsConfigs: [
      {
        factory: ConfigurableContractFactory,
        options: { configurableConstants },
      },
    ],
  });
}

/**
 * @group node
 * @group browser
 */
describe('Configurable Contract', () => {
  it('should assert default values', async () => {
    using contractInstance = await setupContract();

    const {
      contracts: [contract],
    } = contractInstance;

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

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_u8().simulate();

    expect(value).toBe(configurableConstants.U8);
  });

  it('should set configurable constant before deploy contract (U16)', async () => {
    const configurableConstants = {
      U16: 499,
    };

    expect(defaultValues.U16).not.toBe(configurableConstants.U16);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_u16().simulate();

    expect(value).toBe(configurableConstants.U16);
  });

  it('should set configurable constant before deploy contract (U32)', async () => {
    const configurableConstants = {
      U32: 854,
    };

    expect(defaultValues.U32).not.toBe(configurableConstants.U32);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_u32().simulate();

    expect(value).toBe(configurableConstants.U32);
  });

  it('should set configurable constant before deploy contract (U64)', async () => {
    const configurableConstants = {
      U64: 999999,
    };

    expect(defaultValues.U64).not.toBe(configurableConstants.U64);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_u64().simulate();

    expect(new BN(value).toNumber()).toBe(configurableConstants.U64);
  });

  it('should set configurable constant before deploy contract (BOOL)', async () => {
    const configurableConstants = {
      BOOL: false,
    };

    expect(defaultValues.BOOL).not.toBe(configurableConstants.BOOL);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_bool().simulate();

    expect(value).toBe(configurableConstants.BOOL);
  });

  it('should set configurable constant before deploy contract (B256)', async () => {
    const configurableConstants = {
      B256: getRandomB256(),
    };

    expect(defaultValues.B256).not.toBe(configurableConstants.B256);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_b256().simulate();

    expect(value).toBe(configurableConstants.B256);
  });

  it('should set configurable constant before deploy contract (ENUM)', async () => {
    const configurableConstants = {
      ENUM: 'blue',
    };

    expect(defaultValues.ENUM).not.toBe(configurableConstants.ENUM);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

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

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_array().simulate();

    expect(value).toStrictEqual(configurableConstants.ARRAY);
  });

  it('should set configurable constant before deploy contract (STR_4)', async () => {
    const configurableConstants = {
      STR_4: 'leuf',
    };

    expect(defaultValues.STR_4).not.toBe(configurableConstants.STR_4);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_str4().simulate();

    expect(value).toBe(configurableConstants.STR_4);
  });

  it('should set configurable constant before deploy contract (TUPLE)', async () => {
    const configurableConstants = {
      TUPLE: [99, true, 'by'],
    };

    expect(defaultValues.TUPLE).not.toStrictEqual(configurableConstants.TUPLE);

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

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

    using contractInstance = await setupContract(configurableConstants);

    const {
      contracts: [contract],
    } = contractInstance;

    const { value } = await contract.functions.echo_struct().simulate();

    expect(value).toStrictEqual(configurableConstants.STRUCT_1);
  });
});
