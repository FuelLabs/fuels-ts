/* eslint-disable @typescript-eslint/no-unused-vars */
// #region full
import { Wallet, Provider } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { CounterFactory } from '../../../typegend/contracts';

// Let's create our provider from the network URL.
const provider = await Provider.create(LOCAL_NETWORK_URL);
// Let's create our wallet from the private key.
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// Then we can deploy the contract.
const { waitForResult } = await CounterFactory.deploy(wallet);
const { contract } = await waitForResult();

// Lets setup some values to use in our example.
const initialCount = 0;
const incrementedValue = 5;
const decrementedValue = 2;

// We can now call the contract functions and test the results. Lets assert the initial value of the counter.
const { waitForResult: getCountWaitForResult } = await contract.functions
  .get_count()
  .call();
const { value: initialGetCountValue } = await getCountWaitForResult();

console.log('Initial value', initialGetCountValue);

// Next we'll increment the counter, so that we can decrement it.
const { waitForResult: incWaitForResult } = await contract.functions
  .increment_count(5)
  .call();
const { value: incValue } = await incWaitForResult();

console.log('Incremented value', incValue);

// Next, we'll decrement the counter by 3 and assert the new value.
const { waitForResult: decWaitForResult } = await contract.functions
  .decrement_count(3)
  .call();
const { value: decValue } = await decWaitForResult();

console.log('Decremented value', decValue);

// Finally, we'll test the get count function again to ensure parity.
const { waitForResult: finalWaitForResult } = await contract.functions
  .get_count()
  .call();
const { value: finalValue } = await finalWaitForResult();

console.log('Final value', finalValue);
// #endregion full
