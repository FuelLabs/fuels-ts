# Interface: DeployContractConfig

[@fuel-ts/contract](/api/Contract/index.md).[test-utils](/api/Contract/test-utils-index.md).DeployContractConfig

## Properties

### factory

• **factory**: [`DeployableContractFactory`](/api/Contract/DeployableContractFactory.md)

Contract factory class outputted by `pnpm fuels typegen`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:23](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L23)

___

### options

• `Optional` **options**: [`DeployContractOptions`](/api/Contract/src-index.md#deploycontractoptions)

Options for contract deployment taken from `ContractFactory`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:27](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L27)

___

### walletIndex

• `Optional` **walletIndex**: `number`

Index of wallet to be used for deployment. Defaults to `0` (first wallet).

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:31](https://github.com/FuelLabs/fuels-ts/blob/8172e06047e1e0ed06f0ac2f92f4f4ad1a719c7c/packages/contract/src/test-utils/launch-test-node.ts#L31)
