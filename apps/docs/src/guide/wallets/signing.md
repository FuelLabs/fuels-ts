# Signing

Once you've instantiated your wallet in an unlocked state using one of the previously discussed methods, you can sign a message with `wallet.sign_message`. Below is a full example of how to sign and recover a message.

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#wallet-message-signing{ts:line-numbers}

You can also sign a _transaction_ by using `wallet.sign_transaction`. Below is a full example of how to sign and recover a transaction.

<<< @/../../../packages/wallet/src/wallet-unlocked.test.ts#wallet-transaction-signing{ts:line-numbers}
