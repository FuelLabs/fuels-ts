import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { EchoConfigurablesFactory } from '../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

// #region setting-configurable-constant
const configurableConstants = {
  age: 10,
};

const deploy = await EchoConfigurablesFactory.deploy(wallet, {
  configurableConstants,
});
const { contract } = await deploy.waitForResult();

const {
  value: [age, tag, grades, myStruct],
} = await contract.functions.echo_configurables().get();

// age got updated
console.log('age', age); // 10
// while the rest are default values
console.log('tag', tag); // 'fuel'
console.log('grades', grades); // [3, 4, 3, 2]
console.log('myStruct', myStruct); // { x: 1, y: 2, state: 'Pending' }
// #endregion setting-configurable-constant

// #region invalid-configurable
const invalidConfigurables = {
  my_struct: {
    x: 10,
  },
};
try {
  await EchoConfigurablesFactory.deploy(wallet, {
    configurableConstants: invalidConfigurables,
  });
} catch (e) {
  console.log('error', e);
  // error: Error setting configurable constants on contract:
  // Invalid struct MyStruct. Field "y" not present.
}
// #endregion invalid-configurable
