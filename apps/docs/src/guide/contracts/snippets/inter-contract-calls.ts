// #region full
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../env';
import { SimpleTokenFactory, TokenDepositorFactory } from '../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const { waitForResult: waitForSimpleToken } =
  await SimpleTokenFactory.deploy(wallet);

const { contract: simpleToken } = await waitForSimpleToken();

const { waitForResult: waitForTokenDepositor } =
  await TokenDepositorFactory.deploy(wallet);

const { contract: tokenDepositor } = await waitForTokenDepositor();

const amountToDeposit = 70;
const call1 = await simpleToken.functions
  .get_balance(wallet.address.toB256())
  .call();

const { value: initialBalance } = await call1.waitForResult();

const call2 = await tokenDepositor.functions
  .deposit_to_simple_token(simpleToken.id.toB256(), amountToDeposit)
  .addContracts([simpleToken])
  .call();

await call2.waitForResult();

const call3 = await simpleToken.functions
  .get_balance(wallet.address.toB256())
  .call();

const { value: finalBalance } = await call3.waitForResult();
// #endregion full
console.log('no initial balance', initialBalance.toNumber() === 0);
console.log(
  'final balance matches deposited amount',
  finalBalance.toNumber() === amountToDeposit
);
