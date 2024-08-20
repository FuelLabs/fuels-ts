# Module: @fuel-ts/program

## Classes

- [Contract](/api/Program/Contract.md)
- [FunctionInvocationScope](/api/Program/FunctionInvocationScope.md)
- [InstructionSet](/api/Program/InstructionSet.md)
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

[types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L53)

___

### CallParams

Ƭ **CallParams**: `Partial`&lt;{ `forward`: [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish`  }\>

Represents call parameters for a contract call.

#### Defined in

[types.ts:31](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L31)

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
| `externalContractsAbis?` | `Record`&lt;`string`, `JsonAbi`\> |
| `fnSelectorBytes` | `Uint8Array` |
| `gas?` | `BigNumberish` |

#### Defined in

[types.ts:18](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L18)

___

### DryRunResult

Ƭ **DryRunResult**&lt;`TReturn`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `TReturn` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `callResult` | [`CallResult`](/api/Account/index.md#callresult) |
| `functionScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] |
| `gasUsed` | `BN` |
| `isMultiCall` | `boolean` |
| `value` | `TReturn` |

#### Defined in

[types.ts:119](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L119)

___

### FunctionResult

Ƭ **FunctionResult**&lt;`TReturn`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `TReturn` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `functionScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] |
| `gasUsed` | `BN` |
| `isMultiCall` | `boolean` |
| `logs` | `any`[] |
| `program` | `AbstractProgram` |
| `transactionId` | `string` |
| `transactionResponse` | [`TransactionResponse`](/api/Account/TransactionResponse.md) |
| `transactionResult` | `TransactionResult`&lt;[`Script`](/api/Account/TransactionType.md#script)\> |
| `value` | `TReturn` |

#### Defined in

[types.ts:106](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L106)

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

[types.ts:91](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L91)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`&lt;{ `fundTransaction`: `boolean`  }\>

Represents options for calculating the transaction cost.

#### Defined in

[types.ts:102](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L102)

___

### TxParams

Ƭ **TxParams**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `tip`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

Represents transaction parameters for a contract call.

#### Defined in

[types.ts:39](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/program/src/types.ts#L39)
