# Class: Contract

[@fuel-ts/program](/api/Program/index.md).Contract

`Contract` provides a way to interact with the contract program type.

## Implements

- [`AbstractContract`](/api/Interfaces/AbstractContract.md)

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `accountOrProvider`): [`Contract`](/api/Program/Contract.md)

Creates an instance of the Contract class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The contract's address. |
| `abi` | `JsonAbi` \| `Interface` | The contract's ABI (JSON ABI or Interface instance). |
| `accountOrProvider` | [`Provider`](/api/Account/Provider.md) \| [`Account`](/api/Account/Account.md) | The account or provider for interaction. |

#### Returns

[`Contract`](/api/Program/Contract.md)

#### Defined in

[contract.ts:47](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L47)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Account/Account.md)

The account associated with the contract, if available.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[account](/api/Interfaces/AbstractContract.md#account)

#### Defined in

[contract.ts:33](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L33)

___

### functions

• **functions**: [`InvokeFunctions`](/api/Program/InvokeFunctions.md) = `{}`

A collection of functions available on the contract.

#### Defined in

[contract.ts:38](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L38)

___

### id

• **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The unique contract identifier.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[id](/api/Interfaces/AbstractContract.md#id)

#### Defined in

[contract.ts:18](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L18)

___

### interface

• **interface**: `Interface`

The contract's ABI interface.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[interface](/api/Interfaces/AbstractContract.md#interface)

#### Defined in

[contract.ts:28](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L28)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

The provider for interacting with the contract.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[provider](/api/Interfaces/AbstractContract.md#provider)

#### Defined in

[contract.ts:23](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L23)

## Methods

### buildFunction

▸ **buildFunction**(`func`): [`InvokeFunction`](/api/Program/InvokeFunction.md)&lt;`any`[], `any`\>

Build a function invocation scope for the provided function fragment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `FunctionFragment` | The function fragment to build a scope for. |

#### Returns

[`InvokeFunction`](/api/Program/InvokeFunction.md)&lt;`any`[], `any`\>

A function that creates a FunctionInvocationScope.

#### Defined in

[contract.ts:91](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L91)

___

### getBalance

▸ **getBalance**(`assetId`): `Promise`&lt;`BN`\>

Get the balance for a given asset ID for this contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The specified asset ID. |

#### Returns

`Promise`&lt;`BN`\>

The balance of the contract for the specified asset.

#### Defined in

[contract.ts:122](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L122)

___

### multiCall

▸ **multiCall**(`calls`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`any`\>

Create a multi-call invocation scope for the provided function invocation scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calls` | [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`any`[], `any`\>[] | An array of FunctionInvocationScopes to execute in a batch. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`any`\>

A MultiCallInvocationScope instance.

#### Defined in

[contract.ts:111](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/contract.ts#L111)
