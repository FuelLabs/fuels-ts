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
| `abi` | `JsonAbi` \| `Interface`&lt;`JsonAbi`\> | The contract's ABI (JSON ABI or Interface instance). |
| `accountOrProvider` | [`Provider`](/api/Providers/Provider.md) \| [`Account`](/api/Wallet/Account.md) | The account or provider for interaction. |

#### Returns

[`Contract`](/api/Program/Contract.md)

#### Defined in

[packages/program/src/contract.ts:49](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L49)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Wallet/Account.md)

The account associated with the contract, if available.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[account](/api/Interfaces/AbstractContract.md#account)

#### Defined in

[packages/program/src/contract.ts:35](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L35)

___

### functions

• **functions**: [`InvokeFunctions`](/api/Program/InvokeFunctions.md) = `{}`

A collection of functions available on the contract.

#### Defined in

[packages/program/src/contract.ts:40](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L40)

___

### id

• **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The unique contract identifier.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[id](/api/Interfaces/AbstractContract.md#id)

#### Defined in

[packages/program/src/contract.ts:20](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L20)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

The contract's ABI interface.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[interface](/api/Interfaces/AbstractContract.md#interface)

#### Defined in

[packages/program/src/contract.ts:30](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L30)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

The provider for interacting with the contract.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[provider](/api/Interfaces/AbstractContract.md#provider)

#### Defined in

[packages/program/src/contract.ts:25](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L25)

## Methods

### buildFunction

▸ **buildFunction**(`func`): (...`args`: `unknown`[]) => [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`unknown`[], `any`\>

Build a function invocation scope for the provided function fragment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | `FunctionFragment`&lt;`JsonAbi`, `string`\> | The function fragment to build a scope for. |

#### Returns

`fn`

A function that creates a FunctionInvocationScope.

▸ (`...args`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`unknown`[], `any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`unknown`[], `any`\>

#### Defined in

[packages/program/src/contract.ts:93](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L93)

___

### getBalance

▸ **getBalance**(`assetId`): `Promise`&lt;`BN`\>

Get the balance for a given asset ID for this contract.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | `BytesLike` | The specified asset ID. |

#### Returns

`Promise`&lt;`BN`\>

The balance of the contract for the specified asset.

#### Defined in

[packages/program/src/contract.ts:114](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L114)

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

[packages/program/src/contract.ts:103](https://github.com/FuelLabs/fuels-ts/blob/b7073a1e/packages/program/src/contract.ts#L103)
