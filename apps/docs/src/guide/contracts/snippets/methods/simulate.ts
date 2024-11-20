// #region interacting-with-contracts-3
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Simulate the transaction
const { value } = await contract.functions.increment_count(10).simulate();
// #endregion interacting-with-contracts-3

console.log('Value should equal 10', value.toNumber() === 10);
