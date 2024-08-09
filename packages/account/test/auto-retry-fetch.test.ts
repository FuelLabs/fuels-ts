import * as autoRetryFetchMod from '../src/providers/utils/auto-retry-fetch';
import type { RetryOptions } from '../src/providers/utils/auto-retry-fetch';
import { setupTestProviderAndWallets } from '../src/test-utils';

/**
 * @group node
 */
describe('Provider correctly', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Provider should always wrap `fetchFn`', async () => {
    const autoRetryFetchFn = vi.spyOn(autoRetryFetchMod, 'autoRetryFetch');

    const retryOptions: RetryOptions = {
      maxRetries: 5,
      baseDelay: 100,
      backoff: 'exponential',
    };

    using launched = await setupTestProviderAndWallets({
      providerOptions: {
        retryOptions,
      },
    });
    const { provider } = launched;

    expect(provider).toBeTruthy();
    expect(autoRetryFetchFn).toHaveBeenCalledTimes(1);
  });
});
