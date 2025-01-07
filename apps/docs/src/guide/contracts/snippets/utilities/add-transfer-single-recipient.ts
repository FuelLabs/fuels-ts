// #region add-transfer-1
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import { EchoValuesFactory } from '../../../../typegend';

const provider = new Provider(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deployContract = await EchoValuesFactory.deploy(deployer);
const { contract } = await deployContract.waitForResult();

const recipient = Wallet.generate({ provider });

const { waitForResult } = await contract.functions
  .echo_u64(100)
  .addTransfer({
    destination: recipient.address,
    amount: 100,
    assetId: await provider.getBaseAssetId(),
  })
  .call();

await waitForResult();
// #endregion add-transfer-1

const recipientBalance = await recipient.getBalance(
  await provider.getBaseAssetId()
);
console.log(
  'Recipient balance should equal 100',
  recipientBalance.toNumber() === 100
);
