import type { Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_VALUES);
  });

  it('should successfully call contract and echo values', async () => {
    // #region echo-values
    const u8Value = 10;
    const str8Value = 'fuel-sdk';

    const res1 = await contract.functions.echo_u8(u8Value).simulate();
    const res2 = await contract.functions.echo_str_8(str8Value).simulate();

    expect(res1.value).toBe(u8Value);
    expect(res2.value).toBe(str8Value);
    // #endregion echo-values
  });
});
