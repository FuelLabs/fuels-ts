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

[packages/program/src/types.ts:50](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L50)

___

### CallParams

Ƭ **CallParams**: `Partial`&lt;{ `forward`: [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish`  }\>

Represents call parameters for a contract call.

#### Defined in

[packages/program/src/types.ts:26](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L26)

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
| `fnSelector` | `string` |
| `gas?` | `BigNumberish` |
| `isInputDataPointer` | `boolean` |
| `isOutputDataHeap` | `boolean` |
| `outputEncodedLength` | `number` |

#### Defined in

[packages/program/src/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L11)

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

[packages/program/src/types.ts:82](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L82)

___

### InvokeFunction

Ƭ **InvokeFunction**&lt;`TArgs`, `TReturn`\>: (...`args`: `TArgs`) => [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] | Type of the function's arguments. |
| `TReturn` | `any` | Type of the function's return value. |

#### Type declaration

▸ (`...args`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Represents a function that can be invoked.

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

#### Defined in

[packages/program/src/types.ts:67](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L67)

___

### RevertReason

Ƭ **RevertReason**: ``"RequireFailed"`` \| ``"TransferToAddressFailed"`` \| ``"SendMessageFailed"`` \| ``"AssertEqFailed"`` \| ``"AssertFailed"`` \| ``"Unknown"``

Represents the possible reasons for a revert.

#### Defined in

[packages/program/src/revert/revert-error.ts:15](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/revert/revert-error.ts#L15)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`&lt;{ `fundTransaction`: `boolean` ; `gasPrice`: `BigNumberish`  }\>

Represents options for calculating the transaction cost.

#### Defined in

[packages/program/src/types.ts:93](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L93)

___

### TxParams

Ƭ **TxParams**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

Represents transaction parameters for a contract call.

#### Defined in

[packages/program/src/types.ts:35](https://github.com/FuelLabs/fuels-ts/blob/e0e95c40/packages/program/src/types.ts#L35)
