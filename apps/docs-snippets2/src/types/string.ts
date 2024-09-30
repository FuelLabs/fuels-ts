// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region string-1
// Sway str[2]
const stringSize2 = 'st';

// Sway str[8]
const stringSize8 = 'fuel-sdk';
// #endregion string-1

// #region string-2
const { value } = await contract.functions.echo_str_8('fuel-sdk').get();

expect(value).toEqual('fuel-sdk');
// #endregion string-2

// #region string-3
const longString = 'fuel-sdk-WILL-THROW-ERROR';

await expect(async () => contract.functions.echo_str_8(longString).call()).rejects.toThrowError(
  'Value length mismatch during encode'
);

const shortString = 'THROWS';

await expect(async () => contract.functions.echo_str_8(shortString).call()).rejects.toThrowError(
  'Value length mismatch during encode'
);
// #endregion string-3
// #endregion full
