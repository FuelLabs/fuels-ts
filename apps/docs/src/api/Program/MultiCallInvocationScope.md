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

[functions/multicall-scope.ts:19](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/multicall-scope.ts#L19)

## Properties

### externalAbis

• `Protected` **externalAbis**: `Record`&lt;`string`, `JsonAbi`\> = `{}`

#### Inherited from

BaseInvocationScope.externalAbis

#### Defined in

[functions/base-invocation-scope.ts:56](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L56)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] = `[]`

#### Inherited from

BaseInvocationScope.functionInvocationScopes

#### Defined in

[functions/base-invocation-scope.ts:51](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L51)

___

### hasCallParamsGasLimit

• `Protected` **hasCallParamsGasLimit**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.hasCallParamsGasLimit

#### Defined in

[functions/base-invocation-scope.ts:55](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L55)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.isMultiCall

#### Defined in

[functions/base-invocation-scope.ts:54](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L54)

___

### program

• `Protected` **program**: `AbstractProgram`

#### Inherited from

BaseInvocationScope.program

#### Defined in

[functions/base-invocation-scope.ts:50](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L50)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] = `[]`

#### Inherited from

BaseInvocationScope.requiredCoins

#### Defined in

[functions/base-invocation-scope.ts:53](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L53)

___

### transactionRequest

• `Protected` **transactionRequest**: [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Inherited from

BaseInvocationScope.transactionRequest

#### Defined in

[functions/base-invocation-scope.ts:49](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L49)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `tip`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

#### Inherited from

BaseInvocationScope.txParameters

#### Defined in

[functions/base-invocation-scope.ts:52](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L52)

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

[functions/base-invocation-scope.ts:78](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L78)

## Methods

### addBatchTransfer

▸ **addBatchTransfer**(`transferParams`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds multiple transfers to the contract call transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transferParams` | [`TransferParams`](/api/Account/index.md#transferparams)[] | An array of `TransferParams` objects representing the transfers to be made. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addBatchTransfer

#### Defined in

[functions/base-invocation-scope.ts:329](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L329)

___

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

[functions/multicall-scope.ts:30](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/multicall-scope.ts#L30)

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

[functions/multicall-scope.ts:40](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/multicall-scope.ts#L40)

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

[functions/base-invocation-scope.ts:297](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L297)

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

[functions/base-invocation-scope.ts:342](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L342)

___

### addTransfer

▸ **addTransfer**(`transferParams`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Adds an asset transfer to an Account on the contract call transaction request.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transferParams` | [`TransferParams`](/api/Account/index.md#transferparams) | The object representing the transfer to be made. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.addTransfer

#### Defined in

[functions/base-invocation-scope.ts:311](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L311)

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

[functions/base-invocation-scope.ts:364](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L364)

___

### checkGasLimitTotal

▸ **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.checkGasLimitTotal

#### Defined in

[functions/base-invocation-scope.ts:207](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L207)

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

[functions/base-invocation-scope.ts:410](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L410)

___

### fundWithRequiredCoins

▸ **fundWithRequiredCoins**(): `Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

Funds the transaction with the required coins.

#### Returns

`Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.fundWithRequiredCoins

#### Defined in

[functions/base-invocation-scope.ts:244](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L244)

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

[functions/base-invocation-scope.ts:424](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L424)

___

### getProvider

▸ **getProvider**(): [`Provider`](/api/Account/Provider.md)

#### Returns

[`Provider`](/api/Account/Provider.md)

#### Inherited from

BaseInvocationScope.getProvider

#### Defined in

[functions/base-invocation-scope.ts:438](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L438)

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

[functions/base-invocation-scope.ts:127](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L127)

___

### getTransactionCost

▸ **getTransactionCost**(): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Gets the transaction cost ny dry running the transaction.

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

The transaction cost details.

#### Inherited from

BaseInvocationScope.getTransactionCost

#### Defined in

[functions/base-invocation-scope.ts:226](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L226)

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

[functions/base-invocation-scope.ts:450](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L450)

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

[functions/base-invocation-scope.ts:354](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L354)

___

### prepareTransaction

▸ **prepareTransaction**(): `Promise`&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`&lt;`void`\>

#### Inherited from

BaseInvocationScope.prepareTransaction

#### Defined in

[functions/base-invocation-scope.ts:185](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L185)

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

[functions/base-invocation-scope.ts:387](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L387)

___

### txParams

▸ **txParams**(`txParams`): [`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

Sets the transaction parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `txParams` | `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `tip`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\> | The transaction parameters to set. |

#### Returns

[`MultiCallInvocationScope`](/api/Program/MultiCallInvocationScope.md)&lt;`TReturn`\>

The current instance of the class.

#### Inherited from

BaseInvocationScope.txParams

#### Defined in

[functions/base-invocation-scope.ts:276](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L276)

___

### updateContractInputAndOutput

▸ **updateContractInputAndOutput**(): `void`

Updates the transaction request with the current input/output.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateContractInputAndOutput

#### Defined in

[functions/base-invocation-scope.ts:108](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L108)

___

### updateRequiredCoins

▸ **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateRequiredCoins

#### Defined in

[functions/base-invocation-scope.ts:140](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L140)

___

### updateScriptRequest

▸ **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateScriptRequest

#### Defined in

[functions/base-invocation-scope.ts:94](https://github.com/FuelLabs/fuels-ts/blob/8c34efed/packages/program/src/functions/base-invocation-scope.ts#L94)
