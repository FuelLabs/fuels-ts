[**@fuel-ts/contract v0.96.1**](../index.md) • **Docs**

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

[packages/contract/src/contract-factory.ts:40](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/contract/src/contract-factory.ts#L40)

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

[packages/contract/src/contract-factory.ts:48](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/contract/src/contract-factory.ts#L48)
