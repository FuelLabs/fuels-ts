# Fuels CLI

## Getting started

Imagine you have this file structure:

```sh
my-fuel-dapp
├── backend # <—— your sway programs' workspace
│   ├── ...
│   └── Forc.toml
└── frontend # <—— typically your nextjs app or similar
    ├── src
    └── package.json
```

## Installation

Add it to your Frontend project:

```console
cd my-fuel-dapp/frontend
npm install fuels --save
```

## Double-checking

```console
npx fuels -v
```

## Next Steps

Now you need a [`fuel.config.ts`](./config-file) file.

You can create one with [pnpm fuels init](./commands#init).
