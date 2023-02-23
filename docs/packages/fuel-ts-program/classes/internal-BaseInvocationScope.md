---
layout: default
title: BaseInvocationScope
parent: "@fuel-ts/program"
nav_order: 1

---

# Class: BaseInvocationScope<TReturn\>

[@fuel-ts/program](../index.md).[internal](../namespaces/internal.md).BaseInvocationScope

## Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

## Hierarchy

- **`BaseInvocationScope`**

  ↳ [`FunctionInvocationScope`](FunctionInvocationScope.md)

  ↳ [`MultiCallInvocationScope`](MultiCallInvocationScope.md)

## Constructors

### constructor

• **new BaseInvocationScope**<`TReturn`\>(`program`, `isMultiCall`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |
| `isMultiCall` | `boolean` |

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:47](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L47)

## Properties

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] = `[]`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L42)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L45)

___

### program

• `Protected` **program**: [`AbstractProgram`](internal-AbstractProgram.md)

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L41)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)[] = `[]`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L44)

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L40)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L43)

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](../index.md#contractcall)[]

#### Returns

[`ContractCall`](../index.md#contractcall)[]

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L55)

## Methods

### addCall

▸ `Protected` **addCall**(`funcScope`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:100](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L100)

___

### addCalls

▸ `Protected` **addCalls**(`funcScopes`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:105](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L105)

___

### addContracts

▸ **addContracts**(`contracts`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`AbstractContract`](internal-AbstractContract.md)[] |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:181](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L181)

___

### call

▸ **call**<`T`\>(`options?`): `Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `void`\>\>

Submits a transaction to the blockchain.

This is a final action and will spend the coins and change the state of the contract.
It also means that invalid transactions will throw an error, and consume gas. To avoid this
running invalid tx and consuming gas try to `simulate` first when possible.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`, `void`\>\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:210](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L210)

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

#### Returns

`void`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:130](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L130)

___

### dryRun

▸ **dryRun**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

Executes a transaction in dry run mode, without UTXO validations.

A transaction in dry run mode can't change the state of the blockchain. It can be useful to access readonly
methods or just ust get.
The UTXO validation disable in this case, enables to send invalid inputs to emulate different conditions, of a
transaction

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:248](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L248)

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

Add to the transaction scope the required amount of unspent UTXO's.

Required Amount = forward coins + transfers + gas fee.

#### Returns

`Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:160](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L160)

___

### get

▸ **get**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

Executes a readonly contract method call.

Under the hood it uses the `dryRun` method but don't fund the transaction
with coins by default, for emulating executions with forward coins use `dryRun`
or pass the options.fundTransaction as true

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:273](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L273)

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:71](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L71)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

Run a valid transaction in dryRun mode and returns useful details about
gasUsed, gasPrice and transaction estimate fee in native coins.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\> |

#### Returns

`Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:143](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L143)

___

### getTransactionRequest

▸ **getTransactionRequest**(`options?`): `Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

Prepare transaction request object, adding Inputs, Outputs, coins, check gas costs
and transaction validity.

It's possible to get the transaction without adding coins, by passing `fundTransaction`
as false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`TransactionRequest`](../namespaces/internal.md#transactionrequest)\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:198](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L198)

___

### prepareTransaction

▸ `Protected` **prepareTransaction**(`options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:112](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L112)

___

### simulate

▸ **simulate**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

Run a valid transaction and return the result without change the chain state.
This means, all signatures are validated but no UTXO is spent.

This method is useful for validate propose to avoid spending coins on invalid TXs, also
to estimate the amount of gas that will be required to run the transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:231](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L231)

___

### txParams

▸ **txParams**(`txParams`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\> |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L170)

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

#### Returns

`void`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:82](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L82)

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

#### Returns

`void`

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:63](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L63)

___

### getCallOptions

▸ `Static` `Protected` **getCallOptions**(`options?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fundTransaction` | `boolean` |

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/program/src/functions/base-invocation-scope.ts#L59)
