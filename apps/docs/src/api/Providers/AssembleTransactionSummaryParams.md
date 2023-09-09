# Interface: AssembleTransactionSummaryParams

[@fuel-ts/providers](/api/Providers/index.md).AssembleTransactionSummaryParams

## Properties

### abiMap

• `Optional` **abiMap**: [`AbiMap`](/api/Providers/index.md#abimap)

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:27](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L27)

___

### gasPerByte

• `Optional` **gasPerByte**: `BN`

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:21](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L21)

___

### gasPriceFactor

• `Optional` **gasPriceFactor**: `BN`

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:22](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L22)

___

### gqlTransactionStatus

• `Optional` **gqlTransactionStatus**: ``null`` \| { `__typename`: ``"FailureStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `reason`: `string` ; `time`: `any` ; `type`: ``"FailureStatus"``  } \| { `__typename`: ``"SqueezedOutStatus"`` ; `type`: ``"SqueezedOutStatus"``  } \| { `__typename`: ``"SubmittedStatus"`` ; `time`: `any` ; `type`: ``"SubmittedStatus"``  } \| { `__typename`: ``"SuccessStatus"`` ; `block`: { `__typename`: ``"Block"`` ; `id`: `string`  } ; `programState?`: ``null`` \| { `__typename`: ``"ProgramState"`` ; `data`: `string` ; `returnType`: `GqlReturnType`  } ; `time`: `any` ; `type`: ``"SuccessStatus"``  }

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L25)

___

### id

• `Optional` **id**: `string`

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:20](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L20)

___

### receipts

• **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L26)

___

### transaction

• **transaction**: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Providers/TransactionType.md)  }

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:23](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L23)

___

### transactionBytes

• **transactionBytes**: `Uint8Array`

#### Defined in

[packages/providers/src/transaction-summary/assemble-transaction-summary.ts:24](https://github.com/FuelLabs/fuels-ts/blob/a337878e/packages/providers/src/transaction-summary/assemble-transaction-summary.ts#L24)
