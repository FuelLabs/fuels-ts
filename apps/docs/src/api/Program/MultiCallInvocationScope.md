# Class: MultiCallInvocationScope&lt;TReturn\>

[@fuel-ts/program](/api/Program/index.md).MultiCallInvocationScope

Represents a scope for invoking multiple calls.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TReturn` | `any` | The type of the return value. |

## Hierarchy

- `BaseInvocationScope`&lt;`TReturn`\>

  ↳ **`MultiCallInvocationScope`**

## Constructors

### constructor

• **new MultiCallInvocationScope**&lt;`TReturn`\>(`contract`, `funcScopes`)

Constructs an instance of MultiCallInvocationScope.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TReturn` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contract` | [`AbstractContract`](/api/Interfaces/AbstractContract.md) | The contract. |
| `funcScopes` | [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`any`[], `any`\>[] | An array of function invocation scopes. |

#### Overrides

BaseInvocationScope&lt;TReturn\&gt;.constructor

#### Defined in

[packages/program/src/functions/multicall-scope.ts:19](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/multicall-scope.ts#L19)

## Properties

### #scriptDataOffset

• `Private` **#scriptDataOffset**: `number` = `0`

#### Inherited from

BaseInvocationScope.#scriptDataOffset

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:54](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L54)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] = `[]`

#### Inherited from

BaseInvocationScope.functionInvocationScopes

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:50](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L50)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.isMultiCall

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:53](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L53)

___

### program

• `Protected` **program**: `AbstractProgram`

#### Inherited from

BaseInvocationScope.program

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:49](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L49)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](/api/Providers/index.md#coinquantity)[] = `[]`

#### Inherited from

BaseInvocationScope.requiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:52](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L52)

___

### transactionRequest

• **transactionRequest**: [`ScriptTransactionRequest`](/api/Providers/ScriptTransactionRequest.md)

#### Inherited from

BaseInvocationScope.transactionRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:48](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L48)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `variableOutputs`: `number`  }\>

#### Inherited from

BaseInvocationScope.txParameters

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:51](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L51)

## Accessors

### calls

• `Protected` `get` **calls**(): [`ContractCall`](/api/Program/index.md#contractcall)[]

Getter for the contract calls.

#### Returns

[`ContractCall`](/api/Program/index.md#contractcall)[]

An array of contract calls.

#### Inherited from

BaseInvocationScope.calls

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:75](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L75)

## Methods

### addCall

▸ **addCall**(`funcScope`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds a single function invocation scope to the multi-call invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScope` | [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`any`[], `any`\> | The function invocation scope. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The instance of MultiCallInvocationScope.

#### Overrides

BaseInvocationScope.addCall

#### Defined in

[packages/program/src/functions/multicall-scope.ts:30](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/multicall-scope.ts#L30)

___

### addCalls

▸ **addCalls**(`funcScopes`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds multiple function invocation scopes to the multi-call invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `funcScopes` | [`FunctionInvocationScope`](/api/Program/FunctionInvocationScope.md)&lt;`any`[], `any`\>[] | An array of function invocation scopes. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The instance of MultiCallInvocationScope.

#### Overrides

BaseInvocationScope.addCalls

#### Defined in

[packages/program/src/functions/multicall-scope.ts:40](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/multicall-scope.ts#L40)

___

### addContracts

▸ **addContracts**(`contracts`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds contracts to the invocation scope.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contracts` | [`AbstractContract`](/api/Interfaces/AbstractContract.md)[] | An array of contracts to add. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addContracts

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:244](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L244)

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

[packages/program/src/functions/base-invocation-scope.ts:267](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L267)

___

### checkGasLimitTotal

▸ `Protected` **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.checkGasLimitTotal

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:179](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L179)

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

[packages/program/src/functions/base-invocation-scope.ts:313](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L313)

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`&lt;[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>\>

Funds the transaction with the required coins.

#### Returns

`Promise`&lt;[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.fundWithRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:211](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L211)

___

### getRequiredCoins

▸ `Protected` **getRequiredCoins**(): [`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

Gets the required coins for the transaction.

#### Returns

[`CoinQuantity`](/api/Providers/index.md#coinquantity)[]

An array of required coin quantities.

#### Inherited from

BaseInvocationScope.getRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:101](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L101)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

Gets the transaction cost ny dry running the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`&lt;{ `fundTransaction`: `boolean` ; `gasPrice`: `BigNumberish` ; `tolerance`: `number`  }\> | Optional transaction cost options. |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Providers/index.md#transactioncost)\>

The transaction cost details.

#### Inherited from

BaseInvocationScope.getTransactionCost

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:194](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L194)

___

### getTransactionRequest

▸ **getTransactionRequest**(): `Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

Prepares and returns the transaction request object.

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Providers/index.md#transactionrequest)\>

The prepared transaction request.

#### Inherited from

BaseInvocationScope.getTransactionRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:257](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L257)

___

### prepareTransaction

▸ `Protected` **prepareTransaction**(): `Promise`&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`&lt;`void`\>

#### Inherited from

BaseInvocationScope.prepareTransaction

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:160](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L160)

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

[packages/program/src/functions/base-invocation-scope.ts:286](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L286)

___

### txParams

▸ **txParams**(`txParams`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Sets the transaction parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `variableOutputs`: `number`  }\> | The transaction parameters to set. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.txParams

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:227](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L227)

___

### updateRequiredCoins

▸ `Protected` **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateRequiredCoins

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:115](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L115)

___

### updateScriptRequest

▸ `Protected` **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateScriptRequest

#### Defined in

[packages/program/src/functions/base-invocation-scope.ts:84](https://github.com/FuelLabs/fuels-ts/blob/2863d791/packages/program/src/functions/base-invocation-scope.ts#L84)
