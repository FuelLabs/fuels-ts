---
layout: default
title: TestUtils
parent: "@fuel-ts/wallet"
nav_order: 3

---

# Namespace: TestUtils

[@fuel-ts/wallet](../index.md).TestUtils

## Functions

### generateTestWallet

▸ **generateTestWallet**(`provider`, `quantities?`): `Promise`<[`Wallet`](../classes/Wallet.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | [`Provider`](../../fuel-ts-providers/classes/Provider.md) |
| `quantities?` | [`CoinQuantityLike`](../../fuel-ts-providers/index.md#coinquantitylike)[] |

#### Returns

`Promise`<[`Wallet`](../classes/Wallet.md)\>

#### Defined in

[packages/wallet/src/test-utils.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/test-utils.ts#L24)

___

### seedWallet

▸ **seedWallet**(`wallet`, `quantities`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | [`Wallet`](../classes/Wallet.md) |
| `quantities` | [`CoinQuantityLike`](../../fuel-ts-providers/index.md#coinquantitylike)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet/src/test-utils.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/test-utils.ts#L7)
