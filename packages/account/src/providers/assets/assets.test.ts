/**
 * @group node
 * @group browser
 */
describe('assets', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  describe('with default `ASSETS_BASE_URL`', () => {
    it('should have assets with the icon resolved', async () => {
      const { assets } = await import('./assets');
  
      expect(assets).toEqual([
        expect.objectContaining({
          'icon': 'https://cdn.fuel.network/assets/eth.svg',
        })
      ])
    });
  })

  describe('with custom `ASSETS_BASE_URL`', () => {
    beforeAll(() => {
      vi.stubEnv('ASSETS_BASE_URL', 'https://some-url.com/');
    })

    it('should have assets with the icon resolved', async () => {
      const { assets } = await import('./assets');

      expect(assets).toEqual([
        expect.objectContaining({
          'icon': 'https://some-url.com/eth.svg',
        })
      ])
    })
  })
})
