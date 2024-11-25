// #region using-different-wallet
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { ReturnContextFactory } from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await ReturnContextFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

// Update the wallet
const newWallet = Wallet.generate({ provider });
contract.account = newWallet;
// #endregion using-different-wallet

console.log(
  'Contract account should equal the new wallet address',
  contract.account.address.toB256() === newWallet.address.toB256()
);
