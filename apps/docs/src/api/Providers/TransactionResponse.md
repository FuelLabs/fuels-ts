# Class: TransactionResponse

[@fuel-ts/providers](/api/Providers/index.md).TransactionResponse

Represents a response for a transaction.

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`): [`TransactionResponse`](/api/Providers/TransactionResponse.md)

Constructor for `TransactionResponse`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider. |

#### Returns

[`TransactionResponse`](/api/Providers/TransactionResponse.md)

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:106](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L106)

## Properties

### fetchAttempts

• **fetchAttempts**: `number` = `0`

Number of attempts made to fetch the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:94](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L94)

___

### gasUsed

• **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:92](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L92)

___

### gqlTransaction

• `Optional` **gqlTransaction**: `Object`

The graphql Transaction with receipts object.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `__typename` | ``"Transaction"`` |
| `gasPrice?` | ``null`` \| `string` |
| `id` | `string` |
| `rawPayload` | `string` |
| `receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] |
| `status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:98](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L98)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:88](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L88)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

Current provider

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:90](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L90)

___

### resultAttempts

• **resultAttempts**: `number` = `0`

Number of attempts made to retrieve a processed transaction.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:96](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L96)

## Methods

### decodeTransaction

▸ **decodeTransaction**&lt;`TTransactionType`\>(`transactionWithReceipts`): `Transaction`&lt;`TTransactionType`\>

Decode the raw payload of the transaction.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionWithReceipts` | `Object` | The transaction with receipts object. |
| `transactionWithReceipts.__typename` | ``"Transaction"`` | - |
| `transactionWithReceipts.gasPrice?` | ``null`` \| `string` | - |
| `transactionWithReceipts.id` | `string` | - |
| `transactionWithReceipts.rawPayload` | `string` | - |
| `transactionWithReceipts.receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] | - |
| `transactionWithReceipts.status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } | - |

#### Returns

`Transaction`&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:151](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L151)

___

### fetch

▸ **fetch**(): `Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string` ; `salt`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }  }\>

Transaction with receipts query result.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:130](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L130)

___

### getTransactionSummary

▸ **getTransactionSummary**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;[`TransactionSummary`](/api/Providers/index.md#transactionsummary)&lt;`TTransactionType`\>\>

Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
fetch it from the provider

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;[`TransactionSummary`](/api/Providers/index.md#transactionsummary)&lt;`TTransactionType`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:165](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L165)

___

### sleepBasedOnAttempts

▸ **sleepBasedOnAttempts**(`attempts`): `Promise`&lt;`void`\>

Introduces a delay based on the number of previous attempts made.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `attempts` | `number` | The number of attempts. |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:250](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L250)

___

### wait

▸ **wait**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:230](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L230)

___

### waitForResult

▸ **waitForResult**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Providers/index.md#abimap) |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

The completed transaction result

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:204](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L204)

___

### create

▸ **create**(`id`, `provider`): `Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

Async constructor for `TransactionResponse`. This method can be used to create
an instance of `TransactionResponse` and wait for the transaction to be fetched
from the chain, ensuring that the `gqlTransaction` property is set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider. |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Providers/TransactionResponse.md)\>

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:119](https://github.com/FuelLabs/fuels-ts/blob/b3f5afed/packages/providers/src/transaction-response/transaction-response.ts#L119)
