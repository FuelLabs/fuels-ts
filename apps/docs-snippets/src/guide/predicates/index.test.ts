import { FUEL_NETWORK_URL, Provider, Predicate } from 'fuels';

import {
  DocSnippetProjectsEnum,
  getDocsSnippetsForcProject,
} from '../../../test/fixtures/forc-projects';

/**
 * @group node
 */
describe(__filename, () => {
  const { abiContents: jsonAbi, binHexlified: binary } = getDocsSnippetsForcProject(
    DocSnippetProjectsEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', async () => {
    // #region predicate-index-2
    // #import { Predicate, Provider, FUEL_NETWORK_URL };

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const predicate = new Predicate(binary, provider, jsonAbi);
    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
