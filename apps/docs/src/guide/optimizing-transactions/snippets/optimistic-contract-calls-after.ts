// #region main
import type { Account, ScriptTransactionRequest } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory } from '../../../typegend/contracts';

const { info } = console;

let provider: Provider;
let wallet: Account;
let request: ScriptTransactionRequest;

// This is a generic page load function which should be called
// as soon as the user lands on the page
async function onPageLoad() {
  // Initialize the provider, sender and the contract
  provider = await Provider.create(LOCAL_NETWORK_URL);
  wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
  const { waitForResult } = await CounterFactory.deploy(wallet);
  const { contract } = await waitForResult();

  // Get the transaction request for the increment_count function
  request = await contract.functions.increment_count(1).getTransactionRequest();

  // Estimate and fund the transaction
  const txCost = await wallet.getTransactionCost(request);
  request.gasLimit = txCost.gasUsed;
  request.maxFee = txCost.maxFee;
  await wallet.fund(request, txCost);
}

async function onIncrementPressed() {
  // When the user presses the increment button, we submit the transaction
  // ensuring that the dependencies are not re-estimated and making redundant calls to the network
  const transaction = await wallet.sendTransaction(request, {
    estimateTxDependencies: false,
  });
  info(`Transaction ID Submitted: ${transaction.id}`);
  const result = await transaction.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await onIncrementPressed();
