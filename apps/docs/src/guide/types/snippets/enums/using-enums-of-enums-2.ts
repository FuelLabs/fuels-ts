import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoEnumFactory } from '../../../../typegend';
import { StateError } from '../../../../typegend/contracts/EchoEnumTypes';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoEnumFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const enumParam = { StateError: StateError.Completed };

const { value } = await contract.functions.echo_error_enum(enumParam).get();

console.log('value', value);
// { StateError: StateErrorInput.Completed }
// #endregion snippet-1
