import type { Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_ENUM);
  });

  it('should successfully echo a simple enum in a contract call', async () => {
    // #region enum-3
    const enumVariant = 'Completed';

    const { value } = await contract.functions
      .echo_state_error_enum(enumVariant)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(enumVariant);
    // #endregion enum-3
  });

  it('should successfully echo a enum in a contract call (UserError Enum)', async () => {
    // #region enum-6
    const userErroVar = 'InsufficientPermissions';

    const enumParam = { UserError: userErroVar };

    const { value } = await contract.functions
      .echo_error_enum(enumParam)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-6
  });

  it('should successfully echo a enum in a contract call (StateError Enum)', async () => {
    // #region enum-7
    const stateErrorVar = 'Completed';

    const enumParam = { StateError: stateErrorVar };

    const { value } = await contract.functions
      .echo_error_enum(enumParam)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(enumParam);
    // #endregion enum-7
  });
});
