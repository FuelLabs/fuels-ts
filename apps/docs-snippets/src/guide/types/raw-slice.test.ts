import type { Contract, BN } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe('RawSlice', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_RAW_SLICE);
  });

  it('should pass a raw slice to a contract', async () => {
    // #region raw-slice-1

    const rawSlice = [40, 41, 42];

    const { value } = await contract.functions.raw_slice_comparison(rawSlice).simulate();

    expect(value).toBeTruthy();
    // #endregion raw-slice-1
  });

  it('should retrieve a raw slice from a contract', async () => {
    // #region raw-slice-2

    const rawSlice = [8, 42, 77];

    const { value } = await contract.functions.echo_raw_slice(rawSlice).simulate();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual(rawSlice);
    // #endregion raw-slice-2
  });
});
