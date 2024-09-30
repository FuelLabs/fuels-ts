// #region full
import { Provider, Wallet } from 'fuels';
import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

// #region bits512-1
let wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

console.log(wallet.publicKey);
// #endregion bits512-1

const deploy = await EchoValuesFactory.deploy(wallet);

const { contract } = await deploy.waitForResult();

// #region bits512-3
const b512 = wallet.publicKey;

const { value } = await contract.functions.echo_b512(b512).simulate();

expect(value).toEqual(b512);
// #endregion bits512-3
// #endregion full
