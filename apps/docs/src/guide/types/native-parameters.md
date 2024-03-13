# Native Parameter Types

Below you can find examples of how to convert between common native Sway program input and output types:

- [`Address`](#address)
- [`ContractId`](#contractid)
- [`Identity`](#identity)
- [`AssetId`](#assetid)

## `Address`

### `AddressInput`

To pass an `Address` as an input parameter to a Sway program, you can define the input as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#address-input

### `AddressOutput`

For a Sway program that returns an `Address` type, you can convert to an `Address` type in `fuels` as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#address-output

## `ContractId`

### `ContractIdInput`

To pass a `ContractId` as an input parameter to a Sway program, you can define the input as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#contract-id-input

### `ContractIdOutput`

For a Sway program that returns a `ContractId` type, you can convert to an `string` as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#contract-id-output

## `Identity`

### `IdentityInput`

To pass an `Identity` as an input parameter to a Sway program, you can define the input as shown below:

For an address:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#identity-address-input

For a contract:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#identity-contract-input

### `IdentityOutput`

For a Sway program that returns an `Identity` type, you can convert to an `Address` or `string` as shown below:

For an address:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#identity-address-output

For a contract:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#identity-contract-output

## `AssetId`

### `AssetIdInput`

To pass an `AssetId` as an input parameter to a Sway program, you can define the input as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#asset-id-input

### `AssetIdOutput`

For a Sway program that returns an `AssetId` type, you can convert to a `string` as shown below:

<<< @/../../docs-snippets/src/guide/types/contract-types.test.ts#asset-id-output
