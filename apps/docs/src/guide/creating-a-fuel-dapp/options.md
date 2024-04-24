# Options

The `npm create fuels` command has several command-line options that you can use to customize your project.

::: code-group

```sh [pnpm]
pnpm create fuels [project-name] [options]
```

```sh [npm]
npm create fuels [project-name] [options]
```

:::

## `-c, --contract`

Notifies the tool to include a Sway contract program in your project.

## `-p, --predicate`

Notifies the tool to include a Sway predicate program in your project.

## `-s, --script`

Notifies the tool to include a Sway script program in your project.

## `--pnpm`

Notifies the tool to use pnpm as the package manager to install the necessary dependencies.

## `--npm`

Notifies the tool to use npm as the package manager to install the necessary dependencies.

## `-cs, -cp, -sp, -cps`

Shorthand to include a combination of contract, script and predicate programs.

## `--verbose`

Enables verbose logging. Useful when debugging issues with the tool.

## `-h, --help`

Displays a help message with all available options.

## `-V, --version`

Displays the version number of the `npm create fuels` command.
