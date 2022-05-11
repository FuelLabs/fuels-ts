---
layout: default
title: "@fuel-ts/contract"
has_children: true
has_toc: false
nav_order: 1
---

# Module: @fuel-ts/contract

## Classes

- [Contract](classes/Contract.md)
- [ContractFactory](classes/ContractFactory.md)

## Type aliases

### Overrides

Ƭ **Overrides**: `Partial`<{ `bytePrice`: `BigNumberish` ; `forward`: [`CoinQuantityLike`](../fuel-ts-providers/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity`: `BigNumberish` ; `variableOutputs`: `number` ; `transformRequest?`: (`transactionRequest`: [`ScriptTransactionRequest`](../fuel-ts-providers/classes/ScriptTransactionRequest.md)) => `Promise`<[`ScriptTransactionRequest`](../fuel-ts-providers/classes/ScriptTransactionRequest.md)\>  }\>

#### Defined in

[packages/contract/src/contract.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L15)

## Functions

### buildTransaction

▸ **buildTransaction**(`contract`, `func`, `args`, `options?`): `Promise`<[`ScriptTransactionRequest`](../fuel-ts-providers/classes/ScriptTransactionRequest.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](classes/Contract.md) |
| `func` | [`FunctionFragment`](../fuel-ts-abi-coder/classes/FunctionFragment.md) |
| `args` | `any`[] |
| `options?` | `Object` |
| `options.fundTransaction` | `boolean` |

#### Returns

`Promise`<[`ScriptTransactionRequest`](../fuel-ts-providers/classes/ScriptTransactionRequest.md)\>

#### Defined in

[packages/contract/src/contract.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contract.ts#L37)
