# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

<<< @./snippets/access.ts#wallets{ts:line-numbers}

Alternatively, you can create a wallet from a Private Key:

<<< @./snippets/instantiating/from-wallet.ts#wallet-from-private-key{ts:line-numbers}

You can obtain an address to a private key using the `Signer` package

<<< @./snippets/instantiating/signer.ts#signer-address{ts:line-numbers}
