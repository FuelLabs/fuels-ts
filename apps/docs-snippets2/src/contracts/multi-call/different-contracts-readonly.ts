// #region multicall-4
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { CounterFactory, EchoValuesFactory } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractTx = await CounterFactory.deploy(deployer);
const { contract: counterContract } = await counterContractTx.waitForResult();
const echoContractTx = await EchoValuesFactory.deploy(deployer);
const { contract: echoContract } = await echoContractTx.waitForResult();

const { waitForResult } = await echoContract
  .multiCall([
    counterContract.functions.get_count(),
    echoContract.functions.echo_u8(10),
    echoContract.functions.echo_str('Fuel'),
  ])
  .call();

const { value: results } = await waitForResult();
// results[0] == BN <0>
// results[1] == 10
// results[2] == 'Fuel'
// #endregion multicall-4

console.log('result[0]', results[0].toNumber() === 0);
console.log('result[1]', results[1] === 10);
console.log('result[2]', results[2] === 'Fuel');
