// #region send-and-spend-funds-from-predicates-2
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const inputAddress =
  '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';

const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});
// #endregion send-and-spend-funds-from-predicates-2
console.log('Predicate should be defined', predicate);

// #region send-and-spend-funds-from-predicates-3
// The amount of coins to send to the predicate
const amountToPredicate = 10_000_000;

// Fund the predicate with some funds from our wallet (sender)
const fundPredicateTx = await sender.transfer(
  predicate.address,
  amountToPredicate,
  provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

// Wait for the transaction
await fundPredicateTx.waitForResult();
// #endregion send-and-spend-funds-from-predicates-3
const { isStatusSuccess } = await fundPredicateTx.waitForResult();
console.log(
  'Funding predicate transaction should be successful',
  isStatusSuccess
);

// #region send-and-spend-funds-from-predicates-5
// The amount of coins to send from the predicate, to our receiver wallet.
const amountToReceiver = 200;

// Transfer funds from the predicate, to our receiver wallet
const transferFromPredicateTx = await predicate.transfer(
  receiver.address,
  amountToReceiver,
  provider.getBaseAssetId()
);

// Wait for the transaction
await transferFromPredicateTx.waitForResult();
// #endregion send-and-spend-funds-from-predicates-5

const { isStatusSuccess: isTransferFromPredicateSuccessful } =
  await transferFromPredicateTx.waitForResult();
console.log(
  'Transfer from predicate (to receiver) transaction should be successful',
  isTransferFromPredicateSuccessful
);
