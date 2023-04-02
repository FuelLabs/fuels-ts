# Converting native types

You might want to convert between the native types (`Bytes32`, `Address`, `ContractId`, and `AssetId`). Because these types are wrappers on `Bytes` converting is a matter of using helpers. Here's an example:

<<< @/../../../packages/fuel-gauge/src/doc-examples.test.ts#conversion{ts:line-numbers}
