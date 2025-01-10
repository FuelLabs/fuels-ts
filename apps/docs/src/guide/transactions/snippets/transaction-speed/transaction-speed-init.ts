import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend/contracts';

const { info } = console;

// Initialize the provider, sender and the contract
const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deployTx = await CounterFactory.deploy(wallet);
const { contract } = await deployTx.waitForResult();

// #region main
async function handleSubmit() {
  // Calling the `call` function for a contract method will create a
  // transaction request using the contract call, estimate, fund and then
  // submit it to the network
  const transaction = await contract.functions.increment_count(1).call();
  info(`Transaction ID Submitted: ${transaction.transactionId}`);

  // Calling `waitForResult` will wait for the transaction to settle and
  // will build it's response
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.transactionId}`);
}
// #endregion main

await handleSubmit();
