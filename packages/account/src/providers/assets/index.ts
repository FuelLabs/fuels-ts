import { CHAIN_IDS } from '../chains';

import type { Assets } from './types';

export const assets: Assets = [
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
        chainId: CHAIN_IDS.fuel.beta5,
        decimals: 9,
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.devnet,
        decimals: 9,
        assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      },
    ],
  },
];

export * from './utils';
export * from './types';
