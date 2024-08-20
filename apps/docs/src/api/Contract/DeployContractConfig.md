# Interface: DeployContractConfig

[@fuel-ts/contract](/api/Contract/index.md).[test-utils](/api/Contract/test-utils-index.md).DeployContractConfig

## Properties

### factory

• **factory**: [`DeployableContractFactory`](/api/Contract/DeployableContractFactory.md)

Contract factory class outputted by `pnpm fuels typegen`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:23](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/test-utils/launch-test-node.ts#L23)

___

### options

• `Optional` **options**: [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions)

Options for contract deployment taken from `ContractFactory`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:27](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/test-utils/launch-test-node.ts#L27)

___

### walletIndex

• `Optional` **walletIndex**: `number`

Index of wallet to be used for deployment. Defaults to `0` (first wallet).

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:31](https://github.com/FuelLabs/fuels-ts/blob/445f0f888f28026e859fb676e7a803be367fd58d/packages/contract/src/test-utils/launch-test-node.ts#L31)
