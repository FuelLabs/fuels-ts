import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { LogSimpleFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region logs
const deploy = await LogSimpleFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

const { waitForResult } = await contract.functions
  .log_simple('ContractA')
  .call();

const { logs } = await waitForResult();
// logs = [
//   'ContractA'
// ]
// #endregion logs

const expectedLogs = ['ContractA'];
console.log(
  'Logs should have the same length',
  logs.length === expectedLogs.length
);
console.log(
  'Logs should be in the correct format',
  expectedLogs.every((log) => logs.includes(log))
);
