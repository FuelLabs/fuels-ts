// #region deploying-predicates
import { Provider, Wallet, ContractFactory } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../env';
import { ConfigurablePin, ConfigurablePinLoader } from '../typegend/predicates';

const provider = await Provider.create(LOCAL_NETWORK_URL);

const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);
const receiver = Wallet.generate({ provider });
const baseAssetId = provider.getBaseAssetId();

// We can deploy dyanmically or via `fuels deploy`
const factory = new ContractFactory(
  ConfigurablePin.bytecode,
  ConfigurablePin.abi,
  wallet
);
const { waitForResult: waitForDeploy } =
  await factory.deployAsBlobTxForScript();
await waitForDeploy();

// First, we will need to instantiate the script via it's loader bytecode.
// This can be imported from the typegen outputs that were created on `fuels deploy`.
// Then we can use the predicate as we would normally, such as overriding the configurables.
const predicate = new ConfigurablePinLoader({
  data: [23],
  provider,
  configurableConstants: {
    PIN: 23,
  },
});

// Now, let's fund the predicate
const fundTx = await wallet.transfer(predicate.address, 100_000, baseAssetId);
await fundTx.waitForResult();

// Then we'll execute the transfer and validate the predicate
const transferTx = await predicate.transfer(
  receiver.address,
  1000,
  baseAssetId
);
const { isStatusSuccess } = await transferTx.waitForResult();
// #endregion deploying-predicates

console.log('Predicate defined', predicate);
console.log('Should fund predicate successfully', isStatusSuccess);
