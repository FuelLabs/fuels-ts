// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { EchoValuesFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region tuples-1
// Sway let tuple2: (u8, bool, u64) = (100, false, 10000);
// #region tuples-3
const tuple: [number, boolean, number] = [100, false, 10000];
// #endregion tuples-1

const { value } = await contract.functions.echo_tuple(tuple).simulate();

console.log('value', value);
// [100, false, <BN 0x2710>]
// #endregion tuples-3
// #endregion full
