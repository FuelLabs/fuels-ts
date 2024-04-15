# Provider Options

You can provide various [options](../../api/Account/index.md#provideroptions) on `Provider` instantiation to modify its behavior.

### `retryOptions`

Calls to a fuel node via the `Provider` will fail if a connection cannot be established.
Specifying retry options allows you to customize the way you want to handle that failure scenario before ultimately throwing an error.

_NOTE: retrying is only done when a connection cannot be established. If the connection is established and the node throws an error, no retry will happen._

You can provide the following settings:

- `maxRetries` - Amount of attempts to retry after initial attempt before failing the call.
- `backoff` - Strategy used to define the intervals between attempts.
  - `exponential` _(default)_: Doubles the delay with each attempt.
  - `linear` - Increases the delay linearly with each attempt.
  - `fixed`: Uses a constant delay between attempts.
- `baseDelay` _(default 150ms)_ - Base time in milliseconds for the backoff strategy.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#options-retryOptions{ts:line-numbers}

### `requestMiddleware`

Allows you to modify the request object to add additional headers, modify the request's body, and much more.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#options-requestMiddleware{ts:line-numbers}

### `timeout`

Specify the timeout in milliseconds after which every request will be aborted.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#options-timeout{ts:line-numbers}

### `fetch`

Provide a custom `fetch` function that'll replace the default fetch call.

_Note: If defined, `requestMiddleware`, `timeout` and `retryOptions` are applied to this custom `fetch` function as well._

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#options-fetch{ts:line-numbers}
