# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

<<< @/../../docs-snippets2/src/wallets/access.ts#wallets{ts:line-numbers}

Alternatively, you can create a wallet from a Private Key:

<<< @/../../docs-snippets/src/guide/wallets/private-keys.test.ts#wallet-from-private-key{ts:line-numbers}

You can obtain an address to a private key using the `Signer` package

<<< @/../../docs-snippets/src/guide/wallets/private-keys.test.ts#signer-address{ts:line-numbers}
