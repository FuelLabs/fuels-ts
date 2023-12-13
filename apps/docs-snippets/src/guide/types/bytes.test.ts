import type { Contract, Bytes } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('Bytes', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_BYTES);
  });

  it('should pass bytes to a contract', async () => {
    // #region bytes-1
    // #context import type { Bytes } from 'fuels';

    const bytes: Bytes = [40, 41, 42];

    const { value } = await contract.functions
      .bytes_comparison(bytes)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toBeTruthy();
    // #endregion bytes-1
  });

  it('should retrieve bytes from a contract', async () => {
    // #region bytes-2
    // #context import type { Bytes } from 'fuels';

    const bytes: Bytes = [8, 42, 77];

    const { value } = await contract.functions
      .echo_bytes(bytes)
      .txParams({ gasLimit: 10_000 })
      .simulate();

    expect(value).toStrictEqual(new Uint8Array(bytes));
    // #endregion bytes-2
  });
});
