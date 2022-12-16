---
layout: default
title: internal
parent: "@fuel-ts/abi-coder"
nav_order: 3

---

# Namespace: internal

[@fuel-ts/abi-coder](../index.md).internal

## Classes

- [BN](../classes/internal-BN.md)
- [ParamType](../classes/internal-ParamType.md)

## Interfaces

- [BNHelper](../interfaces/internal-BNHelper.md)
- [BNHiddenTypes](../interfaces/internal-BNHiddenTypes.md)
- [BNInputOverrides](../interfaces/internal-BNInputOverrides.md)
- [BNOverrides](../interfaces/internal-BNOverrides.md)
- [FragmentParams](../interfaces/internal-FragmentParams.md)
- [JsonFragmentType](../interfaces/internal-JsonFragmentType.md)
- [ParamTypeProps](../interfaces/internal-ParamTypeProps.md)

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

Ƭ **DecodedValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Decoded"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/array.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L7)

___

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoders`\>: `RequireExactlyOne`<{ [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/Coder.md)\> |

#### Defined in

[packages/abi-coder/src/coders/enum.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L12)

___

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/Coder.md)\> |

#### Defined in

[packages/abi-coder/src/coders/struct.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L10)

___

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Decoded"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends [`Coder`](../classes/Coder.md)[] |

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L9)

___

### DecodedValueOf

Ƭ **DecodedValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Decoded"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/vec.ts:12](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/vec.ts#L12)

___

### FormatConfig

Ƭ **FormatConfig**: { `units?`: `number`  } & [`ToFixedConfig`](internal.md#tofixedconfig)

#### Defined in

[packages/math/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/math/src/types.ts#L8)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Input"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/array.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/array.ts#L6)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoders`\>: `RequireExactlyOne`<{ [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Input"] }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/Coder.md)\> |

#### Defined in

[packages/abi-coder/src/coders/enum.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/enum.ts#L9)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Input"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends `Record`<`string`, [`Coder`](../classes/Coder.md)\> |

#### Defined in

[packages/abi-coder/src/coders/struct.ts:7](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/struct.ts#L7)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoders`\>: { [P in keyof TCoders]: TypesOfCoder<TCoders[P]\>["Input"] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoders` | extends [`Coder`](../classes/Coder.md)[] |

#### Defined in

[packages/abi-coder/src/coders/tuple.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/tuple.ts#L6)

___

### InputValueOf

Ƭ **InputValueOf**<`TCoder`\>: [`TypesOfCoder`](../index.md#typesofcoder)<`TCoder`\>[``"Input"``][]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TCoder` | extends [`Coder`](../classes/Coder.md) |

#### Defined in

[packages/abi-coder/src/coders/vec.ts:11](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/vec.ts#L11)

___

### NumberCoderType

Ƭ **NumberCoderType**: ``"u8"`` \| ``"u16"`` \| ``"u32"``

#### Defined in

[packages/abi-coder/src/coders/number.ts:5](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/number.ts#L5)

___

### Option

Ƭ **Option**<`T`\>: `T` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[packages/abi-coder/src/coders/option.ts:6](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/option.ts#L6)

___

### Primitive

Ƭ **Primitive**: `string` \| `number` \| `boolean`

#### Defined in

[packages/abi-coder/src/coders/abstract-coder.ts:10](https://github.com/FuelLabs/fuels-ts/blob/master/packages/abi-coder/src/coders/abstract-coder.ts#L10)

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
