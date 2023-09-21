import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  it('should successfully call contract and echo values', async () => {
    using contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_VALUES);

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
