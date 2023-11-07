import { TestNodeLauncher } from '@fuel-ts/test-utils';
import { Script, BN } from 'fuels';

import { SnippetProjectEnum, getSnippetProjectArtifacts } from '../../../projects';

/**
 * @group node
 */
describe(__filename, () => {
  const { abiContents, binHexlified } = getSnippetProjectArtifacts(SnippetProjectEnum.SUM_SCRIPT);

  it('should successfully sum setted configurable constant with inpputed value', async () => {
    await using launched = await TestNodeLauncher.launch();
    const {
      wallets: [wallet],
      provider,
    } = launched;
    const { minGasPrice: gasPrice } = provider.getGasConfig();

    // #region script-with-configurable-contants-2
    const script = new Script(binHexlified, abiContents, wallet);

    const configurableConstants = {
      AMOUNT: 81,
    };

    script.setConfigurableConstants(configurableConstants);

    const inputtedValue = 10;

    const { value } = await script.functions.main(inputtedValue).txParams({ gasPrice }).call();

    const expectedTotal = inputtedValue + configurableConstants.AMOUNT;

    expect(new BN(value as number).toNumber()).toEqual(expectedTotal);
    // #endregion script-with-configurable-contants-2
  });
});
