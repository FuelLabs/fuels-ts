# Signing

## Signing Messages

Signing messages with a wallet is a fundamental security practice in a blockchain environment. It verifies ownership and ensures the integrity of data. Here's how to use the `wallet.signMessage` method to sign messages:

<<< @./snippets/signing/sign-message.ts#signing-1{ts:line-numbers}

The `wallet.signMessage` method internally hashes the message using the SHA-256 algorithm, then signs the hashed message, returning the signature as a hex string.

The `hashMessage` helper gives us the hash of the original message. This is crucial to ensure that the hash used during signing matches the one used during the address recovery process.

The `recoverAddress` method from the `Signer` class takes the hashed message and the signature to recover the signer's address. This confirms that the signature was created by the holder of the private key associated with that address, ensuring the authenticity and integrity of the signed message.

## Signing Transactions

Signing a transaction involves using your wallet to sign the transaction ID (also known as [transaction hash](https://docs.fuel.network/docs/specs/identifiers/transaction-id/)) to authorize the use of your resources. Here's how it works:

1. `Generate a Signature`: Using the wallet to create a signature based on the transaction ID.

2. `Using the Signature on the transaction`: Place the signature in the transaction's `witnesses` array. Each Coin / Message input should have a matching `witnessIndex`. This index indicates your signature's location within the `witnesses` array.

3. `Security Mechanism`: The transaction ID is derived from the transaction bytes (excluding the `witnesses`). If the transaction changes, the ID changes, making any previous signatures invalid. This ensures no unauthorized changes can be made after signing.

The following code snippet exemplifies how a Transaction can be signed:

<<< @./snippets/signing/sign-transaction.ts#signing-2{ts:line-numbers}

Similar to the sign message example, the previous code used `Signer.recoverAddress` to get the wallet's address from the transaction ID and the signed data.

When using your wallet to submit a transaction with `wallet.sendTransaction()`, the SDK already handles these steps related to signing the transaction and adding the signature to the `witnesses` array. Because of that, you can skip this in most cases:

<<< @./snippets/signing/fund-transaction.ts#signing-3{ts:line-numbers}
