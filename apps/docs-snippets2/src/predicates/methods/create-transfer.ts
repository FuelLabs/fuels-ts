// #region createTransfer
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';
import { SimplePredicate } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new SimplePredicate({
  provider,
});

const receiver = Wallet.generate({ provider });
const amountToReceiver = 1000;

const transactionRequest = await predicate.createTransfer(
  receiver.address,
  amountToReceiver,
  provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

const { waitForResult } = await predicate.sendTransaction(transactionRequest);

const { isStatusSuccess } = await waitForResult();
// #endregion createTransfer

console.log(
  'Predicate fund transfer transaction should be successful',
  isStatusSuccess
);
