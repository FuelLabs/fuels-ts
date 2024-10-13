[**@fuel-ts/contract v0.96.0**](../index.md) • **Docs**

***

# index

## Index

### Classes

- [ContractFactory](./ContractFactory.md)

## Type Aliases

### DeployContractOptions

> **DeployContractOptions**: `object` & `CreateTransactionRequestLike`

Options for deploying a contract.

#### Type declaration

##### chunkSizeMultiplier?

> `optional` **chunkSizeMultiplier**: `number`

##### configurableConstants?

> `optional` **configurableConstants**: `object`

###### Index Signature

 \[`name`: `string`\]: `unknown`

##### salt?

> `optional` **salt**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### stateRoot?

> `optional` **stateRoot**: [`BytesLike`](../Interfaces/index.md#byteslike)

##### storageSlots?

> `optional` **storageSlots**: `StorageSlot`[]

#### Defined in

[packages/contract/src/contract-factory.ts:40](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/contract/src/contract-factory.ts#L40)

***

### DeployContractResult\&lt;TContract\>

> **DeployContractResult**\&lt;`TContract`\>: `object`

#### Type Parameters

• **TContract** *extends* [`Contract`](../Program/Contract.md) = [`Contract`](../Program/Contract.md)

#### Type declaration

##### contractId

> **contractId**: `string`

##### waitForResult()

> **waitForResult**: () => `Promise`\&lt;`object`\>

###### Returns

`Promise`\&lt;`object`\>

###### contract

> **contract**: `TContract`

###### transactionResult

> **transactionResult**: `TransactionResult`\&lt;[`Create`](../Account/TransactionType.md#create)\>

##### waitForTransactionId()

> **waitForTransactionId**: () => `Promise`\&lt;`string`\>

###### Returns

`Promise`\&lt;`string`\>

#### Defined in

[packages/contract/src/contract-factory.ts:48](https://github.com/FuelLabs/fuels-ts/blob/793ac1bcd1e3f1560372e455e3b77c2d623e78b6/packages/contract/src/contract-factory.ts#L48)
