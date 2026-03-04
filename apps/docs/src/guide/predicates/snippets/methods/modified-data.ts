import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ConfigurablePin } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

// #region modified-data
const predicate = new ConfigurablePin({
  provider,
  data: [1000],
});

// Fund the predicate
const fundPredicate = await funder.transfer(predicate.address, 100_000_000);
await fundPredicate.waitForResult();

const transactionRequest = await predicate.createTransfer(
  receiver.address,
  100_000,
  baseAssetId
);

predicate.setData([1337]);

predicate.populateTransactionPredicateData(transactionRequest);
// #endregion modified-data

console.log('transactionRequest', transactionRequest);
