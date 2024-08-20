# Class: ContractFactory

[@fuel-ts/contract](/api/Contract/index.md).[index](/api/Contract/src-index.md).ContractFactory

`ContractFactory` provides utilities for deploying and configuring contracts.

## Constructors

### constructor

• **new ContractFactory**(`bytecode`, `abi`, `accountOrProvider?`): [`ContractFactory`](/api/Contract/ContractFactory.md)

Create a ContractFactory instance.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `bytecode` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | `undefined` | The bytecode of the contract. |
| `abi` | `Interface` \| `JsonAbi` | `undefined` | The contract's ABI (Application Binary Interface). |
| `accountOrProvider` | ``null`` \| [`Provider`](/api/Account/Provider.md) \| [`Account`](/api/Account/Account.md) | `null` | An account or provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

#### Defined in

[packages/contract/src/contract-factory.ts:68](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L68)

## Properties

### account

• **account**: ``null`` \| [`Account`](/api/Account/Account.md)

#### Defined in

[packages/contract/src/contract-factory.ts:59](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L59)

___

### bytecode

• **bytecode**: [`BytesLike`](/api/Interfaces/index.md#byteslike)

#### Defined in

[packages/contract/src/contract-factory.ts:56](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L56)

___

### interface

• **interface**: `Interface`

#### Defined in

[packages/contract/src/contract-factory.ts:57](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L57)

___

### provider

• **provider**: ``null`` \| [`Provider`](/api/Account/Provider.md)

#### Defined in

[packages/contract/src/contract-factory.ts:58](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L58)

## Methods

### blobTransactionRequest

▸ **blobTransactionRequest**(`options`): [`BlobTransactionRequest`](/api/Account/BlobTransactionRequest.md)

Create a blob transaction request, used for deploying contract chunks.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | { `bytecode`: [`BytesLike`](/api/Interfaces/index.md#byteslike)  } & { `chunkSizeMultiplier?`: `number` ; `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike` | options for creating a blob transaction request. |

#### Returns

[`BlobTransactionRequest`](/api/Account/BlobTransactionRequest.md)

a populated BlobTransactionRequest.

#### Defined in

[packages/contract/src/contract-factory.ts:444](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L444)

___

### connect

▸ **connect**(`provider`): [`ContractFactory`](/api/Contract/ContractFactory.md)

Connect the factory to a provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `provider` | [`Provider`](/api/Account/Provider.md) | The provider to be associated with the factory. |

#### Returns

[`ContractFactory`](/api/Contract/ContractFactory.md)

A new ContractFactory instance.

#### Defined in

[packages/contract/src/contract-factory.ts:110](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L110)

___

### createTransactionRequest

▸ **createTransactionRequest**(`deployOptions?`): `Object`

Create a transaction request to deploy a contract with the specified options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployOptions?` | { `chunkSizeMultiplier?`: `number` ; `configurableConstants?`: { `[name: string]`: `unknown`;  } ; `salt?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `stateRoot?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `storageSlots?`: `StorageSlot`[]  } & `CreateTransactionRequestLike` & { `bytecode?`: [`BytesLike`](/api/Interfaces/index.md#byteslike)  } | Options for deploying the contract. |

#### Returns

`Object`

The CreateTransactionRequest object for deploying the contract.

| Name | Type |
| :------ | :------ |
| `contractId` | `string` |
| `transactionRequest` | [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md) |

#### Defined in

[packages/contract/src/contract-factory.ts:120](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L120)

___

### deploy

▸ **deploy**&lt;`TContract`\>(`deployOptions?`): `Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

Deploy a contract of any length with the specified options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends [`Contract`](/api/Program/Contract.md) = [`Contract`](/api/Program/Contract.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployOptions` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:195](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L195)

___

### deployAsBlobTx

▸ **deployAsBlobTx**&lt;`TContract`\>(`deployOptions?`): `Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

Chunks and deploys a contract via a loader contract. Suitable for deploying contracts larger than the max contract size.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends [`Contract`](/api/Program/Contract.md) = [`Contract`](/api/Program/Contract.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployOptions` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:251](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L251)

___

### deployAsCreateTx

▸ **deployAsCreateTx**&lt;`TContract`\>(`deployOptions?`): `Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

Deploy a contract with the specified options.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TContract` | extends [`Contract`](/api/Program/Contract.md) = [`Contract`](/api/Program/Contract.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deployOptions` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) | Options for deploying the contract. |

#### Returns

`Promise`&lt;[`DeployContractResult`](/api/Contract/src-index.md#deploycontractresult)&lt;`TContract`\>\>

A promise that resolves to the deployed contract instance.

#### Defined in

[packages/contract/src/contract-factory.ts:213](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L213)

___

### fundTransactionRequest

▸ **fundTransactionRequest**(`request`, `options?`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

Takes a transaction request, estimates it and funds it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `request` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) | the request to fund. |
| `options` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) | options for funding the request. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

a funded transaction request.

#### Defined in

[packages/contract/src/contract-factory.ts:164](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L164)

___

### getAccount

▸ **getAccount**(): [`Account`](/api/Account/Account.md)

#### Returns

[`Account`](/api/Account/Account.md)

#### Defined in

[packages/contract/src/contract-factory.ts:414](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L414)

___

### getMaxChunkSize

▸ **getMaxChunkSize**(`deployOptions`, `chunkSizeMultiplier?`): `number`

Get the maximum chunk size for deploying a contract by chunks.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `deployOptions` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) | `undefined` |
| `chunkSizeMultiplier` | `number` | `CHUNK_SIZE_MULTIPLIER` |

#### Returns

`number`

#### Defined in

[packages/contract/src/contract-factory.ts:457](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L457)

___

### prepareDeploy

▸ **prepareDeploy**(`deployOptions`): `Promise`&lt;{ `contractId`: `string` ; `transactionRequest`: [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deployOptions` | [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions) |

#### Returns

`Promise`&lt;{ `contractId`: `string` ; `transactionRequest`: [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)  }\>

#### Defined in

[packages/contract/src/contract-factory.ts:421](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L421)

___

### setConfigurableConstants

▸ **setConfigurableConstants**(`configurableConstants`): `void`

Set configurable constants of the contract with the specified values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `configurableConstants` | `Object` | An object containing configurable names and their values. |

#### Returns

`void`

#### Defined in

[packages/contract/src/contract-factory.ts:377](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/contract-factory.ts#L377)
