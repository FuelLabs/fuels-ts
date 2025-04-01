// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { LogValuesFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LogValuesFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

const { waitForResult } = await contract.functions
  .log_values(
    500,
    '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a',
    'Fuel',
    [1, 2, 3]
  )
  .call();

const { logs } = await waitForResult();
// logs = [
//    500,
//    0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a,
//    'Fuel',
//    [1, 2, 3]
// ]
// #endregion full

const expectedLogs = [
  expect.toEqualBn(500),
  expect.toEqualBn(
    '0xef86afa9696cf0dc6385e2c407a6e159a1103cefb7e2ae0636fb33d3cb2a9e4a'
  ),
  'Fuel',
  [1, 2, 3],
];

expect(logs).toStrictEqual(expectedLogs);
