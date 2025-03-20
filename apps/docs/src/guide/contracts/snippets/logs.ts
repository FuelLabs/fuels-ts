// #region logs
import type { BigNumberish } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { LogValuesFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LogValuesFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

const value1 = 500;
const value2 =
  '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a';
const value3 = 'Fuel';
const value4: [BigNumberish, BigNumberish, BigNumberish] = [1, 2, 3];

const { waitForResult } = await contract.functions
  .log_values(value1, value2, value3, value4)
  .call();

const { logs } = await waitForResult();
// logs = [value1, value2, value3, value4]
// #endregion logs

const expectedLogs = [
  expect.toEqualBn(value1),
  value2,
  value3,
  value4
];
expect(logs).toStrictEqual(expectedLogs);

// #region groupedLogs
const { groupedLogs } = await waitForResult();
// groupedLogs = {
//   [contract.id]: [value1, value2, value3, value4]
// }
// #endregion groupedLogs

const expectedGroupedLogs = {
  [contract.id.toB256()]: expectedLogs,
};
expect(groupedLogs).toStrictEqual(expectedGroupedLogs);
