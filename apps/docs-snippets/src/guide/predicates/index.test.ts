import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { FUEL_NETWORK_URL, Provider, Predicate } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';

/**
 * @group node
 */
describe(__filename, () => {
  const { abiContents: jsonAbi, binHexlified: binary } = getSnippetProjectArtifacts(
    SnippetProjectEnum.RETURN_TRUE_PREDICATE
  );

  it('should successfully instantiate a predicate', async () => {
    await using launched = await TestNodeLauncher.launch();
    const { provider } = launched;
    // #region predicate-index-2
    // #context import { Predicate, Provider, FUEL_NETWORK_URL } from 'fuels';
    // #context const provider = await Provider.create(FUEL_NETWORK_URL);

    const predicate = new Predicate(binary, provider, jsonAbi);

    // #endregion predicate-index-2

    expect(predicate).toBeTruthy();
  });
});
