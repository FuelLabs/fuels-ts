# Interface: AssembleTransactionSummaryParams

[@fuel-ts/account](/api/Account/index.md).AssembleTransactionSummaryParams

## Properties

### abiMap

• `Optional` **abiMap**: [`AbiMap`](/api/Account/index.md#abimap)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L31)

___

### gasCosts

• **gasCosts**: [`GasCosts`](/api/Account/index.md#gascosts)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:33](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L33)

___

### gasPerByte

• **gasPerByte**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:24](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L24)

___

### gasPrice

• **gasPrice**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:35](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L35)

___

### gasPriceFactor

• **gasPriceFactor**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L25)

___

### gqlTransactionStatus

• `Optional` **gqlTransactionStatus**: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `receipts`: { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `__typename`: ``"Receipt"`` ; `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:29](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L29)

___

### id

• `Optional` **id**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:27](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L27)

___

### maxGasPerTx

• **maxGasPerTx**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:34](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L34)

___

### maxInputs

• **maxInputs**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:32](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L32)

___

### receipts

• **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:30](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L30)

___

### transaction

• **transaction**: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L26)

___

### transactionBytes

• **transactionBytes**: `Uint8Array`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:28](https://github.com/FuelLabs/fuels-ts/blob/6c4998c2/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L28)
