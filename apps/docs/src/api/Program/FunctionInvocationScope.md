# Class: FunctionInvocationScope&lt;TArgs, TReturn\>

[@fuel-ts/program](/api/Program/index.md).FunctionInvocationScope

Represents a scope for invoking a function.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] | The type of the function arguments. |
| `TReturn` | `any` | The type of the return value. |

## Hierarchy

- `BaseInvocationScope`&lt;`TReturn`\>

  ↳ **`FunctionInvocationScope`**

## Constructors

### constructor

• **new FunctionInvocationScope**&lt;`TArgs`, `TReturn`\>(`program`, `func`, `args`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Constructs an instance of FunctionInvocationScope.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `any`[] = `any`[] |
| `TReturn` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `program` | `AbstractProgram` | The program. |
| `func` | `FunctionFragment`&lt;`JsonAbi`, `string`\> | The function fragment. |
| `args` | `TArgs` | The arguments. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

#### Overrides

BaseInvocationScope&lt;TReturn\&gt;.constructor

#### Defined in

[packages/program/src/functions/invocation-scope.ts:34](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L34)

## Properties

### args

• `Protected` **args**: `TArgs`

#### Defined in

[packages/program/src/functions/invocation-scope.ts:25](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L25)

___

### callParameters

• `Private` `Optional` **callParameters**: `Partial`&lt;{ `forward`: [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish`  }\>

#### Defined in

[packages/program/src/functions/invocation-scope.ts:23](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L23)

___

### forward

• `Private` `Optional` **forward**: [`CoinQuantity`](/api/Providers/index.md#coinquantity)

#### Defined in

[packages/program/src/functions/invocation-scope.ts:24](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L24)

___

### func

• `Protected` **func**: `FunctionFragment`&lt;`JsonAbi`, `string`\>

#### Defined in

[packages/program/src/functions/invocation-scope.ts:22](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L22)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] = `[]`

#### Inherited from

BaseInvocationScope.functionInvocationScopes

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:52](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L52)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.isMultiCall

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:55](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L55)

___

### program

• `Protected` **program**: `AbstractProgram`

#### Inherited from

BaseInvocationScope.program

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:51](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L51)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](/api/Providers/index.md#coinquantity)[] = `[]`

#### Inherited from

BaseInvocationScope.requiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:54](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L54)

___

### transactionRequest

• `Protected` **transactionRequest**: [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

#### Inherited from

BaseInvocationScope.transactionRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:50](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L50)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

#### Inherited from

BaseInvocationScope.txParameters

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:53](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L53)

## Accessors

### calls

• `get` **calls**(): [`ContractCall`](/api/Program/index.md#contractcall)[]

Getter for the contract calls.

#### Returns

[`ContractCall`](/api/Program/index.md#contractcall)[]

An array of contract calls.

#### Inherited from

BaseInvocationScope.calls

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:75](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L75)

## Methods

### addCall

▸ **addCall**(`funcScope`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Adds a single call to the invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScope` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike) | The function scope to add. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addCall

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:154](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L154)

___

### addCalls

▸ **addCalls**(`funcScopes`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Adds multiple calls to the invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScopes` | [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] | An array of function scopes to add. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addCalls

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:165](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L165)

___

### addContracts

▸ **addContracts**(`contracts`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Adds contracts to the invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contracts` | [`AbstractContract`](/api/Interfaces/AbstractContract.md)[] | An array of contracts to add. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addContracts

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:268](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L268)

___

### call

▸ **call**&lt;`T`\>(): `Promise`&lt;[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `void`\>\>

Submits a transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`FunctionInvocationResult`](/api/Program/FunctionInvocationResult.md)&lt;`T`, `void`\>\>

The result of the function invocation.

#### Inherited from

BaseInvocationScope.call

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:291](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L291)

___

### callParams

▸ **callParams**(`callParams`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Sets the call parameters for the function invocation.

**`Throws`**

If the function is not payable and forward is set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callParams` | `Partial`&lt;{ `forward`: [`CoinQuantityLike`](/api/Providers/index.md#coinquantitylike) ; `gasLimit`: `BigNumberish`  }\> | The call parameters. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The instance of FunctionInvocationScope.

#### Defined in

[packages/program/src/functions/invocation-scope.ts:76](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L76)

___

### checkGasLimitTotal

▸ **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.checkGasLimitTotal

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:193](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L193)

___

### dryRun

▸ **dryRun**&lt;`T`\>(): `Promise`&lt;`InvocationCallResult`&lt;`T`\>\>

Executes a transaction in dry run mode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;`InvocationCallResult`&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.dryRun

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:347](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L347)

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(`fee`): `Promise`&lt;[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>\>

Funds the transaction with the required coins.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fee` | `BN` |

#### Returns

`Promise`&lt;[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.fundWithRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:227](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L227)

___

### getCallConfig

▸ **getCallConfig**(): [`CallConfig`](/api/Program/index.md#callconfig)&lt;`TArgs`\>

Gets the call configuration.

#### Returns

[`CallConfig`](/api/Program/index.md#callconfig)&lt;`TArgs`\>

The call configuration.

#### Defined in

[packages/program/src/functions/invocation-scope.ts:47](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L47)

___

### getProvider

▸ **getProvider**(): [`Provider`](/api/Providers/Provider.md)

#### Returns

[`Provider`](/api/Providers/Provider.md)

#### Inherited from

BaseInvocationScope.getProvider

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:371](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L371)

___

### getRequiredCoins

▸ **getRequiredCoins**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

Gets the required coins for the transaction.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

An array of required coin quantities.

#### Inherited from

BaseInvocationScope.getRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:117](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L117)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

Gets the transaction cost ny dry running the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`&lt;{ `fundTransaction`: `boolean` ; `gasPrice`: `BigNumberish`  }\> | Optional transaction cost options. |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

The transaction cost details.

#### Inherited from

BaseInvocationScope.getTransactionCost

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:212](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L212)

___

### getTransactionId

▸ **getTransactionId**(`chainId?`): `Promise`&lt;`string`\>

Obtains the ID of a transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId?` | `number` | the chainId to use to hash the transaction with |

#### Returns

`Promise`&lt;`string`\>

the ID of the transaction.

#### Inherited from

BaseInvocationScope.getTransactionId

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:383](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L383)

___

### getTransactionRequest

▸ **getTransactionRequest**(): `Promise`&lt;[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)\>

Prepares and returns the transaction request object.

#### Returns

`Promise`&lt;[`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)\>

The prepared transaction request.

#### Inherited from

BaseInvocationScope.getTransactionRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:281](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L281)

___

### prepareTransaction

▸ **prepareTransaction**(): `Promise`&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`&lt;`void`\>

#### Inherited from

BaseInvocationScope.prepareTransaction

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:175](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L175)

___

### setArguments

▸ **setArguments**(`...args`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Sets the arguments for the function invocation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...args` | `TArgs` | The arguments. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The instance of FunctionInvocationScope.

#### Defined in

[packages/program/src/functions/invocation-scope.ts:64](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/invocation-scope.ts#L64)

___

### simulate

▸ **simulate**&lt;`T`\>(): `Promise`&lt;`InvocationCallResult`&lt;`T`\>\>

Simulates a transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;`InvocationCallResult`&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.simulate

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:315](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L315)

___

### txParams

▸ **txParams**(`txParams`): [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

Sets the transaction parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\> | The transaction parameters to set. |

#### Returns

[`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`TArgs`, `TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.txParams

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:244](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L244)

___

### updateContractInputAndOutput

▸ **updateContractInputAndOutput**(): `void`

Updates the transaction request with the current input/output.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateContractInputAndOutput

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:103](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L103)

___

### updateRequiredCoins

▸ **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:130](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L130)

___

### updateScriptRequest

▸ **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateScriptRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:94](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/program/src/functions/base-invocation-scope.ts#L94)
