import type { RawSlice } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoRawSliceFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoRawSliceFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region raw-slice-2
const rawSlice: RawSlice = [8, 42, 77];

const { value } = await contract.functions.echo_raw_slice(rawSlice).simulate();

expect(value).toStrictEqual(rawSlice);
// #endregion raw-slice-2
