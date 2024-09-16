/**
 * @group node
 * @group browser
 */
describe('Configs', () => {
  it('exports DEVNET_NETWORK_URL', async () => {
    const configs = await import('./configs');
    expect(configs.DEVNET_NETWORK_URL).toBe('https://devnet.fuel.network/v1/graphql');
  });

  it('exports TESTNET_NETWORK_URL', async () => {
    const configs = await import('./configs');
    expect(configs.TESTNET_NETWORK_URL).toBe('https://testnet.fuel.network/v1/graphql');
  });
});
