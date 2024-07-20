import { launchTestNode } from 'fuels/test-utils';

using node = await launchTestNode({});

export const LOCAL_NETWORK_URL = node.provider.url;
export const WALLET_ADDRESS = node.wallets[0].address;
export const WALLET_PVT_KEY = node.wallets[0].privateKey;
