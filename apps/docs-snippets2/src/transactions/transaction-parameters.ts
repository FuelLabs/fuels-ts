import { LOCAL_NETWORK_URL, Provider, Wallet } from 'fuels';

import { WALLET_PVT_KEY } from '../env';
import { CounterAbi__factory } from '../typegend';
import bytecode from '../typegend/contracts/CounterAbi.hex';

const { storageSlots } = CounterAbi__factory;

const client = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, client);

const deploy = await CounterAbi__factory.deployContract(bytecode, wallet, {
  storageSlots,
});

const { contract } = await deploy.waitForResult();

// #region transaction-parameters-8
const { waitForResult } = await contract.functions
  .increment_count(15)
  .txParams({
    variableOutputs: 1,
  })
  .call();

const {
  transactionResult: { isStatusSuccess },
  value,
} = await waitForResult();

console.log({ isStatusSuccess, value });
// #endregion transaction-parameters-8
