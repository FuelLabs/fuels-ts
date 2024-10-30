# `docs`

**docs** is a private package for the Fuel documentation site.

# Table of contents

- [`docs`](#docs-snippets)
- [Table of contents](#table-of-contents)
  - [Building](#building)
  - [Testing](#testing)

## Building

The build process will build out our snippets and the documentation.

```sh
pnpm build
```

The snippets are built into testable scripts from the `src/snippets` folder and generates the Typegen types into the `src/snippets/typegend` folder. All test scripts end with a `.test.ts` suffix.

## Testing

This will build the snippets and run the generated tests. To test a specific environment (`node` or `browser`), the snippet should be named as `{name}.{environment}.test.ts`. e.g. `deploy-contract.node.test.ts`

If no environment is specified, it will run in the browser and node environments by default.

```sh
pnpm test
```
