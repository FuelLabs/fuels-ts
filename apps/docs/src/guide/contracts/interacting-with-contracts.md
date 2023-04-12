# Interacting with contracts

To interact with a deployed contract using the SDK without redeploying it, you only need the contract ID and its JSON ABI. You can bypass the deployment setup and start using the contract as follows:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#contract-with-id{ts:line-numbers}

This example assumes your contract ID string is encoded in the `bech32` format, recognizable by the human-readable part `fuel` followed by the separator `1`. However, other Fuel tools may use a hex-encoded contract ID string. Contract IDs can be easily converted to and from other Address formats. Refer to the [conversion guide](../types/conversion.md) for more details.

If you have a hex-encoded contract ID, you can use the following code:

<<< @/../../docs-snippets/src/guide/contracts/interacting-with-contracts.test.ts#contract-with-id-hex-encoded{ts:line-numbers}

For more information on the Fuel SDK's bech32 type, visit Fuel SDK [Bech32](../types/bech32.md) documentation link.
