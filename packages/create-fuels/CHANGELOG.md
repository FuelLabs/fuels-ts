# create-fuels

## 0.81.0

### Patch Changes

- 37743e8: chore: add initial `depcheck` using knip

## 0.80.0

### Minor Changes

- 29d5303: fix: user resolvable errors no longer cause the cli to exit

### Patch Changes

- 29d5303: fix: remove unused dependency `fuels` from the `create-fuels` package
- 29d5303: feat: hide unnecessary logs and add loading spinners for `create-fuels`

## 0.79.0

### Minor Changes

- 3e1cdacb: feat: add browser wallet support to the create-fuels template app

### Patch Changes

- fuels@0.79.0

## 0.78.0

### Patch Changes

- fuels@0.78.0

## 0.77.0

### Minor Changes

- The `create-fuels` template app now provides a local faucet and uses a local burner wallet to execute transactions.
  Previously, the app was using a hardcoded key to sign all transactions. This key is now being used as the key for the faucet, and the burner wallet is being used to execute transactions.
  For convenience, the burner wallet is persisted in local storage so that it can be used across multiple sessions.
  The burner wallet is also topped up with 10,000 coins on first load.
  This is an important step towards adding support for the Fuel Wallet SDK, which will allow users to sign transactions using their own wallets, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1864](https://github.com/FuelLabs/fuels-ts/pull/1864))

## 0.76.0

### Patch Changes

- enable auto-install of dependencies in create-fuels, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1825](https://github.com/FuelLabs/fuels-ts/pull/1825))
- 🐞 fix tailwind syntax error in create-fuels template, by [@red-haze-dev](https://github.com/red-haze-dev) (See [#1816](https://github.com/FuelLabs/fuels-ts/pull/1816))
- 🐞 fix `create-fuels` crashing when being run, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1823](https://github.com/FuelLabs/fuels-ts/pull/1823))

## 0.75.0

### Minor Changes

- ✨ feat: add new options to the `create-fuels` CLI:
  -c, --contract Include contract program
  -p, --predicate Include predicate program
  -s, --script Include script program
  --pnpm Use pnpm as the package manager
  --npm Use npm as the package manager
  -cs, -cp, -sp, -cps Shorthand to include combination of contract, script and predicate programs
  -h, --help display help for command, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1777](https://github.com/FuelLabs/fuels-ts/pull/1777))

## 0.74.0

### Minor Changes

- Add more program options to the `create-fuels` CLI. Users can now get a multiselect choice to choose out of contract, script & predicate, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1691](https://github.com/FuelLabs/fuels-ts/pull/1691))

## 0.73.0

## 0.72.0

### Minor Changes

- Update supported node version in create fuels, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))

### Patch Changes

- 🐞 Fixing and internalizing `findBinPath` utility, by [@arboleya](https://github.com/arboleya) (See [#1495](https://github.com/FuelLabs/fuels-ts/pull/1495))

## 0.71.1

### Patch Changes

- 🐞 fix: use functions from `fs` instead of plain UNIX commands in install scripts to ensure Windows support, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1618](https://github.com/FuelLabs/fuels-ts/pull/1618))

## 0.71.0

### Patch Changes

- 🐞 fix: include a `.gitignore` file in the template copied over by create-fuels, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))
- chore: update and add docs links in scaffolding CLI, by [@arboleya](https://github.com/arboleya) (See [#1624](https://github.com/FuelLabs/fuels-ts/pull/1624))

## 0.70.1

## 0.70.0

### Patch Changes

- 🐞 fix: include a `.gitignore` file in the template copied over by create-fuels, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1616](https://github.com/FuelLabs/fuels-ts/pull/1616))
- chore: update and add docs links in scaffolding CLI, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1599](https://github.com/FuelLabs/fuels-ts/pull/1599))

## 0.70.0

### Patch Changes

- 🐞 fix: include a `.gitignore` file in the template copied over by create-fuels, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1616](https://github.com/FuelLabs/fuels-ts/pull/1616))
- chore: update and add docs links in scaffolding CLI, by [@Dhaiwat10](https://github.com/Dhaiwat10) (See [#1599](https://github.com/FuelLabs/fuels-ts/pull/1599))
