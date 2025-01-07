import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoValuesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const bigNumber = bn('10000000000000000000');

const { value } = await contract.functions.echo_u64(bigNumber).get();

console.log('value', value.toString());
// '10000000000000000000'
// #endregion snippet-1
