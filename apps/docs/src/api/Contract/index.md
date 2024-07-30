# Module: @fuel-ts/contract

## Classes

- [ContractFactory](/api/Contract/ContractFactory.md)

## Type Aliases

### DeployContractOptions

Ƭ **DeployContractOptions**: { `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike`

Options for deploying a contract.

#### Defined in

[contract-factory.ts:28](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L28)

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
| `transactionId` | `string` |
| `waitForResult` | () => `Promise`&lt;{ `contract`: `TContract` ; `transactionResult`: `TransactionResult`&lt;[`Create`](/api/Account/TransactionType.md#create)\>  }\> |

#### Defined in

[contract-factory.ts:35](https://github.com/FuelLabs/fuels-ts/blob/b2e1be607ab99b238da6db64c8e1c10470e15f39/packages/contract/src/contract-factory.ts#L35)
