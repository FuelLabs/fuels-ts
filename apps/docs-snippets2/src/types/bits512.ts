// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

// #region bits512-1
let wallet = Wallet.generate({ provider });

console.log('public key', wallet.publicKey);

// 0x97e3a666e4cd34b6b3cf778ef5ec617de4439b68f7a629245442a1fece7713094a1cb0aa7ad0ac253ca1ea47d4618f9090b2a881e829e091fb2c426763e94cca
// #endregion bits512-1

wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await EchoValuesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region bits512-3
const b512 = wallet.publicKey;

const { value } = await contract.functions.echo_b512(b512).get();

expect(value).toEqual(b512);
// #endregion bits512-3
// #endregion full
