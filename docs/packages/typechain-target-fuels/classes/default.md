---
layout: default
title: default
parent: "typechain-target-fuels"
nav_order: 1

---

# Class: default

[typechain-target-fuels](../index.md).default

## Hierarchy

- [`TypeChainTarget`](internal-TypeChainTarget.md)

  ↳ **`default`**

## Constructors

### constructor

• **new default**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../interfaces/internal-Config.md) |

#### Overrides

[TypeChainTarget](internal-TypeChainTarget.md).[constructor](internal-TypeChainTarget.md#constructor)

## Properties

### allContracts

• `Private` `Readonly` **allContracts**: `string`[]

#### Defined in

[packages/typechain-target-fuels/src/index.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L19)

___

### cfg

• `Readonly` **cfg**: [`Config`](../interfaces/internal-Config.md)

#### Inherited from

[TypeChainTarget](internal-TypeChainTarget.md).[cfg](internal-TypeChainTarget.md#cfg)

#### Defined in

packages/fuelchain/dist/typechain/types.d.ts:34

___

### contractCache

• `Private` `Readonly` **contractCache**: `Dictionary`<`undefined` \| { `abi`: [`RawAbiDefinition`](../interfaces/internal-RawAbiDefinition.md)[] ; `contract`: [`Contract`](../interfaces/internal-Contract.md)  }, `string`\> = `{}`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:21](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L21)

___

### name

• **name**: `string` = `'Fuels'`

#### Overrides

[TypeChainTarget](internal-TypeChainTarget.md).[name](internal-TypeChainTarget.md#name)

#### Defined in

[packages/typechain-target-fuels/src/index.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L17)

___

### outDirAbs

• `Private` `Readonly` **outDirAbs**: `string`

#### Defined in

[packages/typechain-target-fuels/src/index.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/typechain-target-fuels/src/index.ts#L20)

## Methods

### afterRun

▸ **afterRun**(): [`FileDescription`](../interfaces/internal-FileDescription.md)[]

#### Returns

[`FileDescription`](../interfaces/internal-FileDescription.md)[]

#### Overrides

[TypeChainTarget](internal-TypeChainTarget.md).[afterRun](internal-TypeChainTarget.md#afterrun)

___

### beforeRun

▸ **beforeRun**(): [`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Returns

[`Output`](../namespaces/internal.md#output) \| `Promise`<[`Output`](../namespaces/internal.md#output)\>

#### Inherited from

[TypeChainTarget](internal-TypeChainTarget.md).[beforeRun](internal-TypeChainTarget.md#beforerun)

___

### genContractTypingsFile

▸ **genContractTypingsFile**(`contract`, `codegenConfig`): [`FileDescription`](../interfaces/internal-FileDescription.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](../interfaces/internal-Contract.md) |
| `codegenConfig` | [`CodegenConfig`](../interfaces/internal-CodegenConfig.md) |

#### Returns

[`FileDescription`](../interfaces/internal-FileDescription.md)

___

### genReExports

▸ `Private` **genReExports**(): `string`

#### Returns

`string`

___

### transformFile

▸ **transformFile**(`file`): `void` \| [`FileDescription`](../interfaces/internal-FileDescription.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `file` | [`FileDescription`](../interfaces/internal-FileDescription.md) |

#### Returns

`void` \| [`FileDescription`](../interfaces/internal-FileDescription.md)[]

#### Overrides

[TypeChainTarget](internal-TypeChainTarget.md).[transformFile](internal-TypeChainTarget.md#transformfile)
