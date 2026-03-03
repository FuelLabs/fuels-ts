// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { InputOutputTypesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await InputOutputTypesFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// B256 values are used for addresses, contract IDs, and asset IDs
// The Address type in Sway wraps a b256 value
const b256Address =
  '0xbebd3baab326f895289ecbd4210cf886ce41952316441ae4cac35f00f0e882a6';

const addressInput = { bits: b256Address };

const { value } = await contract.functions.address(addressInput).get();

console.log('Returned address:', value.bits);
// #endregion full
