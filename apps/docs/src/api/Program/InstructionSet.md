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

[instruction-set.ts:10](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L10)

## Properties

### #operations

• `Private` **#operations**: `Instruction`[]

#### Defined in

[instruction-set.ts:8](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L8)

## Methods

### byteLength

▸ **byteLength**(): `number`

#### Returns

`number`

#### Defined in

[instruction-set.ts:47](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L47)

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

[instruction-set.ts:22](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L22)

___

### entries

▸ **entries**(): `Instruction`[]

#### Returns

`Instruction`[]

#### Defined in

[instruction-set.ts:14](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L14)

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

[instruction-set.ts:26](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L26)

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

[instruction-set.ts:18](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L18)

___

### toBytes

▸ **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[instruction-set.ts:30](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L30)

___

### toHex

▸ **toHex**(): `string`

#### Returns

`string`

#### Defined in

[instruction-set.ts:39](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L39)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[instruction-set.ts:43](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/program/src/instruction-set.ts#L43)
