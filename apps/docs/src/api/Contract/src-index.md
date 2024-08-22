# Module: index

## Classes

- [ContractFactory](/api/Contract/ContractFactory.md)

## Type Aliases

### DeployContractOptions

Ƭ **DeployContractOptions**: { `chunkSizeMultiplier?`: `number` ; `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike`

Options for deploying a contract.

#### Defined in

[packages/contract/src/contract-factory.ts:35](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/contract-factory.ts#L35)

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

[packages/contract/src/contract-factory.ts:43](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/contract-factory.ts#L43)
