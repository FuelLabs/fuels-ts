// #region deposit-and-withdraw-cookbook-3
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { LiquidityPoolFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LiquidityPoolFactory.deploy(wallet, {
  configurableConstants: {
    TOKEN: { bits: provider.getBaseAssetId() },
  },
});

const { contract } = await deploy.waitForResult();

const depositAmount = 100_000;
const liquidityOwner = Wallet.generate({ provider });

const { waitForResult } = await contract.functions
  .withdraw({ bits: liquidityOwner.address.toB256() })
  .callParams({ forward: [depositAmount, provider.getBaseAssetId()] })
  .txParams({ variableOutputs: 1 })
  .call();

await waitForResult();

const baseAssetAfterWithdraw = await liquidityOwner.getBalance(
  provider.getBaseAssetId()
);
// #endregion deposit-and-withdraw-cookbook-3

console.log('balance', baseAssetAfterWithdraw.toNumber());
