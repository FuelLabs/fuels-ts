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

• **new MultiCallInvocationScope**&lt;`TReturn`\>(`contract`, `funcScopes`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

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

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

#### Overrides

BaseInvocationScope&lt;TReturn\&gt;.constructor

#### Defined in

[functions/multicall-scope.ts:20](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/multicall-scope.ts#L20)

## Properties

### externalAbis

• `Protected` **externalAbis**: `Record`&lt;`string`, `JsonAbi`\> = `{}`

#### Inherited from

BaseInvocationScope.externalAbis

#### Defined in

[functions/base-invocation-scope.ts:65](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L65)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] = `[]`

#### Inherited from

BaseInvocationScope.functionInvocationScopes

#### Defined in

[functions/base-invocation-scope.ts:60](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L60)

___

### hasCallParamsGasLimit

• `Protected` **hasCallParamsGasLimit**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.hasCallParamsGasLimit

#### Defined in

[functions/base-invocation-scope.ts:64](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L64)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.isMultiCall

#### Defined in

[functions/base-invocation-scope.ts:63](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L63)

___

### program

• `Protected` **program**: `AbstractProgram`

#### Inherited from

BaseInvocationScope.program

#### Defined in

[functions/base-invocation-scope.ts:59](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L59)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] = `[]`

#### Inherited from

BaseInvocationScope.requiredCoins

#### Defined in

[functions/base-invocation-scope.ts:62](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L62)

___

### transactionRequest

• `Protected` **transactionRequest**: [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Inherited from

BaseInvocationScope.transactionRequest

#### Defined in

[functions/base-invocation-scope.ts:58](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L58)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

#### Inherited from

BaseInvocationScope.txParameters

#### Defined in

[functions/base-invocation-scope.ts:61](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L61)

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

[functions/base-invocation-scope.ts:88](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L88)

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

[functions/multicall-scope.ts:32](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/multicall-scope.ts#L32)

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

[functions/multicall-scope.ts:42](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/multicall-scope.ts#L42)

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

[functions/base-invocation-scope.ts:315](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L315)

___

### addSigners

▸ **addSigners**(`signers`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | [`Account`](/api/Account/Account.md) \| [`Account`](/api/Account/Account.md)[] |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

#### Inherited from

BaseInvocationScope.addSigners

#### Defined in

[functions/base-invocation-scope.ts:341](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L341)

___

### addTransfer

▸ **addTransfer**(`destination`, `amount`, `assetId`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds an asset transfer to an Account on the contract call transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `destination` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address of the destination. |
| `amount` | `BigNumberish` | The amount of coins to transfer. |
| `assetId` | `string` | The asset ID of the coins to transfer. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addTransfer

#### Defined in

[functions/base-invocation-scope.ts:331](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L331)

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

[functions/base-invocation-scope.ts:363](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L363)

___

### checkGasLimitTotal

▸ **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.checkGasLimitTotal

#### Defined in

[functions/base-invocation-scope.ts:210](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L210)

___

### dryRun

▸ **dryRun**&lt;`T`\>(): `Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

Executes a transaction in dry run mode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.dryRun

#### Defined in

[functions/base-invocation-scope.ts:416](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L416)

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

[functions/base-invocation-scope.ts:247](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L247)

___

### get

▸ **get**&lt;`T`\>(): `Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

#### Inherited from

BaseInvocationScope.get

#### Defined in

[functions/base-invocation-scope.ts:430](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L430)

___

### getProvider

▸ **getProvider**(): [`Provider`](/api/Account/Provider.md)

#### Returns

[`Provider`](/api/Account/Provider.md)

#### Inherited from

BaseInvocationScope.getProvider

#### Defined in

[functions/base-invocation-scope.ts:444](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L444)

___

### getRequiredCoins

▸ **getRequiredCoins**(): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

Gets the required coins for the transaction.

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

An array of required coin quantities.

#### Inherited from

BaseInvocationScope.getRequiredCoins

#### Defined in

[functions/base-invocation-scope.ts:130](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L130)

___

### getTransactionCost

▸ **getTransactionCost**(`options?`): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Gets the transaction cost ny dry running the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | `Partial`&lt;{ `fundTransaction`: `boolean` ; `gasPrice`: `BigNumberish`  }\> | Optional transaction cost options. |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

The transaction cost details.

#### Inherited from

BaseInvocationScope.getTransactionCost

#### Defined in

[functions/base-invocation-scope.ts:229](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L229)

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

[functions/base-invocation-scope.ts:456](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L456)

___

### getTransactionRequest

▸ **getTransactionRequest**(): `Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

Prepares and returns the transaction request object.

#### Returns

`Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

The prepared transaction request.

#### Inherited from

BaseInvocationScope.getTransactionRequest

#### Defined in

[functions/base-invocation-scope.ts:353](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L353)

___

### prepareTransaction

▸ **prepareTransaction**(): `Promise`&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`&lt;`void`\>

#### Inherited from

BaseInvocationScope.prepareTransaction

#### Defined in

[functions/base-invocation-scope.ts:188](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L188)

___

### simulate

▸ **simulate**&lt;`T`\>(): `Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

Simulates a transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`InvocationCallResult`](/api/Program/InvocationCallResult.md)&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.simulate

#### Defined in

[functions/base-invocation-scope.ts:389](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L389)

___

### txParams

▸ **txParams**(`txParams`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Sets the transaction parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `gasPrice`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\> | The transaction parameters to set. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.txParams

#### Defined in

[functions/base-invocation-scope.ts:291](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L291)

___

### updateContractInputAndOutput

▸ **updateContractInputAndOutput**(): `void`

Updates the transaction request with the current input/output.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateContractInputAndOutput

#### Defined in

[functions/base-invocation-scope.ts:116](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L116)

___

### updateRequiredCoins

▸ **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateRequiredCoins

#### Defined in

[functions/base-invocation-scope.ts:143](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L143)

___

### updateScriptRequest

▸ **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateScriptRequest

#### Defined in

[functions/base-invocation-scope.ts:107](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/base-invocation-scope.ts#L107)

___

### validateHeapTypeReturnCalls

▸ **validateHeapTypeReturnCalls**(): `void`

#### Returns

`void`

#### Defined in

[functions/multicall-scope.ts:46](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/program/src/functions/multicall-scope.ts#L46)
