---
layout: default
title: "@fuel-ts/program"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/program

## Namespaces

- [internal](namespaces/internal.md)

## Classes

- [Contract](classes/Contract.md)
- [FunctionInvocationResult](classes/FunctionInvocationResult.md)
- [FunctionInvocationScope](classes/FunctionInvocationScope.md)
- [InvocationResult](classes/InvocationResult.md)
- [MultiCallInvocationScope](classes/MultiCallInvocationScope.md)
- [ScriptRequest](classes/ScriptRequest.md)
- [ScriptResultDecoderError](classes/ScriptResultDecoderError.md)

## Interfaces

- [InvokeFunctions](interfaces/InvokeFunctions.md)

## Type Aliases

### CallConfig

Ƭ **CallConfig**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `args` | `T` |
| `bytesOffset` | `number` |
| `callParameters?` | [`CallParams`](index.md#callparams) |
| `forward?` | [`CoinQuantity`](namespaces/internal.md#coinquantity) |
| `func` | `FunctionFragment` |
| `program` | [`AbstractProgram`](classes/internal-AbstractProgram.md) |
| `txParameters?` | [`TxParams`](index.md#txparams) |

#### Defined in

[packages/program/src/types.ts:32](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L32)

___

### CallOptions

Ƭ **CallOptions**: `Partial`<{ `fundTransaction`: `boolean`  }\>

#### Defined in

[packages/program/src/types.ts:28](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L28)

___

### CallParams

Ƭ **CallParams**: `Partial`<{ `forward`: [`CoinQuantityLike`](namespaces/internal.md#coinquantitylike) ; `gasLimit`: [`BigNumberish`](namespaces/internal.md#bignumberish)  }\>

#### Defined in

[packages/program/src/types.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L17)

___

### ContractCall

Ƭ **ContractCall**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount?` | [`BigNumberish`](namespaces/internal.md#bignumberish) |
| `assetId?` | `BytesLike` |
| `contractId` | [`AbstractAddress`](classes/internal-AbstractAddress.md) |
| `data` | `BytesLike` |
| `gas?` | [`BigNumberish`](namespaces/internal.md#bignumberish) |

#### Defined in

[packages/program/src/types.ts:9](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L9)

___

### InvocationScopeLike

Ƭ **InvocationScopeLike**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getCallConfig` | () => [`CallConfig`](index.md#callconfig)<`T`\> |

#### Defined in

[packages/program/src/types.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L51)

___

### InvokeFunction

Ƭ **InvokeFunction**<`TArgs`, `TReturn`\>: (...`args`: `TArgs`) => [`FunctionInvocationScope`](classes/FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

#### Type declaration

▸ (...`args`): [`FunctionInvocationScope`](classes/FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

[`FunctionInvocationScope`](classes/FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Defined in

[packages/program/src/types.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L43)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`<{ `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\>

#### Defined in

[packages/program/src/types.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L55)

___

### TxParams

Ƭ **TxParams**: `Partial`<{ `gasLimit`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

[packages/program/src/types.ts:22](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/types.ts#L22)

## Functions

### assert

▸ **assert**(`condition`, `message`): asserts condition

Generic assert function to avoid undesirable errors

#### Parameters

| Name | Type |
| :------ | :------ |
| `condition` | `unknown` |
| `message` | `string` |

#### Returns

asserts condition

#### Defined in

[packages/program/src/utils.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/utils.ts#L24)

___

### getDocs

▸ **getDocs**(`status`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `status` | `Object` |
| `status.reason` | `any` |
| `status.type` | ``"failure"`` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `doc` | `string` |
| `reason` | `string` |

#### Defined in

[packages/program/src/utils.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/utils.ts#L8)
