---
layout: default
title: Vault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Vault<TOptions\>

[@fuel-ts/wallet-manager](../index.md).Vault

## Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

## Implemented by

- [`MnemonicVault`](internal-MnemonicVault.md)
- [`PrivateKeyVault`](internal-PrivateKeyVault.md)

## Constructors

### constructor

• **new Vault**<`TOptions`\>(`_options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | { `secret?`: `string`  } |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_options` | `TOptions` |

#### Defined in

[packages/wallet-manager/src/types.ts:35](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L35)

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/wallet-manager/src/types.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L33)

## Methods

### addAccount

▸ **addAccount**(): [`Account`](../index.md#account)

#### Returns

[`Account`](../index.md#account)

#### Defined in

[packages/wallet-manager/src/types.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L47)

___

### exportAccount

▸ **exportAccount**(`_address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/types.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L51)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../index.md#account)[]

#### Returns

[`Account`](../index.md#account)[]

#### Defined in

[packages/wallet-manager/src/types.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L43)

___

### getWallet

▸ **getWallet**(`_address`): [`WalletUnlocked`](internal-WalletUnlocked.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_address` | [`AbstractAddress`](internal-AbstractAddress.md) |

#### Returns

[`WalletUnlocked`](internal-WalletUnlocked.md)

#### Defined in

[packages/wallet-manager/src/types.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L55)

___

### serialize

▸ **serialize**(): `TOptions`

#### Returns

`TOptions`

#### Defined in

[packages/wallet-manager/src/types.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L39)
