import type { Contract, BN, RawSlice } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('RawSlice', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_RAW_SLICE);
  });

  it('should pass a raw slice to a contract', async () => {
    // #region raw-slice-1
    // #import { RawSlice }

    const rawSlice: RawSlice = [40, 41, 42];

    const { value } = await contract.functions
      .raw_slice_comparison(rawSlice)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toBeTruthy();
    // #endregion raw-slice-1
  });

  it('should retrieve a raw slice from a contract', async () => {
    // #region raw-slice-2
    // #import { RawSlice }

    const rawSlice: RawSlice = [8, 42, 77];

    const { value } = await contract.functions
      .echo_raw_slice(rawSlice)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value.map((v: BN) => v.toNumber())).toStrictEqual(rawSlice);
    // #endregion raw-slice-2
  });
});
