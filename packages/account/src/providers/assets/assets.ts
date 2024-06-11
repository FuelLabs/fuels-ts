import { CHAIN_IDS } from '../chains';

import type { Assets } from './types';
import { resolveIconPaths, fuelAssetsBaseUrl } from './utils';

export const rawAssets: Assets = [
  {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'eth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.sepolia,
        decimals: 18,
      },
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.foundry,
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.devnet,
        decimals: 9,
        assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.testnet,
        decimals: 9,
        assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07'
      }
    ],
  },
];

export const assets = resolveIconPaths(rawAssets, fuelAssetsBaseUrl);