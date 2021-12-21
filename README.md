# fuels-ts

Fuels.ts is a library for interacting with Fuel v2. With Fuels.ts you can:

- [x] Deploy and call contracts
- [x] Generate contract types with TypeChain
- [x] Build and send transactions
- [x] Encode/decode contract ABI
- [ ] Transfer coins
- [ ] Inspect contract storage
- [ ] Manage wallets
- [ ] Run scripts
- [ ] Query and subscribe to events

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

const contractId = "0x...";
const contract = new Contract(contractId, abi, provider);
const result = await contract.functions.foo("bar");
```

### Deploying Contracts

```ts
import { Provider, Contract } from "fuels";
import bytecode from "./bytecode.bin";

const provider = new Provider("http://127.0.0.1:4000/graphql");

const { contractId } = await provider.submitContract(bytecode);
```

### Generating Contract Types

```sh
yarn add -D typechain typechain-target-fuels
yarn exec typechain --target=fuels --out-dir=types abi.json
```

```ts
import { Provider } from "fuels";
import { MyContract__factory } from "./types";

const provider = new Provider("http://127.0.0.1:4000/graphql");

const contractId = "0x...";
const contract = MyContract__factory.connect(contractId, provider);
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
