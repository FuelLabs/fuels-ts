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

### `cacheUtxo`

When using the SDK, it may be necessary to submit multiple transactions from the same account in a short period. In such cases, the SDK creates and funds these transactions, then submits them to the node.

However, if a second transaction is created before the first one is processed, there is a chance of using the same UTXO(s) for both transactions. This happens because the UTXO(s) used in the first transaction are still unspent until the transaction is fully processed.

If the second transaction attempts to use the same UTXO(s) that the first transaction has already spent, it will result in the following error:

```console
Transaction is not inserted. UTXO does not exist: 0xf5...
```

This error indicates that the UTXO(s) used by the second transaction no longer exist, as the first transaction already spent them.

To prevent this issue, the SDK sets a default cache for UTXO(s) to 20 seconds. This default caching mechanism ensures that UTXO(s) used in a submitted transaction are not reused in subsequent transactions within the specified time. You can control the duration of this cache using the `cacheUtxo` flag. If you would like to disable caching, you can pass a value of `-1` to the `cacheUtxo` parameter.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#options-cache-utxo{ts:line-numbers}

**Note:**

If you would like to submit multiple transactions without waiting for each transaction to be completed, your account must have multiple UTXOs available. If you only have one UTXO, the first transaction will spend it, and any remaining amount will be converted into a new UTXO with a different ID.

By ensuring your account has multiple UTXOs, you can effectively use the `cacheUtxo` flag to manage transactions without conflicts. For more information on UTXOs, refer to the [UTXOs guide](../the-utxo-model/index.md).
