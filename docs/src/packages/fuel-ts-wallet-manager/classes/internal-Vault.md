---
layout: default
title: Vault
parent: "@fuel-ts/wallet-manager"
nav_order: 1

---

# Class: Vault<TOptions\>

[@fuel-ts/wallet-manager](../index.md).[internal](../namespaces/internal.md).Vault

## Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | `unknown` |

## Implemented by

- [`MnemonicVault`](internal-MnemonicVault.md)
- [`PrivateKeyVault`](internal-PrivateKeyVault.md)

## Constructors

### constructor

• **new Vault**<`TOptions`\>(`options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TOptions` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `TOptions` & { `secret?`: `string`  } |

#### Defined in

[packages/wallet-manager/src/types.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L36)

## Properties

### type

▪ `Static` `Readonly` **type**: `string`

#### Defined in

[packages/wallet-manager/src/types.ts:31](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L31)

## Methods

### addAccount

▸ **addAccount**(): [`Account`](../namespaces/internal.md#account)

#### Returns

[`Account`](../namespaces/internal.md#account)

#### Defined in

[packages/wallet-manager/src/types.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L48)

___

### exportAccount

▸ **exportAccount**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[packages/wallet-manager/src/types.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L53)

___

### getAccounts

▸ **getAccounts**(): [`Account`](../namespaces/internal.md#account)[]

#### Returns

[`Account`](../namespaces/internal.md#account)[]

#### Defined in

[packages/wallet-manager/src/types.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L44)

___

### getWallet

▸ **getWallet**(`address`): [`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

[`Wallet`](../../fuel-ts-wallet/classes/Wallet.md)

#### Defined in

[packages/wallet-manager/src/types.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L58)

___

### serialize

▸ **serialize**(): `TOptions` & { `secret?`: `string`  }

#### Returns

`TOptions` & { `secret?`: `string`  }

#### Defined in

[packages/wallet-manager/src/types.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet-manager/src/types.ts#L40)
