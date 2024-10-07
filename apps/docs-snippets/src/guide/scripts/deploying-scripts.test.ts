import { ContractFactory, Provider, Wallet, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  SumScript as TypegenScript,
  SumScriptLoader as TypegenScriptLoader,
} from '../../../test/typegen';

/**
 * @group browser
 * @group node
 */
describe('Deploying Scripts', () => {
  it('deploys a script via loader and calls', async () => {
    using launched = await launchTestNode();

    const {
      provider: testProvider,
      wallets: [testWallet],
    } = launched;

    const providerUrl = testProvider.url;
    const WALLET_PVT_KEY = hexlify(testWallet.privateKey);

    const factory = new ContractFactory(TypegenScript.bytecode, TypegenScript.abi, testWallet);
    const { waitForResult: waitForDeploy } = await factory.deployAsBlobTxForScript();
    await waitForDeploy();

    // #region deploying-scripts
    // #import { Provider, Wallet };
    // #context import { WALLET_PVT_KEY } from 'path/to/my/env/file';
    // #context import { TypegenScriptLoader } from 'path/to/typegen/outputs';

    const provider = await Provider.create(providerUrl);
    const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

    // First, we will need to instantiate the script via it's loader bytecode. This can be imported from the typegen outputs
    // that were created on `fuels deploy`
    const script = new TypegenScriptLoader(wallet);

    // Now we are free to interact with the script as we would normally, such as overriding the configurables
    const configurable = {
      AMOUNT: 20,
    };
    script.setConfigurableConstants(configurable);

    const { waitForResult } = await script.functions.main(10).call();
    const { value, gasUsed } = await waitForResult();
    // #endregion deploying-scripts

    const scriptWithoutLoader = new TypegenScript(wallet);
    scriptWithoutLoader.setConfigurableConstants(configurable);
    const { waitForResult: waitForAnotherResult } = await script.functions.main(10).call();
    const { value: anotherValue, gasUsed: anotherGasUsed } = await waitForAnotherResult();

    expect(value).toBe(30);
    expect(anotherValue).toBe(30);
    expect(gasUsed.toNumber()).toBeLessThanOrEqual(anotherGasUsed.toNumber());
  });
});
