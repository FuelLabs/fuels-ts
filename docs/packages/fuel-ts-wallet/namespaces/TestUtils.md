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
| `provider` | `default` |
| `quantities?` | [`CoinQuantityLike`](internal.md#coinquantitylike)[] |

#### Returns

`Promise`<[`Wallet`](../classes/Wallet.md)\>

___

### seedWallet

▸ **seedWallet**(`wallet`, `quantities`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | [`Wallet`](../classes/Wallet.md) |
| `quantities` | [`CoinQuantityLike`](internal.md#coinquantitylike)[] |

#### Returns

`Promise`<`void`\>
