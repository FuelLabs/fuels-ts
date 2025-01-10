import type { ScriptTransactionRequest } from 'fuels';
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { CounterFactory } from '../../../../typegend/contracts';

const { info } = console;

// Initialize the provider, wallet and the contract
const provider = new Provider(LOCAL_NETWORK_URL);
const chainId = await provider.getChainId();

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const deployTx = await CounterFactory.deploy(wallet);

const { contract } = await deployTx.waitForResult();

let request: ScriptTransactionRequest;
// #region main
/**
 * Here we'll prepare our transaction upfront on page load, so that
 * by the time the user interacts with your app (i.e. clicking a btn),
 * the transaction is ready to be submitted
 */
async function onPageLoad() {
  // 1. Invoke the contract function whilst estimating and funding the
  // call, which gives us the transaction request
  request = await contract.functions.increment_count(1).fundWithRequiredCoins();
}

/**
 * By the time user user clicks the submit button, we only need to
 * submit the transaction to the network
 */
async function handleSubmit() {
  // 1. Submit the transaction to the network
  info(`Transaction ID Submitted: ${request.getTransactionId(chainId)}`);
  const response = await wallet.sendTransaction(request);

  // 2. Wait for the transaction to settle and get the result
  const result = await response.waitForResult();
  info(`Transaction ID Successful: ${result.id}`);
}
// #endregion main

await onPageLoad();
await handleSubmit();
