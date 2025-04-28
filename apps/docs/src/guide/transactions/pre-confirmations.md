# Pre-Confirmations

## What is a Pre-Confirmation?

A **pre-confirmation** is an intermediate transaction status that occurs after a transaction has been **submitted** and **accepted** by the blockchain, but **before** it is fully **processed and included** in a new block.

At this stage, the transaction is pre-executed and assigned one of two possible statuses:

- `PreconfirmationSuccessStatus`: The transaction is expected to be successfully included in a future block.

- `PreconfirmationFailureStatus`: The transaction will **not** be included in any future block.

## Why are Pre-Confirmations important?

Pre-confirmations allow applications to **react earlier** by providing immediate feedback about a transaction's expected outcome without waiting for full block finalization.

Additionally, pre-confirmations expose **processed outputs** (such as `OutputChange` and `OutputVariable`) that can be **immediately reused** in new transactions.

## Available Outputs for Pre-Confirmations

When a transaction reaches the **pre-confirmation** stage, certain `resolvedOutputs` become available:

- `OutputChange`: Represents the change UTXO generated from unspent inputs, grouped by `assetId` (one per asset).

- `OutputVariable`: Similar to `OutputCoin`, but only created if the transaction succeeds.

These outputs can be:

- Extracted directly from the pre-confirmation response.
- **Used immediately** to fund new transactions, without waiting for block confirmation.

This significantly improves the ability to build transaction sequences or reactive transaction flows.

This is the `ResolvedOutput` interface structure:

<<< @/../../../packages/account/src/providers/transaction-summary/types.ts#resolved-output-type{ts:line-numbers}

## Example Workflow

Suppose you send a transaction that will send funds to another wallet.

As soon as you receive a `PreconfirmationSuccessStatus`, you can:

- Use the `OutputChange` in a new transaction.
- Submit the next transaction **without waiting** for block finalization.

This reduces wait times and accelerates transaction chaining.

## Code Examples

### Using Pre-Confirmations when Submitting a Transfer

The following example sends a transfer, waits for the pre-confirmation success, and then submits another transfer using the resolved outputs from the first:

<<< @./snippets/pre-confirmation/send-transaction.ts#pre-confirmation-send-transaction-1{ts:line-numbers}

### Using Pre-Confirmations with a Contract Call

This example performs a contract call, waits for pre-confirmation success, and then uses the resolved output to execute another contract call:

<<< @./snippets/pre-confirmation/contract-call.ts#pre-confirmation-contract-call-1{ts:line-numbers}
