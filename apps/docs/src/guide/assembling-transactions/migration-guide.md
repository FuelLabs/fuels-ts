# Migrating from `estimateAndFund` to `assembleTx`

The `estimateAndFund` method on `ScriptTransactionRequest` has been deprecated in favor of the more robust `provider.assembleTx`. This guide will help you migrate your code to use the new method.

## Overview of Changes

### Old Approach (Deprecated)

<<< @./snippets/estimate-and-fund-1.ts#estimate-and-fund-1{ts:line-numbers}

### New Approach

<<< @./snippets/assemble-tx-1.ts#assemble-tx-1{ts:line-numbers}

## Key Differences

1. **More Explicit Control**: `assembleTx` provides clearer control over which account pays fees and which accounts provide resources.

2. **Better Resource Management**: The new method allows you to specify exactly which accounts should provide which quantities of assets.

## Migration Example

Here's a complete example showing how to migrate your code:

### Old Code

<<< @./snippets/estimate-and-fund-2.ts#estimate-and-fund-2{ts:line-numbers}

### New Code

<<< @./snippets/assemble-tx-2.ts#assemble-tx-2{ts:line-numbers}

## Additional Options

The new `assembleTx` method provides several additional options:

<<< @/../../../packages/account/src/providers/provider.ts#assemble-tx-params{ts:line-numbers}

You can read more about the `assembleTx` [here](./index.md).

## Notes

- The old `estimateAndFund` is deprecated and it will remove on futures updates
- The new method provides more predictable transaction assembly
