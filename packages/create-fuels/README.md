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

1. Start the Next.js development server.

```bash
npm run dev
```

## Learn More

- [Fuel TS SDK docs](https://fuellabs.github.io/fuels-ts/)
- [Fuel Docs Portal](https://docs.fuel.network/)

## Contributing

- To make changes to the template locally, you will need to have a `.env.local` file in the `templates/nextjs` directory with the following contents:

```bash
NEXT_PUBLIC_HAS_CONTRACT=true
NEXT_PUBLIC_HAS_PREDICATE=true
NEXT_PUBLIC_HAS_SCRIPT=true
NEXT_PUBLIC_FUEL_NETWORK_URL=http://127.0.0.1:4000/graphql
```

This file is populated automatically for end users when they run `pnpm create fuels`.
