/* eslint-disable no-console */
import {
  Provider,
  FUEL_DEVNET_NETWORK_URL,
  FUEL_TESTNET_NETWORK_URL,
  assets,
  CHAIN_IDS,
  rawAssets,
} from 'fuels';

type FuelChainId = keyof typeof CHAIN_IDS.fuel;

/**
 * @group e2e
 */
describe('e2e-assets', () => {
  let shouldSkip: boolean = false;
  let networks: [string, Provider][] = [];

  beforeAll(async () => {
    if (!process.env.CI) {
      console.log('Skipping live assets compatibility test');
      shouldSkip = true;
      return;
    }

    networks = [
      ['devnet', await Provider.create(FUEL_DEVNET_NETWORK_URL)],
      ['testnet', await Provider.create(FUEL_TESTNET_NETWORK_URL)],
    ];
  });

  it(`should have correct assets`, () => {
    if (shouldSkip) {
      return;
    }

    for (const [chainKey, provider] of networks) {
      const expected = [
        {
          name: 'Ethereum',
          symbol: 'ETH',
          icon: expect.stringContaining('eth.svg'),
          networks: expect.arrayContaining([
            {
              type: 'fuel',
              decimals: 9,
              chainId: provider.getChainId(),
              assetId: provider.getBaseAssetId(),
            },
          ]),
        },
      ];

      expect(CHAIN_IDS.fuel[chainKey as FuelChainId]).toEqual(provider.getChainId());
      expect(rawAssets).toEqual(expected);
      expect(assets).toEqual(expected);
    }
  });
});
