// #region full
import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../../../env';
import { ScriptLogSimple } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const script = new ScriptLogSimple(wallet);
const { waitForResult } = await script.functions.main('ScriptA').call();

const { logs } = await waitForResult();
// logs: ['ScriptA']
// #endregion full

const expectedLogs = ['ScriptA'];
console.log('Logs should have the same length', logs.length === expectedLogs.length);
console.log('Logs should be in the correct format', expectedLogs.every((log) => logs.includes(log)));
