import { Provider, Wallet } from 'fuels';
import { safeExec } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const receiver = Wallet.generate({ provider });

const inputAddress =
  '0xfc05c23a8f7f66222377170ddcbfea9c543dff0dd2d2ba4d0478a4521423a9d4';
const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});

// Any amount coins will fail as the predicate is unfunded
const amountOfCoinsToFail = 1000;
const { error } = await safeExec(async () =>
  predicate.transfer(
    receiver.address,
    amountOfCoinsToFail,
    provider.getBaseAssetId()
  )
);

// #region send-and-spend-funds-from-predicates-6
const errorMessage = `The account(s) sending the transaction don't have enough funds to cover the transaction.`;
// #endregion send-and-spend-funds-from-predicates-6

const actualErrorMessage = (<Error>error).message;
console.log(
  'Error message should match expected',
  actualErrorMessage === errorMessage
);
