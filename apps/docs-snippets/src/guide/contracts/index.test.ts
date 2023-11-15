import type { Contract } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

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
});
