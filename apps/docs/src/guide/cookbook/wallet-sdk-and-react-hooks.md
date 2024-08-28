# Wallet SDK and React Hooks

This guide will show you how you can use the [Fuel Wallet](https://wallet.fuel.network/) SDK and its [React Hooks](https://wallet.fuel.network/docs/dev/hooks-reference/) to build a simple React application that lets users connect their wallet to your application and see their balance.

## Setup

The first thing we will do is setup a Next.js project.

::: code-group

```sh [npm]
npm create next-app my-fuel-app
```

```sh [pnpm]
pnpm create next-app my-fuel-app
```

```sh [bun]
bun create next-app my-fuel-app
```

:::

Next, we will install the Fuel Wallet React SDK and the Fuel TypeScript SDK.

::: code-group

```sh [npm]
npm install fuels @fuels/connectors @fuels/react @tanstack/react-query
```

```sh [pnpm]
pnpm add fuels @fuels/connectors @fuels/react @tanstack/react-query
```

```sh [bun]
bun add fuels @fuels/connectors @fuels/react @tanstack/react-query
```

:::

## The Provider

In order to make use of the React hooks provided by the Fuel Wallet SDK, we need to wrap our application in a `FuelProvider` component. This component will provide the hooks with the necessary context to interact with the Fuel Wallet SDK. Add the following to your `pages/_app.tsx` file:

<!-- prettier-ignore -->
<<< @/../../demo-wallet-sdk-react/src/app/layout.tsx#wallet-sdk-react-provider{tsx:line-numbers}

## Building the UI

Go to your `pages/index.tsx` file and replace the contents with the following:

<<< @/../../demo-wallet-sdk-react/src/app/page.tsx#wallet-sdk-react-ui{tsx:line-numbers}

Let's break down what's happening here.

The `useConnectors` hook returns a list of available wallet connectors.

Once a connector has been selected by the user, the `useConnect` hook will return a `connect` function that can be used to connect the user's wallet to your application.

The `useAccount` hook returns information about the user's account, if they are connected.

The `useBalance` hook returns the user's ETH balance on the [`testnet` network](https://testnet.fuel.network/v1/playground), if they are connected.

## Further Reading

- [Wallet SDK React Hooks Reference](https://wallet.fuel.network/docs/dev/hooks-reference/)
