import { Contract, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { EchoValues, EchoValuesFactory } from '../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const abi = EchoValues.abi;
const { waitForResult, contractId } = await EchoValuesFactory.deploy(wallet);

await waitForResult();

// #region with-contractId
const deployedEchoContract = new Contract(contractId, abi, wallet);

const { value: echoed10 } = await deployedEchoContract.functions
  .echo_u8(10)
  .simulate();
// value 10
// #endregion with-contractId
console.log('echoed10', echoed10 === 10);
const b256 = deployedEchoContract.id.toB256();
// #region with-b256
const contract = new Contract(b256, abi, wallet);

const { value: echoed50 } = await contract.functions.echo_u8(50).simulate();
// #endregion with-b256
console.log('echoed50', echoed50 === 50);
