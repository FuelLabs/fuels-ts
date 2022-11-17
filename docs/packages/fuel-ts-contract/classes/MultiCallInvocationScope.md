---
layout: default
title: MultiCallInvocationScope
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: MultiCallInvocationScope<TReturn\>

[@fuel-ts/contract](../index.md).MultiCallInvocationScope

## Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

## Hierarchy

- [`BaseInvocationScope`](internal-BaseInvocationScope.md)<`TReturn`\>

  ↳ **`MultiCallInvocationScope`**

## Constructors

### constructor

• **new MultiCallInvocationScope**<`TReturn`\>(`contract`, `funcScopes`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](Contract.md) |
| `funcScopes` | [`FunctionInvocationScope`](FunctionInvocationScope.md)<`any`[], `any`\>[] |

#### Overrides

[BaseInvocationScope](internal-BaseInvocationScope.md).[constructor](internal-BaseInvocationScope.md#constructor)

## Properties

### contract

• `Protected` **contract**: [`Contract`](Contract.md)

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[contract](internal-BaseInvocationScope.md#contract)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L42)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] = `[]`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[functionInvocationScopes](internal-BaseInvocationScope.md#functioninvocationscopes)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:43](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L43)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[isMultiCall](internal-BaseInvocationScope.md#ismulticall)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:46](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L46)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)[] = `[]`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[requiredCoins](internal-BaseInvocationScope.md#requiredcoins)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:45](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L45)

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](internal-ScriptTransactionRequest.md)

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[transactionRequest](internal-BaseInvocationScope.md#transactionrequest)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:41](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L41)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[txParameters](internal-BaseInvocationScope.md#txparameters)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:44](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L44)

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Returns

[`ContractCall`](../namespaces/internal.md#contractcall)[]

#### Inherited from

BaseInvocationScope.calls

## Methods

### addCall

▸ **addCall**(`funcScope`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`FunctionInvocationScope`](FunctionInvocationScope.md)<`any`[], `any`\> |

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Overrides

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCall](internal-BaseInvocationScope.md#addcall)

___

### addCalls

▸ **addCalls**(`funcScopes`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`FunctionInvocationScope`](FunctionInvocationScope.md)<`any`[], `any`\>[] |

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Overrides

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCalls](internal-BaseInvocationScope.md#addcalls)

___

### addContracts

▸ **addContracts**(`contracts`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`ContractIdLike`](../namespaces/internal.md#contractidlike)[] |

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addContracts](internal-BaseInvocationScope.md#addcontracts)

___

### call

▸ **call**<`T`\>(`options?`): `Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean`  }\> |

#### Returns

`Promise`<[`FunctionInvocationResult`](FunctionInvocationResult.md)<`T`\>\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[call](internal-BaseInvocationScope.md#call)

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[checkGasLimitTotal](internal-BaseInvocationScope.md#checkgaslimittotal)

___

### dryRun

▸ **dryRun**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

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

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`<[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>\>

#### Returns

`Promise`<[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[fundWithRequiredCoins](internal-BaseInvocationScope.md#fundwithrequiredcoins)

___

### get

▸ **get**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

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

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Returns

[`CoinQuantity`](../namespaces/internal.md#coinquantity)[]

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getRequiredCoins](internal-BaseInvocationScope.md#getrequiredcoins)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Partial`<{ `fundTransaction`: `boolean` ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `tolerance`: `number`  }\> |

#### Returns

`Promise`<[`TransactionCost`](../namespaces/internal.md#transactioncost)\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[getTransactionCost](internal-BaseInvocationScope.md#gettransactioncost)

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

___

### simulate

▸ **simulate**<`T`\>(`options?`): `Promise`<[`InvocationCallResult`](internal-InvocationCallResult.md)<`T`\>\>

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

___

### txParams

▸ **txParams**(`txParams`): [`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\> |

#### Returns

[`MultiCallInvocationScope`](MultiCallInvocationScope.md)<`TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[txParams](internal-BaseInvocationScope.md#txparams)

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[updateRequiredCoins](internal-BaseInvocationScope.md#updaterequiredcoins)

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

#### Returns

`void`

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[updateScriptRequest](internal-BaseInvocationScope.md#updatescriptrequest)

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
