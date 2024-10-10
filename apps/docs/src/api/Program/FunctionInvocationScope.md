[**@fuel-ts/program v0.95.0**](../index.md) • **Docs**

***

# Class: FunctionInvocationScope\&lt;TArgs, TReturn\>

Represents a scope for invoking a function.

## Extends

- `BaseInvocationScope`\&lt;`TReturn`\>

## Type Parameters

• **TArgs** *extends* `any`[] = `any`[]

The type of the function arguments.

• **TReturn** = `any`

The type of the return value.

## Constructors

### new FunctionInvocationScope()

> **new FunctionInvocationScope**\&lt;`TArgs`, `TReturn`\>(`program`, `func`, `args`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Constructs an instance of FunctionInvocationScope.

#### Parameters

• **program**: `AbstractProgram`

The program.

• **func**: `FunctionFragment`

The function fragment.

• **args**: `TArgs`

The arguments.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

#### Overrides

`BaseInvocationScope&lt;TReturn>.constructor`

#### Defined in

[functions/invocation-scope.ts:34](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L34)

## Properties

### args

> `protected` **args**: `TArgs`

#### Defined in

[functions/invocation-scope.ts:25](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L25)

***

### externalAbis

> `protected` **externalAbis**: `Record`\&lt;`string`, `JsonAbi`\> = `{}`

#### Inherited from

`BaseInvocationScope.externalAbis`

#### Defined in

[functions/base-invocation-scope.ts:67](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L67)

***

### func

> `protected` **func**: `FunctionFragment`

#### Defined in

[functions/invocation-scope.ts:22](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L22)

***

### functionInvocationScopes

> `protected` **functionInvocationScopes**: [`InvocationScopeLike`](../index.md#invocationscopeliket)[] = `[]`

#### Inherited from

`BaseInvocationScope.functionInvocationScopes`

#### Defined in

[functions/base-invocation-scope.ts:62](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L62)

***

### hasCallParamsGasLimit

> `protected` **hasCallParamsGasLimit**: `boolean` = `false`

#### Inherited from

`BaseInvocationScope.hasCallParamsGasLimit`

#### Defined in

[functions/base-invocation-scope.ts:66](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L66)

***

### isMultiCall

> `protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

`BaseInvocationScope.isMultiCall`

#### Defined in

[functions/base-invocation-scope.ts:65](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L65)

***

### program

> `protected` **program**: `AbstractProgram`

#### Inherited from

`BaseInvocationScope.program`

#### Defined in

[functions/base-invocation-scope.ts:61](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L61)

***

### requiredCoins

> `protected` **requiredCoins**: [`CoinQuantity`](../Account/index.md#coinquantity)[] = `[]`

#### Inherited from

`BaseInvocationScope.requiredCoins`

#### Defined in

[functions/base-invocation-scope.ts:64](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L64)

***

### transactionRequest

> `protected` **transactionRequest**: [`ScriptTransactionRequest`](../Account/ScriptTransactionRequest.md)

#### Inherited from

`BaseInvocationScope.transactionRequest`

#### Defined in

[functions/base-invocation-scope.ts:60](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L60)

***

### txParameters?

> `protected` `optional` **txParameters**: `Partial`\&lt;`object`\>

#### Type declaration

##### gasLimit

> **gasLimit**: `BigNumberish`

##### maturity?

> `optional` **maturity**: `number`

##### maxFee?

> `optional` **maxFee**: `BigNumberish`

##### tip

> **tip**: `BigNumberish`

##### variableOutputs

> **variableOutputs**: `number`

##### witnessLimit?

> `optional` **witnessLimit**: `BigNumberish`

#### Inherited from

`BaseInvocationScope.txParameters`

#### Defined in

[functions/base-invocation-scope.ts:63](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L63)

## Accessors

### calls

> `get` `protected` **calls**(): [`ContractCall`](../index.md#contractcall)[]

Getter for the contract calls.

#### Returns

[`ContractCall`](../index.md#contractcall)[]

An array of contract calls.

#### Inherited from

`BaseInvocationScope.calls`

#### Defined in

[functions/base-invocation-scope.ts:89](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L89)

## Methods

### addBatchTransfer()

> **addBatchTransfer**(`transferParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Adds multiple transfers to the contract call transaction request.

#### Parameters

• **transferParams**: [`TransferParams`](../Account/index.md#transferparams)[]

An array of `TransferParams` objects representing the transfers to be made.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.addBatchTransfer`

#### Defined in

[functions/base-invocation-scope.ts:337](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L337)

***

### addCall()

> `protected` **addCall**(`funcScope`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Adds a single call to the invocation scope.

#### Parameters

• **funcScope**: [`InvocationScopeLike`](../index.md#invocationscopeliket)

The function scope to add.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.addCall`

#### Defined in

[functions/base-invocation-scope.ts:175](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L175)

***

### addCalls()

> `protected` **addCalls**(`funcScopes`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Adds multiple calls to the invocation scope.

#### Parameters

• **funcScopes**: [`InvocationScopeLike`](../index.md#invocationscopeliket)[]

An array of function scopes to add.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.addCalls`

#### Defined in

[functions/base-invocation-scope.ts:186](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L186)

***

### addContracts()

> **addContracts**(`contracts`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Adds contracts to the invocation scope.

#### Parameters

• **contracts**: [`AbstractContract`](../Interfaces/AbstractContract.md)[]

An array of contracts to add.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.addContracts`

#### Defined in

[functions/base-invocation-scope.ts:305](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L305)

***

### addSigners()

> **addSigners**(`signers`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

#### Parameters

• **signers**: [`Account`](../Account/Account.md) \| [`Account`](../Account/Account.md)[]

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

#### Inherited from

`BaseInvocationScope.addSigners`

#### Defined in

[functions/base-invocation-scope.ts:350](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L350)

***

### addTransfer()

> **addTransfer**(`transferParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Adds an asset transfer to an Account on the contract call transaction request.

#### Parameters

• **transferParams**: [`TransferParams`](../Account/index.md#transferparams)

The object representing the transfer to be made.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.addTransfer`

#### Defined in

[functions/base-invocation-scope.ts:319](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L319)

***

### call()

> **call**\&lt;`T`\>(): `Promise`\&lt;`object`\>

Submits the contract call transaction and returns a promise that resolves to an object
containing the transaction ID and a function to wait for the result. The promise will resolve
as soon as the transaction is submitted to the node.

#### Type Parameters

• **T** = `TReturn`

The type of the return value.

#### Returns

`Promise`\&lt;`object`\>

A promise that resolves to an object containing:
- `transactionId`: The ID of the submitted transaction.
- `waitForResult`: A function that waits for the transaction result.

##### transactionId

> **transactionId**: `string`

##### waitForResult()

> **waitForResult**: () => `Promise`\&lt;[`FunctionResult`](../index.md#functionresulttreturn)\&lt;`T`\>\>

###### Returns

`Promise`\&lt;[`FunctionResult`](../index.md#functionresulttreturn)\&lt;`T`\>\>

#### Inherited from

`BaseInvocationScope.call`

#### Defined in

[functions/base-invocation-scope.ts:377](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L377)

***

### callParams()

> **callParams**(`callParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Sets the call parameters for the function invocation.

#### Parameters

• **callParams**: `Partial`\&lt;`object`\>

The call parameters.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The instance of FunctionInvocationScope.

#### Throws

If the function is not payable and forward is set.

#### Defined in

[functions/invocation-scope.ts:77](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L77)

***

### checkGasLimitTotal()

> `protected` **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

`BaseInvocationScope.checkGasLimitTotal`

#### Defined in

[functions/base-invocation-scope.ts:218](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L218)

***

### dryRun()

> **dryRun**\&lt;`T`\>(): `Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

Executes a transaction in dry run mode.

#### Type Parameters

• **T** = `TReturn`

#### Returns

`Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

`BaseInvocationScope.dryRun`

#### Defined in

[functions/base-invocation-scope.ts:435](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L435)

***

### fundWithRequiredCoins()

> **fundWithRequiredCoins**(): `Promise`\&lt;[`ScriptTransactionRequest`](../Account/ScriptTransactionRequest.md)\>

Funds the transaction with the required coins.

#### Returns

`Promise`\&lt;[`ScriptTransactionRequest`](../Account/ScriptTransactionRequest.md)\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.fundWithRequiredCoins`

#### Defined in

[functions/base-invocation-scope.ts:252](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L252)

***

### get()

> **get**\&lt;`T`\>(): `Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

#### Type Parameters

• **T** = `TReturn`

#### Returns

`Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

#### Inherited from

`BaseInvocationScope.get`

#### Defined in

[functions/base-invocation-scope.ts:449](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L449)

***

### getCallConfig()

> **getCallConfig**(): [`CallConfig`](../index.md#callconfigt)\&lt;`TArgs`\>

Gets the call configuration.

#### Returns

[`CallConfig`](../index.md#callconfigt)\&lt;`TArgs`\>

The call configuration.

#### Defined in

[functions/invocation-scope.ts:47](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L47)

***

### getProvider()

> **getProvider**(): [`Provider`](../Account/Provider.md)

#### Returns

[`Provider`](../Account/Provider.md)

#### Inherited from

`BaseInvocationScope.getProvider`

#### Defined in

[functions/base-invocation-scope.ts:463](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L463)

***

### getRequiredCoins()

> `protected` **getRequiredCoins**(): [`CoinQuantity`](../Account/index.md#coinquantity)[]

Gets the required coins for the transaction.

#### Returns

[`CoinQuantity`](../Account/index.md#coinquantity)[]

An array of required coin quantities.

#### Inherited from

`BaseInvocationScope.getRequiredCoins`

#### Defined in

[functions/base-invocation-scope.ts:138](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L138)

***

### getTransactionCost()

> **getTransactionCost**(): `Promise`\&lt;[`TransactionCost`](../Account/index.md#transactioncost)\>

Gets the transaction cost for dry running the transaction.

#### Returns

`Promise`\&lt;[`TransactionCost`](../Account/index.md#transactioncost)\>

The transaction cost details.

#### Inherited from

`BaseInvocationScope.getTransactionCost`

#### Defined in

[functions/base-invocation-scope.ts:237](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L237)

***

### getTransactionId()

> **getTransactionId**(`chainId`?): `Promise`\&lt;`string`\>

Obtains the ID of a transaction.

#### Parameters

• **chainId?**: `number`

the chainId to use to hash the transaction with

#### Returns

`Promise`\&lt;`string`\>

the ID of the transaction.

#### Inherited from

`BaseInvocationScope.getTransactionId`

#### Defined in

[functions/base-invocation-scope.ts:475](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L475)

***

### getTransactionRequest()

> **getTransactionRequest**(): `Promise`\&lt;[`ScriptTransactionRequest`](../Account/ScriptTransactionRequest.md)\>

Prepares and returns the transaction request object.

#### Returns

`Promise`\&lt;[`ScriptTransactionRequest`](../Account/ScriptTransactionRequest.md)\>

The prepared transaction request.

#### Inherited from

`BaseInvocationScope.getTransactionRequest`

#### Defined in

[functions/base-invocation-scope.ts:362](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L362)

***

### prepareTransaction()

> `protected` **prepareTransaction**(): `Promise`\&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`\&lt;`void`\>

#### Inherited from

`BaseInvocationScope.prepareTransaction`

#### Defined in

[functions/base-invocation-scope.ts:196](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L196)

***

### setArguments()

> **setArguments**(...`args`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Sets the arguments for the function invocation.

#### Parameters

• ...**args**: `TArgs`

The arguments.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The instance of FunctionInvocationScope.

#### Defined in

[functions/invocation-scope.ts:65](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/invocation-scope.ts#L65)

***

### simulate()

> **simulate**\&lt;`T`\>(): `Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

Simulates a transaction.

#### Type Parameters

• **T** = `TReturn`

#### Returns

`Promise`\&lt;[`DryRunResult`](../index.md#dryrunresulttreturn)\&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

`BaseInvocationScope.simulate`

#### Defined in

[functions/base-invocation-scope.ts:408](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L408)

***

### txParams()

> **txParams**(`txParams`): [`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

Sets the transaction parameters.

#### Parameters

• **txParams**: `Partial`\&lt;`object`\>

The transaction parameters to set.

#### Returns

[`FunctionInvocationScope`](FunctionInvocationScope.md)\&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

`BaseInvocationScope.txParams`

#### Defined in

[functions/base-invocation-scope.ts:284](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L284)

***

### updateContractInputAndOutput()

> `protected` **updateContractInputAndOutput**(): `void`

Updates the transaction request with the current input/output.

#### Returns

`void`

#### Inherited from

`BaseInvocationScope.updateContractInputAndOutput`

#### Defined in

[functions/base-invocation-scope.ts:119](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L119)

***

### updateRequiredCoins()

> `protected` **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

`BaseInvocationScope.updateRequiredCoins`

#### Defined in

[functions/base-invocation-scope.ts:151](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L151)

***

### updateScriptRequest()

> `protected` **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

`BaseInvocationScope.updateScriptRequest`

#### Defined in

[functions/base-invocation-scope.ts:105](https://github.com/FuelLabs/fuels-ts/blob/520f93c51eb523e7de0fb66083fca60997ac2db5/packages/program/src/functions/base-invocation-scope.ts#L105)
