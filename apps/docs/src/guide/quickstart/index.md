# Quickstart

You can quickly bootstrap a full-stack Fuel project locally with the following command:

::: code-group

```sh [pnpm]
pnpm create fuels
```

```sh [npm]
npm create fuels
```

:::

This will setup a new full-stack Fuel project. To get things running, you'll need to install the dependencies and start the development servers:

::: code-group

```sh [pnpm]
# (Make sure you cd into your new project directory first!)
pnpm install

# Start a local Fuel node and hot-reload for your Sway smart contracts
pnpm fuels:dev
```

```sh [npm]
# (Make sure you cd into your new project directory first!)
npm install

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

Any changes you make to your Sway smart contracts will be hot-reloaded and reflected in the frontend. All of this is enabled thanks to the new [fuels CLI](../cli/index.md). The fuels CLI has several more powerful customization options that will let you tweak your local dev experience to your liking.
