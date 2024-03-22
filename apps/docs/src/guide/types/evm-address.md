# `EvmAddress`

An Ethereum Virtual Machine (EVM) Address can be represented using the `EvmAddress` type. It's definition matches the Sway standard library type being a `Struct` wrapper around an inner `Bits256` value.

<<< @/../../docs-snippets/src/guide/types/evm-address.test.ts#evm-address-1{ts:line-numbers}

## Creating an EVM Address

An EVM Address only has 20 bytes therefore the first 12 bytes of the `Bits256` value are set to 0. Within the SDK, an `Address` can be instantiated and converted to a wrapped and Sway compatible EVM Address using the `toEvmAddress()` function:

<<< @/../../docs-snippets/src/guide/types/evm-address.test.ts#evm-address-2{ts:line-numbers}

## Using an EVM Address

The `EvmAddress` type can be integrated with your contract calls. Consider the following contract that can compare and return an EVM Address:

<<< @/../../docs-snippets/test/fixtures/forc-projects/echo-evm-address/src/main.sw#evm-address-1{ts:line-numbers}

The `EvmAddress` type can be used with the SDK and passed to the contract function as follows:

<<< @/../../docs-snippets/src/guide/types/evm-address.test.ts#evm-address-3{ts:line-numbers}

And to validate the returned value:

<<< @/../../docs-snippets/src/guide/types/evm-address.test.ts#evm-address-4{ts:line-numbers}
