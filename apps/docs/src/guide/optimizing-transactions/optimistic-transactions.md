# Optimistic Transactions

Imagine we have an application that allows users to transfer funds between accounts.

On the frontend, we'd have a button that would allow the user to submit a transfer to a specified address.

```tsx
<Input
  placeholder="Enter recipient address"
  value={recipientAddress}
  onChange={(e) => setRecipientAddress(e.target.value)}
/>
<Button onClick={() => onTransferPressed(recipientAddress)}>Transfer</Button>
```

This would likely have the following handler function:

<<< @./snippets/optimistic-transactions-before.ts#main{ts:line-numbers}

Under the hood, the `transfer` call is making multiple calls to the network to both simulate and fund the transaction, then submitting it. This may give the appearance of slowness for users interacting with your application.

This process can be optimized by optimistically building the transaction on page load, like so:

<<< @./snippets/optimistic-transactions-after.ts#main{ts:line-numbers}

> [!NOTE]
> Any change to the underlying transaction will require re-estimation and re-funding of the transaction. Otherwise the transaction could increase in size and therefore cost, causing the transaction to fail.
