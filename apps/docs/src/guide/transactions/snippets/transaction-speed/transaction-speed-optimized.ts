import type { ScriptTransactionRequest } from 'fuels';
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
/**
 * Here we'll prepare our transaction upfront on page load, so that
 * by the time the user interacts with your app (i.e., clicking a btn),
 * the transaction be ready to be signed and submitted.
 */
async function onPageLoad() {
  // 1. Create the transaction request for the contract call
  request = await contract.functions.increment_count(1).getTransactionRequest();

  // 2. Estimate and fund the transaction so it is ready for submission
  await request.estimateAndFund(wallet);
}

/**
 * By the time user user clicks the submit button, they can just
 * sign the finalized transaction and submit it.
 */
async function handleSubmit() {
  // 1. Sign the transaction with the wallet
  const signature = await wallet.signTransaction(request);
  request.updateWitnessByOwner(wallet.address, signature);

  // 2. Submit the transaction to the network
  info(`Transaction ID Submitted: ${await request.getTransactionId(chainId)}`);
  const response = await provider.sendTransaction(request);

  // 3. Wait for the transaction to settle and get the result
  const result = await response.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await handleSubmit();
