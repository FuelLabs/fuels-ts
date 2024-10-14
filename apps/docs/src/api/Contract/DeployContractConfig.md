[**@fuel-ts/contract v0.96.1**](../index.md) • **Docs**

***

# Interface: DeployContractConfig

## Properties

### factory

> **factory**: [`DeployableContractFactory`](DeployableContractFactory.md)

Contract factory class outputted by `pnpm fuels typegen`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:23](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/contract/src/test-utils/launch-test-node.ts#L23)

***

### options?

> `optional` **options**: [`DeployContractOptions`](./src-index.md#deploycontractoptions)

Options for contract deployment taken from `ContractFactory`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:27](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/contract/src/test-utils/launch-test-node.ts#L27)

***

### walletIndex?

> `optional` **walletIndex**: `number`

Index of wallet to be used for deployment. Defaults to `0` (first wallet).

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:31](https://github.com/FuelLabs/fuels-ts/blob/2d42dc2cd8ad9160914de24e3ddf50045f8b0f24/packages/contract/src/test-utils/launch-test-node.ts#L31)
