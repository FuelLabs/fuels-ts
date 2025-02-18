import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { Counter, CounterFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await CounterFactory.deploy(wallet);
const { contract } = await deploy.waitForResult();

// #region transaction-response-1
// Call a contract function
const call = await contract.functions.increment_count(15).call();

// Wait for the result
const { transactionResponse } = await call.waitForResult();

// Retrieve the full transaction summary
const transactionSummary = await transactionResponse.getTransactionSummary({
  // Pass a Contract ID and ABI map to generate the contract operations
  [contract.id.toB256()]: Counter.abi,
});
// #endregion transaction-response-1

console.log('transactionSummary', transactionSummary);
