# Signing Transactions

Once you've instantiated your wallet in an unlocked state using one of the previously discussed methods, you can sign a message with `wallet.signMessage`. Below is a full example of how to sign and recover a message.

<<< @/../../docs-snippets/src/guide/wallets/signing.test.ts#wallet-message-signing{ts:line-numbers}

You can also sign a _transaction_ by using `wallet.signTransaction`. Below is a full example of how to sign and recover a transaction.

<<< @/../../../packages/account/src/wallet/wallet-unlocked.test.ts#wallet-transaction-signing{ts:line-numbers}
