// #region multicall-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();

const { waitForResult } = await counterContract
  .multiCall([
    counterContract.functions.get_count(),
    counterContract.functions.increment_count(2),
    counterContract.functions.increment_count(4),
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 0
// results[1] == 2
// results[2] == 6
// #endregion multicall-1

console.log('result[0]', results[0].toNumber() === 0);
console.log('result[1]', results[1].toNumber() === 2);
console.log('result[2]', results[2].toNumber() === 6);
