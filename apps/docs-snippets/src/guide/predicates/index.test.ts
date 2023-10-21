import { DocSnippetProjectsEnum } from '@fuel-ts/utils/test-utils';
import { FUEL_NETWORK_URL, Provider, Predicate } from 'fuels';

import { getSnippetProjectArtifacts } from '../../../projects';

describe(__filename, () => {
  const { abiContents: jsonAbi, binHexlified: binary } = getSnippetProjectArtifacts(
    DocSnippetProjectsEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', async () => {
    // #region predicate-index-2
    // #context import { Predicate, Provider, FUEL_NETWORK_URL } from 'fuels';

    const provider = await Provider.create(FUEL_NETWORK_URL);
    const predicate = new Predicate(binary, provider, jsonAbi);
    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
