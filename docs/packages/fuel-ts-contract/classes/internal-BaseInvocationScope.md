---
layout: default
title: BaseInvocationScope
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: BaseInvocationScope<TReturn\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).BaseInvocationScope

## Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

## Hierarchy

- **`BaseInvocationScope`**

  ↳ [`MultiCallInvocationScope`](internal-MultiCallInvocationScope.md)

  ↳ [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)

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

packages/program/dist/index.d.ts:42

## Properties

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[]

#### Defined in

packages/program/dist/index.d.ts:38

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean`

#### Defined in

packages/program/dist/index.d.ts:41

___

### program

• `Protected` **program**: [`AbstractProgram`](internal-AbstractProgram.md)

#### Defined in

packages/program/dist/index.d.ts:37

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Defined in

packages/program/dist/index.d.ts:40

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Defined in

packages/program/dist/index.d.ts:36

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

packages/program/dist/index.d.ts:39

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Returns

[`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Defined in

packages/program/dist/index.d.ts:43

## Methods

### addCall

▸ `Protected` **addCall**(`funcScope`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

packages/program/dist/index.d.ts:50

___

### addCalls

▸ `Protected` **addCalls**(`funcScopes`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

packages/program/dist/index.d.ts:51

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

packages/program/dist/index.d.ts:66

___

### call

▸ **call**<`T`\>(`options?`): `Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`, `void`\>\>

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

`Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`, `void`\>\>

#### Defined in

packages/program/dist/index.d.ts:82

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

#### Returns

`void`

#### Defined in

packages/program/dist/index.d.ts:53

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

packages/program/dist/index.d.ts:99

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

Add to the transaction scope the required amount of unspent UTXO's.

Required Amount = forward coins + transfers + gas fee.

#### Returns

`Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

#### Defined in

packages/program/dist/index.d.ts:64

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

packages/program/dist/index.d.ts:107

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Defined in

packages/program/dist/index.d.ts:48

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

packages/program/dist/index.d.ts:58

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

packages/program/dist/index.d.ts:74

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

packages/program/dist/index.d.ts:52

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

packages/program/dist/index.d.ts:90

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

packages/program/dist/index.d.ts:65

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

#### Returns

`void`

#### Defined in

packages/program/dist/index.d.ts:49

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

#### Returns

`void`

#### Defined in

packages/program/dist/index.d.ts:47

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

packages/program/dist/index.d.ts:44
