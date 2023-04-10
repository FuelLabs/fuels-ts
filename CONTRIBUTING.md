---
layout: default
title: "Contributing"
nav_order: -3
---

# Contributing

Thanks for your interest in contributing to the Fuel TypeScript SDK!

This document outlines the process for installing dependencies, setting up for development, and conventions for contributing.

# Finding Something to Work On

There are many ways in which you may contribute to the project, some of which involve coding knowledge and some which do not. A few examples include:

- Reporting bugs
- Adding new features or bugfixes for which there is already an open issue
- Making feature requests

Check out our [Help Wanted](https://github.com/FuelLabs/fuels-ts/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22) or [Good First Issues](https://github.com/FuelLabs/fuels-ts/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) to find a suitable task.

If you are planning something big, for example, changes related to multiple components or changes to current behaviors, make sure to [open an issue](https://github.com/FuelLabs/fuels-ts/issues/new) to discuss with us before starting on the implementation.

# Setting up

```sh
git clone git@github.com:FuelLabs/fuels-ts.git
cd fuels-ts
pnpm install
pnpm build
```

# Developing

For building everything in watch-mode, run:

```sh
# build all projects in watch-mode
pnpm dev
```

File watching is done by `nodemon` for increased performance.

Check `nodemon.config.json` for all settings.

# Alternative Development Flow

Let's assume you want to focus on a particular Unit Test, by running it in `--watch` mode, and that you don't want another compilation step in between your tests and the tested files — this is exactly what the [`pnpm dev`](#Developing) does, as mentioned above.

For this specific use case, to avoid this extra compilation step, we need to re-configure all `package.json` and exports our Typescript `.ts` files instead of Javascript `.js`. This way, the tests (in Typescript) will only be dealing with source other Typescript source files, thus requiring no `.ts`->`.js` compilation to get last chagnes.

> **Warn** This is highly experimental. You'll be on your own, so if you're unsure, ignore this section.

If you'd like to test it out, the steps are:

```sh
pnpm install
pnpm build # <- need to build at least once initially

# re-configures `package.json` files
pnpm ts-node ./scripts/enable-ts-exports.ts
```

Now you **_`<do your things>`_**, and before commiting

```shell
# undo re-configurations done by `enable-exports-ts.ts`
pnpm ts-node ./scripts/disable-ts-exports.ts
```

# Testing

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
pnpm test packages/my-desired-package

# run tests for a specific file
pnpm test packages/my-desired-package/src/my.test.ts
```

Or if you want to run docker and all tests serially you can do:

```sh
pnpm ci:test
```

This will run `services:run`, `test` and then `services:clean`

> The tests may break if you are running your tests locally using `services:run` in a separate terminal.
> To fix this run `services:clean` to clean docker containers and volumes.

# Using local packages

Simply `add` the package folder on your desired project:

```sh
cd my-app
pnpm add ~/path/to/my/fuel-ts/packages/fuels
```

Or, if you want to try something globally:

```sh
pnpm add --global ~/path/to/my/fuel-ts/packages/fuels
```

## Important

When using your local version of `fuels`, remember that you need to run `pnpm build` on every change you do to source files, otherwise the changes won't be propagated to dependent apps using it.

See also:

- [Developing](#Developing)

# Commit Convention

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

# Steps to PR

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

# Git Hooks

The SDK utilizes a pre-push git hook to validate your contribution before review. This is a script that will run automatically before changes are pushed to the remote repository. Within the SDK, the pre-push script will run code linting.

> This can be overridden using the `--no-verify` flag when pushing.

# Updating Forc version

The following script will upgrade Forc to the latest version on GitHub, remove all lockfiles so the latest stdlib can be used, and rebuild all projects:

```sh
pnpm forc:update
```

After this you should run tests and fix any incompatibilities.

# Updating Fuel Core version

Manually edit the `services/fuel-core/Dockerfile`, add the right version, and then:

```sh
pnpm services:clean # causes rebuilding of the Docker image
pnpm test:ci
```

If all tests pass, that's it.

Otherwise, you have work to do.

# FAQ

### Why is the prefix `fuels` and not `fuel`?

In order to make the SDK for Fuel feel familiar with those coming from the [ethers.js](https://github.com/ethers-io/ethers.js) ecosystem, this project opted for an `s` at the end.

The `fuels-*` family of SDKs is inspired by The Ethers Project.
