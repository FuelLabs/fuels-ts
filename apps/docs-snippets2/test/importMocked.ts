import { launchTestNode } from 'fuels/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest';

export const mockLocalNetworkWithTestNode = async () => {
  const { provider } = await launchTestNode();
  vi.doMock('fuels', async () => {
    const mod = await vi.importActual('fuels');
    return {
      __esModule: true,
      ...mod,
      LOCAL_NETWORK_URL: provider.url,
    };
  });
  return { provider };
};
