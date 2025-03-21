# Assembling Transactions

The `assembleTx` method is a crucial part of the Fuel TypeScript SDK that helps prepare and assemble transactions with the correct inputs, outputs, and policies. This guide will explain how to use this method effectively.

## Overview

The `assembleTx` method takes a transaction request and assembles it with the necessary inputs, outputs, and policies based on the provided parameters. It handles:

- Coin quantity for different assets
- Fee payer account
- Gas and fee estimation
- Predicate estimation
- Resource exclusion (specific resources to ignore)

## Parameters

The `AssembleTxParams` interface includes the following parameters:

<<< @/../../../packages/account/src/providers/provider.ts#assemble-tx-params{ts:line-numbers}

### Parameter Details

- `request`: The transaction request to be assembled.
- `blockHorizon`: The number of blocks to look ahead for gas price estimation. Defaults to `10` blocks.
- `feePayerAccount`: The account that will pay for the transaction fees
- `accountCoinQuantities`: An array of coin quantities required for the transaction, specifying:
  - `amount`: The amount of coins needed
  - `assetId`: The asset ID of the coins
  - `account`: The account providing the coins (optional, defaults to `feePayerAccount`)
  - `changeOutputAccount`: The account to receive change (optional, defaults to the account property)
- `excludeInput`: Resources to exclude when funding the transaction (UTXOs or messages)
- `estimatePredicates`: Whether to estimate gas for predicates
- `reserveGas`: Additional Amount of gas to be set for the transaction

### Default Behaviors for Account Properties

The `accountCoinQuantities` entries have two optional properties with specific default behaviors:

1. `account` property:

   - If not provided, defaults to the root `feePayerAccount`
   - Used to specify which account provides the resources for the transaction

2. `changeOutputAccount` property:
   - If not provided, defaults to the `account` property
   - Used to specify which account receives the change from all spent resources from a specific `assetId`

Example of default behaviors:

<<< @./snippets/default-behaviors.ts#assemble-tx-default-behaviors{ts:line-numbers}

## Return Value

The method returns an object containing:

- `assembledRequest`: The fully assembled transaction request with all necessary inputs, outputs, and policies
- `gasPrice`: The estimated gas price for the transaction
- `receipts`: The transaction receipts from the dry run

## Usage Example

<<< @./snippets/basic-usage.ts#assemble-tx-basic-usage{ts:line-numbers}

## Error Handling

The method may throw the following error:

### CHANGE_OUTPUT_COLLISION

This error occurs when there's a conflict between the change output specified in the transaction request and the one specified in the `assembleTx` parameters. Specifically, it happens when:

1. The transaction request already has a change output set for a specific asset ID and address
2. The `assembleTx` parameters specify a different change output for the same asset ID

Here's an example that demonstrates this error:

<<< @./snippets/change-output-collision.ts#change-output-collision{ts:line-numbers}

In this example, the error occurs because:

1. The transaction request has a change output to `accountB` for the `baseAssetId`
2. The `accountCoinQuantities` specifies a change output to `accountA` for the same `baseAssetId`

## Best Practices

1. Always provide the correct `feePayerAccount` that has sufficient funds for the transaction fees
2. Pay special attention to change outputs when dealing with multiple accounts and the same asset ID:
   - In Fuel, only one change output is allowed per asset ID
   - If a transaction includes resources from the same asset ID for multiple accounts, only one account will receive the change from all spent resources
   - Make sure to coordinate with all parties involved to determine which account should receive the change output

## Notes

- The method automatically handles base asset requirements for fees
- It performs a dry run to validate the transaction before returning
- The assembled transaction will include all necessary inputs and outputs based on the provided coin quantities
- Gas and fee estimation is performed using the specified block horizon
