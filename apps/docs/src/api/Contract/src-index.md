# Module: index

## Classes

- [ContractFactory](/api/Contract/ContractFactory.md)

## Type Aliases

### DeployContractOptions

Ƭ **DeployContractOptions**: { `chunkSizeMultiplier?`: `number` ; `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike`

Options for deploying a contract.

#### Defined in

[packages/contract/src/contract-factory.ts:35](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L35)

___

### DeployContractResult

Ƭ **DeployContractResult**&lt;`TContract`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends [`Contract`](/api/Program/Contract.md) = [`Contract`](/api/Program/Contract.md) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `waitForResult` | () => `Promise`&lt;{ `contract`: `TContract` ; `transactionResult`: `TransactionResult`&lt;[`Create`](/api/Account/TransactionType.md#create)\>  }\> |
| `waitForTransactionId` | () => `Promise`&lt;`string`\> |

#### Defined in

[packages/contract/src/contract-factory.ts:43](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L43)
