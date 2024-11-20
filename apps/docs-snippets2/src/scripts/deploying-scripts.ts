import { Provider, Wallet, hexlify } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';

import {
  ScriptSum as TypegenScript,
  ScriptSumLoader as TypegenScriptLoader,
} from '../typegend/scripts';

using launched = await launchTestNode();

const {
  provider: testProvider,
  wallets: [testWallet],
} = launched;

const providerUrl = testProvider.url;
const WALLET_PVT_KEY = hexlify(testWallet.privateKey);

const originalScript = new TypegenScript(testWallet);
const { waitForResult: waitForDeploy } =
  await originalScript.deploy(testWallet);
await waitForDeploy();

// #region deploying-scripts
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
console.log('value', value);
// #endregion deploying-scripts

const scriptWithoutLoader = new TypegenScript(wallet);
scriptWithoutLoader.setConfigurableConstants(configurable);
const { waitForResult: waitForAnotherResult } = await script.functions
  .main(10)
  .call();
const { value: anotherValue, gasUsed: anotherGasUsed } =
  await waitForAnotherResult();

console.log('anotherValue', anotherValue);
console.log('gasUsed', gasUsed.toNumber());
console.log('anotherGasUsed', anotherGasUsed.toNumber());
