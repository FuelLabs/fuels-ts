// #region transfer
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../env';
import { SimplePredicate } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const predicate = new SimplePredicate({
  provider,
});

const receiver = Wallet.generate({ provider });
const amountToReceiver = 1000;

const { waitForResult } = await predicate.transfer(
  receiver.address,
  amountToReceiver,
  provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

const { isStatusSuccess } = await waitForResult();
// #endregion transfer

console.log(
  'Predicate fund transfer transaction should be successful',
  isStatusSuccess
);
