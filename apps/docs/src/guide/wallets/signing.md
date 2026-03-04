# Signing

## Signing Messages

Signing messages with a wallet is a fundamental security practice in a blockchain environment. It can be used to verify ownership and ensure the integrity of data.

Here's how to use the `wallet.signMessage` method to sign messages (as string):

<<< @./snippets/signing/sign-message.ts#signing-1{ts:line-numbers}

The `signMessage` method internally:

- Hashes the message (via `hashMessage`)
- Signs the hashed message using the wallet's private key
- Returns the signature as a hex string

The `hashMessage` helper will:

- Performs a SHA-256 hash on the UTF-8 encoded message.

The `recoverAddress` method from the `Signer` class will take the hashed message and the signature to recover the signer's address. This confirms that the signature was created by the holder of the private key associated with that address, ensuring the authenticity and integrity of the signed message.

## Signing Personal Message

We can also sign arbitrary data, not just strings. This is possible by passing an object containing the `personalSign` property to the `hashMessage` and `signMessage` methods:

<<< @./snippets/signing/sign-personal-message.ts#signing-personal-message{ts:line-numbers}

The primary difference between this [personal message signing](#signing-personal-message) and [message signing](#signing-messages) is the underlying hashing format.

To format the message, we use a similar approach to a [EIP-191](https://eips.ethereum.org/EIPS/eip-191):

```console
\x19Fuel Signed Message:\n<message length><message>
```

> **Note**: We still hash using `SHA-256`, unlike Ethereum's [EIP-191](https://eips.ethereum.org/EIPS/eip-191) which uses `Keccak-256`.

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
