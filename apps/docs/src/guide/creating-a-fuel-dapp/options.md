<script setup>
  import { data } from '../../versions.data'
  const { fuels } = data
</script>

# Options

The `npm create fuels` command has several command-line options that you can use to customize your project.

::: code-group

```sh-vue [pnpm]
pnpm create fuels@{{fuels}} --pnpm [project-name] [options]
```

```sh-vue [npm]
npm create fuels@{{fuels}} -- --npm [project-name] [options]
```

```sh-vue [bun]
bunx --bun create-fuels@{{fuels}} --bun [project-name] [options]
```

:::

## `--template <template-name>`

Specifies the template to use for your project. The available templates are: `nextjs`.

## `--pnpm`

Notifies the tool to use pnpm as the package manager to install the necessary dependencies.

## `--npm`

Notifies the tool to use npm as the package manager to install the necessary dependencies.

## `--bun`

Notifies the tool to use bun as the package manager to install the necessary dependencies.

## `--verbose`

Enables verbose logging. Useful when debugging issues with the tool.

## `-h, --help`

Displays a help message with all available options.

## `-V, --version`

Displays the version number of the `npm create fuels` command.
