import { Provider, Wallet, type EvmAddress } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoEvmAddressFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deploy = await EchoEvmAddressFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region snippet-1
const evmAddress: EvmAddress = {
  bits: '0x000000000000000000000000210cf886ce41952316441ae4cac35f00f0e882a6',
};

const { value } = await contract.functions
  .echo_address_comparison(evmAddress)
  .get();
// #endregion snippet-1

console.log('value', value);
