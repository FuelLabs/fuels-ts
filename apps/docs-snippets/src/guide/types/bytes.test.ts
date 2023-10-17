import type { Contract } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

describe('Bytes', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_BYTES);
  });

  it('should pass bytes to a contract', async () => {
    // #region bytes-1

    const bytes = [40, 41, 42];

    const { value } = await contract.functions.bytes_comparison(bytes).simulate();

    expect(value).toBeTruthy();
    // #endregion bytes-1
  });

  it('should retrieve bytes from a contract', async () => {
    // #region bytes-2

    const bytes = [8, 42, 77];

    const { value } = await contract.functions.echo_bytes(bytes).simulate();

    expect(value).toStrictEqual(new Uint8Array(bytes));
    // #endregion bytes-2
  });
});
