// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { SumOptionU8Factory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await SumOptionU8Factory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region options-1
// Sway Option<u8>
// #region options-3
const input1: number | undefined = 10;
// #endregion options-1

const input2: number | undefined = 5;

const { value: value1 } = await contract.functions.sum_optional_u8(input1, input2).get();

expect(value1).toEqual(input1 + input2);

// #endregion options-3
// #region options-4
const input: number | undefined = 5;

const { value: value2 } = await contract.functions.sum_optional_u8(input).get();

expect(value2).toEqual(input);
// #endregion options-4
// #endregion full
