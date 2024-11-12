import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region method-calls
const u8Value = 10;
const str8Value = 'fuel-sdk';

const res1 = await contract.functions.echo_u8(u8Value).simulate();
const res2 = await contract.functions.echo_str_8(str8Value).simulate();
// #endregion method-calls
console.log('res1', res1);
console.log('res2', res2);
