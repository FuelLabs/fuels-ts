import { launchTestNode } from 'fuels/test-utils';

using node = await launchTestNode({ walletsConfig: { count: 3 } });

export const NETWORK_URL = node.provider.url;

const [w0, w2, w3] = node.wallets;

export const WALLET_ADDRESS = w0.address;
export const WALLET_PVT_KEY = w0.privateKey;

export const WALLET_ADDRESS_2 = w2.address;
export const WALLET_PVT_KEY_2 = w2.privateKey;

export const WALLET_ADDRESS_3 = w3.address;
export const WALLET_PVT_KEY_3 = w3.privateKey;
