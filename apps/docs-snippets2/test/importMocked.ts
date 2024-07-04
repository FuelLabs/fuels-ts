import type { ProviderOptions } from 'fuels';
import { Provider } from 'fuels';
import { launchTestNode } from 'fuels/test-utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest';

export const mockLocalNetworkWithTestNode = async () => {
  const { provider } = await launchTestNode();
  vi.doMock('fuels', async () => {
    const module = await vi.importActual('fuels');
    return {
      ...module,
      __esModule: true,
      Provider: {
        create: (url: string, options: ProviderOptions): Promise<Provider> => {
          const isLocalReg = /127\.0\.0\.1|localhost/;
          if (isLocalReg.test(url)) {
            return Promise.resolve(provider);
          }
          return Provider.create(url, options);
        },
      },
    };
  });
  return { provider };
};
