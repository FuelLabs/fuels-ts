import { Asset } from '../types'
import { getAssetEth, getAssetFuel, getAssetNetwork, getAssetWithNetwork, getDefaultChainId } from '../utils/network';
import { assets } from '../index'
import { CHAIN_IDS } from '../../chains'

/**
 * @group node
 */
describe('Network Utils', () => {
  test('getDefaultChainId', async () => {
    expect(getDefaultChainId('ethereum')).toBe(11155111);
    expect(getDefaultChainId('fuel')).toBe(0);
  })

  test('getAssetWithNetwork - Ethereum', async () => {
    const asset = assets[0] as Asset
    const assetEth = getAssetNetwork({ asset, networkType: 'ethereum', chainId: CHAIN_IDS.eth.sepolia })
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
    })
  })

  test('getAssetWithNetwork - Fuel', async () => {
    const asset = assets[0] as Asset
    const assetFuel = getAssetNetwork({ asset, networkType: 'fuel', chainId: CHAIN_IDS.fuel.beta5 })
    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.beta5,
      decimals: 9,
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
    })
  })

  test('getAssetWithNetwork - invalid network', async () => {
    const asset = assets[0] as Asset
    const assetUndefined = getAssetNetwork({ asset, networkType: 'ethereum', chainId: 0 })
    expect(assetUndefined).toBeUndefined()
  })

  test('getAssetEth', async () => {
    const asset = assets[0] as Asset
    const assetEth = getAssetEth(asset)
    expect(assetEth).toEqual({
      type: 'ethereum',
      chainId: CHAIN_IDS.eth.sepolia,
      decimals: 18,
      icon: 'eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    })
  })

  test('getAssetFuel', async () => {
    const asset = assets[0] as Asset
    const assetFuel = getAssetFuel(asset)
    
    expect(assetFuel).toEqual({
      type: 'fuel',
      chainId: CHAIN_IDS.fuel.beta5,
      decimals: 9,
      assetId: '0x0000000000000000000000000000000000000000000000000000000000000000',
      icon: 'eth.svg',
      name: 'Ethereum',
      symbol: 'ETH',
    })
  })
})