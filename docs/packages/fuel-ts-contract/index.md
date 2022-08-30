---
layout: default
title: "@fuel-ts/contract"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/contract

## Namespaces

- [ContractUtils](namespaces/ContractUtils.md)
- [internal](namespaces/internal.md)

## Classes

- [Contract](classes/Contract.md)
- [ContractFactory](classes/ContractFactory.md)

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
| `callParameters?` | [`CallParams`](index.md#callparams) |
| `contract` | [`Contract`](classes/Contract.md) |
| `forward?` | [`CoinQuantity`](namespaces/internal.md#coinquantity) |
| `func` | `FunctionFragment` |
| `txParameters?` | [`TxParams`](index.md#txparams) |

#### Defined in

[packages/contract/src/types.ts:24](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L24)

___

### CallOptions

Ƭ **CallOptions**: `Partial`<{ `fundTransaction`: `boolean`  }\>

#### Defined in

[packages/contract/src/types.ts:20](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L20)

___

### CallParams

Ƭ **CallParams**: `Partial`<{ `forward`: [`CoinQuantityLike`](namespaces/internal.md#coinquantitylike) ; `gasLimit`: [`BigNumberish`](namespaces/internal.md#bignumberish)  }\>

#### Defined in

[packages/contract/src/types.ts:8](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L8)

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

[packages/contract/src/types.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L42)

___

### InvokeFunction

Ƭ **InvokeFunction**<`TArgs`, `TReturn`\>: (...`args`: `TArgs`) => [`FunctionInvocationScope`](classes/internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

#### Type declaration

▸ (...`args`): [`FunctionInvocationScope`](classes/internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

##### Returns

[`FunctionInvocationScope`](classes/internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Defined in

[packages/contract/src/types.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L34)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`<{ `bytePrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\>

#### Defined in

[packages/contract/src/types.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L46)

___

### TxParams

Ƭ **TxParams**: `Partial`<{ `bytePrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `gasLimit`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

[packages/contract/src/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L13)
