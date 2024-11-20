// #region full
import type { BigNumberish } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { LogValuesFactory } from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
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
// #endregion full
console.log('log[0]', logs[0].toNumber() === value1);
console.log('log[1]', logs[1] === value2);
console.log('log[2]', logs[2] === value3);
console.log('log[3]', logs[3][0] === value4[0]);
