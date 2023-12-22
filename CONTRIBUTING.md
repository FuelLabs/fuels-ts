# Contributing To Fuel TypeScript SDK

Thanks for your interest in contributing to the Fuel TypeScript SDK!

This document outlines the process for installing dependencies, setting up for development and conventions for contributing.

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

> **Note**: You can `pnpm dev` a single package:
>
> ```sh
> cd packages/abi-coder
> pnpm dev
> ```

# Using local sym-linked packages

First, we need to link our `fuels` package globally in our local `global pnpm store`:

```sh
cd fuels-ts/packages/fuels
pnpm link --global
```

Let's check it out:

```sh
pnpm list --global
```

Cool, now on the root directory of `my-local-project`:

```sh
cd my-local-project
pnpm link --global fuels
```

That's it — `my-local-project` is now using our local version of `fuels`.

The same can be done with all other packages:

```sh
cd fuels-ts/packages/wallet
pnpm link --global

# ...

pnpm list --global # validating

# ...

cd my-local-project
pnpm link --global @fuel-ts/wallet
```

> **Warning** When using local symlinked `fuels-ts` in `your-local-project`, remember to `pnpm build` the SDK whenever you change a source file to reflect the changes on `your-local-project`. To automate this, you can use `pnpm dev`, which will keep watching and compiling everything automatically while developing.

See also:

- [Developing](#Developing)

# Testing

In order to run tests locally, you need `fuel-core` running locally.

To do that run this command in your terminal:

```sh
pnpm node:run
```

And then run the tests in another terminal tab:

```sh
# run all tests
pnpm test

# watch all tests
pnpm test:watch

# run tests for a specific package
pnpm test:filter packages/my-desired-package

# run tests for a specific file
pnpm test:filter packages/my-desired-package/src/my.test.ts

# run tests while passing other flags to sub-program
pnpm test -- --coverage --my-other-flag
```

Or if you want to start a local Fuel-Core node and run all tests serially you can do:

```sh
pnpm ci:test
```

This will run `node:run`, `test` and then `node:clean`

> The tests may break if you are running your tests locally using `node:run` in a separate terminal.
> To reset your local fuel-core node data and start from scratch, run `node:clean`

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

Manually edit the `packages/fuel-core/VERSION` file, add the right version, and then:

```sh
pnpm install # will download new binaries
pnpm test:ci
```

If all tests pass, that's it.

Otherwise, you have work to do.

# FAQ

### Why is the prefix `fuels` and not `fuel`?

In order to make the SDK for Fuel feel familiar with those coming from the [ethers.js](https://github.com/ethers-io/ethers.js) ecosystem, this project opted for an `s` at the end.

The `fuels-*` family of SDKs is inspired by The Ethers Project.
