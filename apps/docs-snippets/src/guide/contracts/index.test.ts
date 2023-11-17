import { randomBytes } from 'crypto';
import { bn, ContractFactory, type Contract } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';
import { createAndDeployContractFromProject, getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_VALUES);
  });

  it('should successfully call contract and echo values', async () => {
    // #region echo-values
    const expected = [48, 63];

    const res1 = await contract.functions.echo_u8_array().simulate();

    expect(res1.value).toMatchObject(expected);
    // #endregion echo-values
  });

  it('should successfully echo u8 array', async () => {
    // #region echo-values
    const expected = [48, 63];

    const res1 = await contract.functions.echo_u8_array_with_value(expected).simulate();

    expect(res1.value).toMatchObject(expected);
    // #endregion echo-values
  });

  it('should echo boolean array', async () => {
    const expected = [true, false];

    const res1 = await contract.functions.echo_boolean_array().simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('should echo boolean array with value', async () => {
    const expected = [true, false];

    const res1 = await contract.functions.echo_boolean_array_with_value(expected).simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed tuple with value', async () => {
    const expected = [73, true];

    const res1 = await contract.functions.echo_mixed_tuple_with_value(expected).simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed tuple', async () => {
    const expected = [48, true];

    const res1 = await contract.functions.echo_mixed_tuple().simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('echos a bigger mixed tuple', async () => {
    const expected = [48, true, bn(1337)];

    const res1 = await contract.functions.echo_tuple().simulate();

    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a mixed struct with value', async () => {
    const expected = { a: 73, b: true };

    const res1 = await contract.functions.echo_mixed_struct_with_value(expected).simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('echos a mixed enum with value', async () => {
    const expectedA = { a: 73 };
    const expectedB = { b: true };

    const res1 = await contract.functions.echo_mixed_enum_with_value(expectedA).simulate();

    expect(res1.value).toMatchObject(expectedA);

    const res2 = await contract.functions.echo_mixed_enum_with_value(expectedB).simulate();

    expect(res2.value).toMatchObject(expectedB);
  });

  it('echos a u8 vector with value', async () => {
    const expected = [73, 23];

    const res1 = await contract.functions.echo_u8_vector_with_value(expected).simulate();

    expect(res1.value).toMatchObject(expected);
  });

  it('echos a u8 vector', async () => {
    const expected = [23, 32, 78];

    const res1 = await contract.functions.echo_u8_vector().simulate();

    expect(res1.value).toMatchObject(expected); // [ 23 ]
  });

  it('echos a u64 vector', async () => {
    const expected = [bn(1337), bn(1448), bn(1559)];

    const res1 = await contract.functions.echo_u64_vector().simulate();

    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a mixed struct', async () => {
    const expected = {
      a: true, //
      b: bn(1337),
    };

    const res1 = await contract.functions.echo_mixed_struct().simulate();

    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('send and echos a mixed struct', async () => {
    const expected = {
      a: true,
      b: bn(1337),
    };

    const res1 = await contract.functions.echo_received_mixed_struct(expected).simulate();

    expect(JSON.stringify(res1.value)).toEqual(JSON.stringify(expected));
  });

  it('echos a u8 with configurable constant', async () => {
    const expected = 23;
    const configurableConstants = {
      U8: expected,
    };
    const configurableWallet = await getTestWallet();
    const { abiContents, binHexlified } = getSnippetProjectArtifacts(
      SnippetProjectEnum.ECHO_VALUES
    );
    const contractFactory = new ContractFactory(binHexlified, abiContents, configurableWallet);
    const { minGasPrice } = configurableWallet.provider.getGasConfig();
    const configurableContract = await contractFactory.deployContract({
      configurableConstants,
      gasPrice: minGasPrice,
      gasLimit: 0,
    });

    const res1 = await configurableContract.functions.echo_configurable_u8().simulate();

    expect(res1.value).toBe(expected);
  });

  it('echos a boolean with configurable constant', async () => {
    const expected = true;
    const configurableConstants = {
      BOOLEAN: expected,
    };
    const configurableWallet = await getTestWallet();
    const { abiContents, binHexlified } = getSnippetProjectArtifacts(
      SnippetProjectEnum.ECHO_VALUES
    );
    const contractFactory = new ContractFactory(binHexlified, abiContents, configurableWallet);
    const { minGasPrice } = configurableWallet.provider.getGasConfig();
    const configurableContract = await contractFactory.deployContract({
      configurableConstants,
      gasPrice: minGasPrice,
      gasLimit: 0,
    });

    const res1 = await configurableContract.functions.echo_configurable_boolean().simulate();

    expect(res1.value).toBe(expected);
  });

  it('echos a u8 literal', async () => {
    const expected = 47;

    const res1 = await contract.functions.echo_u8_literal().simulate();

    expect(res1.value).toBe(expected);
  });

  it('echos a boolean literal', async () => {
    const expected = true;

    const res1 = await contract.functions.echo_boolean_literal().simulate();
    console.log('literal res', res1.callResult.receipts);

    expect(res1.value).toBe(expected);
  });

  it.only('echos a u8 value', async () => {
    const expected = 47;

    const res1 = await contract.functions.echo_u8(expected).simulate();

    expect(res1.value).toBe(expected);
  });

  it('accepts two u8 values', async () => {
    const res1 = await contract.functions.echo_two_u8s(15, 255).simulate();

    expect(res1.value).toBe(255);
  });

  it.only('accepts two boolean values', async () => {
    const res1 = await contract.functions.two_booleans(true, true).simulate();

    expect(res1.value).toBe(true);
  });

  it.only('accepts u8, u64, bool', async () => {
    const res1 = await contract.functions.u8_u64_bool(255, 10000, true).simulate();

    expect(res1.value).toBe(55);
  });

  it('echos a boolean value', async () => {
    const expected = true;

    const res1 = await contract.functions.echo_boolean(expected).simulate();
    console.log('value res', res1.callResult.receipts);

    expect(res1.value).toBe(expected);
  });
});
