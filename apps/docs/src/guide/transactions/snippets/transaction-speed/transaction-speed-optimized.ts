import type { Account, Contract, ScriptTransactionRequest } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend/contracts';

const { info } = console;

// Initialize the provider, sender and the contract
const provider = new Provider(LOCAL_NETWORK_URL);
const chainId = await provider.getChainId();
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deployTx = await CounterFactory.deploy(wallet);
const { contract } = await deployTx.waitForResult();

let request: ScriptTransactionRequest;
// #region main
async function onPageLoad() {
  // On page load, we will create a transaction request for the contract call
  request = await contract.functions.increment_count(1).getTransactionRequest();

  // Then we will estimate and fund the transaction so it is fully prepared for submission
  await request.estimateAndFund(wallet);
}

async function handleSubmit() {
  // When the user presses the submit button, the user can now sign the finalized transaction
  const signature = await wallet.signTransaction(request);
  request.updateWitnessByOwner(wallet.address, signature);

  // And we can solely submit the transaction to the network
  info(`Transaction ID Submitted: ${await request.getTransactionId(chainId)}`);
  const response = await provider.sendTransaction(request);

  // We can then wait for the transaction to settle and get the result
  const result = await response.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await handleSubmit();
