# npm create fuels

You can quickly bootstrap a full-stack Fuel project locally with the following command:

::: code-group

```sh [pnpm]
pnpm create fuels

# or, if you want to pass in your preferences directly from the command line:
pnpm create fuels [project-name] [options]

# eg. pnpm create fuels my-fuel-project --pnpm --contract --predicate
# Note: project-name and all other options are optional
Options:
  -V, --version         output the version number
  -c, --contract        Include contract program
  -p, --predicate       Include predicate program
  -s, --script          Include script program
  --pnpm                Use pnpm as the package manager
  --npm                 Use npm as the package manager
  -cs, -cp, -sp, -cps   Shorthand to include combination of contract, script and predicate programs
  --verbose             Enable verbose logging
  -h, --help            Display help for command
```

```sh [npm]
npm create fuels

# or, if you want to pass in your preferences directly from the command line:
npm create fuels [project-name] [options]

# eg. npm create fuels my-fuel-project --pnpm --contract --predicate
# Note: project-name and all other options are optional
Options:
  -V, --version         output the version number
  -c, --contract        Include contract program
  -p, --predicate       Include predicate program
  -s, --script          Include script program
  --pnpm                Use pnpm as the package manager
  --npm                 Use npm as the package manager
  -cs, -cp, -sp, -cps   Shorthand to include combination of contract, script and predicate programs
  --verbose             Enable verbose logging
  -h, --help            Display help for command
```

:::

This will setup a new full-stack Fuel project. To get things running, you'll need to install the dependencies and start the development servers:

::: code-group

```sh [pnpm]
# Start a local Fuel node and hot-reload for your Sway smart contracts
pnpm fuels:dev
```

```sh [npm]
# Start a local Fuel node and hot-reload for your Sway smart contracts
npm run fuels:dev
```

:::

In another terminal window, start the frontend dev server:

::: code-group

```sh [pnpm]
pnpm dev
```

```sh [npm]
npm dev
```

:::

Your app should now be running on `localhost:3000`.

Any changes you make to your Sway smart contracts will be hot-reloaded and reflected in the frontend. All of this is enabled thanks to the new [fuels CLI](../fuels/index.md). The fuels CLI has several more powerful customization options that will let you tweak your local dev experience to your liking.
