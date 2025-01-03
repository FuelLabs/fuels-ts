// #region createTransfer
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

// Fund the predicate
const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  provider.getBaseAssetId()
);
await fundPredicate.waitForResult();

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

const sendFromPredicate = await predicate.sendTransaction(transactionRequest);

await sendFromPredicate.waitForResult();
// #endregion createTransfer

const { isStatusSuccess } = await sendFromPredicate.waitForResult();
console.log(
  'Predicate fund transfer transaction should be successful',
  isStatusSuccess
);
