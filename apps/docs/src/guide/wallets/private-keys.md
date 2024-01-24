# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#wallets{ts:line-numbers}

Alternatively, you can create a wallet from a Private Key:

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#wallet-from-private-key{ts:line-numbers}

You can obtain an address to a private key using the `Signer` package

<<< @/../../docs-snippets/src/guide/wallets/wallet-examples.test.ts#signer-address{ts:line-numbers}
