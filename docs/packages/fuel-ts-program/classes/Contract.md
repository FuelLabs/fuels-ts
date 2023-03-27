---
layout: default
title: Contract
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: Contract

[@fuel-ts/program](../index.md).Contract

## Implements

- [`AbstractContract`](internal-AbstractContract.md)

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `accountOrProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |
| `abi` | [`Interface`](internal-Interface.md) \| [`JsonAbi`](../namespaces/internal.md#jsonabi) |
| `accountOrProvider` | [`Provider`](internal-Provider.md) \| [`Account`](internal-Account.md) |

#### Defined in

[packages/program/src/contract.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L20)

## Properties

### account

• **account**: ``null`` \| [`Account`](internal-Account.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[account](internal-AbstractContract.md#account)

#### Defined in

[packages/program/src/contract.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L17)

___

### functions

• **functions**: [`InvokeFunctions`](../interfaces/InvokeFunctions.md) = `{}`

#### Defined in

[packages/program/src/contract.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L18)

___

### id

• **id**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[id](internal-AbstractContract.md#id)

#### Defined in

[packages/program/src/contract.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L14)

___

### interface

• **interface**: [`Interface`](internal-Interface.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[interface](internal-AbstractContract.md#interface)

#### Defined in

[packages/program/src/contract.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L16)

___

### provider

• **provider**: ``null`` \| [`Provider`](internal-Provider.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[provider](internal-AbstractContract.md#provider)

#### Defined in

[packages/program/src/contract.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L15)

## Methods

### buildFunction

▸ **buildFunction**(`func`): (...`args`: `unknown`[]) => [`FunctionInvocationScope`](FunctionInvocationScope.md)<`unknown`[], `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | [`FunctionFragment`](internal-FunctionFragment.md) |

#### Returns

`fn`

▸ (...`args`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`unknown`[], `any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`unknown`[], `any`\>

#### Defined in

[packages/program/src/contract.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L58)

___

### getBalance

▸ **getBalance**(`assetId`): `Promise`<[`BN`](internal-BN.md)\>

Get the balance for a given assset ID for this contract

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetId` | `BytesLike` |

#### Returns

`Promise`<[`BN`](internal-BN.md)\>

#### Defined in

[packages/program/src/contract.ts:69](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L69)

___

### multiCall

▸ **multiCall**(`calls`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calls` | [`FunctionInvocationScope`](FunctionInvocationScope.md)<`any`[], `any`\>[] |

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`any`\>

#### Defined in

[packages/program/src/contract.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/contract.ts#L62)
