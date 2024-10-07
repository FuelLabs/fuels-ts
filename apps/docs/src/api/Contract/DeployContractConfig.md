[**@fuel-ts/contract v0.94.9**](../index.md) • **Docs**

***

# Interface: DeployContractConfig

## Properties

### factory

> **factory**: [`DeployableContractFactory`](DeployableContractFactory.md)

Contract factory class outputted by `pnpm fuels typegen`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:23](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/contract/src/test-utils/launch-test-node.ts#L23)

***

### options?

> `optional` **options**: [`DeployContractOptions`](./src-index.md#deploycontractoptions)

Options for contract deployment taken from `ContractFactory`.

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:27](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/contract/src/test-utils/launch-test-node.ts#L27)

***

### walletIndex?

> `optional` **walletIndex**: `number`

Index of wallet to be used for deployment. Defaults to `0` (first wallet).

#### Defined in

[packages/contract/src/test-utils/launch-test-node.ts:31](https://github.com/FuelLabs/fuels-ts/blob/6074ab538bfb9e8b48e10c710d2d5944a3027bc5/packages/contract/src/test-utils/launch-test-node.ts#L31)
