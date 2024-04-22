# Initializing the project

The first step is to run the command:

::: code-group

```sh [npm]
npm create fuels
```

```sh [pnpm]
pnpm create fuels
```

:::

Once you run the command, you will be greeted with a few simple questions. We will answer them as follows:

```md
◇ What is the name of your project?
│ my-fuel-project
│
◇ Select a package manager:
│ pnpm
│
◆ Which Sway programs do you want? (space to toggle)
│ ● Contract
│ ○ Predicate
│ ○ Script
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
