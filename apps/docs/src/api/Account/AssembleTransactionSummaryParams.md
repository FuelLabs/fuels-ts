[**@fuel-ts/account v0.94.9**](../index.md) • **Docs**

***

# Interface: AssembleTransactionSummaryParams

## Properties

### abiMap?

> `optional` **abiMap**: [`AbiMap`](../index.md#abimap)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:32](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L32)

***

### baseAssetId

> **baseAssetId**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:37](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L37)

***

### gasCosts

> **gasCosts**: [`GasCosts`](../index.md#gascosts-1)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:34](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L34)

***

### gasPerByte

> **gasPerByte**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L25)

***

### gasPrice

> **gasPrice**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:36](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L36)

***

### gasPriceFactor

> **gasPriceFactor**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:26](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L26)

***

### gqlTransactionStatus?

> `optional` **gqlTransactionStatus**: `null` \| `object` \| `object` \| `object` \| `object`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:30](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L30)

***

### id

> **id**: `string`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:28](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L28)

***

### maxGasPerTx

> **maxGasPerTx**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:35](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L35)

***

### maxInputs

> **maxInputs**: `BN`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:33](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L33)

***

### receipts

> **receipts**: `TransactionResultReceipt`[]

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L31)

***

### transaction

> **transaction**: `Partial`\&lt;`Omit`\&lt;`TransactionScript`, `"type"`\>\> & `Partial`\&lt;`Omit`\&lt;`TransactionCreate`, `"type"`\>\> & `Partial`\&lt;`Omit`\&lt;`TransactionMint`, `"type"`\>\> & `Partial`\&lt;`Omit`\&lt;`TransactionUpgrade`, `"type"`\>\> & `Partial`\&lt;`Omit`\&lt;`TransactionUpload`, `"type"`\>\> & `Partial`\&lt;`Omit`\&lt;`TransactionBlob`, `"type"`\>\> & `object`

#### Type declaration

##### type

> **type**: [`TransactionType`](./TransactionType.md)

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:27](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L27)

***

### transactionBytes

> **transactionBytes**: `Uint8Array`

#### Defined in

[packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts:29](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/account/src/providers/transaction-summary/assemble-transaction-summary.ts#L29)
