# AssembleTx Migrating Guide

The old methods of estimating and funding transaction were deprecated in favor of a more robust `provider.assembleTx`. This guide will help you migrate your code to use the new method.

## Migrating From `getTransactionCost` and `fund`

### Old Approach (Deprecated)

<<< @./snippets/assemble-tx/get-cost-and-fund-1.ts#get-cost-and-fund-1{ts:line-numbers}

### New Approach

<<< @./snippets/assemble-tx/assemble-tx-3.ts#assemble-tx-3{ts:line-numbers}

### More Complex Transactions

Consider the following Sway script

<<< @/../../docs/sway/script-transfer-to-contract/src/main.sw#custom-transactions-1{rust:line-numbers}

This script transfers two asset amounts to the same contract address. To ensure the transaction succeeds, it must be properly funded with the required amounts. This means we need to explicitly define how the transaction should be funded.

### Old Approach (Deprecated)

<<< @./snippets/assemble-tx/get-cost-and-fund-2.ts#get-cost-and-fund-2{ts:line-numbers}

### New Approach

<<< @./snippets/assemble-tx/assemble-tx-4.ts#assemble-tx-4{ts:line-numbers}

By specifying which parameters `assembleTx` should use, we gain control over how the script call is estimated and funded.

## Migrating from `estimateAndFund`

### Old Code

<<< @./snippets/assemble-tx/estimate-and-fund-2.ts#estimate-and-fund-2{ts:line-numbers}

### New Code

<<< @./snippets/assemble-tx/assemble-tx-2.ts#assemble-tx-2{ts:line-numbers}

### Key Differences

1. **More Explicit Control**: `assembleTx` provides clearer control over which account pays fees and which accounts provide resources.

2. **Better Resource Management**: The new method allows you to specify exactly which accounts should provide which quantities of assets.

3. **Controlling Change Output**: When informing each account coin quantity you have control over determining who is going to receive a the change for that specific asset ID.

## Notes

- The methods `getTransactionCost` and `estimateAndFund` are deprecated and are going to be removed on futures updates
- The new method provides more predictable transaction assembly

## Additional Options

The new `assembleTx` method provides several additional options:

<<< @/../../../packages/account/src/providers/provider.ts#assemble-tx-params{ts:line-numbers}

You can read more about the `assembleTx` [here](./index.md).
