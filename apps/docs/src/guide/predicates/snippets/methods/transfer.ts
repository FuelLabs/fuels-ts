// #region transfer
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnTruePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const funder = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const predicate = new ReturnTruePredicate({
  provider,
});

const fundPredicate = await funder.transfer(
  predicate.address,
  100_000_000,
  await provider.getBaseAssetId()
);
await fundPredicate.waitForResult();

const receiver = Wallet.generate({ provider });
const amountToReceiver = 1000;

const transferPredicateCoins = await predicate.transfer(
  receiver.address,
  amountToReceiver,
  await provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

await transferPredicateCoins.waitForResult();
// #endregion transfer

const { isStatusSuccess } = await transferPredicateCoins.waitForResult();

console.log(
  'Predicate fund transfer transaction should be successful',
  isStatusSuccess
);
