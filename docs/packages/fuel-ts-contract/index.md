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
- [FunctionInvocationResult](classes/FunctionInvocationResult.md)
- [FunctionInvocationScope](classes/FunctionInvocationScope.md)
- [InvocationResult](classes/InvocationResult.md)
- [MultiCallInvocationScope](classes/MultiCallInvocationScope.md)

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
| `contract` | [`Contract`](classes/Contract.md) |
| `forward?` | [`CoinQuantity`](namespaces/internal.md#coinquantity) |
| `func` | `FunctionFragment` |
| `txParameters?` | [`TxParams`](index.md#txparams) |

#### Defined in

[packages/contract/src/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L23)

___

### CallOptions

Ƭ **CallOptions**: `Partial`<{ `fundTransaction`: `boolean`  }\>

#### Defined in

[packages/contract/src/types.ts:19](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L19)

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

[packages/contract/src/types.ts:34](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L34)

___

### TransactionCostOptions

Ƭ **TransactionCostOptions**: `Partial`<{ `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\>

#### Defined in

[packages/contract/src/types.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L46)

___

### TxParams

Ƭ **TxParams**: `Partial`<{ `gasLimit`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

[packages/contract/src/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/types.ts#L13)
