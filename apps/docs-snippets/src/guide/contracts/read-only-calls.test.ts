import type { Contract } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_VALUES);
  });

  it('should successfully execute a read only call', async () => {
    // #region read-only-call-1
    const { value } = await contract.functions.echo_u8(15).get();
    // #endregion read-only-call-1
    expect(value).toEqual(15);
  });
});
