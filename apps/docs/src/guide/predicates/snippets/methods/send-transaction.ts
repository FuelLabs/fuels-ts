// #region sendTransaction
import { Provider, ScriptTransactionRequest, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  baseAssetId
);

await fundPredicate.waitForResult();

// Instantiate the transaction request.
const request = new ScriptTransactionRequest();

// Estimate and fund the transaction
const { assembledRequest } = await provider.assembleTx({
  request,
  feePayerAccount: predicate,
  accountCoinQuantities: [
    {
      amount: '0',
      assetId: baseAssetId,
      account: predicate,
      changeOutputAccount: predicate,
    },
  ],
});

// Send the transaction using the predicate
const result = await predicate.sendTransaction(assembledRequest);

await result.waitForResult();
// #endregion sendTransaction

const { isStatusSuccess } = await result.waitForResult();

console.log('Send transaction to be successful', isStatusSuccess);
