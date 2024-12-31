// #region main
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory } from '../../../typegend/contracts';

const { info } = console;

async function onIncrementPressed() {
  // Initialize the provider, sender and the contract
  const provider = await Provider.create(LOCAL_NETWORK_URL);
  const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
  const { waitForResult } = await CounterFactory.deploy(wallet);
  const { contract } = await waitForResult();

  // Calling the call function for a contract method will create a
  // transaction request using the contract call, estimate and fund it
  // and then submit it
  const transaction = await contract.functions.increment_count(1).call();
  info(`Transaction ID Submitted: ${transaction.transactionId}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.transactionId}`);
}
// #endregion main

await onIncrementPressed();
