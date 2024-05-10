import { Asset } from '../types'
import { getAssetEth, getAssetFuel, getAssetWithNetwork, getDefaultChainId } from '../utils/network';
import { CHAIN_IDS } from '../../chains'
import { assets } from '../assets';

/**
 * @group node
 */
describe('Network Utils', () => {
  test('getDefaultChainId', async () => {
    expect(getDefaultChainId('ethereum')).toBe(11155111);
    expect(getDefaultChainId('fuel')).toBe(CHAIN_IDS.fuel.devnet);
  })

  test('getAssetWithNetwork - Ethereum', async () => {
    const asset = assets[0] as Asset
    const assetEth = getAssetWithNetwork({ asset, networkType: 'ethereum', chainId: CHAIN_IDS.eth.sepolia })
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH'
    })
  })

  test('getAssetWithNetwork - Fuel', async () => {
    const asset = assets[0] as Asset
    const assetFuel = getAssetWithNetwork({ asset, networkType: 'fuel', chainId: CHAIN_IDS.fuel.devnet })
    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.devnet,
      decimals: 9,
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH'
    })
  })

  test('getAssetWithNetwork - invalid network', async () => {
    const asset = assets[0] as Asset
    const assetUndefined = getAssetWithNetwork({ asset, networkType: 'ethereum', chainId: 0 })
    expect(assetUndefined).toBeUndefined()
  })

  test('getAssetEth', async () => {
    const asset = assets[0] as Asset
    const assetEth = getAssetEth(asset)
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    })
  })

  test('getAssetFuel', async () => {
    const asset = assets[0] as Asset
    const assetFuel = getAssetFuel(asset)

    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.devnet,
      decimals: 9,
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      icon: 'https://cdn.fuel.network/assets/eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    })
  })
})
