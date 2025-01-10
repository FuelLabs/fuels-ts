# Optimizing Frontend Apps

Your application must perform a series of operations to estimate, submit and receive the result of a transaction. However, the flow in which it performs these actions can be organized or performed optimistically, increasing it's perceived speed.

## Use Case

In a frontend application, imagine we have a button that executes a contract call:

```tsx
<Button onClick={handleSubmit}>Submit</Button>
```

The handler would be implemented as follows:

<<< @./snippets/transaction-speed/transaction-speed-init.ts#main{ts:line-numbers}

Once the user clicks the button, multiple sequential calls are made to the network, which can take a while because the transaction must be:

1. Estimated
1. Funded
1. Submitted

## Optimization Strategy

With a few optimizations, the flow can be organized as follows:

<<< @./snippets/transaction-speed/transaction-speed-optimized.ts#main{ts:line-numbers}

## Conclusion

Finally, when users click the button, they only need to submit the transaction, which vastly improves the perceived speed of the transaction because many of the necessary requests were done upfront, under the hood.

Just remember:

- _After preparation, any changes made to the transaction request will require it to be re-estimated and re-funded before it can be signed and submitted._

# See Also

- Check a full example at [Optimized React Example](../cookbook/optimized-react-example.md)
