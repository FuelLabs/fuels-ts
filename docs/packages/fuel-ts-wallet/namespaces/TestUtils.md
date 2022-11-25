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

▸ **generateTestWallet**(`provider`, `quantities?`): `Promise`<[`WalletUnlocked`](../classes/WalletUnlocked.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `default` |
| `quantities?` | [`CoinQuantityLike`](internal.md#coinquantitylike)[] |

#### Returns

`Promise`<[`WalletUnlocked`](../classes/WalletUnlocked.md)\>

#### Defined in

[packages/wallet/src/test-utils.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/test-utils.ts#L29)

___

### seedWallet

▸ **seedWallet**(`wallet`, `quantities`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `wallet` | [`WalletUnlocked`](../classes/WalletUnlocked.md) |
| `quantities` | [`CoinQuantityLike`](internal.md#coinquantitylike)[] |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/wallet/src/test-utils.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/wallet/src/test-utils.ts#L8)
