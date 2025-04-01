import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../../../env';
import {
  LogValuesInterCallsFactory,
  LogSimpleFactory,
} from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region inter
// First we make a simple contract that logs a value
const deploySimpleContract = await LogSimpleFactory.deploy(wallet);
const { contract: simpleContract } = await deploySimpleContract.waitForResult();

// Then we make an inter-contract that makes a multi-call to the simple contract
const deployInterContract = await LogValuesInterCallsFactory.deploy(wallet);
const { contract: interContract } = await deployInterContract.waitForResult();

// We can then call the inter-contract function that makes call out to the simple contract
const { waitForResult } = await interContract.functions
  .log_inter_call(simpleContract.id.toB256(), 'ContractB')
  .call();

// We can then wait for the result and get the grouped logs
const { groupedLogs } = await waitForResult();
// groupedLogs = {
//   [simpleContract.id.toB256()]: ['ContractB'],
//   [interContract.id.toB256()]: ['Starting inter-call', 'Inter-call completed'],
// };
// #endregion inter

console.log(groupedLogs[simpleContract.id.toB256()], ['ContractB']);
console.log(groupedLogs[interContract.id.toB256()], [
  'Starting inter-call',
  'Inter-call completed',
]);