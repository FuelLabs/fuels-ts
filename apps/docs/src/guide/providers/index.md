# Providers

An instance of the [`Provider`](../../api/Account/Provider.md) class lets you connect to a Fuel node. It provides read-only access to the blockchain state. You can use this provider as-is or through a [`Wallet`](../../api/Account/Wallet.md) instance.

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#provider-definition{ts:line-numbers}

You can also provide options to the `Provider`:

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#provider-options{ts:line-numbers}
