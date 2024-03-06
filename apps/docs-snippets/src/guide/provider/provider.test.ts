import { FUEL_NETWORK_URL, Provider, sleep } from 'fuels';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

/**
 * @group node
 * @group browser
 */
describe('Provider', () => {
  it('can be given options', async () => {
    // #region provider-options
    await Provider.create(FUEL_NETWORK_URL, {
      fetch: async (url: string, requestInit: RequestInit | undefined) => {
        // do something
        await sleep(100);
        return fetch(url, requestInit);
      },
      timeout: 2000,
      cacheUtxo: 1500,
      requestMiddleware: async (request: RequestInit) => {
        const credentials = await fetchSomeExternalCredentials();
        request.headers ??= {};
        (request.headers as Record<string, string>).Authorization = credentials;

        return request;
      },
      retryOptions: {
        maxRetries: 5,
        baseDelay: 100,
        backoff: 'exponential',
      },
    });
    // #endregion provider-options
  });
});
