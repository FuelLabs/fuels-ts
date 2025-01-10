# Optimizing Frontend Apps

Your application must perform a series of operations to estimate, submit and receive the result of a transaction. However, the flow in which it performs these actions can be organized or performed optimistically in order to optimize the perceived speed of transactions for your users.

In a frontend application, imagine we have a button that executes a contract call:

> **Note:** This is a generic and framework agnostic example, for a React snippet check out the [React Advanced Example](/guide/getting-started/react-example#advanced-example).

```tsx
<Button onClick={handleSubmit}>Submit</Button>
```

The handler would be implemented as follows:

<<< @./snippets/transaction-speed/transaction-speed-init.ts#main{ts:line-numbers}

Once the user presses the button, the contract call is executed and the transaction is estimated, funded, submitted and multiple calls are made to the network. With optimizations, the flow can be organized as follows:

<<< @./snippets/transaction-speed/transaction-speed-optimized.ts#main{ts:line-numbers}

Now, we have moved all the transaction preparation to happen on page load. So when the user presses the button, they only need to sign and submit the transaction. This vastly improves the perceived speed of the transaction.

> **Note:** Any changes or additions made to the transaction request after preparation, will mean that the transaction will need to be re-estimated and re-funded before it can be submitted.
