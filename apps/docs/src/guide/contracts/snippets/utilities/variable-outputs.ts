// #region variable-outputs-2
import { Provider, Wallet, getMintedAssetId, getRandomB256 } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { TokenFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await TokenFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const subId = getRandomB256();

const call1 = await contract.functions.mint_coins(subId, 100).call();
await call1.waitForResult();

const address = { bits: Wallet.generate().address.toB256() };
const assetId = { bits: getMintedAssetId(contract.id.toB256(), subId) };

const { waitForResult } = await contract.functions
  .transfer_to_address(address, assetId, 100)
  .txParams({
    variableOutputs: 1,
  })
  .call();

await waitForResult();
// #endregion variable-outputs-2

const { transactionResult } = await waitForResult();
console.log(
  'Transaction should be successful',
  transactionResult.isStatusSuccess
);
