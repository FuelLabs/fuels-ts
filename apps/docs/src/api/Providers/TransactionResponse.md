# Class: TransactionResponse

[@fuel-ts/providers](/api/Providers/index.md).TransactionResponse

Represents a response for a transaction.

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`)

Constructor for `TransactionResponse`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Providers/Provider.md) | The provider. |

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:101](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L101)

## Properties

### attempts

• **attempts**: `number` = `0`

Number off attempts to get the committed tx

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:93](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L93)

___

### gasUsed

• **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:91](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L91)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:87](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L87)

___

### provider

• **provider**: [`Provider`](/api/Providers/Provider.md)

Current provider

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:89](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L89)

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
| `transactionWithReceipts.receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `bytecode`: `string` ; `id`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] | - |
| `transactionWithReceipts.status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  } | - |

#### Returns

`Transaction`&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:125](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L125)

___

### fetch

▸ **fetch**(): `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\>

Transaction with receipts query result.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:111](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L111)

___

### wait

▸ **wait**&lt;`TTransactionType`\>(): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

The completed transaction.

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:194](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L194)

___

### waitForResult

▸ **waitForResult**&lt;`TTransactionType`\>(): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Waits for transaction to complete and returns the result.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

The completed transaction result

#### Defined in

[packages/providers/src/transaction-response/transaction-response.ts:139](https://github.com/FuelLabs/fuels-ts/blob/55fe8f9/packages/providers/src/transaction-response/transaction-response.ts#L139)
