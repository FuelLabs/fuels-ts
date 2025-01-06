import { Provider } from 'fuels';

import { LOCAL_NETWORK_URL } from '../../../env';

async function fetchSomeExternalCredentials() {
  return Promise.resolve('credential');
}

function decorateResponseWithCustomLogic(response: Response) {
  return response;
}

const NETWORK_URL = LOCAL_NETWORK_URL;

// #region requestMiddleware
// synchronous request middleware
new Provider(NETWORK_URL, {
  requestMiddleware: (request: RequestInit) => {
    request.credentials = 'omit';

    return request;
  },
});

// asynchronous request middleware
new Provider(NETWORK_URL, {
  requestMiddleware: async (request: RequestInit) => {
    const credentials = await fetchSomeExternalCredentials();
    request.headers ??= {};
    (request.headers as Record<string, string>).auth = credentials;

    return request;
  },
});
// #endregion requestMiddleware

// #region timeout
new Provider(NETWORK_URL, {
  timeout: 3000, // will abort if request takes 30 seconds to complete
});
// #endregion timeout

// #region retryOptions
new Provider(NETWORK_URL, {
  retryOptions: {
    maxRetries: 5,
    baseDelay: 100,
    backoff: 'linear',
  },
});
// #endregion retryOptions

// #region fetch
new Provider(NETWORK_URL, {
  fetch: async (url: string, requestInit: RequestInit | undefined) => {
    // native fetch
    const response = await fetch(url, requestInit);

    const updatedResponse = decorateResponseWithCustomLogic(response);

    return updatedResponse;
  },
});
// #endregion fetch

// #region cache-utxo
new Provider(NETWORK_URL, {
  // Cache resources (Coin's and Message's) for 5 seconds
  resourceCacheTTL: 5000,
});
// #endregion cache-utxo
