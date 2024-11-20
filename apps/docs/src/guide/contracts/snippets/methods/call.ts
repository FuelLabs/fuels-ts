// #region interacting-with-contracts-4
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Perform the transaction
const { waitForResult } = await contract.functions.increment_count(10).call();

const { value } = await waitForResult();
// #endregion interacting-with-contracts-4

console.log('Value should equal 10', value.toNumber() === 10);
