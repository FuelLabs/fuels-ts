import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { EchoValuesFactory } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const number = 200;

const { value } = await contract.functions.echo_u8(number).get();

console.log('value', Number(value));
// 200
// #endregion snippet-1
