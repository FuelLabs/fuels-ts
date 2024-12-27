// #region full
import { Wallet, Provider } from 'fuels';

import {
  LOCAL_NETWORK_URL,
  WALLET_ADDRESS,
  WALLET_PVT_KEY_2,
} from '../../../../env';
import { WhitelistedAddressPredicate } from '../../../../typegend/predicates/WhitelistedAddressPredicate';

const provider = new Provider(LOCAL_NETWORK_URL);

const whitelisted = Wallet.fromAddress(WALLET_ADDRESS, provider);
const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY_2, provider);
const recipient = Wallet.generate({ provider });

const configurable = { WHITELISTED: whitelisted.address.toB256() };

// Instantiate predicate with configurable constants
const predicate = new WhitelistedAddressPredicate({
  provider,
  data: [configurable.WHITELISTED],
  configurableConstants: configurable,
});

// Transferring funds to the predicate
const tx1 = await sender.transfer(
  predicate.address,
  200_000,
  await provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

await tx1.waitForResult();

const amountToTransfer = 100;

// Transferring funds from the predicate to destination if predicate returns true
const tx2 = await predicate.transfer(
  recipient.address,
  amountToTransfer,
  await provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

await tx2.waitForResult();
// #endregion full

const destinationBalance = await recipient.getBalance(
  await provider.getBaseAssetId()
);

console.log(
  'Destination balance should equal amount to transfer',
  destinationBalance.eq(amountToTransfer)
);
