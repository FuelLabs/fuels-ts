---
layout: default
title: default
parent: "typechain-target-fuels"
nav_order: 1

---

# Class: default

[typechain-target-fuels](../index.md).default

## Hierarchy

- `TypeChainTarget`

  ↳ **`default`**

## Constructors

### constructor

• **new default**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Config` |

#### Overrides

TypeChainTarget.constructor

#### Defined in

[packages/typechain-target-fuels/src/index.ts:29](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L29)

## Properties

### allContracts

• `Private` `Readonly` **allContracts**: `string`[]

#### Defined in

[packages/typechain-target-fuels/src/index.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L19)

___

### contractCache

• `Private` `Readonly` **contractCache**: `Dictionary`<`undefined` \| { `abi`: [`RawAbiDefinition`](../interfaces/internal-RawAbiDefinition.md)[] ; `contract`: [`Contract`](../../fuel-ts-contract/classes/Contract.md)  }, `string`\> = `{}`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L21)

___

### name

• **name**: `string` = `'Fuels'`

#### Overrides

TypeChainTarget.name

#### Defined in

[packages/typechain-target-fuels/src/index.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L17)

___

### outDirAbs

• `Private` `Readonly` **outDirAbs**: `string`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L20)

## Methods

### afterRun

▸ **afterRun**(): `FileDescription`[]

#### Returns

`FileDescription`[]

#### Overrides

TypeChainTarget.afterRun

#### Defined in

[packages/typechain-target-fuels/src/index.ts:61](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L61)

___

### genContractTypingsFile

▸ **genContractTypingsFile**(`contract`, `codegenConfig`): `FileDescription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../../fuel-ts-contract/classes/Contract.md) |
| `codegenConfig` | `CodegenConfig` |

#### Returns

`FileDescription`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:54](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L54)

___

### genReExports

▸ `Private` **genReExports**(): `string`

#### Returns

`string`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:87](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L87)

___

### transformFile

▸ **transformFile**(`file`): `void` \| `FileDescription`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | `FileDescription` |

#### Returns

`void` \| `FileDescription`[]

#### Overrides

TypeChainTarget.transformFile

#### Defined in

[packages/typechain-target-fuels/src/index.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L39)
