# Fuel asset list

This package contains the list of assets and metadata, for the Fuel Network.

This package is made by projects that want to consume metadata from assets like, `name`, `symbol`, `icon` and
`brigde` informations for those assets that support it.

### Install

`npm install @fuel-ts/utils/assets-utils`

### Usage

```ts
import assets from "@fuel-ts/utils/assets-utils";

console.log(assets);
```

This version uses the metadata with images hosted by remote provider to use local assets path, and access the images
from the package.

```ts
import { assets, resolveIconPath } from "@fuel-ts/utils/assets-utils";

// images are available inside the package `@fuels/assets/images`
// suppose you copy or use a alias path for it you can them
// use the new path to populate the path for the images.
console.log(resolveIconPath("./my-folder/images", assets));
```

### Schema

```ts
export type Ethereum = {
  /** type of network */
  type: "ethereum";
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** address of the asset contract */
  address?: string;
};

export type Fuel = {
  /** type of network */
  type: "fuel";
  /** chain id of the network */
  chainId: number;
  /** number of decimals of the asset */
  decimals: number;
  /** assetId on the Fuel Network */
  assetId: string;
  /** the contractId of that generated the Asset on the Fuel Network */
  contractId?: string;
};

export type Asset = {
  /** name of the asset */
  name: string;
  /** description of the asset */
  description: string;
  /** symbol of the asset */
  symbol: string;
  /** icon of the asset */
  icon: string;
  /** asset id on Fuel Network */
  assetId: string;
  /** Networks are a representation of the asset on a specfic network */
  networks: Array<Ethereum | Fuel>;
};
```

#### Example

```json
[
  {
    "name": "Ethereum",
    "description": "Fuel base asset",
    "symbol": "ETH",
    "icon": "http://cdn.fuel.network/assets/images/eth.svg",
    "assetId": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "networks": [
      {
        "type": "ethereum",
        "chainId": 0,
        "decimals": 18
      },
      {
        "type": "fuel",
        "chainId": 0,
        "decimals": 9,
        "assetId": "0x0000000000000000000000000000000000000000000000000000000000000000"
      }
    ]
  }
]
```

You can find the types definition [here](./types.ts)
