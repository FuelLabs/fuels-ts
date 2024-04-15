# Interface: AssembleTransactionSummaryParams

[@fuel-ts/account](/api/Account/index.md).AssembleTransactionSummaryParams

## Properties

### abiMap

• `Optional` **abiMap**: [`AbiMap`](/api/Account/index.md#abimap)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:29](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L29)

___

### gasCosts

• **gasCosts**: `GqlGasCosts`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:31](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L31)

___

### gasPerByte

• **gasPerByte**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:22](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L22)

___

### gasPriceFactor

• **gasPriceFactor**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:23](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L23)

___

### gqlTransactionStatus

• `Optional` **gqlTransactionStatus**: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `string` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `reason`: `string` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `string` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `string` ; `type`: ``"SuccessStatus"``  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:27](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L27)

___

### id

• `Optional` **id**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L25)

___

### maxInputs

• **maxInputs**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:30](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L30)

___

### receipts

• **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:28](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L28)

___

### transaction

• **transaction**: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:24](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L24)

___

### transactionBytes

• **transactionBytes**: `Uint8Array`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L26)
