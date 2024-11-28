// #region proxy-2
import {
  Provider,
  Wallet,
  Src14OwnedProxy,
  Src14OwnedProxyFactory,
} from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import {
  Counter,
  CounterFactory,
  CounterV2,
  CounterV2Factory,
} from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const counterContractFactory = new CounterFactory(wallet);
const deploy = await counterContractFactory.deploy();
const { contract: counterContract } = await deploy.waitForResult();
// #endregion proxy-2

// #region proxy-3
/**
 * It is important to pass all storage slots to the proxy in order to
 * initialize the storage slots.
 */
const storageSlots = counterContractFactory.storageSlots.concat(
  Src14OwnedProxy.storageSlots
);
/**
 * These configurables are specific to our recommended SRC14 compliant
 * contract. They must be passed on deployment and then `initialize_proxy`
 * must be called to setup the proxy contract.
 */
const configurableConstants = {
  INITIAL_TARGET: { bits: counterContract.id.toB256() },
  INITIAL_OWNER: {
    Initialized: { Address: { bits: wallet.address.toB256() } },
  },
};

const proxyContractFactory = new Src14OwnedProxyFactory(wallet);
const proxyDeploy = await proxyContractFactory.deploy({
  storageSlots,
  configurableConstants,
});

const { contract: proxyContract } = await proxyDeploy.waitForResult();
const { waitForResult } = await proxyContract.functions
  .initialize_proxy()
  .call();

await waitForResult();
// #endregion proxy-3

// #region proxy-4
/**
 * Make sure to use only the contract ID of the proxy when instantiating
 * the contract as this will remain static even with future upgrades.
 */
const proxiedContract = new Counter(proxyContract.id, wallet);

const incrementCall = await proxiedContract.functions.increment_count(1).call();
await incrementCall.waitForResult();

const { value: count } = await proxiedContract.functions.get_count().get();
// #endregion proxy-4

console.log('count:', count.toNumber() === 1);

// #region proxy-6
const deployV2 = await CounterV2Factory.deploy(wallet);
const { contract: contractV2 } = await deployV2.waitForResult();

const updateTargetCall = await proxyContract.functions
  .set_proxy_target({ bits: contractV2.id.toB256() })
  .call();

await updateTargetCall.waitForResult();
// #endregion proxy-6

// #region proxy-7
/**
 * Again, we are instantiating the contract with the same proxy ID
 * but using a new contract instance.
 */
const upgradedContract = new CounterV2(proxyContract.id, wallet);

const incrementCall2 = await upgradedContract.functions
  .increment_count(1)
  .call();

await incrementCall2.waitForResult();

const { value: increments } = await upgradedContract.functions
  .get_increments()
  .get();

const { value: count2 } = await upgradedContract.functions.get_count().get();
// #endregion proxy-7

console.log('secondCount', count2.toNumber() === 2);
console.log('increments', increments);
