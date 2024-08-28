[**@fuel-ts/program v0.94.2**](../index.md) • **Docs**

***

# Class: Contract

`Contract` provides a way to interact with the contract program type.

## Implements

- [`AbstractContract`](../Interfaces/AbstractContract.md)

## Constructors

### new Contract()

> **new Contract**(`id`, `abi`, `accountOrProvider`): [`Contract`](Contract.md)

Creates an instance of the Contract class.

#### Parameters

• **id**: `string` \| [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The contract's address.

• **abi**: `JsonAbi` \| `Interface`

The contract's ABI (JSON ABI or Interface instance).

• **accountOrProvider**: [`Provider`](../Account/Provider.md) \| [`Account`](../Account/Account.md)

The account or provider for interaction.

#### Returns

[`Contract`](Contract.md)

#### Defined in

[contract.ts:47](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L47)

## Properties

### account

> **account**: `null` \| [`Account`](../Account/Account.md)

The account associated with the contract, if available.

#### Implementation of

[`AbstractContract`](../Interfaces/AbstractContract.md).[`account`](../Interfaces/AbstractContract.md#account)

#### Defined in

[contract.ts:33](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L33)

***

### functions

> **functions**: [`InvokeFunctions`](./InvokeFunctions.md) = `{}`

A collection of functions available on the contract.

#### Defined in

[contract.ts:38](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L38)

***

### id

> **id**: [`AbstractAddress`](../Interfaces/AbstractAddress.md)

The unique contract identifier.

#### Implementation of

[`AbstractContract`](../Interfaces/AbstractContract.md).[`id`](../Interfaces/AbstractContract.md#id)

#### Defined in

[contract.ts:18](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L18)

***

### interface

> **interface**: `Interface`

The contract's ABI interface.

#### Implementation of

[`AbstractContract`](../Interfaces/AbstractContract.md).[`interface`](../Interfaces/AbstractContract.md#interface)

#### Defined in

[contract.ts:28](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L28)

***

### provider

> **provider**: [`Provider`](../Account/Provider.md)

The provider for interacting with the contract.

#### Implementation of

[`AbstractContract`](../Interfaces/AbstractContract.md).[`provider`](../Interfaces/AbstractContract.md#provider)

#### Defined in

[contract.ts:23](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L23)

## Methods

### buildFunction()

> **buildFunction**(`func`): [`InvokeFunction`](./InvokeFunction.md)\&lt;`any`[], `any`\>

Build a function invocation scope for the provided function fragment.

#### Parameters

• **func**: `FunctionFragment`

The function fragment to build a scope for.

#### Returns

[`InvokeFunction`](./InvokeFunction.md)\&lt;`any`[], `any`\>

A function that creates a FunctionInvocationScope.

#### Defined in

[contract.ts:91](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L91)

***

### getBalance()

> **getBalance**(`assetId`): `Promise`\&lt;`BN`\>

Get the balance for a given asset ID for this contract.

#### Parameters

• **assetId**: [`BytesLike`](../Interfaces/index.md#byteslike)

The specified asset ID.

#### Returns

`Promise`\&lt;`BN`\>

The balance of the contract for the specified asset.

#### Defined in

[contract.ts:122](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L122)

***

### multiCall()

> **multiCall**(`calls`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)\&lt;`any`\>

Create a multi-call invocation scope for the provided function invocation scopes.

#### Parameters

• **calls**: [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`any`[], `any`\>[]

An array of FunctionInvocationScopes to execute in a batch.

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)\&lt;`any`\>

A MultiCallInvocationScope instance.

#### Defined in

[contract.ts:111](https://github.com/FuelLabs/fuels-ts/blob/60e570b347e0262535adb24c6b13f5d26907fabb/packages/program/src/contract.ts#L111)
