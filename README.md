# fuels-ts

Fuels.ts is a library for interacting with Fuel v2. With Fuels.ts you can:

- [x] Deploy and call contracts
- [x] Build and send transactions
- [x] Generate TypeScript types from contract ABIs with TypeChain
- [x] Encode/decode contract ABI
- [ ] Transfer coins
- [ ] Manage wallets

## Usage

### Installation

```sh
yarn add fuels
# or
npm add fuels
```

### Calling Contracts

```ts
import { Provider, Contract } from "fuels";
import abi from "./abi.json";

const provider = new Provider("http://127.0.0.1:4000/graphql");
const contract = new Contract("address", abi, provider);
const result = await contract.functions.foo("bar");
```

## Contributing

### Setup

```sh
git clone git@github.com:FuelLabs/fuels-ts.git
cd fuels-ts
npm install
```

### Testing

```sh
# run all tests
npm run test
# run tests and get coverage
npm run test:coverage
# run tests for a specific package
npm -w @fuel-ts/contract run test
```

## License

The primary license for this repo is `Apache 2.0`, see [`LICENSE`](./LICENSE).
