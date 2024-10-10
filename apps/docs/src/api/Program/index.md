**@fuel-ts/program v0.95.0** • [**Docs**](index.md)

***

# @fuel-ts/program

## Type Aliases

### CallConfig\&lt;T\>

> **CallConfig**\&lt;`T`\>: `object`

Represents configuration for calling a contract function.

#### Type Parameters

• **T** = `unknown`

Type of the function's arguments.

#### Type declaration

##### args

> **args**: `T`

##### callParameters?

> `optional` **callParameters**: [`CallParams`](index.md#callparams)

##### externalAbis

> **externalAbis**: `Record`\&lt;`string`, `JsonAbi`\>

##### forward?

> `optional` **forward**: [`CoinQuantity`](../Account/index.md#coinquantity)

##### func

> **func**: `FunctionFragment`

##### program

> **program**: `AbstractProgram`

##### txParameters?

> `optional` **txParameters**: [`TxParams`](index.md#txparams)

#### Defined in

[types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L53)

***

### CallParams

> **CallParams**: `Partial`\&lt;`object`\>

Represents call parameters for a contract call.

#### Type declaration

##### forward

> **forward**: [`CoinQuantityLike`](../Account/index.md#coinquantitylike)

##### gasLimit

> **gasLimit**: `BigNumberish`

#### Defined in

[types.ts:31](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L31)

***

### ContractCall

> **ContractCall**: `object`

Represents a contract call.

#### Type declaration

##### amount?

> `optional` **amount**: `BigNumberish`

##### assetId?

> `optional` **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### contractId

> **contractId**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

##### data

> **data**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### externalContractsAbis?

> `optional` **externalContractsAbis**: `Record`\&lt;`string`, `JsonAbi`\>

##### fnSelectorBytes

> **fnSelectorBytes**: `Uint8Array`

##### gas?

> `optional` **gas**: `BigNumberish`

#### Defined in

[types.ts:18](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L18)

***

### DryRunResult\&lt;TReturn\>

> **DryRunResult**\&lt;`TReturn`\>: `object`

#### Type Parameters

• **TReturn**

#### Type declaration

##### callResult

> `readonly` **callResult**: [`CallResult`](../Account/index.md#callresult)

##### functionScopes

> `readonly` **functionScopes**: [`InvocationScopeLike`](index.md#invocationscopeliket)[]

##### gasUsed

> `readonly` **gasUsed**: `BN`

##### isMultiCall

> `readonly` **isMultiCall**: `boolean`

##### value

> `readonly` **value**: `TReturn`

#### Defined in

[types.ts:119](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L119)

***

### FunctionResult\&lt;TReturn\>

> **FunctionResult**\&lt;`TReturn`\>: `object`

#### Type Parameters

• **TReturn**

#### Type declaration

##### functionScopes

> `readonly` **functionScopes**: [`InvocationScopeLike`](index.md#invocationscopeliket)[]

##### gasUsed

> `readonly` **gasUsed**: `BN`

##### isMultiCall

> `readonly` **isMultiCall**: `boolean`

##### logs

> `readonly` **logs**: `any`[]

##### program

> `readonly` **program**: `AbstractProgram`

##### transactionId

> `readonly` **transactionId**: `string`

##### transactionResponse

> `readonly` **transactionResponse**: [`TransactionResponse`](../Account/TransactionResponse.md)

##### transactionResult

> `readonly` **transactionResult**: `TransactionResult`\&lt;[`Script`](../Account/TransactionType.md#script)\>

##### value

> `readonly` **value**: `TReturn`

#### Defined in

[types.ts:106](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L106)

***

### InvocationScopeLike\&lt;T\>

> **InvocationScopeLike**\&lt;`T`\>: `object`

Represents a like object of InvocationScope with a method to get its call configuration.

#### Type Parameters

• **T** = `unknown`

Type of the function's arguments.

#### Type declaration

##### getCallConfig()

Get the call configuration for this invocation scope.

###### Returns

[`CallConfig`](index.md#callconfigt)\&lt;`T`\>

{CallConfig&lt;T>} The call configuration.

#### Defined in

[types.ts:91](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L91)

***

### TransactionCostOptions

> **TransactionCostOptions**: `Partial`\&lt;`object`\>

Represents options for calculating the transaction cost.

#### Type declaration

##### fundTransaction

> **fundTransaction**: `boolean`

#### Defined in

[types.ts:102](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L102)

***

### TxParams

> **TxParams**: `Partial`\&lt;`object`\>

Represents transaction parameters for a contract call.

#### Type declaration

##### gasLimit

> **gasLimit**: `BigNumberish`

##### maturity?

> `optional` **maturity**: `number`

##### maxFee?

> `optional` **maxFee**: `BigNumberish`

##### tip

> **tip**: `BigNumberish`

##### variableOutputs

> **variableOutputs**: `number`

##### witnessLimit?

> `optional` **witnessLimit**: `BigNumberish`

#### Defined in

[types.ts:39](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/types.ts#L39)

## Classes

- [Contract](./Contract.md)
- [FunctionInvocationScope](./FunctionInvocationScope.md)
- [InstructionSet](./InstructionSet.md)
- [MultiCallInvocationScope](./MultiCallInvocationScope.md)
- [ScriptRequest](./ScriptRequest.md)

## Interfaces

- [InvokeFunction](./InvokeFunction.md)
- [InvokeFunctions](./InvokeFunctions.md)
