# Module: @fuel-ts/contract

## Classes

- [ContractFactory](/api/Contract/ContractFactory.md)

## Type Aliases

### DeployContractOptions

Ƭ **DeployContractOptions**: { `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike`

Options for deploying a contract.

#### Defined in

[contract-factory.ts:23](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/contract/src/contract-factory.ts#L23)

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

[contract-factory.ts:30](https://github.com/FuelLabs/fuels-ts/blob/45c62a98f2272774585dbb6dc3037ebe3e275042/packages/contract/src/contract-factory.ts#L30)
