import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe(__filename, () => {
  it('should successfully execute contract call to sum 2 option inputs (2 INPUTS)', async () => {
    using contract = await createAndDeployContractFromProject(SnippetProjectEnum.SUM_OPTION_U8);
    // #region options-1
    // Sway Option<u8>
    // #region options-3
    const input1: number | undefined = 10;
    // #endregion options-1

    const input2: number | undefined = 5;

    const { value } = await contract.functions.sum_optional_u8(input1, input2).simulate();

    expect(value).toEqual(input1 + input2);
    // #endregion options-3
  });

  it('should successfully execute contract call to sum 2 option inputs (1 INPUT)', async () => {
    using contract = await createAndDeployContractFromProject(SnippetProjectEnum.SUM_OPTION_U8);
    // #region options-4
    const input: number | undefined = 5;

    const { value } = await contract.functions.sum_optional_u8(input).simulate();

    expect(value).toEqual(input);
    // #endregion options-4
  });
});
