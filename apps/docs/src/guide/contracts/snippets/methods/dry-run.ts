// #region interacting-with-contracts-2
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Perform a dry-run of the transaction
const { value } = await contract.functions.increment_count(1).dryRun();
// #endregion interacting-with-contracts-2

console.log('Value should equal 1', value.toNumber() === 1);
