// #region full
import type { Bytes } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoBytesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoBytesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region bytes-2
const bytes: Bytes = [40, 41, 42];

const { value } = await contract.functions.bytes_comparison(bytes).get();

expect(value).toBeTruthy();
// #endregion bytes-2
// #endregion full
