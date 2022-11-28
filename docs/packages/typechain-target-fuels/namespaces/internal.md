---
layout: default
title: internal
parent: "typechain-target-fuels"
nav_order: 3

---

# Namespace: internal

[typechain-target-fuels](../index.md).internal

## Classes

- [TypeChainTarget](../classes/internal-TypeChainTarget.md)

## Interfaces

- [AbiOutputParameter](../interfaces/internal-AbiOutputParameter.md)
- [AbiParameter](../interfaces/internal-AbiParameter.md)
- [CodegenConfig](../interfaces/internal-CodegenConfig.md)
- [Config](../interfaces/internal-Config.md)
- [Contract](../interfaces/internal-Contract.md)
- [FileDescription](../interfaces/internal-FileDescription.md)
- [FunctionDeclaration](../interfaces/internal-FunctionDeclaration.md)
- [FunctionDocumentation](../interfaces/internal-FunctionDocumentation.md)
- [RawAbiDefinition](../interfaces/internal-RawAbiDefinition.md)
- [RawAbiParameter](../interfaces/internal-RawAbiParameter.md)

## Type Aliases

### AddressType

Ƭ **AddressType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `type` | ``"address"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:62](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L62)

___

### ArrayType

Ƭ **ArrayType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `itemType` | [`SvmType`](internal.md#svmtype) |
| `originalType` | `string` |
| `size?` | `number` |
| `type` | ``"array"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L71)

___

### B256Type

Ƭ **B256Type**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `type` | ``"b256"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:58](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L58)

___

### BoolType

Ƭ **BoolType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `type` | ``"bool"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L29)

___

### ByteType

Ƭ **ByteType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `size` | ``1`` |
| `type` | ``"byte"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:53](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L53)

___

### EnumType

Ƭ **EnumType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components` | [`SvmSymbol`](internal.md#svmsymbol)[] |
| `originalType` | `string` |
| `structName` | `string` |
| `type` | ``"enum"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:83](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L83)

___

### Output

Ƭ **Output**: `void` \| [`FileDescription`](../interfaces/internal-FileDescription.md) \| [`FileDescription`](../interfaces/internal-FileDescription.md)[]

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:41

___

### StringType

Ƭ **StringType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `size` | `number` |
| `type` | ``"string"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:66](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L66)

___

### StructType

Ƭ **StructType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components` | [`SvmSymbol`](internal.md#svmsymbol)[] |
| `originalType` | `string` |
| `structName` | `string` |
| `type` | ``"struct"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:89](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L89)

___

### SvmOutputType

Ƭ **SvmOutputType**: [`SvmType`](internal.md#svmtype) \| [`VoidType`](internal.md#voidtype)

Like SvmType but with void

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:27](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L27)

___

### SvmSymbol

Ƭ **SvmSymbol**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `type` | [`SvmType`](internal.md#svmtype) |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L105)

___

### SvmType

Ƭ **SvmType**: [`BoolType`](internal.md#booltype) \| [`U8intType`](internal.md#u8inttype) \| [`U16intType`](internal.md#u16inttype) \| [`U32intType`](internal.md#u32inttype) \| [`U64intType`](internal.md#u64inttype) \| [`ByteType`](internal.md#bytetype) \| [`B256Type`](internal.md#b256type) \| [`AddressType`](internal.md#addresstype) \| [`StringType`](internal.md#stringtype) \| [`ArrayType`](internal.md#arraytype) \| [`TupleType`](internal.md#tupletype) \| [`EnumType`](internal.md#enumtype) \| [`StructType`](internal.md#structtype) \| [`UnknownType`](internal.md#unknowntype)

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L7)

___

### TupleType

Ƭ **TupleType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `components` | [`SvmSymbol`](internal.md#svmsymbol)[] |
| `originalType` | `string` |
| `structName` | `string` |
| `type` | ``"tuple"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:77](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L77)

___

### U16intType

Ƭ **U16intType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bits` | ``16`` |
| `originalType` | `string` |
| `type` | ``"u16"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L38)

___

### U32intType

Ƭ **U32intType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bits` | ``32`` |
| `originalType` | `string` |
| `type` | ``"u32"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L43)

___

### U64intType

Ƭ **U64intType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bits` | ``64`` |
| `originalType` | `string` |
| `type` | ``"u64"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:48](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L48)

___

### U8intType

Ƭ **U8intType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bits` | ``8`` |
| `originalType` | `string` |
| `type` | ``"u8"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:33](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L33)

___

### UnknownType

Ƭ **UnknownType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `originalType` | `string` |
| `type` | ``"unknown"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L96)

___

### VoidType

Ƭ **VoidType**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"void"`` |

#### Defined in

[packages/typechain-target-fuels/src/parser/parseSvmTypes.ts:101](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/parser/parseSvmTypes.ts#L101)
