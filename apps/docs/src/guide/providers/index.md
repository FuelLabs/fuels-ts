# Providers

An instance of the [`Provider`](../../api/Account/Provider.md) class lets you connect to a Fuel node. It provides read-only access to the blockchain state. You can use this provider as-is or through a [`Wallet`](../../api/Account/Wallet.md) instance.

<<< @/../../../packages/account/src/providers/provider.test.ts#provider-definition{ts:line-numbers}

You can also provide options to the `Provider`:

<<< @/../../docs-snippets/src/guide/provider/provider.test.ts#provider-options{ts:line-numbers}

## Predefined constants

We export predefined constants that can be used with the `Provider` class.

### `FUEL_NETWORK_URL`

The URL of either a user-defined environmental variable `FUEL_NETWORK_URL` (via process) or the default local node URL.

<<< @/../../../packages/account/src/configs.ts#FUEL_NETWORK_URL{ts:line-numbers}
