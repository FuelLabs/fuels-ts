---
layout: default
title: WitnessCoder
parent: "@fuel-ts/transactions"
nav_order: 1

---

# Class: WitnessCoder

[@fuel-ts/transactions](../index.md).WitnessCoder

## Hierarchy

- [`Coder`](internal-Coder.md)<[`Witness`](../index.md#witness), [`Witness`](../index.md#witness)\>

  ↳ **`WitnessCoder`**

## Constructors

### constructor

• **new WitnessCoder**()

#### Overrides

[Coder](internal-Coder.md).[constructor](internal-Coder.md#constructor)

#### Defined in

[packages/transactions/src/coders/witness.ts:14](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L14)

## Properties

### encodedLength

• `Readonly` **encodedLength**: `number`

#### Inherited from

[Coder](internal-Coder.md).[encodedLength](internal-Coder.md#encodedlength)

#### Defined in

packages/abi-coder/dist/index.d.ts:42

___

### name

• `Readonly` **name**: `string`

#### Inherited from

[Coder](internal-Coder.md).[name](internal-Coder.md#name)

#### Defined in

packages/abi-coder/dist/index.d.ts:40

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

▸ **decode**(`data`, `offset`): [[`Witness`](../index.md#witness), `number`]

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `offset` | `number` |

#### Returns

[[`Witness`](../index.md#witness), `number`]

#### Overrides

[Coder](internal-Coder.md).[decode](internal-Coder.md#decode)

#### Defined in

[packages/transactions/src/coders/witness.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L32)

___

### encode

▸ **encode**(`value`): `Uint8Array`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Witness`](../index.md#witness) |

#### Returns

`Uint8Array`

#### Overrides

[Coder](internal-Coder.md).[encode](internal-Coder.md#encode)

#### Defined in

[packages/transactions/src/coders/witness.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/transactions/src/coders/witness.ts#L23)

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
