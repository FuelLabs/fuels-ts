# Directory Structure

The project scaffolded by `npm create fuels` has roughly the following directory structure:

```md
my-fuel-project
├── src
│ ├── pages
│ │ ├── index.tsx
│ │ └── ...
│ ├── components
│ │ └── ...
│ ├── styles
│ │ └── ...
│ └── lib.ts
├── public
│ └── ...
├── sway-programs
│ ├── contract
│ │ └── src
│ │ └── main.sw
│ ├── Forc.lock
│ └── Forc.toml
├── fuels.config.ts
├── package.json
└── ...
```

It is a Next.js project with a few extra files and folders. Let's take a closer look at some of the important ones:

### `./fuels.config.ts`

This is the configuration file for the [`fuels` CLI](./guide/fuels/index.md), the CLI and tooling that powers this project under the hood. It makes sure that all of your Sway programs are continuously compiled and deployed to your local Fuel node. You can read more about the `fuels.config.ts` file in the [Fuels CLI documentation](./guide/fuels/config-file.md).

### `./sway-programs/contract/src/main.sw`

This is where our Sway contract lives. Out of the box, it is a simple counter contract that can only be incremented. We will add a decrement functionality to it in the next step.

### `./src/pages/index.tsx`

This file contains the source code for the frontend of our dApp. It is a Next.js page that renders the counter value and allows the user to increment the counter.
