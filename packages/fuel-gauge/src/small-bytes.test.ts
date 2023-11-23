import { getForcProject } from '@fuel-ts/utils/test-utils';
import type { Contract, JsonAbi } from 'fuels';
import { bn, ContractFactory } from 'fuels';
import { join } from 'path';

import { getSetupContract, createWallet } from './utils';

describe('small-bytes', () => {
  const smallBytesProjectDir = join(__dirname, '../test/fixtures/forc-projects/small-bytes');

  const setupContract = getSetupContract('small-bytes');

  let contract: Contract;

  beforeAll(async () => {
    contract = await setupContract();
  });
  it('should successfully call contract and echo values', async () => {
    const expected = [48, 63];
    const res1 = await contract.functions.echo_u8_array().txParams({ gasLimit: 10_000 }).simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('should successfully echo u8 array', async () => {
    const expected = [48, 63];
    const res1 = await contract.functions
      .echo_u8_array_with_value(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('should echo boolean array', async () => {
    const expected = [true, false];
    const res1 = await contract.functions
      .echo_boolean_array()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('should echo boolean array with value', async () => {
    const expected = [true, false];
    const res1 = await contract.functions
      .echo_boolean_array_with_value(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed tuple with value', async () => {
    const expected = [73, true];
    const res1 = await contract.functions
      .echo_mixed_tuple_with_value(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed tuple', async () => {
    const expected = [48, true];
    const res1 = await contract.functions
      .echo_mixed_tuple()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('echos a bigger mixed tuple', async () => {
    const expected = [48, true, bn(1337)];
    const res1 = await contract.functions.echo_tuple().txParams({ gasLimit: 10_000 }).simulate();
    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a mixed struct with value', async () => {
    const expected = { a: 73, b: true };
    const res1 = await contract.functions
      .echo_mixed_struct_with_value(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed enum with value', async () => {
    const expectedA = { a: 73 };
    const expectedB = { b: true };

    const res1 = await contract.functions
      .echo_mixed_enum_with_value(expectedA)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expectedA);

    const res2 = await contract.functions
      .echo_mixed_enum_with_value(expectedB)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res2.value).toMatchObject(expectedB);
  });

  it('accepts native enum', async () => {
    const res1 = await contract.functions
      .echo_native_enum('B')
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toEqual('C');
  });

  it('echos a u8 vector with value', async () => {
    const expected = [73, 23];
    const res1 = await contract.functions
      .echo_u8_vector_with_value(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected);
  });

  it('echos a u8 vector', async () => {
    const expected = [23, 32, 78];
    const res1 = await contract.functions
      .echo_u8_vector()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toMatchObject(expected); // [ 23 ]
  });

  it('echos a u64 vector', async () => {
    const expected = [bn(1337), bn(1448), bn(1559)];
    const res1 = await contract.functions
      .echo_u64_vector()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a mixed struct', async () => {
    const expected = {
      a: true,
      b: bn(1337),
    };

    const res1 = await contract.functions
      .echo_mixed_struct()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('send and echos a mixed struct', async () => {
    const expected = {
      a: true,
      b: bn(1337),
    };

    const res1 = await contract.functions
      .echo_received_mixed_struct(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a u8 with configurable constant', async () => {
    const expected = 23;
    const configurableConstants = {
      U8: expected,
    };

    const { binHexlified, abiContents } = getForcProject<JsonAbi>({
      projectDir: smallBytesProjectDir,
      projectName: 'small-bytes',
    });

    const wallet = await createWallet();
    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const { minGasPrice } = wallet.provider.getGasConfig();
    const configurableContract = await factory.deployContract({
      gasPrice: minGasPrice,
      configurableConstants,
    });

    const res1 = await configurableContract.functions
      .echo_configurable_u8()
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(res1.value).toBe(expected);
  });

  it('echos a boolean with configurable constant', async () => {
    const expected = true;
    const configurableConstants = {
      BOOLEAN: expected,
    };

    const { binHexlified, abiContents } = getForcProject<JsonAbi>({
      projectDir: smallBytesProjectDir,
      projectName: 'small-bytes',
    });

    const wallet = await createWallet();
    const factory = new ContractFactory(binHexlified, abiContents, wallet);
    const { minGasPrice } = wallet.provider.getGasConfig();
    const configurableContract = await factory.deployContract({
      gasPrice: minGasPrice,
      configurableConstants,
    });

    const res1 = await configurableContract.functions
      .echo_configurable_boolean()
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(res1.value).toBe(expected);
  });

  it('echos a u8 literal', async () => {
    const expected = 47;
    const res1 = await contract.functions
      .echo_u8_literal()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(expected);
  });

  it('echos a u16', async () => {
    const res1 = await contract.functions.echo_u16(30000).txParams({ gasLimit: 10_000 }).simulate();
    expect(res1.value).toBe(30000 * 2);
  });

  it('echos a u32', async () => {
    const res1 = await contract.functions
      .echo_u32(100000)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(100000 * 2);
  });

  it('echos a boolean literal', async () => {
    const expected = true;
    const res1 = await contract.functions
      .echo_boolean_literal()
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(expected);
  });

  it('echos a u8 value', async () => {
    const expected = 47;
    const res1 = await contract.functions
      .echo_u8(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(expected);
  });

  it('accepts two u8 values', async () => {
    const res1 = await contract.functions
      .echo_two_u8s(15, 255)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(255);
  });

  it('accepts two boolean values', async () => {
    const res1 = await contract.functions
      .two_booleans(true, true)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(true);
  });

  it('accepts u8, u64, bool', async () => {
    const res1 = await contract.functions
      .u8_u64_bool(255, 10000, true)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(55);
  });

  it('accepts struct and u8', async () => {
    const res1 = await contract.functions
      .struct_and_u8(
        {
          a: 254,
          b: true,
        },
        230
      )
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(res1.value).toEqual({
      a: 230,
      b: true,
    });
  });

  it('echos a boolean value', async () => {
    const expected = true;
    const res1 = await contract.functions
      .echo_boolean(expected)
      .txParams({ gasLimit: 10_000 })
      .simulate();
    expect(res1.value).toBe(expected);
  });
});
