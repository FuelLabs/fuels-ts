---
layout: default
title: internal
parent: "@fuel-ts/transactions"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/transactions](../index.md).internal

## Classes

- [BN](../classes/internal-BN.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)

## Type Aliases

### BNInput

Ƭ **BNInput**: `number` \| `string` \| `number`[] \| `Uint8Array` \| `Buffer` \| `BnJs`

#### Defined in

[packages/math/src/bn.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L8)

___

### CompareResult

Ƭ **CompareResult**: ``-1`` \| ``0`` \| ``1``

#### Defined in

[packages/math/src/bn.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/bn.ts#L7)

___

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, `Coder`\> |

#### Defined in

[packages/abi-coder/src/coders/struct.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L10)

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Input"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, `Coder`\> |

#### Defined in

[packages/abi-coder/src/coders/struct.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L7)

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

[packages/math/src/types.ts:4](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L4)

___

### TypesOfCoder

Ƭ **TypesOfCoder**<`TCoder`\>: `TCoder` extends `Coder`<infer TInput, infer TDecoded\> ? { `Decoded`: `TDecoded` ; `Input`: `TInput`  } : `never`

#### Type parameters

| Name |
| :------ |
| `TCoder` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L29)
