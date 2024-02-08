import type { Contract } from 'fuels';
import { BN } from 'fuels';

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

  it('should successfully echo tuple in a contract call', async () => {
    // #region tuples-1
    // Sway let tuple2: (u8, bool, u64) = (100, false, 10000);
    // #region tuples-3
    const tuple: [number, boolean, number] = [100, false, 10000];
    // #endregion tuples-1

    const { value } = await contract.functions.echo_tuple(tuple).simulate();

    expect(tuple).toEqual([value[0], value[1], new BN(value[2]).toNumber()]);
    // #endregion tuples-3
  });
});
