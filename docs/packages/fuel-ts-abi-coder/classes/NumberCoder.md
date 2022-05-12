---
layout: default
title: NumberCoder
parent: "@fuel-ts/abi-coder"
nav_order: 1

---

# Class: NumberCoder

[@fuel-ts/abi-coder](../index.md).NumberCoder

## Hierarchy

- [`Coder`](Coder.md)

  ↳ **`NumberCoder`**

## Constructors

### constructor

• **new NumberCoder**(`baseType`, `localName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseType` | `string` |
| `localName` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[packages/abi-coder/src/coders/number.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L13)

## Properties

### baseType

• **baseType**: `string`

#### Defined in

[packages/abi-coder/src/coders/number.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L10)

___

### length

• **length**: `number`

#### Defined in

[packages/abi-coder/src/coders/number.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L9)

___

### localName

• `Readonly` **localName**: `string`

#### Inherited from

[Coder](Coder.md).[localName](Coder.md#localname)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L38)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:30](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L30)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L34)

___

### MAX\_SAFE\_INTEGER

▪ `Static` **MAX\_SAFE\_INTEGER**: `number`

#### Defined in

[packages/abi-coder/src/coders/number.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L11)

## Methods

### decode

▸ **decode**(`data`, `offset`): [`BigNumber`, `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[`BigNumber`, `number`]

#### Overrides

[Coder](Coder.md).[decode](Coder.md#decode)

#### Defined in

[packages/abi-coder/src/coders/number.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L48)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| `number` \| `BigNumber` |

#### Returns

`Uint8Array`

#### Overrides

[Coder](Coder.md).[encode](Coder.md#encode)

#### Defined in

[packages/abi-coder/src/coders/number.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L33)

___

### throwError

▸ **throwError**(`message`, `value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `value` | `unknown` |

#### Returns

`void`

#### Inherited from

[Coder](Coder.md).[throwError](Coder.md#throwerror)

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L47)
