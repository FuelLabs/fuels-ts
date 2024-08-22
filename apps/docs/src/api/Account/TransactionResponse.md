# Class: TransactionResponse

[@fuel-ts/account](/api/Account/index.md).TransactionResponse

Represents a response for a transaction.

## Constructors

### constructor

• **new TransactionResponse**(`tx`, `provider`, `abis?`): [`TransactionResponse`](/api/Account/TransactionResponse.md)

Constructor for `TransactionResponse`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tx` | `string` \| [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The transaction ID or TransactionRequest. |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider. |
| `abis?` | [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls) | - |

#### Returns

[`TransactionResponse`](/api/Account/TransactionResponse.md)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:144](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L144)

## Properties

### abis

• `Optional` **abis**: [`JsonAbisFromAllCalls`](/api/Account/index.md#jsonabisfromallcalls)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:136](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L136)

___

### gasUsed

• **gasUsed**: `BN`

Gas used on the transaction

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:131](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L131)

___

### gqlTransaction

• `Private` `Optional` **gqlTransaction**: `Object`

The graphql Transaction with receipts object.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `rawPayload` | `string` |
| `status?` | ``null`` \| { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  } |

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:133](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L133)

___

### id

• **id**: `string`

Transaction ID

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:127](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L127)

___

### provider

• **provider**: [`Provider`](/api/Account/Provider.md)

Current provider

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:129](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L129)

___

### request

• `Private` `Optional` **request**: [`TransactionRequest`](/api/Account/index.md#transactionrequest)

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:134](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L134)

___

### status

• `Private` `Optional` **status**: { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `transaction`: { `inputs?`: ``null`` \| ({ `txPointer`: `string` ; `type`: ``"InputCoin"``  } \| { `txPointer`: `string` ; `type`: ``"InputContract"``  } \| { `type`: ``"InputMessage"``  })[] ; `outputs`: ({ `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"ChangeOutput"``  } \| { `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"CoinOutput"``  } \| { `contract`: `string` ; `stateRoot`: `string` ; `type`: ``"ContractCreated"``  } \| { `balanceRoot`: `string` ; `inputIndex`: `string` ; `stateRoot`: `string` ; `type`: ``"ContractOutput"``  } \| { `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"VariableOutput"``  })[] ; `receiptsRoot?`: ``null`` \| `string`  } ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `transaction`: { `inputs?`: ``null`` \| ({ `txPointer`: `string` ; `type`: ``"InputCoin"``  } \| { `txPointer`: `string` ; `type`: ``"InputContract"``  } \| { `type`: ``"InputMessage"``  })[] ; `outputs`: ({ `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"ChangeOutput"``  } \| { `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"CoinOutput"``  } \| { `contract`: `string` ; `stateRoot`: `string` ; `type`: ``"ContractCreated"``  } \| { `balanceRoot`: `string` ; `inputIndex`: `string` ; `stateRoot`: `string` ; `type`: ``"ContractOutput"``  } \| { `amount`: `string` ; `assetId`: `string` ; `to`: `string` ; `type`: ``"VariableOutput"``  })[] ; `receiptsRoot?`: ``null`` \| `string`  } ; `type`: ``"SuccessStatus"``  }

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:135](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L135)

## Methods

### applyMalleableSubscriptionFields

▸ **applyMalleableSubscriptionFields**&lt;`TTransactionType`\>(`transaction`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `transaction` | `Transaction`&lt;`TTransactionType`\> |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:170](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L170)

___

### assembleResult

▸ **assembleResult**&lt;`TTransactionType`\>(`contractsAbiMap?`): `Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

Assembles the result of a transaction by retrieving the transaction summary,
decoding logs (if available), and handling transaction failure.

This method can be used to obtain the result of a transaction that has just
been submitted or one that has already been processed.

**`Throws`**

If the transaction status is a failure.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `TTransactionType` | `void` | The type of the transaction. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractsAbiMap?` | [`AbiMap`](/api/Account/index.md#abimap) | The map of contract ABIs. |

#### Returns

`Promise`&lt;`TransactionResult`&lt;`TTransactionType`\>\>

- The assembled transaction result.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:353](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L353)

___

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
| `transactionWithReceipts.id` | `string` | - |
| `transactionWithReceipts.rawPayload` | `string` | - |
| `transactionWithReceipts.status?` | ``null`` \| { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  } | - |

#### Returns

`Transaction`&lt;`TTransactionType`\>

The decoded transaction.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:272](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L272)

___

### fetch

▸ **fetch**(): `Promise`&lt;{ `id`: `string` ; `rawPayload`: `string` ; `status?`: ``null`` \| { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

Fetch the transaction with receipts from the provider.

#### Returns

`Promise`&lt;{ `id`: `string` ; `rawPayload`: `string` ; `status?`: ``null`` \| { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  }  }\>

Transaction with receipts query result.

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:241](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L241)

___

### getReceipts

▸ **getReceipts**(): `TransactionResultReceipt`[]

#### Returns

`TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:224](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L224)

___

### getTransaction

▸ **getTransaction**&lt;`TTransactionType`\>(): `Promise`&lt;{ `bytes`: `Uint8Array` ; `tx`: `Transaction`&lt;`TTransactionType`\>  }\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Returns

`Promise`&lt;{ `bytes`: `Uint8Array` ; `tx`: `Transaction`&lt;`TTransactionType`\>  }\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:204](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L204)

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

[packages/account/src/providers/transaction-response/transaction-response.ts:286](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L286)

___

### unsetResourceCache

▸ **unsetResourceCache**(): `void`

#### Returns

`void`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:413](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L413)

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

[packages/account/src/providers/transaction-response/transaction-response.ts:407](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L407)

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

[packages/account/src/providers/transaction-response/transaction-response.ts:395](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L395)

___

### waitForStatusChange

▸ **waitForStatusChange**(): `Promise`&lt;`void`\>

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:316](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L316)

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

[packages/account/src/providers/transaction-response/transaction-response.ts:160](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-response/transaction-response.ts#L160)
