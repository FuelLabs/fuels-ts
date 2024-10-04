/**
 * @group node
 * @group browser
 */
describe('assets', async () => {
  const { rawAssets, assets } = (await import('./assets'));

  it.each(rawAssets)('$symbol should have icon not resolved to URL', ({ icon }) => {
    expect(icon).not.toContain('/');
  });

  it.each(assets)('$symbol should have icon resolved to URL', async ({ icon }) => {
    expect(icon).toContain('https://cdn.fuel.network/assets');
  });
});
