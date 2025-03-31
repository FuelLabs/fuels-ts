# AssembleTx Migrating Guide

The old methods of estimating and funding transaction were deprecated in favor of a more robust `provider.assembleTx`. This guide will help you migrate your code to use the new method.

## Migrating From `getTransactionCost` and `fund`

### Old Approach (Deprecated)

<<< @./snippets/assemble-tx/get-cost-and-fund-old.ts#get-cost-and-fund-old{ts:line-numbers}

### New Approach

<<< @./snippets/assemble-tx/get-cost-and-fund-new.ts#get-cost-and-fund-new{ts:line-numbers}

### More Complex Transactions

Consider the following Sway script

<<< @/../../docs/sway/script-transfer-to-contract/src/main.sw#custom-transactions-1{rust:line-numbers}

This script will transfer 2 assets amount to the same contract address.

### Old Approach (Deprecated)

<<< @./snippets/assemble-tx/get-cost-and-fund-contract-call-old.ts#get-cost-and-fund-contract-call-old{ts:line-numbers}

### New Approach

<<< @./snippets/assemble-tx/get-cost-and-fund-contract-call-new.ts#get-cost-and-fund-contract-call-new{ts:line-numbers}

## Migrating from `estimateAndFund`

### Old Code

<<< @./snippets/assemble-tx/estimate-and-fund-old.ts#estimate-and-fund-old{ts:line-numbers}

### New Code

<<< @./snippets/assemble-tx/estimate-and-fund-new.ts#estimate-and-fund-new{ts:line-numbers}

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
