# `docs-snippets`

**docs-snippets** is a private package for generating snippets for the Fuel documentation site.


# Table of contents

- [`docs-snippets`](#docs-snippets)
- [Table of contents](#table-of-contents)
	- [Building](#building)
	- [Testing](#testing)
## Building

This builds the snippets into testable scripts from the `src` folder and generates the Typegen `types` in the `typegend` folder. All test scripts end with a `.test.ts` suffix.

```sh
pnpm build
```

## Testing

This will build the snippets and run the generated tests. To test a specific environment (`node` or `browser`), the snippet should be named as `{name}.{environment}.test.ts`. e.g. `deploy-contract.node.test.ts`

If no environment is specified, it will run in the browser and node environments by default.

```sh
pnpm test
```
