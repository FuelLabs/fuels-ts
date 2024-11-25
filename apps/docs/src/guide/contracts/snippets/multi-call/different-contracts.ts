// #region multicall-2
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory, EchoValuesFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();
const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([
    echoContract.functions.echo_u8(17),
    counterContract.functions.get_count(),
    counterContract.functions.increment_count(5),
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == 17
// results[1] == BN <0>
// results[2] == BN <5>
// #endregion multicall-2

console.log('result[0]', results[0] === 17);
console.log('result[1]', results[1].toNumber() === 0);
console.log('result[2]', results[2].toNumber() === 5);
