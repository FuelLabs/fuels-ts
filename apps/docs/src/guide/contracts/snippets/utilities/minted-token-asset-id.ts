// #region minted-token-asset-id-2
import { bn, getMintedAssetId, Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { TokenFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await TokenFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Any valid bits256 string can be used as a sub ID
const subID =
  '0xc7fd1d987ada439fc085cfa3c49416cf2b504ac50151e3c2335d60595cb90745';
const mintAmount = bn(1000);

const { waitForResult } = await contract.functions
  .mint_coins(subID, mintAmount)
  .call();
await waitForResult();

// Get the minted
const mintedAssetId = getMintedAssetId(contract.id.toB256(), subID);
// #endregion minted-token-asset-id-2

console.log('Minted asset ID should be defined', mintedAssetId);
const { transactionResult } = await waitForResult();
console.log(
  'Transaction should be successful',
  transactionResult.isStatusSuccess
);
