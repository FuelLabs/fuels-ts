[**@fuel-ts/program v0.94.6**](../index.md) • **Docs**

***

# Class: InstructionSet

A wrapper around fuel-asm to make dynamic instructions and convert to different formats

## Constructors

### new InstructionSet()

> **new InstructionSet**(...`args`): [`InstructionSet`](InstructionSet.md)

#### Parameters

• ...**args**: `Instruction`[]

#### Returns

[`InstructionSet`](InstructionSet.md)

#### Defined in

[instruction-set.ts:10](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L10)

## Methods

### byteLength()

> **byteLength**(): `number`

#### Returns

`number`

#### Defined in

[instruction-set.ts:47](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L47)

***

### concat()

> **concat**(`ops`): `Instruction`[]

#### Parameters

• **ops**: `Instruction`[]

#### Returns

`Instruction`[]

#### Defined in

[instruction-set.ts:22](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L22)

***

### entries()

> **entries**(): `Instruction`[]

#### Returns

`Instruction`[]

#### Defined in

[instruction-set.ts:14](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L14)

***

### extend()

> **extend**(`ops`): `void`

#### Parameters

• **ops**: `Instruction`[]

#### Returns

`void`

#### Defined in

[instruction-set.ts:26](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L26)

***

### push()

> **push**(...`args`): `void`

#### Parameters

• ...**args**: `Instruction`[]

#### Returns

`void`

#### Defined in

[instruction-set.ts:18](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L18)

***

### toBytes()

> **toBytes**(): `Uint8Array`

#### Returns

`Uint8Array`

#### Defined in

[instruction-set.ts:30](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L30)

***

### toHex()

> **toHex**(): `string`

#### Returns

`string`

#### Defined in

[instruction-set.ts:39](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L39)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[instruction-set.ts:43](https://github.com/FuelLabs/fuels-ts/blob/edc427a506b3935e5c3045680dbc2670666cb638/packages/program/src/instruction-set.ts#L43)
