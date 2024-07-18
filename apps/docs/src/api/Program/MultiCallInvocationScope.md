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

[functions/multicall-scope.ts:19](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/multicall-scope.ts#L19)

## Properties

### externalAbis

• `Protected` **externalAbis**: `Record`&lt;`string`, `JsonAbi`\> = `{}`

#### Inherited from

BaseInvocationScope.externalAbis

#### Defined in

[functions/base-invocation-scope.ts:66](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L66)

___

### functionInvocationScopes

• `Protected` **functionInvocationScopes**: [`InvocationScopeLike`](/api/Program/index.md#invocationscopelike)[] = `[]`

#### Inherited from

BaseInvocationScope.functionInvocationScopes

#### Defined in

[functions/base-invocation-scope.ts:61](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L61)

___

### hasCallParamsGasLimit

• `Protected` **hasCallParamsGasLimit**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.hasCallParamsGasLimit

#### Defined in

[functions/base-invocation-scope.ts:65](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L65)

___

### isMultiCall

• `Protected` **isMultiCall**: `boolean` = `false`

#### Inherited from

BaseInvocationScope.isMultiCall

#### Defined in

[functions/base-invocation-scope.ts:64](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L64)

___

### program

• `Protected` **program**: `AbstractProgram`

#### Inherited from

BaseInvocationScope.program

#### Defined in

[functions/base-invocation-scope.ts:60](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L60)

___

### requiredCoins

• `Protected` **requiredCoins**: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] = `[]`

#### Inherited from

BaseInvocationScope.requiredCoins

#### Defined in

[functions/base-invocation-scope.ts:63](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L63)

___

### transactionRequest

• `Protected` **transactionRequest**: [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)

#### Inherited from

BaseInvocationScope.transactionRequest

#### Defined in

[functions/base-invocation-scope.ts:59](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L59)

___

### txParameters

• `Protected` `Optional` **txParameters**: `Partial`&lt;{ `gasLimit`: `BigNumberish` ; `maturity?`: `number` ; `maxFee?`: `BigNumberish` ; `tip`: `BigNumberish` ; `variableOutputs`: `number` ; `witnessLimit?`: `BigNumberish`  }\>

#### Inherited from

BaseInvocationScope.txParameters

#### Defined in

[functions/base-invocation-scope.ts:62](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L62)

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

[functions/base-invocation-scope.ts:88](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L88)

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

[functions/base-invocation-scope.ts:339](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L339)

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

[functions/multicall-scope.ts:30](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/multicall-scope.ts#L30)

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

[functions/multicall-scope.ts:40](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/multicall-scope.ts#L40)

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

[functions/base-invocation-scope.ts:307](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L307)

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

[functions/base-invocation-scope.ts:352](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L352)

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

[functions/base-invocation-scope.ts:321](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L321)

___

### call

▸ **call**&lt;`T`\>(): `Promise`&lt;{ `transactionId`: `string` ; `waitForResult`: () => `Promise`&lt;[`FunctionResult`](/api/Program/index.md#functionresult)&lt;`T`\>\>  }\>

Submits the contract call transaction and returns a promise that resolves to an object
containing the transaction ID and a function to wait for the result. The promise will resolve
as soon as the transaction is submitted to the node.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `TReturn` | The type of the return value. |

#### Returns

`Promise`&lt;{ `transactionId`: `string` ; `waitForResult`: () => `Promise`&lt;[`FunctionResult`](/api/Program/index.md#functionresult)&lt;`T`\>\>  }\>

A promise that resolves to an object containing:
- `transactionId`: The ID of the submitted transaction.
- `waitForResult`: A function that waits for the transaction result.

#### Inherited from

BaseInvocationScope.call

#### Defined in

[functions/base-invocation-scope.ts:379](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L379)

___

### checkGasLimitTotal

▸ **checkGasLimitTotal**(): `void`

Checks if the total gas limit is within the acceptable range.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.checkGasLimitTotal

#### Defined in

[functions/base-invocation-scope.ts:217](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L217)

___

### dryRun

▸ **dryRun**&lt;`T`\>(): `Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

Executes a transaction in dry run mode.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.dryRun

#### Defined in

[functions/base-invocation-scope.ts:438](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L438)

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

[functions/base-invocation-scope.ts:254](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L254)

___

### get

▸ **get**&lt;`T`\>(): `Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

#### Inherited from

BaseInvocationScope.get

#### Defined in

[functions/base-invocation-scope.ts:452](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L452)

___

### getProvider

▸ **getProvider**(): [`Provider`](/api/Account/Provider.md)

#### Returns

[`Provider`](/api/Account/Provider.md)

#### Inherited from

BaseInvocationScope.getProvider

#### Defined in

[functions/base-invocation-scope.ts:466](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L466)

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

[functions/base-invocation-scope.ts:137](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L137)

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

[functions/base-invocation-scope.ts:236](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L236)

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

[functions/base-invocation-scope.ts:478](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L478)

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

[functions/base-invocation-scope.ts:364](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L364)

___

### prepareTransaction

▸ **prepareTransaction**(): `Promise`&lt;`void`\>

Prepares the transaction by updating the script request, required coins, and checking the gas limit.

#### Returns

`Promise`&lt;`void`\>

#### Inherited from

BaseInvocationScope.prepareTransaction

#### Defined in

[functions/base-invocation-scope.ts:195](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L195)

___

### simulate

▸ **simulate**&lt;`T`\>(): `Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

Simulates a transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `TReturn` |

#### Returns

`Promise`&lt;[`DryRunResult`](/api/Program/index.md#dryrunresult)&lt;`T`\>\>

The result of the invocation call.

#### Inherited from

BaseInvocationScope.simulate

#### Defined in

[functions/base-invocation-scope.ts:411](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L411)

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

[functions/base-invocation-scope.ts:286](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L286)

___

### updateContractInputAndOutput

▸ **updateContractInputAndOutput**(): `void`

Updates the transaction request with the current input/output.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateContractInputAndOutput

#### Defined in

[functions/base-invocation-scope.ts:118](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L118)

___

### updateRequiredCoins

▸ **updateRequiredCoins**(): `void`

Updates the required coins for the transaction.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateRequiredCoins

#### Defined in

[functions/base-invocation-scope.ts:150](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L150)

___

### updateScriptRequest

▸ **updateScriptRequest**(): `void`

Updates the script request with the current contract calls.

#### Returns

`void`

#### Inherited from

BaseInvocationScope.updateScriptRequest

#### Defined in

[functions/base-invocation-scope.ts:104](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/program/src/functions/base-invocation-scope.ts#L104)
