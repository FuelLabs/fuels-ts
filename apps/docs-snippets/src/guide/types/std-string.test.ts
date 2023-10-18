import type { Contract } from 'fuels';

import { SnippetProjectEnum } from '../../../projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe('StdString', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(SnippetProjectEnum.ECHO_STD_STRING);
  });

  it('should pass a std string to a contract', async () => {
    // #region std-string-1

    const stdString = 'Hello World';

    const { value } = await contract.functions.string_comparison(stdString).simulate();

    expect(value).toBeTruthy();
    // #endregion std-string-1
  });

  it('should retrieve a std string from a contract', async () => {
    // #region std-string-2

    const stdString = 'Hello Fuel';

    const { value } = await contract.functions.echo_string(stdString).simulate();

    expect(value).toEqual(stdString);
    // #endregion std-string-2
  });
});
