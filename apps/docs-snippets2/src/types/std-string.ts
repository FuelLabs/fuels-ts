import { Provider, Wallet, type StdString } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoStdStringFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoStdStringFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region std-string-2
const stdString: StdString = 'Hello Fuel';

const { value } = await contract.functions.echo_string(stdString).get();

expect(value).toEqual(stdString);
// #endregion std-string-2
