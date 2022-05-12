---
layout: default
title: ContractFactory
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: ContractFactory

[@fuel-ts/contract](../index.md).ContractFactory

## Constructors

### constructor

• **new ContractFactory**(`bytecode`, `abi`, `walletOrProvider?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `bytecode` | `BytesLike` | `undefined` |
| `abi` | [`JsonAbi`](../../fuel-ts-abi-coder/index.md#jsonabi) \| [`Interface`](../../fuel-ts-abi-coder/classes/Interface.md) | `undefined` |
| `walletOrProvider` | ``null`` \| [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md) \| [`Provider`](../../fuel-ts-providers/classes/Provider.md) | `null` |

#### Defined in

[packages/contract/src/contract-factory.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L20)

## Properties

### bytecode

• **bytecode**: `BytesLike`

#### Defined in

[packages/contract/src/contract-factory.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L15)

___

### interface

• **interface**: [`Interface`](../../fuel-ts-abi-coder/classes/Interface.md)

#### Defined in

[packages/contract/src/contract-factory.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L16)

___

### provider

• **provider**: ``null`` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md)

#### Defined in

[packages/contract/src/contract-factory.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L17)

___

### wallet

• **wallet**: ``null`` \| [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Defined in

[packages/contract/src/contract-factory.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L18)

## Methods

### connect

▸ **connect**(`provider`): [`ContractFactory`](ContractFactory.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | ``null`` \| [`Provider`](../../fuel-ts-providers/classes/Provider.md) |

#### Returns

[`ContractFactory`](ContractFactory.md)

#### Defined in

[packages/contract/src/contract-factory.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L45)

___

### deployContract

▸ **deployContract**(`storageSlots?`, `salt?`): `Promise`<[`Contract`](Contract.md)\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `storageSlots` | [`BytesLike`, `BytesLike`][] | `[]` |
| `salt` | `BytesLike` | `undefined` |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

#### Defined in

[packages/contract/src/contract-factory.ts:49](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract-factory.ts#L49)
