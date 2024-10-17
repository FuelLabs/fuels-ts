// #region snippet-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { EchoEnumFactory } from '../../typegend';
import { StateErrorInput } from '../../typegend/contracts/EchoEnum';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoEnumFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

const enumParam = StateErrorInput.Completed;

const { value } = await contract.functions
  .echo_state_error_enum(enumParam)
  .get();

console.log('value', value);
// StateErrorInput.Completed
// #endregion snippet-1
