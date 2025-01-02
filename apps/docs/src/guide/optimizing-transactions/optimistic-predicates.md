# Optimistic Predicates

Imagine we have an application that allows a user to transfer funds to another user given a validated predicate condition, here we'll use a pin number.

```tsx
<Input
  placeholder="Enter PIN number"
  value={pin}
  onChange={(e) => setPin(e.target.value)}
/>
<Input
  placeholder="Enter recipient address"
  value={recipientAddress}
  onChange={(e) => setRecipientAddress(e.target.value)}
/>
<Button onClick={() => onTransferPressed(pin, recipientAddress)}>Transfer</Button>
```

This would likely have the following handler function:

<<< @./snippets/optimistic-predicates-before.ts#main{ts:line-numbers}

Under the hood, the `transfer` call is making multiple calls to the network to both simulate and fund the transaction, then submitting it. This may give the appearance of slowness for users interacting with your application.

This process can be optimized by optimistically building the transaction on page load, like so:

<<< @./snippets/optimistic-predicates-after.ts#main{ts:line-numbers}

> [!NOTE]
> Any change to the underlying transaction will require re-estimation and re-funding of the transaction. Otherwise the transaction could increase in size and therefore cost, causing the transaction to fail.
>
> For predicates, the data passed to validate it could potentially alter the amount of gas the predicate consumes. This may mean we need to re-estimate and re-fund the transaction.
