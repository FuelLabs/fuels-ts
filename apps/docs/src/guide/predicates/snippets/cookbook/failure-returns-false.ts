import { getRandomB256, Provider, Wallet } from 'fuels';
import { safeExec } from 'fuels/test-utils';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { SimplePredicate } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const baseAssetId = await provider.getBaseAssetId();

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });

const inputAddress = getRandomB256();
const predicate = new SimplePredicate({
  provider,
  data: [inputAddress],
});

const amountToPredicate = 10_000_000;
const tx = await sender.transfer(
  predicate.address,
  amountToPredicate,
  baseAssetId,
  {
    gasLimit: 1_000,
  }
);
const { isStatusSuccess } = await tx.waitForResult();
console.log('Transfer to predicate should be successful', isStatusSuccess);

const amountOfCoins = 100;
const { error } = await safeExec(() =>
  predicate.transfer(receiver.address, amountOfCoins, baseAssetId)
);

// #region send-and-spend-funds-from-predicates-7
const errorMessage = `PredicateVerificationFailed`;
// #endregion send-and-spend-funds-from-predicates-7

const actualErrorMessage = (<Error>error).message;
console.log(
  `Error message should match expected ${actualErrorMessage}`,
  actualErrorMessage.includes(errorMessage)
);
