import type { Contract } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('RawSlice', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_RAW_SLICE);
  });

  it('should pass a raw slice to a contract', async () => {
    // #region raw-slice-1

    const rawSlice = [40, 41, 42];

    const { value } = await contract.functions.bytes_comparison(rawSlice).simulate();

    expect(value).toBeTruthy();
    // #endregion raw-slice-1
  });

  it('should retrieve a raw slice from a contract', async () => {
    // #region raw-slice-2

    const rawSlice = [8, 42, 77];

    const { value } = await contract.functions.echo_bytes(rawSlice).simulate();

    expect(value).toEqual(rawSlice);
    // #endregion raw-slice-2
  });
});
