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

• **new NumberCoder**(`localName`, `baseType`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `localName` | `string` |
| `baseType` | `string` |

#### Overrides

[Coder](Coder.md).[constructor](Coder.md#constructor)

#### Defined in

[abi-coder/src/coders/number.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L13)

## Properties

### baseType

• **baseType**: `string`

#### Defined in

[abi-coder/src/coders/number.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L10)

___

### length

• **length**: `number`

#### Defined in

[abi-coder/src/coders/number.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L9)

___

### localName

• `Readonly` **localName**: `string`

#### Inherited from

[Coder](Coder.md).[localName](Coder.md#localname)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L36)

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](Coder.md).[name](Coder.md#name)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L28)

___

### type

• `Readonly` **type**: `string`

#### Inherited from

[Coder](Coder.md).[type](Coder.md#type)

#### Defined in

[abi-coder/src/coders/abstract-coder.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L32)

___

### MAX\_SAFE\_INTEGER

▪ `Static` **MAX\_SAFE\_INTEGER**: `number`

#### Defined in

[abi-coder/src/coders/number.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L11)

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

[abi-coder/src/coders/number.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L48)

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

[abi-coder/src/coders/number.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L33)

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

[abi-coder/src/coders/abstract-coder.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L45)
