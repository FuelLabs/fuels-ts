---
layout: default
title: FunctionInvocationScope
parent: "@fuel-ts/contract"
nav_order: 1

---

# Class: FunctionInvocationScope<TArgs, TReturn\>

[@fuel-ts/contract](../index.md).FunctionInvocationScope

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

• **new FunctionInvocationScope**<`TArgs`, `TReturn`\>(`contract`, `func`, `args`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contract` | [`Contract`](Contract.md) |
| `func` | `default` |
| `args` | `TArgs` |

#### Overrides

[BaseInvocationScope](internal-BaseInvocationScope.md).[constructor](internal-BaseInvocationScope.md#constructor)

## Properties

### args

• `Private` **args**: `TArgs`

#### Defined in

[packages/contract/src/contracts/functions/invocation-scope.ts:18](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-scope.ts#L18)

___

### callParameters

• `Private` `Optional` **callParameters**: `Partial`<{ `forward`: [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike) ; `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish)  }\>

#### Defined in

[packages/contract/src/contracts/functions/invocation-scope.ts:16](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-scope.ts#L16)

___

### contract

• `Protected` **contract**: [`Contract`](Contract.md)

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[contract](internal-BaseInvocationScope.md#contract)

#### Defined in

[packages/contract/src/contracts/functions/base-invocation-scope.ts:42](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/base-invocation-scope.ts#L42)

___

### forward

• `Private` `Optional` **forward**: [`CoinQuantity`](../namespaces/internal.md#coinquantity)

#### Defined in

[packages/contract/src/contracts/functions/invocation-scope.ts:17](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-scope.ts#L17)

___

### func

• `Private` **func**: `default`

#### Defined in

[packages/contract/src/contracts/functions/invocation-scope.ts:15](https://github.com/FuelLabs/fuels-ts/blob/master/packages/contract/src/contracts/functions/invocation-scope.ts#L15)

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

▸ `Protected` **addCall**(`funcScope`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\> |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCall](internal-BaseInvocationScope.md#addcall)

___

### addCalls

▸ `Protected` **addCalls**(`funcScopes`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](../index.md#invocationscopelike)<`unknown`\>[] |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Inherited from

[BaseInvocationScope](internal-BaseInvocationScope.md).[addCalls](internal-BaseInvocationScope.md#addcalls)

___

### addContracts

▸ **addContracts**(`contracts`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`ContractIdLike`](../namespaces/internal.md#contractidlike)[] |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

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

### callParams

▸ **callParams**(`callParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `callParams` | `Partial`<{ `forward`: [`CoinQuantityLike`](../namespaces/internal.md#coinquantitylike) ; `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish)  }\> |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

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

▸ **fundWithRequiredCoins**(): `Promise`<[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>\>

#### Returns

`Promise`<[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>\>

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

### getCallConfig

▸ **getCallConfig**(): [`CallConfig`](../index.md#callconfig)<`TArgs`\>

#### Returns

[`CallConfig`](../index.md#callconfig)<`TArgs`\>

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

### setArguments

▸ **setArguments**(...`args`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `TArgs` |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

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

▸ **txParams**(`txParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `txParams` | `Partial`<{ `gasLimit`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `gasPrice`: [`BigNumberish`](../namespaces/internal.md#bignumberish) ; `variableOutputs`: `number`  }\> |

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)<`TArgs`, `TReturn`\>

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
