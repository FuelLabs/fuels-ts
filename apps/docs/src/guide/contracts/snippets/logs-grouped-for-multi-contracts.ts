import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../../../env';
import { LogSimpleFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployA = await LogSimpleFactory.deploy(wallet);
const { contract: contractA } = await deployA.waitForResult();

const deployB = await LogSimpleFactory.deploy(wallet);
const { contract: contractB } = await deployB.waitForResult();

// #region multiple
const { waitForResult } = await contractA
  .multiCall([
    contractA.functions.log_simple('ContractA'),
    contractB.functions.log_simple('ContractB'),
  ])
  .call();

const { groupedLogs } = await waitForResult();
// groupedLogs = {
//   [contractA.id.toB256()]: ["ContractA"],
//   [contractB.id.toB256()]: ["ContractB"]
// }
// #endregion multiple

console.log(groupedLogs[contractA.id.toB256()], ['ContractA']);
console.log(groupedLogs[contractB.id.toB256()], ['ContractB']);
