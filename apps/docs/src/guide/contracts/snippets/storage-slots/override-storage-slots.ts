// #region contract-deployment-storage-slots
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../../../env';
import {
  StorageTestContract,
  StorageTestContractFactory,
} from '../../../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploymentTx = await StorageTestContractFactory.deploy(deployer, {
  storageSlots: StorageTestContract.storageSlots,
});

await deploymentTx.waitForResult();
// #endregion contract-deployment-storage-slots

const { contract, transactionResult } = await deploymentTx.waitForResult();
console.log('Contract should be defined', contract);
console.log(
  'Deployment transaction should be successful',
  transactionResult.isStatusSuccess
);
