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
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
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
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        decimals: 9,
        assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
      }
    ],
  },
  {
    name: 'WETH',
    symbol: 'WETH',
    icon: 'weth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xa38a5a8beeb08d95744bc7f58528073f4052b254def59eba20c99c202b5acaa3',
        decimals: 18,
      },
    ],
  },
  {
    name: 'weETH',
    symbol: 'weETH',
    icon: 'weETH.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x239ed6e12b7ce4089ee245244e3bf906999a6429c2a9a445a1e1faf56914a4ab',
        decimals: 18,
      },
    ],
  },
  {
    name: 'rsETH',
    symbol: 'rsETH',
    icon: 'rsETH.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xbae80f7fb8aa6b90d9b01ef726ec847cc4f59419c4d5f2ea88fec785d1b0e849',
        decimals: 18,
      },
    ],
  },
  {
    name: 'rETH',
    symbol: 'rETH',
    icon: 'reth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xae78736cd615f374d3085123a210448e74fc6393',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xf3f9a0ed0ce8eac5f89d6b83e41b3848212d5b5f56108c54a205bb228ca30c16',
        decimals: 18,
      },
    ],
  },
  {
    name: 'wbETH',
    symbol: 'wbETH',
    icon: 'wbeth.png',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x7843c74bef935e837f2bcf67b5d64ecb46dd53ff86375530b0caf3699e8ffafe',
        decimals: 18,
      },
    ],
  },
  {
    name: 'rstETH',
    symbol: 'rstETH',
    icon: 'rstETH.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x7a4EffD87C2f3C55CA251080b1343b605f327E3a',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x962792286fbc9b1d5860b4551362a12249362c21594c77abf4b3fe2bbe8d977a',
        decimals: 18,
      },
    ],
  },
  {
    name: 'amphrETH',
    symbol: 'amphrETH',
    icon: 'amphrETH.png',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x5fD13359Ba15A84B76f7F87568309040176167cd',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x05fc623e57bd7bc1258efa8e4f62b05af5471d73df6f2c2dc11ecc81134c4f36',
        decimals: 18,
      },
    ],
  },
  {
    name: 'Manta mBTC',
    symbol: 'Manta mBTC',
    icon: 'manta-mbtc.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x4041381e947CFD3D483d67a25C6aa9Dc924250c5',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xaf3111a248ff7a3238cdeea845bb2d43cf3835f1f6b8c9d28360728b55b9ce5b',
        decimals: 18,
      },
    ],
  },
  {
    name: 'Manta mETH',
    symbol: 'Manta mETH',
    icon: 'manta-meth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x8CdF550C04Bc9B9F10938368349C9c8051A772b6',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xafd219f513317b1750783c6581f55530d6cf189a5863fd18bd1b3ffcec1714b4',
        decimals: 18,
      },
    ],
  },
  {
    name: 'Manta mUSD',
    symbol: 'Manta mUSD',
    icon: 'manta-musd.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x3f24E1d7a973867fC2A03fE199E5502514E0e11E',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x89cb9401e55d49c3269654dd1cdfb0e80e57823a4a7db98ba8fc5953b120fef4',
        decimals: 18,
      },
    ],
  },
  {
    name: 'pumpBTC',
    symbol: 'pumpBTC',
    icon: 'pumpbtc.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xf469fbd2abcd6b9de8e169d128226c0fc90a012e',
        decimals: 8,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x0aa5eb2bb97ca915288b653a2529355d4dc66de2b37533213f0e4aeee3d3421f',
        decimals: 8,
      },
    ],
  },
  {
    name: 'FBTC',
    symbol: 'FBTC',
    icon: 'fbtc.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xc96de26018a54d51c097160568752c4e3bd6c364',
        decimals: 8,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xb5ecb0a1e08e2abbabf624ffea089df933376855f468ade35c6375b00c33996a',
        decimals: 8,
      },
    ],
  },
  {
    name: 'SolvBTC',
    symbol: 'SolvBTC',
    icon: 'solvBTC.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x7a56e1c57c7475ccf742a1832b028f0456652f97',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x1186afea9affb88809c210e13e2330b5258c2cef04bb8fff5eff372b7bd3f40f',
        decimals: 18,
      },
    ],
  },
  {
    name: 'SolvBTC.BBN',
    symbol: 'SolvBTC.BBN',
    icon: 'SolvBTC.BBN.png',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xd9d920aa40f578ab794426f5c90f6c731d159def',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x7a4f087c957d30218223c2baaaa365355c9ca81b6ea49004cfb1590a5399216f',
        decimals: 18,
      },
    ],
  },
  {
    name: 'Mantle mETH',
    symbol: 'Mantle mETH',
    icon: 'mantle-meth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x642a5db59ec323c2f846d4d4cf3e58d78aff64accf4f8f6455ba0aa3ef000a3b',
        decimals: 18,
      },
    ],
  },
  {
    name: 'sDAI',
    symbol: 'sDAI',
    icon: 'sdai.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x83f20f44975d03b1b09e64809b757c47f942beea',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x9e46f919fbf978f3cad7cd34cca982d5613af63ff8aab6c379e4faa179552958',
        decimals: 18,
      },
    ],
  },
  {
    name: 'USDT',
    symbol: 'USDT',
    icon: 'usdt.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        decimals: 6,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xa0265fb5c32f6e8db3197af3c7eb05c48ae373605b8165b6f4a51c5b0ba4812e',
        decimals: 6,
      },
    ],
  },
  {
    name: 'USDC',
    symbol: 'USDC',
    icon: 'usdc.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x286c479da40dc953bddc3bb4c453b608bba2e0ac483b077bd475174115395e6b',
        decimals: 6,
      },
    ],
  },
  {
    name: 'USDe',
    symbol: 'USDe',
    icon: 'USDe.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x4c9edd5852cd905f086c759e8383e09bff1e68b3',
        decimals: 18,
      },
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.sepolia,
        address: '0xc6387efad0f184a90b34f397c3d6fd63135ef790',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xb6133b2ef9f6153eb869125d23dcf20d1e735331b5e41b15a6a7a6cec70e8651',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.testnet,
        contractId:
          '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
        assetId:
          '0x86a1beb50c844f5eff9afd21af514a13327c93f76edb89333af862f70040b107',
        decimals: 18,
      },
    ],
  },
  {
    name: 'sUSDe',
    symbol: 'sUSDe',
    icon: 'sUSDe.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x9d39a5de30e57443bff2a8307a4256c8797a3497',
        decimals: 18,
      },
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.sepolia,
        address: '0xb8f4f4eafc1d2a3c0a4d519bbf1114c311cc9b1b',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xd05563025104fc36496c15c7021ad6b31034b0e89a356f4f818045d1f48808bc',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.testnet,
        contractId:
          '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
        assetId:
          '0xd2886b34454e2e0de47a82d8e6314b26e1e1312519247e8e2ef137672a909aeb',
        decimals: 18,
      },
    ],
  },
  {
    name: 'rsUSDe',
    symbol: 'rsUSDe',
    icon: 'rsUSDe.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x82f5104b23FF2FA54C2345F821dAc9369e9E0B26',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x78d4522ec607f6e8efb66ea49439d1ee48623cf763f9688a8eada025def033d9',
        decimals: 18,
      },
    ],
  },
  {
    name: 'wstETH',
    symbol: 'wstETH',
    icon: 'wsteth.svg',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
        decimals: 18,
      },
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.sepolia,
        address: '0xB82381A3fBD3FaFA77B3a7bE693342618240067b',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x1a7815cc9f75db5c24a5b0814bfb706bb9fe485333e98254015de8f48f84c67b',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.testnet,
        contractId:
          '0xd02112ef9c39f1cea7c8527c26242ca1f5d26bcfe8d1564bee054d3b04175471',
        assetId:
          '0xb42cd9ddf61898da1701adb3a003b0cf4ca6df7b5fe490ec2c295b1ca43b33c8',
        decimals: 18,
      },
    ],
  },
  {
    name: 'ezETH',
    symbol: 'ezETH',
    icon: 'ezeth.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xbf5495Efe5DB9ce00f80364C8B423567e58d2110',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x91b3559edb2619cde8ffb2aa7b3c3be97efd794ea46700db7092abeee62281b0',
        decimals: 18,
      },
    ],
  },
  {
    name: 'pzETH',
    symbol: 'pzETH',
    icon: 'pzETH.webp',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x8c9532a60e0e7c6bbd2b2c1303f63ace1c3e9811',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x1493d4ec82124de8f9b625682de69dcccda79e882b89a55a8c737b12de67bd68',
        decimals: 18,
      },
    ],
  },
  {
    name: 'Re7LRT',
    symbol: 'Re7LRT',
    icon: 'Re7LRT.png',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0x84631c0d0081FDe56DeB72F6DE77abBbF6A9f93a',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0xf2fc648c23a5db24610a1cf696acc4f0f6d9a7d6028dd9944964ab23f6e35995',
        decimals: 18,
      },
    ],
  },
  {
    name: 'steakLRT',
    symbol: 'steakLRT',
    icon: 'steakLRT.png',
    networks: [
      {
        type: 'ethereum',
        chainId: CHAIN_IDS.eth.mainnet,
        address: '0xBEEF69Ac7870777598A04B2bd4771c71212E6aBc',
        decimals: 18,
      },
      {
        type: 'fuel',
        chainId: CHAIN_IDS.fuel.mainnet,
        contractId:
          '0x4ea6ccef1215d9479f1024dff70fc055ca538215d2c8c348beddffd54583d0e8',
        assetId:
          '0x4fc8ac9f101df07e2c2dec4a53c8c42c439bdbe5e36ea2d863a61ff60afafc30',
        decimals: 18,
      },
    ],
  },
];

export const assets = resolveIconPaths(rawAssets, fuelAssetsBaseUrl);