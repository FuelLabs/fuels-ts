---
layout: default
title: Contract
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: Contract

[@fuel-ts/contract](../index.md).Contract

## Implements

- [`AbstractContract`](internal-AbstractContract.md)

## Constructors

### constructor

• **new Contract**(`id`, `abi`, `walletOrProvider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) | `undefined` |
| `abi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) \| `default` | `undefined` |
| `walletOrProvider` | ``null`` \| `default` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md) | `null` |

#### Defined in

[packages/contract/src/contracts/contract.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L20)

## Properties

### functions

• **functions**: [`InvokeFunctions`](../interfaces/InvokeFunctions.md) = `{}`

#### Defined in

[packages/contract/src/contracts/contract.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L18)

___

### id

• **id**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[id](internal-AbstractContract.md#id)

#### Defined in

[packages/contract/src/contracts/contract.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L14)

___

### interface

• **interface**: `default`

#### Defined in

[packages/contract/src/contracts/contract.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L16)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contracts/contract.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L15)

___

### wallet

• **wallet**: ``null`` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md)

#### Defined in

[packages/contract/src/contracts/contract.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L17)

## Methods

### buildFunction

▸ **buildFunction**(`func`): (...`args`: `unknown`[]) => [`FunctionInvocationScope`](FunctionInvocationScope.md)<`unknown`[], `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `func` | `default` |

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

[packages/contract/src/contracts/contract.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L58)

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

[packages/contract/src/contracts/contract.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L62)
