import type { Contract } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe(__filename, () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.SUM_OPTION_U8);
  });

  it('should successfully execute contract call to sum 2 option inputs (2 INPUTS)', async () => {
    // #region options-1
    // Sway Option<u8>
    // #region options-3
    const input1: number | undefined = 10;
    // #endregion options-1

    const input2: number | undefined = 5;

    const { value } = await contract.functions
      .sum_optional_u8(input1, input2)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(input1 + input2);
    // #endregion options-3
  });

  it('should successfully execute contract call to sum 2 option inputs (1 INPUT)', async () => {
    // #region options-4
    const input: number | undefined = 5;

    const { value } = await contract.functions
      .sum_optional_u8(input)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toEqual(input);
    // #endregion options-4
  });
});
