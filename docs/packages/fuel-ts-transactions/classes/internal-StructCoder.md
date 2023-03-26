---
layout: default
title: StructCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: StructCoder<TCoders\>

[@fuel-ts/transactions](../index.md).[internal](../namespaces/internal.md).StructCoder

## Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](internal-Coder.md)\> |

## Hierarchy

- [`Coder`](internal-Coder.md)<[`InputValueOf$2`](../namespaces/internal.md#inputvalueof$2)<`TCoders`\>, [`DecodedValueOf$2`](../namespaces/internal.md#decodedvalueof$2)<`TCoders`\>\>

  ↳ **`StructCoder`**

  ↳↳ [`StorageSlotCoder`](StorageSlotCoder.md)

  ↳↳ [`TxPointerCoder`](TxPointerCoder.md)

  ↳↳ [`UtxoIdCoder`](UtxoIdCoder.md)

## Constructors

### constructor

• **new StructCoder**<`TCoders`\>(`name`, `coders`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](internal-Coder.md)<`unknown`, `unknown`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `coders` | `TCoders` |

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

packages/abi-coder/dist/index.d.ts:111

## Properties

### coders

• **coders**: `TCoders`

#### Defined in

packages/abi-coder/dist/index.d.ts:110

___

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• **name**: `string`

#### Overrides

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:109

___

### offset

• `Optional` **offset**: `number`

#### Inherited from

[Coder](internal-Coder.md).[offset](internal-Coder.md#offset)

#### Defined in

packages/abi-coder/dist/index.d.ts:43

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](internal-Coder.md).[type](internal-Coder.md#type)

#### Defined in

packages/abi-coder/dist/index.d.ts:41

## Methods

### decode

▸ **decode**(`data`, `offset`): [[`DecodedValueOf$2`](../namespaces/internal.md#decodedvalueof$2)<`TCoders`\>, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`DecodedValueOf$2`](../namespaces/internal.md#decodedvalueof$2)<`TCoders`\>, `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

packages/abi-coder/dist/index.d.ts:113

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`InputValueOf$2`](../namespaces/internal.md#inputvalueof$2)<`TCoders`\> |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

packages/abi-coder/dist/index.d.ts:112

___

### setOffset

▸ **setOffset**(`offset`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

`void`

#### Inherited from

[Coder](internal-Coder.md).[setOffset](internal-Coder.md#setoffset)

#### Defined in

packages/abi-coder/dist/index.d.ts:46

___

### throwError

▸ **throwError**(`message`, `value`): `never`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`never`

#### Inherited from

[Coder](internal-Coder.md).[throwError](internal-Coder.md#throwerror)

#### Defined in

packages/abi-coder/dist/index.d.ts:45
