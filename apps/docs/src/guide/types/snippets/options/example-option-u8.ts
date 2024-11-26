import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { SumOptionU8Factory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await SumOptionU8Factory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const input: number | undefined = 10;

const { value } = await contract.functions.sum_optional_u8(input).get();

console.log('value', value);
// 10
// #endregion snippet-1
