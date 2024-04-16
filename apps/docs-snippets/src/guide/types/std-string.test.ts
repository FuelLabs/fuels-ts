import type { Contract, StdString } from 'fuels';

import { DocSnippetProjectsEnum } from '../../../test/fixtures/forc-projects';
import { createAndDeployContractFromProject } from '../../utils';

/**
 * @group node
 */
describe('StdString', () => {
  let contract: Contract;

  beforeAll(async () => {
    contract = await createAndDeployContractFromProject(DocSnippetProjectsEnum.ECHO_STD_STRING);
  });

  it('should pass a std string to a contract', async () => {
    // #region std-string-1
    // #import { StdString };

    const stdString: StdString = 'Hello World';

    const { value } = await contract.functions.string_comparison(stdString).call();

    expect(value).toBeTruthy();
    // #endregion std-string-1
  });

  it('should retrieve a std string from a contract', async () => {
    // #region std-string-2
    // #import { StdString };

    const stdString: StdString = 'Hello Fuel';

    const { value } = await contract.functions.echo_string(stdString).call();

    expect(value).toEqual(stdString);
    // #endregion std-string-2
  });
});
