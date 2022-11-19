# Signing

Once you've instantiated your wallet in an unlocked state using one of the previously discussed methods, you can sign a message with `wallet.sign_message`. Below is a full example of how to sign and recover a message.

[@code:typescript](./packages/fuel-gauge/src/doc-types.test.ts#typedoc:wallet-message-signing)

You can also sign a _transaction_ by using `wallet.sign_transaction`. Below is a full example of how to sign and recover a transaction.

[@code:typescript](./packages/wallet/src/wallet-unlocked.test.ts#typedoc:wallet-transaction-signing)
