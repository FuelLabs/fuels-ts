# Interface: AssembleTransactionSummaryParams

[@fuel-ts/account](/api/Account/index.md).AssembleTransactionSummaryParams

## Properties

### abiMap

• `Optional` **abiMap**: [`AbiMap`](/api/Account/index.md#abimap)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:32](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L32)

___

### baseAssetId

• **baseAssetId**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:37](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L37)

___

### gasCosts

• **gasCosts**: [`GasCosts`](/api/Account/index.md#gascosts)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:34](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L34)

___

### gasPerByte

• **gasPerByte**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L25)

___

### gasPrice

• **gasPrice**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:36](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L36)

___

### gasPriceFactor

• **gasPriceFactor**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L26)

___

### gqlTransactionStatus

• `Optional` **gqlTransactionStatus**: ``null`` \| { `block`: { `id`: `string`  } ; `reason`: `string` ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"FailureStatus"``  } \| { `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `block`: { `id`: `string`  } ; `programState?`: ``null`` \| { `data`: `string` ; `returnType`: `GqlReturnType`  } ; `receipts`: { `amount?`: ``null`` \| `string` ; `assetId?`: ``null`` \| `string` ; `contractId?`: ``null`` \| `string` ; `data?`: ``null`` \| `string` ; `digest?`: ``null`` \| `string` ; `gas?`: ``null`` \| `string` ; `gasUsed?`: ``null`` \| `string` ; `id?`: ``null`` \| `string` ; `is?`: ``null`` \| `string` ; `len?`: ``null`` \| `string` ; `nonce?`: ``null`` \| `string` ; `param1?`: ``null`` \| `string` ; `param2?`: ``null`` \| `string` ; `pc?`: ``null`` \| `string` ; `ptr?`: ``null`` \| `string` ; `ra?`: ``null`` \| `string` ; `rb?`: ``null`` \| `string` ; `rc?`: ``null`` \| `string` ; `rd?`: ``null`` \| `string` ; `reason?`: ``null`` \| `string` ; `receiptType`: `GqlReceiptType` ; `recipient?`: ``null`` \| `string` ; `result?`: ``null`` \| `string` ; `sender?`: ``null`` \| `string` ; `subId?`: ``null`` \| `string` ; `to?`: ``null`` \| `string` ; `toAddress?`: ``null`` \| `string` ; `val?`: ``null`` \| `string`  }[] ; `time`: `string` ; `totalFee`: `string` ; `totalGas`: `string` ; `type`: ``"SuccessStatus"``  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:30](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L30)

___

### id

• **id**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:28](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L28)

___

### maxGasPerTx

• **maxGasPerTx**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:35](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L35)

___

### maxInputs

• **maxInputs**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:33](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L33)

___

### receipts

• **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:31](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L31)

___

### transaction

• **transaction**: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionBlob`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:27](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L27)

___

### transactionBytes

• **transactionBytes**: `Uint8Array`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:29](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L29)
