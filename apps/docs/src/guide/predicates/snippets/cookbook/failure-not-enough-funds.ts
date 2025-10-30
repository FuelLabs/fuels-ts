import { Provider, Wallet } from 'fuels';
import { safeExec } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const receiver = Wallet.generate({ provider });

const inputAddress =
  '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});

// Any amount coins will fail as the predicate is unfunded
const amountOfCoinsToFail = 1000;
const baseAssetId = await provider.getBaseAssetId();
const { error } = await safeExec(() =>
  predicate.transfer(receiver.address, amountOfCoinsToFail, baseAssetId)
);

// #region send-and-spend-funds-from-predicates-6
const errorMessage = `Insufficient funds or too many small value coins. Consider combining UTXOs.\nFor the following asset ID: '${baseAssetId}'.`;
// #endregion send-and-spend-funds-from-predicates-6

const actualErrorMessage = (<Error>error).message;
console.log(
  'Error message should match expected',
  actualErrorMessage === errorMessage
);
