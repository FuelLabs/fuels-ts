import { FUEL_NETWORK_URL, Provider, Predicate } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';

describe(__filename, () => {
  const { abiContents: jsonAbi, binHexlified: binary } = getSnippetProjectArtifacts(
    SnippetProjectEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', () => {
    // #region predicate-index-2
    // #context import { Predicate, Provider, FUEL_NETWORK_URL } from 'fuels';

    const provider = new Provider(FUEL_NETWORK_URL);

    const predicate = new Predicate(binary, jsonAbi, provider);
    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
