import { ContractFactory } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import { EchoConfigurablesAbi__factory } from '../../../test/typegen';
import EchoConfigurablesAbiHex from '../../../test/typegen/contracts/EchoConfigurablesAbi.hex';

/**
 * @group node
 * @group browser
 */
describe('configurable-constants', () => {
  const defaultValues = {
    age: 25,
    tag: 'fuel',
    grades: [3, 4, 3, 2],
    my_struct: {
      x: 1,
      y: 2,
      state: 'Pending',
    },
  };

  it('should successfully set new values for all configurable constants', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // #region configurable-constants-2
    const configurableConstants: typeof defaultValues = {
      age: 30,
      tag: 'leuf',
      grades: [10, 9, 8, 9],
      my_struct: {
        x: 11,
        y: 22,
        state: 'Checked',
      },
    };

    const factory = new ContractFactory(
      EchoConfigurablesAbiHex,
      EchoConfigurablesAbi__factory.abi,
      wallet
    );

    const { waitForResult } = await factory.deploy({
      configurableConstants,
    });

    const { contract } = await waitForResult();
    // #endregion configurable-constants-2

    const { value } = await contract.functions.echo_configurables(true).simulate();

    expect(value[0]).toEqual(configurableConstants.age);
    expect(value[1]).toEqual(configurableConstants.tag);
    expect(value[2]).toStrictEqual(configurableConstants.grades);
    expect(value[3]).toStrictEqual(configurableConstants.my_struct);
  });

  it('should successfully set new value for one configurable constant', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // #region configurable-constants-3
    const configurableConstants = {
      age: 10,
    };

    const factory = new ContractFactory(
      EchoConfigurablesAbiHex,
      EchoConfigurablesAbi__factory.abi,
      wallet
    );

    const { waitForResult } = await factory.deploy({
      configurableConstants,
    });

    const { contract } = await waitForResult();
    // #endregion configurable-constants-3

    const { value } = await contract.functions.echo_configurables(false).simulate();

    expect(value[0]).toEqual(configurableConstants.age);
    expect(value[1]).toEqual(defaultValues.tag);
    expect(value[2]).toEqual(defaultValues.grades);
    expect(value[3]).toEqual(defaultValues.my_struct);
  });

  it('should throw when not properly setting new values for structs', async () => {
    using launched = await launchTestNode();

    const {
      wallets: [wallet],
    } = launched;

    // #region configurable-constants-4
    const configurableConstants = {
      my_struct: {
        x: 2,
      },
    };

    const factory = new ContractFactory(
      EchoConfigurablesAbiHex,
      EchoConfigurablesAbi__factory.abi,
      wallet
    );

    await expect(
      factory.deploy({
        configurableConstants,
      })
    ).rejects.toThrowError();
    // #endregion configurable-constants-4
  });
});
