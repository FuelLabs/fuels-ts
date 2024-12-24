# Running a local Fuel node

Remember to first install the [Fuel Toolchain](https://docs.fuel.network/guides/installation/).

Then check the command self documentation:

::: code-group

```sh-vue [Fuel Binary]
fuel-core
```

<!-- ```sh-vue [Forc]
forc node
``` -->

```sh-vue [TS SDK]
fuels node
```

:::

Check also the online docs:

|             | Command      | Documentation                                                                                          |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| Fuel Binary | `fuel-core`  | [docs](https://docs.fuel.network/guides/running-a-node/running-a-local-node/) — Running a local node   |
| TS SDK      | `fuels node` | [docs](https://docs.fuel.network/docs/fuels-ts/fuels-cli/commands/#fuels-node) — Using the `fuels` CLI |

<!-- | Forc | `forc node` | [docs](https://docs.fuel.network/docs/forc/commands/forc_node/) | -->

# Testing Utilities

You can run a Fuel node from within your `.ts` unit tests:

- [Launching a test node](../testing/launching-a-test-node.md)

# Developer Utilities

Configure your project for the `fuels` CLI using a `fuels.config.ts` file:

- [Using the `fuels init` command](../fuels-cli/commands.md#fuels-init)

It makes development easier with a hot-reload experience:

- [Using the `fuels dev` command](../fuels-cli/commands.md#fuels-dev)
