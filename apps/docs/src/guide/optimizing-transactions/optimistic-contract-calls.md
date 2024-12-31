# Optimistic Contract Calls

Imagine we have an application that allows a user to interact with a counter contract.

On the frontend, we'd have a button that would allow the user to submit a transaction that increments a counter.

```tsx
<Button onClick={onIncrementPressed}>Increment</Button>
```

This would likely have the following handler function:

<<< @./snippets/optimistic-contract-calls-before.ts#main{ts:line-numbers}

Under the hood, `call` is making multiple calls to the network to both simulate and fund the transaction, then submitting it. This may give the appearance of slowness for users interacting with your application.

This process can be optimized by optimistically building the contract transaction on page load, like so:

<<< @./snippets/optimistic-contract-calls-after.ts#main{ts:line-numbers}

> [!NOTE]
> Any change to the underlying transaction will require re-estimation and re-funding of the transaction. Otherwise the transaction could increase in size and therefore cost, causing the transaction to fail.
