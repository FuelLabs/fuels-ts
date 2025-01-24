import { CHAIN_IDS } from '../../providers/chains';
import { assets } from '../assets';
import type { Asset } from '../types';

import { getAssetEth, getAssetFuel, getAssetWithNetwork, getDefaultChainId } from './network';

/**
 * @group node
 */
describe('Network Utils', () => {
  test('getDefaultChainId', () => {
    expect(getDefaultChainId('ethereum')).toBe(11155111);
    expect(getDefaultChainId('fuel')).toBe(CHAIN_IDS.fuel.testnet);
  });

  test('getAssetWithNetwork - Ethereum', () => {
    const asset = assets[0] as Asset;
    const assetEth = getAssetWithNetwork({
      asset,
      networkType: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
    });
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    });
  });

  test('getAssetWithNetwork - Fuel', () => {
    const asset = assets[0] as Asset;
    const assetFuel = getAssetWithNetwork({
      asset,
      networkType: 'fuel',
      chainId: CHAIN_IDS.fuel.testnet,
    });
    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.testnet,
      decimals: 9,
      assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    });
  });

  test('getAssetWithNetwork - invalid network', () => {
    const asset = assets[0] as Asset;
    const assetUndefined = getAssetWithNetwork({ asset, networkType: 'ethereum', chainId: 0 });
    expect(assetUndefined).toBeUndefined();
  });

  test('getAssetEth', () => {
    const asset = assets[0] as Asset;
    const assetEth = getAssetEth(asset);
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    });
  });

  test('getAssetFuel', () => {
    const asset = assets[0] as Asset;
    const assetFuel = getAssetFuel(asset);

    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.testnet,
      decimals: 9,
      assetId: '0xf8f8b6283d7fa5b672b530cbb84fcccb4ff8dc40f8176ef4544ddb1f1952ad07',
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    });
  });
});
