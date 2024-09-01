# create-fuels

A scaffolding CLI tool for creating new full-stack Fuel projects.

## Usage

```bash
pnpm create fuels
```

## Getting Started

1. Start the Fuel development server. This server will start a local Fuel node and provide hot-reloading for your smart contracts.

```bash
npm run fuels:dev

# or
npx fuels dev
```

2. Start the Next.js development server.

```bash
npm run dev
```

## Deploying to Testnet

To learn how to deploy your Fuel dApp to the testnet, you can follow our [Deploying to Testnet](https://docs.fuel.network/docs/fuels-ts/creating-a-fuel-dapp/deploying-a-dapp-to-testnet/) guide.

## Learn More

- [Fuel TS SDK docs](https://fuellabs.github.io/fuels-ts/)
- [Fuel Docs Portal](https://docs.fuel.network/)

## Contributing

- To make changes to the template locally, you will need to have a `.env.local` file in the `templates/nextjs` directory with the following contents:

```bash
NEXT_PUBLIC_FUEL_NETWORK_URL=http://127.0.0.1:4000/v1/graphql
```

This file is populated automatically for end users when they run `pnpm create fuels`.
