# Class: TransactionResponse

[@fuel-ts/account](/api/Account/index.md).TransactionResponse

Represents a response for a transaction.

## Constructors

### constructor

• **new TransactionResponse**(`id`, `provider`, `abis?`): [`TransactionResponse`](/api/Account/TransactionResponse.md)

Constructor for `TransactionResponse`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider. |
| `abis?` | [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls) | - |

#### Returns

[`TransactionResponse`](/api/Account/TransactionResponse.md)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:100](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L100)

## Properties

### abis

• `Optional` **abis**: [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:92](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L92)

___

### gasUsed

• **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:88](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L88)

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
| `receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] |
| `status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } |

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:90](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L90)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:84](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L84)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

Current provider

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:86](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L86)

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
| `transactionWithReceipts.receipts?` | ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] | - |
| `transactionWithReceipts.status?` | ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  } | - |

#### Returns

`Transaction`&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:159](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L159)

___

### fetch

▸ **fetch**(): `Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`&lt;{ `__typename`: ``"Transaction"`` ; `gasPrice?`: ``null`` \| `string` ; `id`: `string` ; `rawPayload`: `string` ; `receipts?`: ``null`` \| { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contract?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| { `__typename`: ``"Contract"`` ; `id`: `string`  } ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `status?`: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

Transaction with receipts query result.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:129](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L129)

___

### getTransactionSummary

▸ **getTransactionSummary**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;[`TransactionSummary`](/api/Account/index.md#transactionsummary)&lt;`TTransactionType`\>\>

Retrieves the TransactionSummary. If the `gqlTransaction` is not set, it will
fetch it from the provider

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Account/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;[`TransactionSummary`](/api/Account/index.md#transactionsummary)&lt;`TTransactionType`\>\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:173](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L173)

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
| `contractsAbiMap?` | [`AbiMap`](/api/Account/index.md#abimap) | The contracts ABI map. |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:282](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L282)

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
| `contractsAbiMap?` | [`AbiMap`](/api/Account/index.md#abimap) |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

The completed transaction result

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:237](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L237)

___

### waitForStatusChange

▸ **waitForStatusChange**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:207](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L207)

___

### create

▸ **create**(`id`, `provider`, `abis?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Async constructor for `TransactionResponse`. This method can be used to create
an instance of `TransactionResponse` and wait for the transaction to be fetched
from the chain, ensuring that the `gqlTransaction` property is set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The transaction ID. |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider. |
| `abis?` | [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls) | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:114](https://github.com/FuelLabs/fuels-ts/blob/fd411a37/packages/account/src/providers/transaction-response/transaction-response.ts#L114)
