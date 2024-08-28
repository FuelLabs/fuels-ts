# Transaction Response

Once a transaction has been submitted, you may want to extract information regarding the result of the transaction. The SDK offers a `TransactionResponse` class with helper methods to expose the following information:

- The transaction ID
- The status (submitted, success, squeezed out, or failure)
- Receipts (return data, logs, mints/burns, transfers and panic/reverts)
- Gas fees and usages
- Date and time of the transaction
- The block the transaction was included in

Firstly, we can extract this information from the result of a submitted transaction:

<<< @/../../docs-snippets/src/guide/transactions/transaction-response.test.ts#transaction-response-1{ts:line-numbers}

We can also use the result of a transaction request to extract a transaction summary:

<<< @/../../docs-snippets/src/guide/transactions/transaction-response.test.ts#transaction-response-2{ts:line-numbers}

Or we can build a transaction summary from a stored transaction ID:

<<< @/../../docs-snippets/src/guide/transactions/transaction-response.test.ts#transaction-response-3{ts:line-numbers}
