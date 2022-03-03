---
layout: default
title: "@fuel-ts/hasher"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/hasher

## Functions

### hash

▸ **hash**(`data`): `string`

wrap sha256

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `BytesLike` | The data to be hash |

#### Returns

`string`

A sha256 hash of the data

#### Defined in

[hasher/src/hasher.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hasher/src/hasher.ts#L100)

___

### hashMessage

▸ **hashMessage**(`msg`): `string`

hash string messages with sha256

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The string message to be hashed |

#### Returns

`string`

A sha256 hash of the message

#### Defined in

[hasher/src/hasher.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hasher/src/hasher.ts#L18)

___

### hashTransaction

▸ **hashTransaction**(`transactionRequest`): `string`

Hash transaction request with sha256. [Read more](https://github.com/FuelLabs/fuel-specs/blob/master/specs/protocol/identifiers.md#transaction-id)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](../fuel-ts-providers/index.md#transactionrequest) | Transaction request to be hashed |

#### Returns

`string`

sha256 hash of the transaction

#### Defined in

[hasher/src/hasher.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/hasher/src/hasher.ts#L28)
