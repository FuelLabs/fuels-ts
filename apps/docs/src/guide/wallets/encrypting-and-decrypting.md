# Encrypting and Decrypting

JSON wallets are a standardized way of storing wallets securely. They follow a specific schema and are encrypted using a password. This makes it easier to manage multiple wallets and securely store them on disk. This guide will take you through the process of encrypting and decrypting JSON wallets using the Typescript SDK.

## Encrypting a Wallet

We will be calling `encrypt` from the [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) instance which will take a password as the argument. It will encrypt the private key using a cipher and returns the JSON keystore wallet. You can then securely store this JSON wallet.

Here is an example of how you can accomplish this:

<<< @/../../docs-snippets2/src/wallets/encrypting-and-decrypting-wallets.ts#encrypting-and-decrypting-json-wallets-1{ts:line-numbers}

Please note that `encrypt` must be called within an instance of [`WalletUnlocked`](../../api/Account/WalletUnlocked.md). This instance can only be achieved through passing a private key or mnemonic phrase to a locked wallet.

## Decrypting a Wallet

To decrypt the JSON wallet and retrieve your private key, you can call `fromEncryptedJson` on a [Wallet](../../api/Account/Wallet.md) instance. It takes the encrypted JSON wallet and the password as its arguments, and returns the decrypted wallet.

Here is an example:

<<< @/../../docs-snippets2/src/wallets/encrypting-and-decrypting-wallets.ts#encrypting-and-decrypting-json-wallets-2{ts:line-numbers}

In this example, `decryptedWallet` is an instance of [`WalletUnlocked`](../../api/Account/WalletUnlocked.md) class, now available for use.

## Important

Remember to securely store your encrypted JSON wallet and password. If you lose them, there will be no way to recover your wallet. For security reasons, avoid sharing your private key, encrypted JSON wallet or password with anyone.

## Full Example

For a full example of how to encrypt and decrypt a JSON wallet, see the snippet below:

<<< @/../../docs-snippets2/src/wallets/encrypting-and-decrypting-wallets.ts#full{ts:line-numbers}
