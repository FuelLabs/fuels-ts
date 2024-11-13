/* eslint-disable import/first */
/* eslint-disable import/order */
import { ScriptMainArgs } from '../typegend';

const bytecode = ScriptMainArgs.bytecode;
const abi = ScriptMainArgs.abi;

// #region full
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { bn, Provider, Script, Wallet } from 'fuels';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const foo = 3;

const scriptInstance = new Script(bytecode, abi, wallet);

const { waitForResult } = await scriptInstance.functions.main(foo).call();

const { value, logs } = await waitForResult();
// #endregion full

console.log('value', value?.toString() === bn(foo).toString());
console.log('logs', JSON.stringify(logs) === JSON.stringify(['u8 foo', 33]));
