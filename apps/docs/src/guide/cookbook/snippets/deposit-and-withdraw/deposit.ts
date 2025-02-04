// #region deposit-and-withdraw-cookbook-2
import { getMintedAssetId, Provider, Wallet, ZeroBytes32 } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { LiquidityPoolFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const wallet = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploy = await LiquidityPoolFactory.deploy(wallet, {
  configurableConstants: {
    TOKEN: { bits: await provider.getBaseAssetId() },
  },
});

const { contract } = await deploy.waitForResult();

const depositAmount = 100_000;
const liquidityOwner = Wallet.generate({ provider });

// the subId used to mint the new asset is a zero b256 on the contract
const subId = ZeroBytes32;
const contractId = contract.id.toB256();

const assetId = getMintedAssetId(contractId, subId);

const { waitForResult } = await contract.functions
  .deposit({ bits: liquidityOwner.address.toB256() })
  .callParams({ forward: [depositAmount, await provider.getBaseAssetId()] })
  .txParams({ variableOutputs: 1 })
  .call();

await waitForResult();

const liquidityAmount = await liquidityOwner.getBalance(assetId);
// #endregion deposit-and-withdraw-cookbook-2

console.log('value', liquidityAmount.toNumber());
