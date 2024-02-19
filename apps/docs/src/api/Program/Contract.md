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
| `accountOrProvider` | [`Provider`](/api/Account/Provider.md) \| [`Account`](/api/Account/Account.md) | The account or provider for interaction. |

#### Returns

[`Contract`](/api/Program/Contract.md)

#### Defined in

[packages/program/src/contract.ts:48](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L48)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Account/Account.md)

The account associated with the contract, if available.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[account](/api/Interfaces/AbstractContract.md#account)

#### Defined in

[packages/program/src/contract.ts:34](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L34)

___

### functions

• **functions**: [`InvokeFunctions`](/api/Program/InvokeFunctions.md) = `{}`

A collection of functions available on the contract.

#### Defined in

[packages/program/src/contract.ts:39](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L39)

___

### id

• **id**: [`AbstractAddress`](/api/Interfaces/AbstractAddress.md)

The unique contract identifier.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[id](/api/Interfaces/AbstractContract.md#id)

#### Defined in

[packages/program/src/contract.ts:19](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L19)

___

### interface

• **interface**: `Interface`&lt;`JsonAbi`\>

The contract's ABI interface.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[interface](/api/Interfaces/AbstractContract.md#interface)

#### Defined in

[packages/program/src/contract.ts:29](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L29)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

The provider for interacting with the contract.

#### Implementation of

[AbstractContract](/api/Interfaces/AbstractContract.md).[provider](/api/Interfaces/AbstractContract.md#provider)

#### Defined in

[packages/program/src/contract.ts:24](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L24)

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

[packages/program/src/contract.ts:92](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L92)

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

[packages/program/src/contract.ts:113](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L113)

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

[packages/program/src/contract.ts:102](https://github.com/FuelLabs/fuels-ts/blob/e8cdc9bd/packages/program/src/contract.ts#L102)
