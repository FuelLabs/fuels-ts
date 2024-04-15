# Module: @fuel-ts/account

## Enumerations

- [FuelConnectorEventTypes](/api/Account/FuelConnectorEventTypes.md)
- [FuelConnectorMethods](/api/Account/FuelConnectorMethods.md)
- [Language](/api/Account/Language.md)
- [TransactionType](/api/Account/TransactionType.md)

## Classes

- [Account](/api/Account/Account.md)
- [BaseTransactionRequest](/api/Account/BaseTransactionRequest.md)
- [BaseWalletUnlocked](/api/Account/BaseWalletUnlocked.md)
- [CreateTransactionRequest](/api/Account/CreateTransactionRequest.md)
- [Fuel](/api/Account/Fuel.md)
- [FuelConnector](/api/Account/FuelConnector.md)
- [HDWallet](/api/Account/HDWallet.md)
- [LocalStorage](/api/Account/LocalStorage.md)
- [MemoryStorage](/api/Account/MemoryStorage.md)
- [Mnemonic](/api/Account/Mnemonic.md)
- [MnemonicVault](/api/Account/MnemonicVault.md)
- [Predicate](/api/Account/Predicate.md)
- [PrivateKeyVault](/api/Account/PrivateKeyVault.md)
- [Provider](/api/Account/Provider.md)
- [ScriptTransactionRequest](/api/Account/ScriptTransactionRequest.md)
- [Signer](/api/Account/Signer.md)
- [StorageAbstract](/api/Account/StorageAbstract.md)
- [TransactionResponse](/api/Account/TransactionResponse.md)
- [Vault](/api/Account/Vault.md)
- [Wallet](/api/Account/Wallet.md)
- [WalletLocked](/api/Account/WalletLocked.md)
- [WalletManager](/api/Account/WalletManager.md)
- [WalletUnlocked](/api/Account/WalletUnlocked.md)

## Interfaces

- [AssembleTransactionSummaryParams](/api/Account/AssembleTransactionSummaryParams.md)
- [GenerateOptions](/api/Account/GenerateOptions.md)
- [GetTransactionSummaryFromRequestParams](/api/Account/GetTransactionSummaryFromRequestParams.md)
- [GetTransactionsSummariesParams](/api/Account/GetTransactionsSummariesParams.md)
- [GetTransactionsSummariesReturns](/api/Account/GetTransactionsSummariesReturns.md)
- [GetTransferOperationsParams](/api/Account/GetTransferOperationsParams.md)
- [IAddAmountToAssetParams](/api/Account/IAddAmountToAssetParams.md)
- [IGetMaxGasParams](/api/Account/IGetMaxGasParams.md)
- [IGetMinGasParams](/api/Account/IGetMinGasParams.md)
- [MintedAsset](/api/Account/MintedAsset.md)
- [MnemonicVaultOptions](/api/Account/MnemonicVaultOptions.md)
- [PkVaultOptions](/api/Account/PkVaultOptions.md)
- [TargetObject](/api/Account/TargetObject.md)
- [WalletManagerState](/api/Account/WalletManagerState.md)

## Type Aliases

### AbiMap

Ƭ **AbiMap**: `Record`&lt;`string`, `JsonAbi`\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:123](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L123)

___

### AccountEvent

Ƭ **AccountEvent**: `Object`

Event trigger when the current account on the connector is changed
if the account is not authorized for the connection it should trigger with value null.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string` \| ``null`` |
| `type` | [`currentAccount`](/api/Account/FuelConnectorEventTypes.md#currentaccount) |

#### Defined in

[packages/account/src/connectors/types/events.ts:40](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L40)

___

### AccountsEvent

Ƭ **AccountsEvent**: `Object`

Event trigger when the accounts available to the
connection changes.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `string`[] |
| `type` | [`accounts`](/api/Account/FuelConnectorEventTypes.md#accounts) |

#### Defined in

[packages/account/src/connectors/types/events.ts:28](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L28)

___

### Asset

Ƭ **Asset**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `icon` | `string` | icon of the asset |
| `name` | `string` | name of the asset |
| `networks` | ([`NetworkEthereum`](/api/Account/index.md#networkethereum) \| [`NetworkFuel`](/api/Account/index.md#networkfuel))[] | asset id on Fuel Network |
| `symbol` | `string` | description of the asset |

#### Defined in

[packages/account/src/providers/assets/types.ts:25](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L25)

___

### AssetEth

Ƭ **AssetEth**: `Omit`&lt;[`Asset`](/api/Account/index.md#asset), ``"networks"``\> & [`NetworkEthereum`](/api/Account/index.md#networkethereum)

#### Defined in

[packages/account/src/providers/assets/types.ts:38](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L38)

___

### AssetFuel

Ƭ **AssetFuel**: `Omit`&lt;[`Asset`](/api/Account/index.md#asset), ``"networks"``\> & [`NetworkFuel`](/api/Account/index.md#networkfuel)

#### Defined in

[packages/account/src/providers/assets/types.ts:39](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L39)

___

### Assets

Ƭ **Assets**: [`Asset`](/api/Account/index.md#asset)[]

#### Defined in

[packages/account/src/providers/assets/types.ts:36](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L36)

___

### Block

Ƭ **Block**: `Object`

A Fuel block

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height` | `BN` |
| `id` | `string` |
| `time` | `string` |
| `transactionIds` | `string`[] |

#### Defined in

[packages/account/src/providers/provider.ts:71](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L71)

___

### BlockHeader

Ƭ **BlockHeader**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `applicationHash` | `string` |
| `daHeight` | `BN` |
| `height` | `BN` |
| `id` | `string` |
| `messageReceiptCount` | `BN` |
| `messageReceiptRoot` | `string` |
| `prevRoot` | `string` |
| `time` | `string` |
| `transactionsCount` | `BN` |
| `transactionsRoot` | `string` |

#### Defined in

[packages/account/src/providers/message.ts:35](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L35)

___

### BlockId

Ƭ **BlockId**: [`SuccessStatus`](/api/Account/index.md#successstatus)[``"block"``][``"id"``] \| [`FailureStatus`](/api/Account/index.md#failurestatus)[``"block"``][``"id"``]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:24](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L24)

___

### BurnedAsset

Ƭ **BurnedAsset**: [`MintedAsset`](/api/Account/MintedAsset.md)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:150](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L150)

___

### CacheFor

Ƭ **CacheFor**: `Object`

#### Index signature

▪ [key: `string`]: { `timeout`: `number` ; `value`: `unknown`  } \| ``null``

#### Defined in

[packages/account/src/connectors/utils/cache.ts:3](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/cache.ts#L3)

___

### CalculateTransactionFeeParams

Ƭ **CalculateTransactionFeeParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `consensusParameters` | `Pick`&lt;`GqlConsensusParameters`, ``"gasCosts"``\> & { `feeParams`: `FeeParams`  } |
| `gasUsed` | `BN` |
| `rawPayload` | `string` |

#### Defined in

[packages/account/src/providers/transaction-summary/calculate-transaction-fee.ts:23](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/calculate-transaction-fee.ts#L23)

___

### CallResult

Ƭ **CallResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/account/src/providers/provider.ts:59](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L59)

___

### ChainInfo

Ƭ **ChainInfo**: `Object`

Chain information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `baseChainHeight` | `BN` |
| `consensusParameters` | `ConsensusParameters` |
| `gasCosts` | `GqlGasCosts` |
| `latestBlock` | { `height`: `BN` ; `id`: `string` ; `time`: `string` ; `transactions`: { `id`: `string`  }[]  } |
| `latestBlock.height` | `BN` |
| `latestBlock.id` | `string` |
| `latestBlock.time` | `string` |
| `latestBlock.transactions` | { `id`: `string`  }[] |
| `name` | `string` |

#### Defined in

[packages/account/src/providers/provider.ts:108](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L108)

___

### ChangeTransactionRequestOutput

Ƭ **ChangeTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coins |
| `to` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Receiving address or script hash |
| `type` | `OutputType.Change` | - |

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:24](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L24)

___

### Coin

Ƭ **Coin**: `Object`

A Fuel coin

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `blockCreated` | `BN` |
| `id` | `string` |
| `maturity` | `number` |
| `owner` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `txCreatedIdx` | `BN` |

#### Defined in

[packages/account/src/providers/coin.ts:7](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/coin.ts#L7)

___

### CoinQuantity

Ƭ **CoinQuantity**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `max?` | `BN` |

#### Defined in

[packages/account/src/providers/coin-quantity.ts:10](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/coin-quantity.ts#L10)

___

### CoinQuantityLike

Ƭ **CoinQuantityLike**: [amount: BigNumberish, assetId?: BytesLike, max?: BigNumberish] \| { `amount`: `BigNumberish` ; `assetId?`: [`BytesLike`](/api/Interfaces/index.md#byteslike) ; `max?`: `BigNumberish`  }

#### Defined in

[packages/account/src/providers/coin-quantity.ts:7](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/coin-quantity.ts#L7)

___

### CoinTransactionRequestInput

Ƭ **CoinTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of the coins |
| `id` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | UTXO ID |
| `maturity?` | `number` | UTXO being spent must have been created at least this many blocks ago |
| `owner` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Owning address or script hash |
| `predicate?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Predicate bytecode |
| `predicateData?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Predicate input data (parameters) |
| `predicateGasUsed?` | `BigNumberish` | Gas used by predicate |
| `txPointer` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | `InputType.Coin` | - |
| `witnessIndex` | `number` | Index of witness that authorizes spending the coin |

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:11](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/input.ts#L11)

___

### CoinTransactionRequestOutput

Ƭ **CoinTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins to send |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Asset ID of coins |
| `to` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Receiving address or script hash |
| `type` | `OutputType.Coin` | - |

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:10](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L10)

___

### ConnectorMetadata

Ƭ **ConnectorMetadata**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `image?` | `string` \| { `dark`: `string` ; `light`: `string`  } |
| `install` | { `action`: `string` ; `description`: `string` ; `link`: `string`  } |
| `install.action` | `string` |
| `install.description` | `string` |
| `install.link` | `string` |

#### Defined in

[packages/account/src/connectors/types/connector-metadata.ts:1](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/connector-metadata.ts#L1)

___

### ContractCreatedTransactionRequestOutput

Ƭ **ContractCreatedTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Contract ID |
| `stateRoot` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | State Root |
| `type` | `OutputType.ContractCreated` | - |

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:34](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L34)

___

### ContractResult

Ƭ **ContractResult**: `Object`

Deployed Contract bytecode and contract id

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bytecode` | `string` |
| `id` | `string` |

#### Defined in

[packages/account/src/providers/provider.ts:81](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L81)

___

### ContractTransactionRequestInput

Ƭ **ContractTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Contract ID |
| `txPointer` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Points to the TX whose output is being spent. (TxPointer) |
| `type` | `InputType.Contract` | - |

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:76](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/input.ts#L76)

___

### ContractTransactionRequestOutput

Ƭ **ContractTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `inputIndex` | `number` | Index of input contract |
| `type` | `OutputType.Contract` | - |

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:19](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L19)

___

### DeferPromise

Ƭ **DeferPromise**&lt;`R`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `promise` | `Promise`&lt;`R`\> |
| `reject` | (`error`: `unknown`) => `void` |
| `resolve` | (`value`: `R`) => `void` |

#### Defined in

[packages/account/src/connectors/utils/promises.ts:2](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/promises.ts#L2)

___

### EstimatePredicateParams

Ƭ **EstimatePredicateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `estimatePredicates?` | `boolean` |

#### Defined in

[packages/account/src/providers/provider.ts:261](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L261)

___

### EstimateTransactionParams

Ƭ **EstimateTransactionParams**: `Object`

Transaction estimation Param

#### Type declaration

| Name | Type |
| :------ | :------ |
| `estimateTxDependencies?` | `boolean` |

#### Defined in

[packages/account/src/providers/provider.ts:257](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L257)

___

### EstimateTxDependenciesReturns

Ƭ **EstimateTxDependenciesReturns**: [`CallResult`](/api/Account/index.md#callresult) & { `missingContractIds`: `string`[] ; `outputVariables`: `number`  }

#### Defined in

[packages/account/src/providers/provider.ts:63](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L63)

___

### FailureStatus

Ƭ **FailureStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Account/index.md#graphqltransactionstatus), { `__typename`: ``"FailureStatus"``  }\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:14](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L14)

___

### FuelABI

Ƭ **FuelABI**: `JsonAbi`

ABI that represents a binary code interface from Sway.

Read more at: https://docs.fuel.network/docs/specs/abi/json-abi-format/

#### Defined in

[packages/account/src/connectors/types/data-type.ts:36](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/data-type.ts#L36)

___

### FuelConfig

Ƭ **FuelConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connectors?` | [`FuelConnector`](/api/Account/FuelConnector.md)[] |
| `storage?` | [`StorageAbstract`](/api/Account/StorageAbstract.md) \| ``null`` |
| `targetObject?` | [`TargetObject`](/api/Account/TargetObject.md) |

#### Defined in

[packages/account/src/connectors/fuel.ts:30](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/fuel.ts#L30)

___

### FuelConnectorEvents

Ƭ **FuelConnectorEvents**: [`ConnectionEvent`](/api/Account/index.md#connectionevent) \| [`NetworkEvent`](/api/Account/index.md#networkevent) \| [`NetworksEvent`](/api/Account/index.md#networksevent) \| [`AccountEvent`](/api/Account/index.md#accountevent) \| [`AccountsEvent`](/api/Account/index.md#accountsevent) \| [`ConnectorsEvent`](/api/Account/index.md#connectorsevent) \| [`ConnectorEvent`](/api/Account/index.md#connectorevent) \| [`AssetsEvent`](/api/Account/index.md#assetsevent)

All the events available to the connector.

#### Defined in

[packages/account/src/connectors/types/events.ts:122](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L122)

___

### FuelConnectorEventsType

Ƭ **FuelConnectorEventsType**: [`FuelConnectorEvents`](/api/Account/index.md#fuelconnectorevents)[``"type"``]

#### Defined in

[packages/account/src/connectors/types/events.ts:132](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L132)

___

### FuelConnectorSelectOptions

Ƭ **FuelConnectorSelectOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `emitEvents?` | `boolean` |

#### Defined in

[packages/account/src/connectors/fuel.ts:36](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/fuel.ts#L36)

___

### FuelEventArg

Ƭ **FuelEventArg**&lt;`T`\>: `Extract`&lt;[`FuelConnectorEventTypes`](/api/Account/FuelConnectorEventTypes.md), { `type`: `T`  }\>[``"data"``]

Extract the event argument type from the event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`FuelConnectorEvents`](/api/Account/index.md#fuelconnectorevents)[``"type"``] |

#### Defined in

[packages/account/src/connectors/types/events.ts:16](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L16)

___

### GetAssetNetworkParams

Ƭ **GetAssetNetworkParams**&lt;`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NetworkTypes`](/api/Account/index.md#networktypes) \| `undefined` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `asset` | [`Asset`](/api/Account/index.md#asset) |
| `chainId?` | `number` |
| `networkType` | `T` |

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:22](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L22)

___

### GetOperationParams

Ƭ **GetOperationParams**: { `abiMap?`: [`AbiMap`](/api/Account/index.md#abimap) ; `maxInputs`: `BN` ; `transactionType`: [`TransactionType`](/api/Account/TransactionType.md)  } & [`InputOutputParam`](/api/Account/index.md#inputoutputparam) & [`ReceiptParam`](/api/Account/index.md#receiptparam) & [`RawPayloadParam`](/api/Account/index.md#rawpayloadparam)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:135](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L135)

___

### GqlTransaction

Ƭ **GqlTransaction**: `NonNullable`&lt;`GqlGetTransactionQuery`[``"transaction"``]\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:9](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L9)

___

### GraphqlTransactionStatus

Ƭ **GraphqlTransactionStatus**: [`GqlTransaction`](/api/Account/index.md#gqltransaction)[``"status"``]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:11](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L11)

___

### InputOutputParam

Ƭ **InputOutputParam**: [`InputParam`](/api/Account/index.md#inputparam) & [`OutputParam`](/api/Account/index.md#outputparam)

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:129](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L129)

___

### InputParam

Ƭ **InputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `inputs` | `Input`[] |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:111](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L111)

___

### JsonAbisFromAllCalls

Ƭ **JsonAbisFromAllCalls**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `main` | `JsonAbi` |
| `otherContractsAbis` | `Record`&lt;`string`, `JsonAbi`\> |

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:18](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/types.ts#L18)

___

### MerkleProof

Ƭ **MerkleProof**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `proofIndex` | `BN` |
| `proofSet` | `string`[] |

#### Defined in

[packages/account/src/providers/message.ts:30](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L30)

___

### Message

Ƭ **Message**: `Object`

A Fuel message

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `daHeight` | `BN` |
| `data` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `messageId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `nonce` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/account/src/providers/message.ts:10](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L10)

___

### MessageCoin

Ƭ **MessageCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `assetId` | `string` |
| `daHeight` | `BN` |
| `nonce` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/account/src/providers/message.ts:21](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L21)

___

### MessageProof

Ƭ **MessageProof**: `Object`

Message Proof

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BN` |
| `blockProof` | [`MerkleProof`](/api/Account/index.md#merkleproof) |
| `commitBlockHeader` | [`BlockHeader`](/api/Account/index.md#blockheader) |
| `data` | `string` |
| `messageBlockHeader` | [`BlockHeader`](/api/Account/index.md#blockheader) |
| `messageProof` | [`MerkleProof`](/api/Account/index.md#merkleproof) |
| `nonce` | `string` |
| `recipient` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `sender` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |

#### Defined in

[packages/account/src/providers/message.ts:51](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L51)

___

### MessageStatus

Ƭ **MessageStatus**: `Object`

Message Status

#### Type declaration

| Name | Type |
| :------ | :------ |
| `state` | `GqlMessageState` |

#### Defined in

[packages/account/src/providers/message.ts:66](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/message.ts#L66)

___

### MessageTransactionRequestInput

Ƭ **MessageTransactionRequestInput**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `BigNumberish` | Amount of coins |
| `data?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | data of message |
| `nonce` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Unique nonce of message |
| `predicate?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Predicate bytecode |
| `predicateData?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Predicate input data (parameters) |
| `predicateGasUsed?` | `BigNumberish` | Gas used by predicate |
| `recipient` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Address of recipient |
| `sender` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | Address of sender |
| `type` | `InputType.Message` | - |
| `witnessIndex` | `number` | Index of witness that authorizes the message |

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:45](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/input.ts#L45)

___

### MnemonicPhrase

Ƭ **MnemonicPhrase**: `string` \| `string`[]

#### Defined in

[packages/account/src/mnemonic/utils.ts:7](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/utils.ts#L7)

___

### Network

Ƭ **Network**: `Object`

Network

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | The chain id of the network. |
| `url` | `string` | The name of the network. |

#### Defined in

[packages/account/src/connectors/types/data-type.ts:20](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/data-type.ts#L20)

___

### NetworkEthereum

Ƭ **NetworkEthereum**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `address?` | `string` | address of the asset contract |
| `chainId` | `number` | chain id of the network |
| `decimals` | `number` | number of decimals of the asset |
| `type` | ``"ethereum"`` | type of network |

#### Defined in

[packages/account/src/providers/assets/types.ts:1](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L1)

___

### NetworkFuel

Ƭ **NetworkFuel**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetId` | `string` | assetId on the Fuel Network |
| `chainId` | `number` | chain id of the network |
| `contractId?` | `string` | the contractId of that generated the Asset on the Fuel Network |
| `decimals` | `number` | number of decimals of the asset |
| `type` | ``"fuel"`` | type of network |

#### Defined in

[packages/account/src/providers/assets/types.ts:12](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/types.ts#L12)

___

### NetworkTypes

Ƭ **NetworkTypes**: [`NetworkEthereum`](/api/Account/index.md#networkethereum)[``"type"``] \| [`NetworkFuel`](/api/Account/index.md#networkfuel)[``"type"``]

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:5](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L5)

___

### NodeInfo

Ƭ **NodeInfo**: `Object`

Node information

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxDepth` | `BN` |
| `maxTx` | `BN` |
| `minGasPrice` | `BN` |
| `nodeVersion` | `string` |
| `peers` | `GqlPeerInfo`[] |
| `utxoValidation` | `boolean` |
| `vmBacktrace` | `boolean` |

#### Defined in

[packages/account/src/providers/provider.ts:124](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L124)

___

### NodeInfoAndConsensusParameters

Ƭ **NodeInfoAndConsensusParameters**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerTx` | `BN` |
| `minGasPrice` | `BN` |
| `nodeVersion` | `string` |

#### Defined in

[packages/account/src/providers/provider.ts:134](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L134)

___

### Operation

Ƭ **Operation**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `assetsSent?` | [`OperationCoin`](/api/Account/index.md#operationcoin)[] |
| `calls?` | [`OperationFunctionCall`](/api/Account/index.md#operationfunctioncall)[] |
| `from?` | [`OperationTransactionAddress`](/api/Account/index.md#operationtransactionaddress) |
| `name?` | `OperationName` |
| `to?` | [`OperationTransactionAddress`](/api/Account/index.md#operationtransactionaddress) |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:81](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L81)

___

### OperationCoin

Ƭ **OperationCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BNInput` |
| `assetId` | `string` |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:70](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L70)

___

### OperationFunctionCall

Ƭ **OperationFunctionCall**: { `argumentsProvided?`: `Record`&lt;`string`, `unknown`\> ; `functionName`: `string` ; `functionSignature`: `string`  } & `Partial`&lt;[`OperationCoin`](/api/Account/index.md#operationcoin)\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:75](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L75)

___

### OperationTransactionAddress

Ƭ **OperationTransactionAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `chain?` | `ChainName` |
| `type` | `AddressType` |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:105](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L105)

___

### OutputParam

Ƭ **OutputParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `outputs` | `Output`[] |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:115](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L115)

___

### PredicateParams

Ƭ **PredicateParams**&lt;`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `InputValue`[] |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `abi?` | `JsonAbi` |
| `bytecode` | [`BytesLike`](/api/Interfaces/index.md#byteslike) |
| `configurableConstants?` | { `[name: string]`: `unknown`;  } |
| `inputData?` | `T` |
| `provider` | [`Provider`](/api/Account/Provider.md) |

#### Defined in

[packages/account/src/predicate/predicate.ts:32](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/predicate/predicate.ts#L32)

___

### ProgramState

Ƭ **ProgramState**: [`SuccessStatus`](/api/Account/index.md#successstatus)[``"programState"``]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:22](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L22)

___

### ProviderCallParams

Ƭ **ProviderCallParams**: [`UTXOValidationParams`](/api/Account/index.md#utxovalidationparams) & [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams)

Provider Call transaction params

#### Defined in

[packages/account/src/providers/provider.ts:274](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L274)

___

### ProviderOptions

Ƭ **ProviderOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cacheUtxo?` | `number` | Cache UTXOs for the given time [ms]. |
| `fetch?` | (`url`: `string`, `requestInit?`: `RequestInit`, `providerOptions?`: `Omit`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions), ``"fetch"``\>) => `Promise`&lt;`Response`\> | Custom fetch function to use for making requests. |
| `requestMiddleware?` | (`request`: `RequestInit`) => `RequestInit` \| `Promise`&lt;`RequestInit`\> | Middleware to modify the request before it is sent. This can be used to add headers, modify the body, etc. |
| `retryOptions?` | `RetryOptions` | Retry options to use when fetching data from the node. |
| `timeout?` | `number` | Timeout [ms] after which every request will be aborted. |

#### Defined in

[packages/account/src/providers/provider.ts:219](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L219)

___

### ProviderSendTxParams

Ƭ **ProviderSendTxParams**: [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) & { `awaitExecution?`: `boolean`  }

Provider Send transaction params

#### Defined in

[packages/account/src/providers/provider.ts:279](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L279)

___

### RawCoin

Ƭ **RawCoin**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |
| `blockCreated` | `string` |
| `maturity` | `string` |
| `owner` | `string` |
| `txCreatedIdx` | `string` |
| `utxoId` | `string` |

#### Defined in

[packages/account/src/providers/resource.ts:6](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/resource.ts#L6)

___

### RawMessage

Ƭ **RawMessage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `string` |
| `assetId` | `string` |
| `daHeight` | `string` |
| `data` | `string` |
| `nonce` | `string` |
| `recipient` | `string` |
| `sender` | `string` |

#### Defined in

[packages/account/src/providers/resource.ts:16](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/resource.ts#L16)

___

### RawPayloadParam

Ƭ **RawPayloadParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `rawPayload?` | `string` |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:125](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L125)

___

### RawResource

Ƭ **RawResource**: [`RawCoin`](/api/Account/index.md#rawcoin) \| [`RawMessage`](/api/Account/index.md#rawmessage)

#### Defined in

[packages/account/src/providers/resource.ts:26](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/resource.ts#L26)

___

### Reason

Ƭ **Reason**: [`FailureStatus`](/api/Account/index.md#failurestatus)[``"reason"``]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:21](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L21)

___

### ReceiptParam

Ƭ **ReceiptParam**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:119](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L119)

___

### Resource

Ƭ **Resource**: [`Coin`](/api/Account/index.md#coin) \| [`MessageCoin`](/api/Account/index.md#messagecoin)

#### Defined in

[packages/account/src/providers/resource.ts:27](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/resource.ts#L27)

___

### SqueezedOutStatus

Ƭ **SqueezedOutStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Account/index.md#graphqltransactionstatus), { `__typename`: ``"SqueezedOutStatus"``  }\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:16](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L16)

___

### Status

Ƭ **Status**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `connected` | `boolean` |
| `installed` | `boolean` |

#### Defined in

[packages/account/src/connectors/fuel.ts:40](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/fuel.ts#L40)

___

### SubmittedStatus

Ƭ **SubmittedStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Account/index.md#graphqltransactionstatus), { `__typename`: ``"SubmittedStatus"``  }\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:15](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L15)

___

### SuccessStatus

Ƭ **SuccessStatus**: `Extract`&lt;[`GraphqlTransactionStatus`](/api/Account/index.md#graphqltransactionstatus), { `__typename`: ``"SuccessStatus"``  }\>

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L13)

___

### Time

Ƭ **Time**: [`SubmittedStatus`](/api/Account/index.md#submittedstatus)[``"time"``] \| [`SuccessStatus`](/api/Account/index.md#successstatus)[``"time"``] \| [`FailureStatus`](/api/Account/index.md#failurestatus)[``"time"``]

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L23)

___

### TransactionCost

Ƭ **TransactionCost**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `estimatedInputs` | [`TransactionRequest`](/api/Account/index.md#transactionrequest)[``"inputs"``] |
| `gasPrice` | `BN` |
| `gasUsed` | `BN` |
| `maxFee` | `BN` |
| `maxGas` | `BN` |
| `minFee` | `BN` |
| `minGas` | `BN` |
| `minGasPrice` | `BN` |
| `missingContractIds` | `string`[] |
| `outputVariables` | `number` |
| `receipts` | `TransactionResultReceipt`[] |
| `requiredQuantities` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] |

#### Defined in

[packages/account/src/providers/provider.ts:143](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L143)

___

### TransactionCostParams

Ƭ **TransactionCostParams**: [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) & [`EstimatePredicateParams`](/api/Account/index.md#estimatepredicateparams) & { `resourcesOwner?`: [`AbstractAccount`](/api/Interfaces/AbstractAccount.md) ; `signatureCallback?`: (`request`: [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)) => `Promise`&lt;[`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md)\>  }

#### Defined in

[packages/account/src/providers/provider.ts:265](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L265)

___

### TransactionRequest

Ƭ **TransactionRequest**: [`ScriptTransactionRequest`](/api/Account/ScriptTransactionRequest.md) \| [`CreateTransactionRequest`](/api/Account/CreateTransactionRequest.md)

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/types.ts#L13)

___

### TransactionRequestInput

Ƭ **TransactionRequestInput**: [`CoinTransactionRequestInput`](/api/Account/index.md#cointransactionrequestinput) \| [`ContractTransactionRequestInput`](/api/Account/index.md#contracttransactionrequestinput) \| [`MessageTransactionRequestInput`](/api/Account/index.md#messagetransactionrequestinput)

#### Defined in

[packages/account/src/providers/transaction-request/input.ts:85](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/input.ts#L85)

___

### TransactionRequestLike

Ƭ **TransactionRequestLike**: { `type`: [`Script`](/api/Account/TransactionType.md#script)  } & `ScriptTransactionRequestLike` \| { `type`: [`Create`](/api/Account/TransactionType.md#create)  } & `CreateTransactionRequestLike`

#### Defined in

[packages/account/src/providers/transaction-request/types.ts:14](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/types.ts#L14)

___

### TransactionRequestOutput

Ƭ **TransactionRequestOutput**: [`CoinTransactionRequestOutput`](/api/Account/index.md#cointransactionrequestoutput) \| [`ContractTransactionRequestOutput`](/api/Account/index.md#contracttransactionrequestoutput) \| [`ChangeTransactionRequestOutput`](/api/Account/index.md#changetransactionrequestoutput) \| [`VariableTransactionRequestOutput`](/api/Account/index.md#variabletransactionrequestoutput) \| [`ContractCreatedTransactionRequestOutput`](/api/Account/index.md#contractcreatedtransactionrequestoutput)

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:41](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L41)

___

### TransactionResultBurnReceipt

Ƭ **TransactionResultBurnReceipt**: `ReceiptBurn`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:55](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-response/transaction-response.ts#L55)

___

### TransactionResultMintReceipt

Ƭ **TransactionResultMintReceipt**: `ReceiptMint`

#### Defined in

[packages/account/src/providers/transaction-response/transaction-response.ts:54](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-response/transaction-response.ts#L54)

___

### TransactionSummary

Ƭ **TransactionSummary**&lt;`TTransactionType`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `blockId?` | [`BlockId`](/api/Account/index.md#blockid) |
| `burnedAssets` | [`BurnedAsset`](/api/Account/index.md#burnedasset)[] |
| `date?` | `Date` |
| `fee` | `BN` |
| `gasUsed` | `BN` |
| `id?` | `string` |
| `isStatusFailure` | `boolean` |
| `isStatusPending` | `boolean` |
| `isStatusSuccess` | `boolean` |
| `isTypeCreate` | `boolean` |
| `isTypeMint` | `boolean` |
| `isTypeScript` | `boolean` |
| `mintedAssets` | [`MintedAsset`](/api/Account/MintedAsset.md)[] |
| `operations` | [`Operation`](/api/Account/index.md#operation)[] |
| `receipts` | `TransactionResultReceipt`[] |
| `status?` | `TransactionStatus` |
| `time?` | `string` |
| `transaction` | `Transaction`&lt;`TTransactionType`\> |
| `type` | `TransactionTypeName` |

#### Defined in

[packages/account/src/providers/transaction-summary/types.ts:152](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/types.ts#L152)

___

### TxParamsType

Ƭ **TxParamsType**: `Pick`&lt;`ScriptTransactionRequestLike`, ``"gasLimit"`` \| ``"gasPrice"`` \| ``"maturity"`` \| ``"maxFee"`` \| ``"witnessLimit"``\>

#### Defined in

[packages/account/src/account.ts:35](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/account.ts#L35)

___

### UTXOValidationParams

Ƭ **UTXOValidationParams**: `Object`

UTXO Validation Param

#### Type declaration

| Name | Type |
| :------ | :------ |
| `utxoValidation?` | `boolean` |

#### Defined in

[packages/account/src/providers/provider.ts:250](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/provider.ts#L250)

___

### VariableTransactionRequestOutput

Ƭ **VariableTransactionRequestOutput**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | `OutputType.Variable` |

#### Defined in

[packages/account/src/providers/transaction-request/output.ts:31](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-request/output.ts#L31)

___

### VaultConfig

Ƭ **VaultConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `secret?` | `string` |
| `title?` | `string` |
| `type` | `string` |

#### Defined in

[packages/account/src/wallet-manager/types.ts:17](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet-manager/types.ts#L17)

___

### VaultsState

Ƭ **VaultsState**: { `data?`: [`VaultConfig`](/api/Account/index.md#vaultconfig) ; `title?`: `string` ; `type`: `string` ; `vault`: [`Vault`](/api/Account/Vault.md)  }[]

#### Defined in

[packages/account/src/wallet-manager/types.ts:23](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet-manager/types.ts#L23)

___

### Version

Ƭ **Version**: `Object`

Version

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | `string` | - |
| `network` | `string` | Version selection this allow Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4 Tilde Ranges ~1.2.3 ~1.2 ~1 And Exact Versions 1.0.0 |

#### Defined in

[packages/account/src/connectors/types/data-type.ts:6](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/data-type.ts#L6)

___

### WalletManagerAccount

Ƭ **WalletManagerAccount**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) |
| `publicKey` | `string` |
| `vaultId?` | `number` |

#### Defined in

[packages/account/src/wallet-manager/types.ts:7](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet-manager/types.ts#L7)

___

### WalletManagerOptions

Ƭ **WalletManagerOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `storage` | [`StorageAbstract`](/api/Account/StorageAbstract.md) |

#### Defined in

[packages/account/src/wallet-manager/types.ts:13](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wallet-manager/types.ts#L13)

## Variables

### CHAIN\_IDS

• `Const` **CHAIN\_IDS**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `eth` | { `foundry`: `number` = 31337; `sepolia`: `number` = 11155111 } |
| `eth.foundry` | `number` |
| `eth.sepolia` | `number` |
| `fuel` | { `beta5`: `number` = 0; `devnet`: `number` = 10 } |
| `fuel.beta5` | `number` |
| `fuel.devnet` | `number` |

#### Defined in

[packages/account/src/providers/chains.ts:1](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/chains.ts#L1)

___

### FuelConnectorEventType

• `Const` **FuelConnectorEventType**: ``"FuelConnector"``

#### Defined in

[packages/account/src/connectors/types/connector-types.ts:42](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/connector-types.ts#L42)

___

### MNEMONIC\_SIZES

• `Const` **MNEMONIC\_SIZES**: `number`[]

#### Defined in

[packages/account/src/mnemonic/mnemonic.ts:27](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/mnemonic/mnemonic.ts#L27)

___

### assets

• `Const` **assets**: [`Assets`](/api/Account/index.md#assets)

#### Defined in

[packages/account/src/providers/assets/index.ts:5](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/index.ts#L5)

___

### english

• `Const` **english**: `string`[]

#### Defined in

[packages/account/src/wordlists/words/english.ts:1](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/wordlists/words/english.ts#L1)

## Functions

### addAmountToAsset

▸ **addAmountToAsset**(`params`): [`CoinQuantity`](/api/Account/index.md#coinquantity)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IAddAmountToAssetParams`](/api/Account/IAddAmountToAssetParams.md) |

#### Returns

[`CoinQuantity`](/api/Account/index.md#coinquantity)[]

#### Defined in

[packages/account/src/providers/coin-quantity.ts:41](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/coin-quantity.ts#L41)

___

### assemblePanicError

▸ **assemblePanicError**(`status`): `Object`

Assembles an error message for a panic status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | `Object` | The transaction failure status. |
| `status.__typename` | ``"FailureStatus"`` | - |
| `status.block` | `Object` | - |
| `status.block.__typename` | ``"Block"`` | - |
| `status.block.id` | `string` | - |
| `status.reason` | `string` | - |
| `status.time` | `string` | - |
| `status.type` | ``"FailureStatus"`` | - |

#### Returns

`Object`

The error message.

| Name | Type |
| :------ | :------ |
| `errorMessage` | `string` |
| `reason` | `string` |

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:24](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/extract-tx-error.ts#L24)

___

### assembleReceiptByType

▸ **assembleReceiptByType**(`receipt`): `ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `GqlReceiptFragmentFragment` |

#### Returns

`ReceiptCall` \| `ReceiptReturn` \| `ReceiptReturnData` \| `ReceiptPanic` \| `ReceiptRevert` \| `ReceiptLog` \| `ReceiptLogData` \| `ReceiptTransfer` \| `ReceiptTransferOut` \| `ReceiptScriptResult` \| `ReceiptMessageOut` \| `ReceiptMint` \| `ReceiptBurn`

#### Defined in

[packages/account/src/providers/utils/receipts.ts:69](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/receipts.ts#L69)

___

### assembleRevertError

▸ **assembleRevertError**(`receipts`, `logs`): `Object`

Assembles an error message for a revert status.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] | The transaction result processed receipts. |
| `logs` | `unknown`[] | The transaction decoded logs. |

#### Returns

`Object`

The error message.

| Name | Type |
| :------ | :------ |
| `errorMessage` | `string` |
| `reason` | `string` |

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:44](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/extract-tx-error.ts#L44)

___

### cacheFor

▸ **cacheFor**&lt;`F`\>(`fn`, `«destructured»`): `F`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends (...`args`: `unknown`[]) => `Promise`&lt;`unknown`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `F` |
| `«destructured»` | `CacheForOptions` |

#### Returns

`F`

#### Defined in

[packages/account/src/connectors/utils/cache.ts:16](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/cache.ts#L16)

___

### calculateMetadataGasForTxCreate

▸ **calculateMetadataGasForTxCreate**(`«destructured»`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `contractBytesSize` | `BN` |
| › `gasCosts` | `GqlGasCosts` |
| › `stateRootSize` | `number` |
| › `txBytesSize` | `number` |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:104](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L104)

___

### calculateMetadataGasForTxScript

▸ **calculateMetadataGasForTxScript**(`«destructured»`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `gasCosts` | `GqlGasCosts` |
| › `txBytesSize` | `number` |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:125](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L125)

___

### calculateTransactionFee

▸ **calculateTransactionFee**(`params`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`CalculateTransactionFeeParams`](/api/Account/index.md#calculatetransactionfeeparams) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `fee` | `BN` |
| `feeFromGasUsed` | `BN` |
| `maxFee` | `BN` |
| `minFee` | `BN` |

#### Defined in

[packages/account/src/providers/transaction-summary/calculate-transaction-fee.ts:29](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/calculate-transaction-fee.ts#L29)

___

### deferPromise

▸ **deferPromise**&lt;`R`\>(): [`DeferPromise`](/api/Account/index.md#deferpromise)&lt;`R`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `unknown` |

#### Returns

[`DeferPromise`](/api/Account/index.md#deferpromise)&lt;`R`\>

#### Defined in

[packages/account/src/connectors/utils/promises.ts:8](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/promises.ts#L8)

___

### dispatchFuelConnectorEvent

▸ **dispatchFuelConnectorEvent**(`connector`): `void`

Fuel Connector Event is a custom event that can be used by the connector to
inform the Fuel Connector Manager that a new connector is available.

#### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | [`FuelConnector`](/api/Account/FuelConnector.md) |

#### Returns

`void`

#### Defined in

[packages/account/src/connectors/utils/dispatch-fuel-connector-event.ts:8](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/dispatch-fuel-connector-event.ts#L8)

___

### extractBurnedAssetsFromReceipts

▸ **extractBurnedAssetsFromReceipts**(`receipts`): [`MintedAsset`](/api/Account/MintedAsset.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Returns

[`MintedAsset`](/api/Account/MintedAsset.md)[]

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:51](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/receipt.ts#L51)

___

### extractMintedAssetsFromReceipts

▸ **extractMintedAssetsFromReceipts**(`receipts`): [`MintedAsset`](/api/Account/MintedAsset.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipts` | `TransactionResultReceipt`[] |

#### Returns

[`MintedAsset`](/api/Account/MintedAsset.md)[]

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:32](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/receipt.ts#L32)

___

### extractTxError

▸ **extractTxError**(`params`): `FuelError`

Extracts the transaction error and returns a FuelError object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `IExtractTxError` |

#### Returns

`FuelError`

The FuelError object.

#### Defined in

[packages/account/src/providers/utils/extract-tx-error.ts:113](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/extract-tx-error.ts#L113)

___

### gasUsedByInputs

▸ **gasUsedByInputs**(`inputs`, `txBytesSize`, `gasCosts`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `inputs` | ([`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput) \| `Input`)[] |
| `txBytesSize` | `number` |
| `gasCosts` | `GqlGasCosts` |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:40](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L40)

___

### getAssetEth

▸ **getAssetEth**(`asset`, `chainId?`): `undefined` \| [`AssetEth`](/api/Account/index.md#asseteth)

Returns the asset's details on Ethereum

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | [`Asset`](/api/Account/index.md#asset) |
| `chainId?` | `number` |

#### Returns

`undefined` \| [`AssetEth`](/api/Account/index.md#asseteth)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:80](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L80)

___

### getAssetFuel

▸ **getAssetFuel**(`asset`, `chainId?`): `undefined` \| [`AssetFuel`](/api/Account/index.md#assetfuel)

Returns the asset's details on Fuel

#### Parameters

| Name | Type |
| :------ | :------ |
| `asset` | [`Asset`](/api/Account/index.md#asset) |
| `chainId?` | `number` |

#### Returns

`undefined` \| [`AssetFuel`](/api/Account/index.md#assetfuel)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:90](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L90)

___

### getAssetNetwork

▸ **getAssetNetwork**&lt;`T`\>(`«destructured»`): `NetworkTypeToNetwork`&lt;`T`\>

Returns the asset's network on the given network
eg. getAssetNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `undefined` \| [`NetworkTypes`](/api/Account/index.md#networktypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GetAssetNetworkParams`](/api/Account/index.md#getassetnetworkparams)&lt;`T`\> |

#### Returns

`NetworkTypeToNetwork`&lt;`T`\>

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:32](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L32)

___

### getAssetWithNetwork

▸ **getAssetWithNetwork**&lt;`T`\>(`«destructured»`): `undefined` \| [`AssetEth`](/api/Account/index.md#asseteth) \| [`AssetFuel`](/api/Account/index.md#assetfuel)

Returns the asset's details on the given network alongwith the asset itself
eg. getAssetWithNetwork({ asset, chainId: 1, networkType: 'ethereum' }) will return the asset's details on Ethereum mainnet and the asset itself

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`NetworkTypes`](/api/Account/index.md#networktypes) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`GetAssetNetworkParams`](/api/Account/index.md#getassetnetworkparams)&lt;`T`\> |

#### Returns

`undefined` \| [`AssetEth`](/api/Account/index.md#asseteth) \| [`AssetFuel`](/api/Account/index.md#assetfuel)

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:48](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L48)

___

### getDefaultChainId

▸ **getDefaultChainId**(`networkType`): `undefined` \| `number`

Returns the default chainId for the given network

#### Parameters

| Name | Type |
| :------ | :------ |
| `networkType` | [`NetworkTypes`](/api/Account/index.md#networktypes) |

#### Returns

`undefined` \| `number`

#### Defined in

[packages/account/src/providers/assets/utils/network.ts:11](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/network.ts#L11)

___

### getMaxGas

▸ **getMaxGas**(`params`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IGetMaxGasParams`](/api/Account/IGetMaxGasParams.md) |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:92](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L92)

___

### getMinGas

▸ **getMinGas**(`params`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`IGetMinGasParams`](/api/Account/IGetMinGasParams.md) |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:72](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L72)

___

### getTransactionSummary

▸ **getTransactionSummary**&lt;`TTransactionType`\>(`params`): `Promise`&lt;`TransactionResult`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetTransactionSummaryParams` |

#### Returns

`Promise`&lt;`TransactionResult`\>

#### Defined in

[packages/account/src/providers/transaction-summary/get-transaction-summary.ts:25](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/get-transaction-summary.ts#L25)

___

### processGqlReceipt

▸ **processGqlReceipt**(`gqlReceipt`): `TransactionResultReceipt`

#### Parameters

| Name | Type |
| :------ | :------ |
| `gqlReceipt` | `GqlReceiptFragmentFragment` |

#### Returns

`TransactionResultReceipt`

#### Defined in

[packages/account/src/providers/transaction-summary/receipt.ts:9](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/transaction-summary/receipt.ts#L9)

___

### resolveGasDependentCosts

▸ **resolveGasDependentCosts**(`byteSize`, `gasDependentCost`): `BN`

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteSize` | `BNInput` |
| `gasDependentCost` | `GqlDependentCost` |

#### Returns

`BN`

#### Defined in

[packages/account/src/providers/utils/gas.ts:28](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/utils/gas.ts#L28)

___

### resolveIconPaths

▸ **resolveIconPaths**(`assets`, `basePath?`): { `icon`: `string` ; `name`: `string` ; `networks`: ([`NetworkEthereum`](/api/Account/index.md#networkethereum) \| [`NetworkFuel`](/api/Account/index.md#networkfuel))[] ; `symbol`: `string`  }[]

Returns the list of assets with the icon paths 'resolved'. eg. `./eth.svg` -> `https://some-url.com/eth.svg`

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `assets` | [`Assets`](/api/Account/index.md#assets) | `undefined` | List of assets |
| `basePath` | `string` | `'./'` | Base path for the icon URLs (default: './') |

#### Returns

{ `icon`: `string` ; `name`: `string` ; `networks`: ([`NetworkEthereum`](/api/Account/index.md#networkethereum) \| [`NetworkFuel`](/api/Account/index.md#networkfuel))[] ; `symbol`: `string`  }[]

The assets with the icon paths resolved

#### Defined in

[packages/account/src/providers/assets/utils/resolveIconPaths.ts:11](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/resolveIconPaths.ts#L11)

___

### urlJoin

▸ **urlJoin**(`baseUrl`, `...paths`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `baseUrl` | `undefined` \| `string` |
| `...paths` | `string`[] |

#### Returns

`string`

#### Defined in

[packages/account/src/providers/assets/utils/url.ts:5](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/providers/assets/utils/url.ts#L5)

___

### withTimeout

▸ **withTimeout**&lt;`F`, `RT`\>(`promise`, `timeout?`): `Promise`&lt;`RT`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `F` | extends `Promise`&lt;`unknown`\> |
| `RT` | `Awaited`&lt;`F`\> |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `promise` | `F` | `undefined` |
| `timeout` | `number` | `1050` |

#### Returns

`Promise`&lt;`RT`\>

#### Defined in

[packages/account/src/connectors/utils/promises.ts:20](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/utils/promises.ts#L20)

## Events

### AssetsEvent

Ƭ **AssetsEvent**: `Object`

Event trigger when the assets list of metadata changed.

 AssetsEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Asset`](/api/Account/index.md#asset)[] |
| `type` | [`assets`](/api/Account/FuelConnectorEventTypes.md#assets) |

#### Defined in

[packages/account/src/connectors/types/events.ts:114](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L114)

___

### ConnectionEvent

Ƭ **ConnectionEvent**: `Object`

Event trigger when connection status changes. With the new connection status.

 ConnectionEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `boolean` |
| `type` | [`connection`](/api/Account/FuelConnectorEventTypes.md#connection) |

#### Defined in

[packages/account/src/connectors/types/events.ts:52](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L52)

___

### ConnectorEvent

Ƭ **ConnectorEvent**: `Object`

Event trigger when the current connector has changed.

 ConnectorEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`FuelConnector`](/api/Account/FuelConnector.md) |
| `type` | [`currentConnector`](/api/Account/FuelConnectorEventTypes.md#currentconnector) |

#### Defined in

[packages/account/src/connectors/types/events.ts:102](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L102)

___

### ConnectorsEvent

Ƭ **ConnectorsEvent**: `Object`

Event trigger when the list of connectors has changed.

 ConnectorsEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`FuelConnector`](/api/Account/FuelConnector.md)[] |
| `type` | [`connectors`](/api/Account/FuelConnectorEventTypes.md#connectors) |

#### Defined in

[packages/account/src/connectors/types/events.ts:90](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L90)

___

### NetworkEvent

Ƭ **NetworkEvent**: `Object`

Event trigger when the network selected on the connector is changed.
It should trigger even if the network is not available for the connection.

 NetworkEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Network`](/api/Account/index.md#network) |
| `type` | [`currentNetwork`](/api/Account/FuelConnectorEventTypes.md#currentnetwork) |

#### Defined in

[packages/account/src/connectors/types/events.ts:65](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L65)

___

### NetworksEvent

Ƭ **NetworksEvent**: `Object`

Event trigger when the network selected on the connector is changed.
It should trigger even if the network is not available for the connection.

 NetworksEvent

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`Network`](/api/Account/index.md#network) |
| `type` | [`networks`](/api/Account/FuelConnectorEventTypes.md#networks) |

#### Defined in

[packages/account/src/connectors/types/events.ts:78](https://github.com/FuelLabs/fuels-ts/blob/f4302fbd/packages/account/src/connectors/types/events.ts#L78)
