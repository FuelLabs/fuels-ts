// #region full
import { Wallet, Provider } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { WhitelistedAddressPredicate } from '../../../../typegend/predicates/WhitelistedAddressPredicate';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const sender = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const recipient = Wallet.generate({ provider });

// Instantiate predicate without configurable constants (will use the address defined in Sway)
const predicate = new WhitelistedAddressPredicate({
  provider,
  data: ['0xa703b26833939dabc41d3fcaefa00e62cee8e1ac46db37e0fa5d4c9fe30b4132'],
});

// Transferring funds to the predicate
const tx1 = await sender.transfer(
  predicate.address,
  200_000,
  provider.getBaseAssetId(),
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
  provider.getBaseAssetId(),
  {
    gasLimit: 1000,
  }
);

await tx2.waitForResult();
// #endregion full

const destinationBalance = await recipient.getBalance(
  provider.getBaseAssetId()
);

console.log(
  'Destination balance should equal amount to transfer',
  destinationBalance.eq(amountToTransfer)
);
