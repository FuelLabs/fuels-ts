# Encrypting and Decrypting JSON Wallet

JSON wallets are a standardized way of storing wallets securely using encryption. They follow a specific schema and are encrypted using a password. This makes it easier to manage multiple wallets and securely store them on disk. This guide will take you through the process of encrypting and decrypting JSON wallets using the Typescript SDK.

## Encrypting a Wallet

We will be using the function `encrypt` from the `WalletUnlocked` class which will take a password as its argument. It will then encrypt the private key using a cipher, and return the resulting JSON keystore wallet. You can then securely store this JSON wallet.

Here is an example of how you can accomplish this:

<<< @/../../docs-snippets/src/guide/wallets/encrypting-and-decrypting-json-wallets.test.ts#encrypting-and-decrypting-json-wallets-1{ts:line-numbers}

Please note that the `encrypt` method must be called within an instance of a `WalletUnlocked` class. This implies that full control over the wallet is required and you must possess its private key or mnemonic phrase.

## Decrypting a Wallet

To decrypt the JSON wallet and retrieve your private key, you can use the `fromEncryptedJson` function from the `Wallet` class. It takes the encrypted JSON wallet and the password as its arguments, and returns the decrypted wallet.

Here is an example:

<<< @/../../docs-snippets/src/guide/wallets/encrypting-and-decrypting-json-wallets.test.ts#encrypting-and-decrypting-json-wallets-2{ts:line-numbers}

In this example, `decryptedWallet` is an instance of `WalletUnlocked` class, now available for use.

## Important

Remember to securely store your encrypted JSON wallet and password. If you lose them, there will be no way to recover your wallet. For security reasons, avoid sharing your private key, encrypted JSON wallet, or password with anyone.
