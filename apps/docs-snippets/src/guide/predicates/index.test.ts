import { FUEL_NETWORK_URL, Provider, Predicate } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';

describe(__filename, () => {
  const { abiContents: jsonAbi, binHelixfied: binary } = getSnippetProjectArtifacts(
    SnippetProjectEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', async () => {
    // #region predicate-index-2
    // #context import { Predicate, Provider, FUEL_NETWORK_URL } from 'fuels';

    const provider = new Provider(FUEL_NETWORK_URL);
    const chainId = await provider.getChainId();
    const predicate = new Predicate(binary, chainId, jsonAbi, provider);
    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
