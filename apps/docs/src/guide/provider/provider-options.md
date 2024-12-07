# Provider Options

You can provide various [options](https://fuels-ts-docs-api.vercel.app/modules/_fuel_ts_account.html#provideroptions) on `Provider` instantiation to modify its behavior.

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

<<< @./snippets/provider-options.ts#retryOptions{ts:line-numbers}

### `requestMiddleware`

Allows you to modify the request object to add additional headers, modify the request's body, and much more.

<<< @./snippets/provider-options.ts#requestMiddleware{ts:line-numbers}

### `timeout`

Specify the timeout in milliseconds after which every request will be aborted.

<<< @./snippets/provider-options.ts#timeout{ts:line-numbers}

### `fetch`

Provide a custom `fetch` function that'll replace the default fetch call.

_Note: If defined, `requestMiddleware`, `timeout` and `retryOptions` are applied to this custom `fetch` function as well._

<<< @./snippets/provider-options.ts#fetch{ts:line-numbers}

### `resourceCacheTTL`

When using the SDK, it may be necessary to submit multiple transactions from the same account in a short period. In such cases, the SDK creates and funds these transactions, then submits them to the node.

However, if a second transaction is created before the first one is processed, there is a chance of using the same resources (UTXOs or Messages) for both transactions. This happens because the resources used in the first transaction are still unspent until the transaction is fully processed.

If the second transaction attempts to use the same resources that the first transaction has already spent, it will result in one of the following error:

```console
Transaction is not inserted. Hash is already known

Transaction is not inserted. UTXO does not exist: {{utxoID}}

Transaction is not inserted. A higher priced tx {{txID}} is already spending this message: {{messageNonce}}
```

This error indicates that the resources used by the second transaction no longer exist, as the first transaction already spent them.

To prevent this issue, the SDK sets a default cache for resources to 20 seconds. This default caching mechanism ensures that resources used in a submitted transaction are not reused in subsequent transactions within the specified time. You can control the duration of this cache using the `resourceCacheTTL` flag. If you would like to disable caching, you can pass a value of `-1` to the `resourceCacheTTL` parameter.

<<< @./snippets/provider-options.ts#cache-utxo{ts:line-numbers}

**Note:**

If you would like to submit multiple transactions without waiting for each transaction to be completed, your account must have multiple UTXOs available. If you only have one UTXO, the first transaction will spend it, and any remaining amount will be converted into a new UTXO with a different ID.

By ensuring your account has multiple UTXOs, you can effectively use the `resourceCacheTTL` flag to manage transactions without conflicts. For more information on UTXOs, refer to the [UTXOs guide](../the-utxo-model/index.md).

### `resourceCacheStrategy`

When submitting transactions via the `Provider`, you may want to have caching enabled to prevent reuse of consumed resources. By default, the provider uses a _global_ caching strategy, which means that the cache is shared across all `Provider` instances within the same dApp.

This may not be ideal in all cases, such as if you are using multiple Providers and you would like to have different TTLs for each of them. In such cases, you may want to use an _instance-specific_ cache strategy, which means that each `Provider` instance will have its own cache.

> **Note:** Using an instance-specific cache strategy will require you to manually manage the cache, for each instance so use this strategy with caution.
