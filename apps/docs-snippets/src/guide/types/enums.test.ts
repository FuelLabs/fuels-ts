import type { Contract } from 'fuels';
import { ContractFactory } from 'fuels';

import { getSnippetProjectArtifacts, SnippetProjectEnum } from '../../../projects';
import { getTestWallet } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    const wallet = await getTestWallet();

    const { abiContents: abi, binHexlified: bin } = getSnippetProjectArtifacts(
      SnippetProjectEnum.ECHO_ENUM
    );

    const factory = new ContractFactory(bin, abi, wallet);

    contract = await factory.deployContract();
  });

  it('should successfully echo a simple enum in a contract call', async () => {
    // #region enum-3
    const enumVariant = 'Completed';

    const { value } = await contract.functions.echo_state_error_enum(enumVariant).get();

    expect(value).toEqual(enumVariant);
    // #endregion enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    // #region enum-6
    const userErroVar = 'InsufficientPermissions';

    const enumParam = { UserError: userErroVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).get();

    expect(value).toEqual(enumParam);
    // #endregion enum-6
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    // #region enum-7
    const stateErrorVar = 'Completed';

    const enumParam = { StateError: stateErrorVar };

    const { value } = await contract.functions.echo_error_enum(enumParam).get();

    expect(value).toEqual(enumParam);
    // #endregion enum-7
  });
});
