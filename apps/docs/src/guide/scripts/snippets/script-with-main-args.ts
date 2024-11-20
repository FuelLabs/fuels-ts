// #region full
import { bn, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { ScriptMainArgs } from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const foo = 3;

const scriptInstance = new ScriptMainArgs(wallet);

const { waitForResult } = await scriptInstance.functions.main(foo).call();

const { value, logs } = await waitForResult();
// #endregion full

console.log('value', value?.toString() === bn(foo).toString());
console.log('logs', JSON.stringify(logs) === JSON.stringify(['u8 foo', 3]));
