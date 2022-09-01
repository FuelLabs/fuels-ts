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

• **new BaseInvocationScope**<`TReturn`\>(`contract`, `isMultiCall`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](Contract.md) |
| `isMultiCall` | `boolean` |

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L43)

## Properties

### contract

• `Protected` **contract**: [`Contract`](Contract.md)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:37](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L37)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] = `[]`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:38](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L38)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L41)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)[] = `[]`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:40](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L40)

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:36](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L36)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`<{ `bytePrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:39](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L39)

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Returns

[`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:51](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L51)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:96](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L96)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:101](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L101)

___

### addContracts

▸ **addContracts**(`contracts`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`ContractIdLike`](../namespaces/internal.md#contractidlike)[] |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:182](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L182)

___

### call

▸ **call**<`T`\>(`options?`): `Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`\>\>

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

`Promise`<[`FunctionInvocationResult`](internal-FunctionInvocationResult.md)<`T`\>\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:194](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L194)

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

#### Returns

`void`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:126](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L126)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:231](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L231)

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

Add to the transaction scope the required amount of unspent UTXO's.

Required Amount = forward coins + transfers + gas fee.

#### Returns

`Promise`<[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:160](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L160)

___

### get

▸ **get**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

Executes a readonly contract method call.

Under the hood it uses the `dryRun` method.

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:254](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L254)

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:67](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L67)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

Run a valid transaction in dryRun mode and returns useful details about
gasUsed, gasPrice, bytePrice and transaction estimate fee in native coins.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `bytePrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\> |

#### Returns

`Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:142](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L142)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:108](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L108)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:214](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L214)

___

### txParams

▸ **txParams**(`txParams`): [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `Partial`<{ `bytePrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\> |

#### Returns

[`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:170](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L170)

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

#### Returns

`void`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:78](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L78)

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

#### Returns

`void`

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:59](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L59)

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

[packages/contract/src/contracts/functions/base-invocation-scope.ts:55](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L55)
