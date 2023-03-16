# Creating a wallet from a private key

A new wallet with a randomly generated private key can be created by supplying `Wallet.generate`.

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallets{ts:line-numbers}

Alternatively, you can create a wallet from a Private Key:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#wallet-from-private-key{ts:line-numbers}

You can obtain an address to a private key using the `Signer` package

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#signer-address{ts:line-numbers}
