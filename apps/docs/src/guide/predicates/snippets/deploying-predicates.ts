// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import {
  ConfigurablePin,
  ConfigurablePinLoader,
} from '../../../typegend/predicates';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });
const baseAssetId = provider.getBaseAssetId();

// We can deploy dynamically or via `fuels deploy`
const originalPredicate = new ConfigurablePin({
  provider,
});

const { waitForResult: waitForDeploy } = await originalPredicate.deploy(wallet);
await waitForDeploy();

// First, we will need to instantiate the script via it's loader bytecode.
// This can be imported from the typegen outputs that were created on `fuels deploy`.
// Then we can use the predicate as we would normally, such as overriding the configurables.
const loaderPredicate = new ConfigurablePinLoader({
  data: [23],
  provider,
  configurableConstants: {
    PIN: 23,
  },
});

// Now, let's fund the predicate
const fundTx = await wallet.transfer(
  loaderPredicate.address,
  100_000,
  baseAssetId
);
await fundTx.waitForResult();

// Then we'll execute the transfer and validate the predicate
const transferTx = await loaderPredicate.transfer(
  receiver.address,
  1000,
  baseAssetId
);
const { isStatusSuccess } = await transferTx.waitForResult();
// #endregion full

console.log('Predicate defined', loaderPredicate);
console.log('Should fund predicate successfully', isStatusSuccess);
