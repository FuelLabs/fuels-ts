# Retrying calls

The default behavior of calls done via the `Provider` towards a fuel node is that they'll fail if the connection breaks. Specifying retry options allows you to customize how many additional attempts you want to make when the connection to the node breaks before ultimately throwing an error. You can also specify the backoff algorithm as well as the base duration that algorithm will use to calculate the wait time for each request.

<<< @/../../../packages/providers/test/retry.test.ts#provider-retry-options{ts:line-numbers}
