import { DEVNET_NETWORK_URL, TESTNET_NETWORK_URL } from '@internal/utils';

/**
 * @group node
 * @group browser
 */
describe('Configs', () => {
  it('exports DEVNET_NETWORK_URL', async () => {
    const configs = await import('./configs');
    expect(configs.DEVNET_NETWORK_URL).toBe(DEVNET_NETWORK_URL);
  });

  it('exports TESTNET_NETWORK_URL', async () => {
    const configs = await import('./configs');
    expect(configs.TESTNET_NETWORK_URL).toBe(TESTNET_NETWORK_URL);
  });
});
