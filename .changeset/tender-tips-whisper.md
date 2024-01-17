---
"fuels": minor
"@fuel-ts/utils": minor
"@fuel-ts/wallet": minor
---

chore!: share single chainconfig and `launchNode` utility throughout the codebase.

- `startFuelCore` now re-uses `launchNode` instead of having its own node-launching logic
- `@fuel-ts/utils` now exports a `defaultChainConfig` and a `defaultConsensusKey` which is used everywhere in the source code.
- The `chainConfig.json` file inside the `.fuel-core` folder at the root also uses the same chain config. The `run-node` script has been modified to copy over the contents of the chain config file from the utils package.

# Breaking Changes

- Multiple fuel-core config-related options have been removed from `LaunchNodeOptions`:

  - `chainConfigPath`
  - `consensusKey`
  - `useInMemoryDb`
  - `poaInstant`

- The only way to pass in these config values now is through the `args` property, i.e.:

```ts
const { cleanup, ip, port } = await launchNode({
  args: ["--poa-interval-period", "750ms", "--poa-instant", "false"],
});
```
