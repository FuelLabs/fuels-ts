# fuel-js
Fuel v2 TypeScript SDK

## Building

Install dependencies:

```sh
npm install
```

Build and run tests:

## Test

```sh
 npm run test // run all tests
 npm run test:unit // run mocha unit tests
 npm run test:contract // run mocha unit tests
 npm run test:coverage // run tests and coverage 
```

## Contributing

Code must be formatted and linted.

```sh
npm run prettier-format
```
## License

The primary license for this repo is `UNLICENSED`, see [`LICENSE`](./LICENSE).

### Exceptions

- [`SafeCast.sol`](./contracts/vendor/openzeppelin/SafeCast.sol) is licensed under `MIT` (as indicated in the SPDX header) by [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts).
- [`ds-token.sol`](./contracts/vendor/ds/ds-token.sol), [`ds-math.sol`](./contracts/vendor/ds/ds-math.sol), [`ds-auth.sol`](./contracts/vendor/ds/ds-auth.sol), [`ds-guard.sol`](./contracts/vendor/ds/ds-guard.sol) are licensed under `GPL-3.0-or-later` (as indicated in the SPDX headers) by [DappHub](https://github.com/dapphub).
