
describe('assets', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should have assets with the icon resolved', async () => {
    const { assets } = await import('./assets');

    expect(assets).toEqual([
      expect.objectContaining({
        'icon': './eth.svg',
      })
    ])
  })

  describe('with `ASSETS_BASE_URL`', () => {
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
