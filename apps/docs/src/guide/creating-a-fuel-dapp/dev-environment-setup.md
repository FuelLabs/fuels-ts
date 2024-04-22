# Dev Environment Setup

Now that we have our project scaffolded, let's set up our development environment.

Let's first start our Fuel Dev server. This will start a local Fuel node and continuously compile and deploy our Sway programs to it.

::: code-group

```sh [npm]
pnpm fuels:dev
```

```sh [pnpm]
pnpm fuels:dev
```

:::

Once the server is up and running, we can start our Next.js development server in another terminal.

::: code-group

```sh [npm]
pnpm dev
```

```sh [pnpm]
pnpm dev
```

:::

You should now be able to see the counter dApp running at `http://localhost:3000`. You can try changing the contents of the `./sway-programs/contract/src/main.sw` file and see the changes reflected in the UI without having to restart the server.

![Fullstack Fuel Dev Workflow](/creating-a-fuel-dapp-create-fuels-split-view.png)
