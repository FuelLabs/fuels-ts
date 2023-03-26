---
layout: default
title: internal
parent: "@fuel-ts/transactions"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/transactions](../index.md).internal

## Classes

- [B256Coder](../classes/internal-B256Coder.md)
- [BN](../classes/internal-BN.md)
- [Coder](../classes/internal-Coder.md)
- [NumberCoder](../classes/internal-NumberCoder.md)
- [StructCoder](../classes/internal-StructCoder.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)

## Type Aliases

### BNInput

Ƭ **BNInput**: `number` \| `string` \| `number`[] \| `Uint8Array` \| `Buffer` \| `BnJs`

#### Defined in

packages/math/dist/index.d.ts:13

___

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

packages/math/dist/index.d.ts:12

___

### DecodedValueOf$2

Ƭ **DecodedValueOf$2**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/internal-Coder.md)\> |

#### Defined in

packages/abi-coder/dist/index.d.ts:105

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

packages/math/dist/index.d.ts:8

___

### InputValueOf$2

Ƭ **InputValueOf$2**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Input"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/internal-Coder.md)\> |

#### Defined in

packages/abi-coder/dist/index.d.ts:102

___

### NumberCoderType

Ƭ **NumberCoderType**: ``"u8"`` \| ``"u16"`` \| ``"u32"``

#### Defined in

packages/abi-coder/dist/index.d.ts:85

___

### PossibleTransactions

Ƭ **PossibleTransactions**: [`TransactionScript`](../index.md#transactionscript) \| [`TransactionCreate`](../index.md#transactioncreate) \| [`TransactionMint`](../index.md#transactionmint)

#### Defined in

[packages/transactions/src/coders/transaction.ts:347](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/transaction.ts#L347)

___

### ToFixedConfig

Ƭ **ToFixedConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `minPrecision?` | `number` |
| `precision?` | `number` |

#### Defined in

packages/math/dist/index.d.ts:4

___

### TypesOfCoder

Ƭ **TypesOfCoder**<`TCoder`\>: `TCoder` extends [`Coder`](../classes/internal-Coder.md)<infer TInput, infer TDecoded\> ? { `Decoded`: `TDecoded` ; `Input`: `TInput`  } : `never`

#### Type parameters

| Name |
| :------ |
| `TCoder` |

#### Defined in

packages/abi-coder/dist/index.d.ts:35
