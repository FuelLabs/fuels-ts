---
layout: default
title: "Contributing"
nav_order: -3
---

## 💚 Contributing To Fuel TypeScript SDK

Thanks for your interest in contributing to the Fuel TypeScript SDK! This document outlines the process for installing dependencies, setting up for development, and conventions for contributing.

## Finding Something to Work On

There are many ways in which you may contribute to the project, some of which involve coding knowledge and some which do not. A few examples include:

- Reporting bugs
- Adding new features or bugfixes for which there is already an open issue
- Making feature requests

Check out our [Help Wanted](https://github.com/FuelLabs/fuels-ts/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [Good First Issues](https://github.com/FuelLabs/fuels-ts/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to find a suitable task.

If you are planning something big, for example, changes related to multiple components or changes to current behaviors, make sure to [open an issue](https://github.com/FuelLabs/fuels-ts/issues/new) to discuss with us before starting on the implementation.

### Setup

```sh
git clone git@github.com:FuelLabs/fuels-ts.git
cd fuels-ts
pnpm install
pnpm build
```

If you would like to utilise pre-push git hooks to validate your contribution before review (recommended for contributors without workflow privileges) then also run the following:

```sh
pnpm husky:install
```

This will run run `build`, `ci:test` and then `lint` when you push a contribution.

> This can be overridden using the `--no-verify` flag when pushing.

## Testing

In order to run tests locally, you need `fuel-core` running as a docker container.
To do that run this command in your terminal:

```sh
pnpm services:run
```

And then run the tests in another terminal tab:

```sh
# run all tests
pnpm test
# run tests and get coverage
pnpm test -- --coverage
# run tests for a specific package
pnpm --filter @fuel-ts/contract run test
```

Or if you want to run docker and all tests serially you can do:

```sh
pnpm ci:test
```

This will run `services:run`, `test` and then `services:clean`

> The tests may break if you are running your tests locally using`services:run` in a separate terminal.
> To fix this run `services:clean` to clean docker containers and volumes.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

## Steps to PR

1. Fork the fuels-ts repository and clone your fork

2. Create a new branch out of the `master` branch.

3. Make and commit your changes following the
   [commit convention](https://github.com/FuelLabs/fuels-ts/blob/master/README.md#commit-convention).
   As you develop, you can run `pnpm build` and
   `pnpm test` to make sure everything works as expected.

4. Run `pnpm changeset` to create a detailed description of your changes. This
   will be used to generate a changelog when we publish an update.
   [Learn more about Changeset](https://github.com/changesets/changesets/tree/main/packages/cli).
   Please note that you might have to run `git fetch origin master` (where
   origin will be your fork on GitHub) before `pnpm changeset` works.

> If you made minor changes like CI config, prettier, etc, you can run
> `pnpm changeset add --empty` to generate an empty changeset file to document
> your changes.

## Build and watch all packages

If you want to work locally using realtime builds, open in one terminal tab build in watch mode
on all packages from the root directory:

```sh
pnpm build:watch
```

This command will run `tsup --watch` on all packages using Turborepo

## Using linked packages

This will link all packages inside our monorepo in your `global pnpm store`, enabling you to use `fuels-ts` packages via links in
your local projects.

### On `fuels-ts` root directory

```sh
pnpm -r exec pnpm link --global --dir ./
```

You can use [build watch](#build-and-watch-all-packages).

### On `your project` root directory

```sh
pnpm link --global fuels
```

Or for specfic packages just use `pnpm link @fuel-ts/<pkg-name>`, ex;

```sh
pnpm link --global @fuel-ts/wallet
```

### Troubleshooting

If you're linking for the first time, you might need:

```sh
  pnpm setup
```

If it still have problems, you might need to setup again (As `pnpm` releases new version, the global folder structure may change)

```sh
  pnpm setup
```

## Updating Forc version

The following script will upgrade Forc to the latest version on GitHub, remove all lockfiles so the latest stdlib can be used, and rebuild all projects:

```sh
pnpm forc:update
```

After this you should run tests and fix any incompatibilities.

## FAQ

### Why is the prefix `fuels` and not `fuel`?

In order to make the SDK for Fuel feel familiar with those coming from the [ethers.js](https://github.com/ethers-io/ethers.js) ecosystem, this project opted for an `s` at the end. The `fuels-*` family of SDKs is inspired by The Ethers Project.
