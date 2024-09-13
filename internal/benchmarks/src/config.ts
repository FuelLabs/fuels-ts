import { DEVNET_NETWORK_URL } from '@internal/utils';
import { TransactionType } from 'fuels';

export const DEVNET_CONFIG = {
  networkUrl: DEVNET_NETWORK_URL,
  faucetUrl: `https://faucet-devnet.fuel.network/`,
  txIds: {
    [TransactionType.Upgrade]: '0xe2c03044fe708e9b112027881baf9f892e6b64a630a629998922c1cab918c094',
    [TransactionType.Upload]: '0x94bc2a189b8211796c8fe5b9c6b67624fe97d2007e104bf1b30739944f43bd73',
  },
};
