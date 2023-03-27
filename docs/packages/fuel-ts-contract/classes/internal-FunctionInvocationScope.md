---
layout: default
title: FunctionInvocationScope
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: FunctionInvocationScope<TArgs, TReturn\>

[@fuel-ts/contract](../index.md).[internal](../namespaces/internal.md).FunctionInvocationScope

## Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

## Hierarchy

- [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

  ↳ **`FunctionInvocationScope`**

## Constructors

### constructor

• **new FunctionInvocationScope**<`TArgs`, `TReturn`\>(`program`, `func`, `args`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `program` | [`AbstractProgram`](internal-AbstractProgram.md) |
| `func` | [`FunctionFragment`](internal-FunctionFragment.md) |
| `args` | `TArgs` |

#### Overrides

[BaseInvocationScope](internal-BaseInvocationScope.md).[constructor](internal-BaseInvocationScope.md#constructor)

#### Defined in

packages/program/dist/index.d.ts:115

## Properties

### args

• `Protected` **args**: `TArgs`

#### Defined in

packages/program/dist/index.d.ts:114

___

### callParameters

• `Private` `Optional` **callParameters**: `any`

#### Defined in

packages/program/dist/index.d.ts:112

___

### forward

• `Private` `Optional` **forward**: `any`

#### Defined in

packages/program/dist/index.d.ts:113

___

### func

• `Protected` **func**: [`FunctionFragment`](internal-FunctionFragment.md)

#### Defined in

packages/program/dist/index.d.ts:111

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[]

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[functionInvocationScopes](internal-BaseInvocationScope.md#functioninvocationscopes)

#### Defined in

packages/program/dist/index.d.ts:38

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[isMultiCall](internal-BaseInvocationScope.md#ismulticall)

#### Defined in

packages/program/dist/index.d.ts:41

___

### program

• `Protected` **program**: [`AbstractProgram`](internal-AbstractProgram.md)

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[program](internal-BaseInvocationScope.md#program)

#### Defined in

packages/program/dist/index.d.ts:37

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[requiredCoins](internal-BaseInvocationScope.md#requiredcoins)

#### Defined in

packages/program/dist/index.d.ts:40

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[transactionRequest](internal-BaseInvocationScope.md#transactionrequest)

#### Defined in

packages/program/dist/index.d.ts:36

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[txParameters](internal-BaseInvocationScope.md#txparameters)

#### Defined in

packages/program/dist/index.d.ts:39

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Returns

[`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Inherited from

BaseInvocationScope.calls

#### Defined in

packages/program/dist/index.d.ts:43

## Methods

### addCall

▸ `Protected` **addCall**(`funcScope`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\> |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCall](internal-BaseInvocationScope.md#addcall)

#### Defined in

packages/program/dist/index.d.ts:50

___

### addCalls

▸ `Protected` **addCalls**(`funcScopes`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../namespaces/internal.md#invocationscopelike)<`unknown`\>[] |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCalls](internal-BaseInvocationScope.md#addcalls)

#### Defined in

packages/program/dist/index.d.ts:51

___

### addContracts

▸ **addContracts**(`contracts`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`AbstractContract`](internal-AbstractContract.md)[] |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addContracts](internal-BaseInvocationScope.md#addcontracts)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[call](internal-BaseInvocationScope.md#call)

#### Defined in

packages/program/dist/index.d.ts:82

___

### callParams

▸ **callParams**(`callParams`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callParams` | `Partial`<{ `forward`: [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike) ; `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish)  }\> |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Defined in

packages/program/dist/index.d.ts:118

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[checkGasLimitTotal](internal-BaseInvocationScope.md#checkgaslimittotal)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[dryRun](internal-BaseInvocationScope.md#dryrun)

#### Defined in

packages/program/dist/index.d.ts:99

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`<[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>\>

Add to the transaction scope the required amount of unspent UTXO's.

Required Amount = forward coins + transfers + gas fee.

#### Returns

`Promise`<[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[fundWithRequiredCoins](internal-BaseInvocationScope.md#fundwithrequiredcoins)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[get](internal-BaseInvocationScope.md#get)

#### Defined in

packages/program/dist/index.d.ts:107

___

### getCallConfig

▸ **getCallConfig**(): [`CallConfig`](../namespaces/internal.md#callconfig)<`TArgs`\>

#### Returns

[`CallConfig`](../namespaces/internal.md#callconfig)<`TArgs`\>

#### Defined in

packages/program/dist/index.d.ts:116

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getRequiredCoins](internal-BaseInvocationScope.md#getrequiredcoins)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getTransactionCost](internal-BaseInvocationScope.md#gettransactioncost)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getTransactionRequest](internal-BaseInvocationScope.md#gettransactionrequest)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[prepareTransaction](internal-BaseInvocationScope.md#preparetransaction)

#### Defined in

packages/program/dist/index.d.ts:52

___

### setArguments

▸ **setArguments**(...`args`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Defined in

packages/program/dist/index.d.ts:117

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[simulate](internal-BaseInvocationScope.md#simulate)

#### Defined in

packages/program/dist/index.d.ts:90

___

### txParams

▸ **txParams**(`txParams`): [`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\> |

#### Returns

[`FunctionInvocationScope`](internal-FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[txParams](internal-BaseInvocationScope.md#txparams)

#### Defined in

packages/program/dist/index.d.ts:65

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[updateRequiredCoins](internal-BaseInvocationScope.md#updaterequiredcoins)

#### Defined in

packages/program/dist/index.d.ts:49

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[updateScriptRequest](internal-BaseInvocationScope.md#updatescriptrequest)

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

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getCallOptions](internal-BaseInvocationScope.md#getcalloptions)

#### Defined in

packages/program/dist/index.d.ts:44
