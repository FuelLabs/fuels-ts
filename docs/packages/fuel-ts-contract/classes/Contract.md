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

• **new Contract**(`id`, `abi`, `walletOrProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| [`AbstractAddress`](internal-AbstractAddress.md) |
| `abi` | [`JsonAbi`](../namespaces/internal.md#jsonabi) \| `default` |
| `walletOrProvider` | `default` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md) |

#### Defined in

[packages/contract/src/contracts/contract.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L21)

## Properties

### functions

• **functions**: [`InvokeFunctions`](../interfaces/InvokeFunctions.md) = `{}`

#### Defined in

[packages/contract/src/contracts/contract.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L19)

___

### id

• **id**: [`AbstractAddress`](internal-AbstractAddress.md)

#### Implementation of

[AbstractContract](internal-AbstractContract.md).[id](internal-AbstractContract.md#id)

#### Defined in

[packages/contract/src/contracts/contract.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L15)

___

### interface

• **interface**: `default`

#### Defined in

[packages/contract/src/contracts/contract.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L17)

___

### provider

• **provider**: ``null`` \| `default`

#### Defined in

[packages/contract/src/contracts/contract.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L16)

___

### wallet

• **wallet**: ``null`` \| [`BaseWalletLocked`](internal-BaseWalletLocked.md)

#### Defined in

[packages/contract/src/contracts/contract.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L18)

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

[packages/contract/src/contracts/contract.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L59)

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

[packages/contract/src/contracts/contract.ts:70](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L70)

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

[packages/contract/src/contracts/contract.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/contract.ts#L63)
