---
layout: default
title: internal
parent: "@fuel-ts/transactions"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/transactions](../index.md).internal

## Type Aliases

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, `Coder`\> |

#### Defined in

[packages/abi-coder/src/coders/struct.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L10)

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

### TypesOfCoder

Ƭ **TypesOfCoder**<`TCoder`\>: `TCoder` extends `Coder`<infer TInput, infer TDecoded\> ? { `Decoded`: `TDecoded` ; `Input`: `TInput`  } : `never`

#### Type parameters

| Name |
| :------ |
| `TCoder` |

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L27)
