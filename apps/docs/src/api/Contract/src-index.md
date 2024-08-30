[**@fuel-ts/contract v0.94.3**](../index.md) • **Docs**

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

[packages/contract/src/contract-factory.ts:35](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/contract/src/contract-factory.ts#L35)

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

[packages/contract/src/contract-factory.ts:43](https://github.com/FuelLabs/fuels-ts/blob/cc962ddd723eecfdc3547cbf3cf6ebcfd052d837/packages/contract/src/contract-factory.ts#L43)
