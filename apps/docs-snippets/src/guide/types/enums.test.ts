import { TestNodeLauncher } from '@fuel-ts/test-utils';

import { getProgramDir } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  beforeAll(async (ctx) => {});

  it('should successfully echo a simple enum in a contract call', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-enum')],
    });
    const {
      contracts: [contract],
    } = launched;
    // #region enum-3
    const enumVariant = 'Completed';

    const { value } = await contract.functions.echo_state_error_enum(enumVariant).simulate();

    expect(value).toEqual(enumVariant);
    // #endregion enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-enum')],
    });
    const {
      contracts: [contract],
    } = launched;
    // #region enum-6
    const userErroVar = 'InsufficientPermissions';

    const enumParam = { UserError: userErroVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-6
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    await using launched = await TestNodeLauncher.launch({
      deployContracts: [getProgramDir('echo-enum')],
    });
    const {
      contracts: [contract],
    } = launched;
    // #region enum-7
    const stateErrorVar = 'Completed';

    const enumParam = { StateError: stateErrorVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-7
  });
});
