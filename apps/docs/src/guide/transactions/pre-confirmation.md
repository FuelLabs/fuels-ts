# Preconfirmation

## What is Preconfirmation?

**Preconfirmation** is an intermediate transaction status that occurs after a transaction has been **submitted** and **accepted** by the blockchain, but **before** it is fully **processed and included** in a new block.

At this stage, the transaction is pre-executed and assigned one of two possible outcomes:

- **PreconfirmationSuccess**:
  The transaction is expected to be successfully included in a future block.

- **PreconfirmationFailure**:
  The transaction will **not** be included in any future block.

## Why is Preconfirmation Important?

Preconfirmation allows applications to **react earlier** by providing immediate feedback about a transaction's expected outcome — without waiting for full block finalization.

Additionally, preconfirmation exposes **processed outputs** (such as `OutputChange` and `OutputVariable`) that can be **immediately reused** in new transactions.

## Available Outputs at Preconfirmation

When a transaction reaches **preconfirmation**, certain **resolved outputs** become available:

- **OutputChange**:
  Represents the change UTXO generated from unspent inputs, grouped by `assetId` (one per asset).

- **OutputVariable**:
  Similar to `OutputCoin`, but only created if the transaction succeeds.

These outputs can be:

- Extracted directly from the preconfirmation response.
- **Used immediately** to fund new transactions, without waiting for block confirmation.

This significantly improves the ability to build transaction sequences or reactive transaction flows.

The resolved outputs interface structure:

<<< @/../../../packages/account/src/providers/transaction-summary/types.ts#resolved-output-type{ts:line-numbers}

## Example Workflow

Suppose you send a transaction that will send funds to another wallet.
As soon as you receive a **PreconfirmationSuccess**, you can:

- Use the `OutputChange` in a new transaction.
- Submit the next transaction **without waiting** for block finalization.

This reduces wait times and accelerates transaction chaining.

## Code Examples

### Using Preconfirmation when Submitting a Transfer

<<< @./snippets/pre-confirmation/send-transaction.ts#pre-confirmation-send-transaction-1{ts:line-numbers}

### Using Preconfirmation with a Contract Call

<<< @./snippets/pre-confirmation/contract-call.ts#pre-confirmation-contract-call-1{ts:line-numbers}
