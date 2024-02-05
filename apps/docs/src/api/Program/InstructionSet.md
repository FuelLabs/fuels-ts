# Class: InstructionSet

[@fuel-ts/program](/api/Program/index.md).InstructionSet

A wrapper around fuel-asm to make dynamic instructions and convert to different formats

## Constructors

### constructor

• **new InstructionSet**(`...args`): [`InstructionSet`](/api/Program/InstructionSet.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Instruction`[] |

#### Returns

[`InstructionSet`](/api/Program/InstructionSet.md)

#### Defined in

[packages/program/src/instruction-set.ts:11](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L11)

## Properties

### #operations

• `Private` **#operations**: `Instruction`[]

#### Defined in

[packages/program/src/instruction-set.ts:9](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L9)

## Methods

### byteLength

▸ **byteLength**(): `number`

#### Returns

`number`

#### Defined in

[packages/program/src/instruction-set.ts:48](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L48)

___

### concat

▸ **concat**(`ops`): `Instruction`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `ops` | `Instruction`[] |

#### Returns

`Instruction`[]

#### Defined in

[packages/program/src/instruction-set.ts:23](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L23)

___

### entries

▸ **entries**(): `Instruction`[]

#### Returns

`Instruction`[]

#### Defined in

[packages/program/src/instruction-set.ts:15](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L15)

___

### extend

▸ **extend**(`ops`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ops` | `Instruction`[] |

#### Returns

`void`

#### Defined in

[packages/program/src/instruction-set.ts:27](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L27)

___

### push

▸ **push**(`...args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Instruction`[] |

#### Returns

`void`

#### Defined in

[packages/program/src/instruction-set.ts:19](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L19)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[packages/program/src/instruction-set.ts:31](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L31)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[packages/program/src/instruction-set.ts:40](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L40)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/program/src/instruction-set.ts:44](https://github.com/FuelLabs/fuels-ts/blob/884f602f/packages/program/src/instruction-set.ts#L44)
