/**
 * @group node
 * @group browser
 */
describe('assets', () => {
  it('should have rawAssets without the icon resolved', async () => {
    const { rawAssets } = await import('./assets');

    expect(rawAssets).toEqual([
      expect.objectContaining({
        'icon': 'eth.svg',
      })
    ])
  });

  it('should have assets with the icon resolved', async () => {
    const { assets } = await import('./assets');

    expect(assets).toEqual([
      expect.objectContaining({
        'icon': 'https://cdn.fuel.network/assets/eth.svg',
      })
    ])
  });
})
