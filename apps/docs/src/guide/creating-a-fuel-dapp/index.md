<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Creating a Fuel dApp

`npm create fuels` is a command line tool that helps you scaffold a new full-stack Fuel dApp. In this guide, we will create a new counter dApp using `npm create fuels` and add decrement functionality to it. The final result will look like this:

![End result of this guide](../../public/creating-a-fuel-dapp-create-fuels-end-result.png)

You can also check it live, deployed to the Testnet:

- [https://create-fuels-template.vercel.app/](https://create-fuels-template.vercel.app/)

## Initializing the project

The first step is to run the command:

::: code-group

```sh-vue [npm]
npm create fuels@{{fuels}} -- --npm
```

```sh-vue [pnpm]
pnpm create fuels@{{fuels}} --pnpm
```

```sh-vue [bun]
bunx --bun create-fuels@{{fuels}} --bun
```

:::

Once you run the command, you will be asked to choose a name for your project:

```md
◇ What is the name of your project?
│ my-fuel-project
└
```

The tool will scaffold the project and install the necessary dependencies for you. You will then be greeted with this message:

```md
⚡️ Success! Created a fullstack Fuel dapp at my-fuel-project

To get started:

- cd into the project directory: cd my-fuel-project
- Start a local Fuel dev server: pnpm fuels:dev
- Run the frontend: pnpm dev

-> TS SDK docs: https://docs.fuel.network/docs/fuels-ts/
-> Sway docs: https://docs.fuel.network/docs/sway/
-> If you have any questions, check the Fuel forum: https://forum.fuel.network/
```

## Directory Structure

The project scaffolded by `npm create fuels` has roughly the following directory structure:

```md
my-fuel-project
├── src
│ ├── routes
│ │ └── ...
│ ├── components
│ │ └── ...
│ ├── hooks
│ │ └── ...
│ ├── lib.ts
│ └── ...
├── sway-programs
│ ├── contract
│ │ └── ...
│ └── ...
├── public
│ └── ...
├── fuels.config.ts
├── package.json
└── ...
```

It is a Vite project with a few extra files and folders. Let's take a closer look at some of the important ones:

### `./fuels.config.ts`

This is the configuration file for the [`fuels` CLI](../fuels-cli/index.md), the CLI and tooling that powers this project under the hood. It makes sure that all of your Sway programs are continuously compiled and deployed to your local Fuel node. You can read more about the `fuels.config.ts` file in the [Fuels CLI documentation](../fuels-cli/config-file.md).

### `./sway-programs/contract/src/main.sw`

This is where our Sway contract lives. Out of the box, it is a simple counter contract that can only be incremented. We will add a decrement functionality to it in the next step.

### `./src/routes/index.lazy.tsx`

This file contains the source code for the frontend of our dApp. It is a page that renders the counter value and allows the user to increment the counter.

### Dev Environment Setup

Now that we have our project scaffolded, let's set up our development environment.

Let's first start our Fuel Dev server. This will start a local Fuel node and continuously compile and deploy our Sway programs to it.

::: code-group

```sh [npm]
npm fuels:dev
```

```sh [pnpm]
pnpm fuels:dev
```

```sh [bun]
bun run fuels:dev
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

```sh [bun]
bun run dev
```

:::

You should now be able to see the counter dApp running at `http://localhost:5173`. You can try changing the contents of the `./sway-programs/contract/src/main.sw` file and see the changes reflected in the UI without having to restart the server.

![Fullstack Fuel Dev Workflow](../../public/creating-a-fuel-dapp-create-fuels-split-view.png)

**Note:** You may wish to learn more about how you could create a Fuel dApp that uses predicates, check out our [Working with Predicates](./working-with-predicates.md) guide.

---

## Adding Decrement Functionality

To add decrement functionality to our counter, we will have to do two things: 1. Add a `decrement_counter` function to our Sway contract, and 2. Modify the `./src/routes/index.lazy.tsx` file to add a button that calls this function.

### 1. Modifying the Sway Contract

To add a `decrement_counter` function to our Sway contract, we will modify the `./sway-programs/contract/src/main.sw` file.

There are two steps when adding a new function to a Sway program. The first step is to specify the function's ABI.

Towards the top of the file, you will find the ABI section for the contract. Let's add a new function to it:

<<< @/../../create-fuels-counter-guide/sway-programs/contract/src/main.sw#create-fuels-counter-guide-abi{rust:line-numbers}

The second step is to implement the function.

We will add the implementation of the `decrement_counter` function right below the `increment_counter` function.

<<< @/../../create-fuels-counter-guide/sway-programs/contract/src/main.sw#create-fuels-counter-guide-impl{rust:line-numbers}

### 2. Modifying the Frontend

We will now add a new button to the frontend that will call the `decrement_counter` function when clicked. To do this, we will modify the `./src/routes/index.lazy.tsx` file.

First, we will add a function called `onDecrementPressed` similar to the `onIncrementPressed` function:

<<< @/../../create-fuels-counter-guide/src/routes/index.lazy.tsx#create-fuels-counter-guide-on-decrement-react-function{ts:line-numbers}

Second, we will add a new button to the UI that will call the `onDecrementPressed` function when clicked:

<!-- TODO: our docs engine currently does not detect comments in JSX -->

```tsx
<Button onClick={onDecrementPressed} className="mt-6">
  Decrement Counter
</Button>
```

Congratulations! You should now be able to see the counter dApp running at `http://localhost:5173` with our newly added decrement functionality.

You can find the complete source code of the dApp we built [here](https://github.com/FuelLabs/fuels-ts/tree/master/apps/create-fuels-counter-guide).

![End result of this guide](../../public/creating-a-fuel-dapp-create-fuels-end-result.png)

Whenever you want to add a new feature to your dApp and quickly prototype things, you can follow the same steps we followed in this guide.

### 3. Extending the Test Suite (Optional)

Testing the integration with your smart contract isn't essential, but it's good practice to ensure that your application is working as expected. It also gives you the ability to test your application in a controlled environment against a local node.

We've provided some examples for each program type in the `./test` directory of your project, and in the `.sw` source files as well.

But let's also add a test for our new `decrement_counter` function in the `./test/contract.test.ts` file:

<<< @/../../docs-snippets/src/guide/create-fuels/decrement_counter.test.ts#decrement-counter{ts:line-numbers}

And a test for the decrement function in the `./sway-programs/contract/src/main.sw` file:

<<< @/../../create-fuels-counter-guide/sway-programs/contract/src/main.sw#create-fuels-counter-guide-sway-test{rust:line-numbers}

## Next Steps

- Now that you have a basic counter dApp running and have the `npm create fuels` workflow powering you, you can start building more complex dApps using the Fuel Stack. A good place to start for ideas and reference code is the [Sway Applications Repo](https://github.com/FuelLabs/sway-applications).

- As you may have noticed, there are different types of programs in your dApp, feel free to explore [Predicates](https://docs.fuel.network/docs/fuels-ts/predicates/) and [Scripts](https://docs.fuel.network/docs/fuels-ts/scripts/), which are both important differentiators in the Fuel Stack.

- If you want to deploy your dApp to the testnet, check out our [Deploying a dApp to Testnet](./deploying-a-dapp-to-testnet.md) guide.

- If you want to further validate the functionality of your dApp and program types, check out the `test` directory in your `create fuels` project. Couple this with our [testing guide](https://docs.fuel.network/docs/fuels-ts/testing/) to get a better understanding of how to test your dApp.

- If you have any questions or need help, feel free to reach out to us on the [Official Fuel Forum](https://forum.fuel.network/).

- If you want to learn more about the Fuel Stack, check out the [Fuel Docs](https://docs.fuel.network/).
