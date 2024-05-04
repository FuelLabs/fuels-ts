# Module: @fuel-ts/program

## Classes

- [Contract](/api/Program/Contract.md)
- [FunctionInvocationResult](/api/Program/FunctionInvocationResult.md)
- [FunctionInvocationScope](/api/Program/FunctionInvocationScope.md)
- [InstructionSet](/api/Program/InstructionSet.md)
- [InvocationCallResult](/api/Program/InvocationCallResult.md)
- [InvocationResult](/api/Program/InvocationResult.md)
- [MultiCallInvocationScope](/api/Program/MultiCallInvocationScope.md)
- [ScriptRequest](/api/Program/ScriptRequest.md)

## Interfaces

- [InvokeFunction](/api/Program/InvokeFunction.md)
- [InvokeFunctions](/api/Program/InvokeFunctions.md)

## Type Aliases

### CallConfig

Ƭ **CallConfig**&lt;`T`\>: `Object`

Represents configuration for calling a contract function.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `unknown` | Type of the function's arguments. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args` | `T` |
| `callParameters?` | [`CallParams`](/api/Program/index.md#callparams) |
| `externalAbis` | `Record`&lt;`string`, `JsonAbi`\> |
| `forward?` | [`CoinQuantity`](/api/Account/index.md#coinquantity) |
| `func` | `FunctionFragment` |
| `program` | `AbstractProgram` |
| `txParameters?` | [`TxParams`](/api/Program/index.md#txparams) |

#### Defined in

[types.ts:52](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L52)

___

### CallParams

Ƭ **CallParams**: `Partial`&lt;{ `forward`: [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish`  }\>

Represents call parameters for a contract call.

#### Defined in

[types.ts:29](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L29)

___

### ContractCall

Ƭ **ContractCall**: `Object`

Represents a contract call.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | `BigNumberish` |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `contractId` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `data` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `encoding?` | `EncodingVersion` |
| `externalContractsAbis?` | `Record`&lt;`string`, `JsonAbi`\> |
| `fnSelector` | `string` |
| `fnSelectorBytes` | `Uint8Array` |
| `gas?` | `BigNumberish` |
| `isInputDataPointer` | `boolean` |
| `isOutputDataHeap` | `boolean` |
| `outputEncodedLength` | `number` |

#### Defined in

[types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L11)

___

### InvocationScopeLike

Ƭ **InvocationScopeLike**&lt;`T`\>: `Object`

Represents a like object of InvocationScope with a method to get its call configuration.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `unknown` | Type of the function's arguments. |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCallConfig` | () => [`CallConfig`](/api/Program/index.md#callconfig)&lt;`T`\> |

#### Defined in

[types.ts:85](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L85)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`&lt;{ `fundTransaction`: `boolean`  }\>

Represents options for calculating the transaction cost.

#### Defined in

[types.ts:96](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L96)

___

### TxParams

Ƭ **TxParams**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `optimizeGas?`: `boolean` ; `tip`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

Represents transaction parameters for a contract call.

#### Defined in

[types.ts:37](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/program/src/types.ts#L37)
