// #region is-function-readonly-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await CounterFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const isReadOnly = contract.functions.get_count.isReadOnly();

if (isReadOnly) {
  await contract.functions.get_count().get();
} else {
  const { waitForResult } = await contract.functions.get_count().call();
  await waitForResult();
}
// #endregion is-function-readonly-1

console.log(
  'isReadOnly should be true for get_count method',
  isReadOnly === true
);
