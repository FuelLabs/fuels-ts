import { Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY, LOCAL_NETWORK_URL } from '../../../env';
import { LogSimpleFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region single
const deploy = await LogSimpleFactory.deploy(wallet);
const { contract: contractA } = await deploy.waitForResult();

const { waitForResult } = await contractA
  .multiCall([
    contractA.functions.log_simple('Contract1'),
    contractA.functions.log_simple('Contract2'),
  ])
  .call();

const { groupedLogs } = await waitForResult();
// groupedLogs = {
//   [contractA.id.toB256()]: ["Contract1", "Contract2"]
// }
// #endregion single
const expectedLogs = {
  [contractA.id.toB256()]: ['Contract1', 'Contract2'],
};
expect(groupedLogs).toStrictEqual(expectedLogs);
