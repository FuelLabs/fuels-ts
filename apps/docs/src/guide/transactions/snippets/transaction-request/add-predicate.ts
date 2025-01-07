import {
  bn,
  Predicate,
  Provider,
  ScriptTransactionRequest,
  Wallet,
  ZeroBytes32,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ScriptSum, SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region transaction-request-9
// Instantiate the transaction request
const transactionRequest = new ScriptTransactionRequest({
  script: ScriptSum.bytecode,
});

const predicateArguments = [ZeroBytes32];

/**
 * Instantiate the predicate and pass valid input data to validate
 * the predicate and unlock the funds
 */
const predicate = new Predicate({
  bytecode: SimplePredicate.bytecode,
  abi: SimplePredicate.abi,
  data: predicateArguments,
  provider,
});

// Fund the predicate
const tx = await wallet.transfer(predicate.address, bn(100_000));
await tx.waitForResult();

const predicateCoins = await predicate.getResourcesToSpend([
  { amount: 2000, assetId: await provider.getBaseAssetId() },
]);

// Add the predicate input and resources
transactionRequest.addResources(predicateCoins);
// #endregion transaction-request-9
