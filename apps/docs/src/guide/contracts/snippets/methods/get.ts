// #region interacting-with-contracts-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Read from the blockchain
const { value } = await contract.functions.get_count().get();
// 0
// #endregion interacting-with-contracts-1

console.log('Value should equal 0', value.toNumber() === 0);
