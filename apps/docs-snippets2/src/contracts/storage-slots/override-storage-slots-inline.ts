// #region contract-deployment-storage-slots-inline
import { Provider, Wallet } from 'fuels';

import { LOCAL_NETWORK_URL, WALLET_PVT_KEY } from '../../env';
import { StorageTestContractFactory } from '../../typegend';

const provider = await Provider.create(LOCAL_NETWORK_URL);
const deployer = Wallet.fromPrivateKey(WALLET_PVT_KEY, provider);

const deploymentTx = await StorageTestContractFactory.deploy(deployer, {
  storageSlots: [
    {
      key: '02dac99c283f16bc91b74f6942db7f012699a2ad51272b15207b9cc14a70dbae',
      value: '0000000000000001000000000000000000000000000000000000000000000000',
    },
    {
      key: '6294951dcb0a9111a517be5cf4785670ff4e166fb5ab9c33b17e6881b48e964f',
      value: '0000000000000001000000000000003200000000000000000000000000000000',
    },
    {
      key: 'b48b753af346966d0d169c0b2e3234611f65d5cfdb57c7b6e7cd6ca93707bee0',
      value: '000000000000001e000000000000000000000000000000000000000000000000',
    },
    {
      key: 'de9090cb50e71c2588c773487d1da7066d0c719849a7e58dc8b6397a25c567c0',
      value: '0000000000000014000000000000000000000000000000000000000000000000',
    },
    {
      key: 'f383b0ce51358be57daa3b725fe44acdb2d880604e367199080b4379c41bb6ed',
      value: '000000000000000a000000000000000000000000000000000000000000000000',
    },
  ],
});

await deploymentTx.waitForResult();
// #endregion contract-deployment-storage-slots-inline

const { contract, transactionResult } = await deploymentTx.waitForResult();
console.log('Contract should be defined', contract);
console.log(
  'Deployment transaction should be successful',
  transactionResult.isStatusSuccess
);
